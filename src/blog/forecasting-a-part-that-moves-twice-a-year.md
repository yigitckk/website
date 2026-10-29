---
title: "Forecasting a part that moves twice a year"
uploadDate: "2026-10-29"
---

# Forecasting a part that moves twice a year

A spare parts or MRO warehouse lives with a contradiction that every stores supervisor can recite from memory:

> "Half the shelf is dead stock, and the part we actually need is out."

The usual explanation is discipline — someone didn't update the min/max fields. The real explanation is arithmetic. Spare-part demand is **intermittent**: most months are zero, and when a part does move, the quantity is erratic. Average consumption logic is not slightly inaccurate here; it is answering a different question than the one being asked.

I wanted to know how much of this is real and how much is consultant folklore, so I measured it on open data instead of arguing about it.

**Code and outputs: [github.com/yigitckk/intermittent-demand-audit](https://github.com/yigitckk/intermittent-demand-audit)**

## The data

The [Monash Time Series Forecasting Archive](https://zenodo.org/records/3994911) publishes a *Car Parts* dataset: **2,674 monthly series**, January 1998 to March 2002, originally from Hyndman's `expsmooth` R package (CC-BY 4.0). It is real automotive parts demand, not a simulation.

First number worth sitting with: **75.9% of all month-part observations are zero.**

That single fact invalidates the comfortable assumptions. A method that implicitly treats demand as a continuous flow is being fed a series that is, three quarters of the time, nothing at all.

## Step one: stop treating the portfolio as one thing

Before forecasting anything, each part gets placed on two axes — ADI (average inter-demand interval: how many months pass between movements) and CV² (how variable the quantity is when it does move). The Syntetos-Boylan-Croston scheme splits the plane at ADI = 1.32 and CV² = 0.49.

![Part classification on the ADI–CV² plane](/images/blog/intermittent/classification.png)

| Class | Parts |
|---|---|
| intermittent | 2,342 |
| lumpy | 297 |
| dead (no movement at all) | 16 |
| smooth | 15 |
| erratic | 4 |

Fifteen parts out of 2,674 are "smooth" — the only region where textbook forecasting is comfortable. **99.4% of this portfolio sits outside it.** Any tool that applies one model to the whole catalogue is making a claim about 2,659 parts it has not earned.

## Step two: let the data pick the method, per part

The candidates:

- **Croston (1972)** — smooth demand size and demand interval separately, divide one by the other.
- **SBA** — Syntetos-Boylan's correction, which multiplies Croston by `1 − α/2` to remove a structural bias.
- **TSB** — Teunter-Syntetos-Babai, which updates demand *probability* every period, so a part that is quietly dying gets caught.
- **Moving average** (6 and 12 months).
- **Naive mean** — the whole history averaged. This is what an ERP min/max field set years ago effectively does, and it is the honest baseline.

The evaluation is the part most writeups skip. For each part, `α` and the method are chosen on a **validation window** (months 28–39), and the chosen configuration is then scored on a **test window the selection never saw** (the final 12 months). Metric: MASE, scaled by the training set's naive-1 MAE.

![Method comparison, mean MASE on the held-out test window](/images/blog/intermittent/methods.png)

| Approach | Test MASE (mean) | Median |
|---|---|---|
| **per-part selection** | **0.892** | **0.633** |
| moving average, 12 months | 0.922 | 0.671 |
| TSB (α=0.2, β=0.05) | 1.001 | 0.719 |
| naive mean (ERP-style) | 1.070 | 0.802 |
| SBA (α=0.1) | 1.313 | 0.913 |
| Croston (α=0.1) | 1.349 | 0.938 |

**16.6% lower error than the ERP-style baseline.** That is the headline, but it is not the interesting part.

## The uncomfortable finding

**Croston and SBA, imposed on the whole portfolio at a fixed α, lost to a plain 12-month moving average — and lost to the naive mean too.**

I did not expect that, and it would have been easy to not report it. The intermittent-demand literature is usually summarised as "use Croston, not moving averages," and a vendor deck would stop at the classification chart and the 16.6% and let you assume the clever method did the work.

What actually won was the *selection discipline*. Per-part, validated choice: moving average (6 months) for 1,147 parts, SBA for 758, moving average (12) for 248, TSB for 163, naive for 144, Croston for 44.

Read that distribution again. SBA genuinely wins on 758 parts — a quarter of the catalogue — and is actively harmful on most of the rest. Both the "Croston always wins" and the "intermittent methods are academic nonsense" camps are wrong, and they are wrong about *different subsets of the same warehouse*. The method is not the product. The measurement is.

## Step three: turn it into a decision someone can sign

Forecast accuracy is not a budget line. What a plant manager can act on is the trade-off between service and tied-up capital. So the forecasts feed a periodic-review order-up-to simulation (2-month lead time) over the 200 fastest-moving parts, sweeping the safety multiplier:

![Fill rate against tied-up capital](/images/blog/intermittent/service-capital.png)

| Fill rate | Tied-up capital (at €40/part) |
|---|---|
| 72% | €17,700 |
| 86% | €30,600 |
| 92% | €44,600 |
| **95%** | **€59,400** |
| 97% | €74,300 |
| 98% | €104,600 |
| 99% | €288,000 |

Here is the sentence this whole exercise exists to produce:

> **Going from 95% to 99% fill rate costs five times the capital.**

Nobody needs a model to understand that sentence, and no one can make the decision without it. "Optimal stock" is not a deliverable. A curve with your own part numbers on it is.

Separately, 698 parts had no movement in the final 12 months despite moving earlier — a cash-release list, sorted by value, that requires no forecasting at all.

## What this costs to do on your own data

Two to three years of part movement history out of the ERP, as a CSV: part number, date, quantity. Optionally unit cost and lead time.

No sensors, no PLC tap, no integration project, no pilot server. The entire pipeline above runs in twelve seconds on a laptop.

That constraint is deliberate. Most "predictive" projects in manufacturing die at the data-acquisition stage, not the modelling stage. The reason this one is worth doing is that the data already exists and has been sitting in the ERP for years.

## Reproducing it

```bash
git clone https://github.com/yigitckk/intermittent-demand-audit
cd intermittent-demand-audit
uv venv --python 3.12 .venv
uv pip install --python .venv/bin/python pandas numpy matplotlib
curl -sL -o data/car_parts.zip \
  "https://zenodo.org/records/3994911/files/car_parts_dataset_without_missing_values.zip?download=1"
cd data && unzip -o car_parts.zip && cd ..
.venv/bin/python src/audit.py
.venv/bin/python src/select_method.py
```

Eight CSVs and three charts land in `out/`, including the reorder-point table in a format you can paste back into an ERP.

## References

- Croston, J.D. (1972). Forecasting and stock control for intermittent demands. *Operational Research Quarterly* 23(3).
- Syntetos, A.A., Boylan, J.E. (2005). The accuracy of intermittent demand estimates. *International Journal of Forecasting* 21(2).
- Teunter, R.H., Syntetos, A.A., Babai, M.Z. (2011). Intermittent demand: Linking forecasting to inventory obsolescence. *European Journal of Operational Research* 214(3).
- Hyndman, R.J., Koehler, A.B. (2006). Another look at measures of forecast accuracy. *International Journal of Forecasting* 22(4).
- Godahewa, R. et al. (2021). Monash Time Series Forecasting Archive. *NeurIPS Datasets and Benchmarks*.

---

If you run an aftermarket or MRO store and want this curve drawn with your own part numbers, send one part family's movement history and I will send back a one-page finding — what is tying up capital and what is costing you service level. No charge for the first family.