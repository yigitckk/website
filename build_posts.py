#!/usr/bin/env python3
"""Blog yazılarını markdown'dan statik HTML'e çevirir.

React'ın çalışma anında yaptığı işi derleme anına taşıyoruz: 5 yazı için
istemciye markdown parser + syntax highlighter göndermek (eski bundle ~500KB)
yerine, sayfalar bir kez burada üretilir. `python3 build_posts.py` yeter.
"""
import re, pathlib, html
import markdown

SRC = pathlib.Path("_archive_react_2026-08/src/blog")
OUT = pathlib.Path("static/blog")
OUT.mkdir(parents=True, exist_ok=True)

# eski dosya adı → yeni sayfa adı + görünen tarih
POSTS = {
    "auth-service-postmortem.md": ("auth-service-postmortem.html", "2026-06-22"),
    "job-queue-postmortem.md":    ("job-queue-postmortem.html",    "2026-06-24"),
    "user_segmentation_blog.md":  ("user-segmentation.html",       "2025-08-14"),
    "sample-post.md":             ("streams.html",                 "2024-10-11"),
    "lambda.md":                  ("lambda.html",                  "2024-10-10"),
}

TPL = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Yiğit Çelik</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23F6F3EB'/%3E%3Ctext x='16' y='22' font-family='monospace' font-size='14' font-weight='bold' fill='%23A33529' text-anchor='middle'%3EY%C3%87%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
  :root{{
    --paper:#F6F3EB;--paper-2:#EFEBDF;--ink:#1B1A15;--muted:#6F6A5C;
    --faint:#A39D8D;--seal:#A33529;--rule:rgba(27,26,21,0.16);
    --rule-soft:rgba(27,26,21,0.08);--grid:rgba(27,26,21,0.045);
    --mono:"IBM Plex Mono",ui-monospace,monospace;
    --sans:"IBM Plex Sans",-apple-system,"Segoe UI",sans-serif;
    --serif:"Instrument Serif",Georgia,serif;
  }}
  @media(prefers-color-scheme:dark){{
    :root{{--paper:#161511;--paper-2:#1E1C17;--ink:#EDEAE1;--muted:#9A9486;
      --faint:#6B665A;--seal:#D0554A;--rule:rgba(237,234,225,0.18);
      --rule-soft:rgba(237,234,225,0.08);--grid:rgba(237,234,225,0.035);}}
  }}
  *{{box-sizing:border-box}}
  body{{margin:0;color:var(--ink);font-family:var(--sans);font-size:16.5px;
    line-height:1.75;-webkit-font-smoothing:antialiased;
    background:
      repeating-linear-gradient(0deg,var(--grid) 0 1px,transparent 1px 28px),
      repeating-linear-gradient(90deg,var(--grid) 0 1px,transparent 1px 28px),
      var(--paper);}}
  ::selection{{background:rgba(163,53,41,0.22)}}
  a{{color:var(--ink);text-decoration-color:var(--faint);text-underline-offset:3px}}
  a:hover{{color:var(--seal);text-decoration-color:var(--seal)}}
  .wrap{{max-width:700px;margin:0 auto;padding:0 24px}}
  .back{{font-family:var(--mono);font-size:12px;letter-spacing:0.08em;
    display:inline-block;margin:28px 0 0;text-decoration:none;color:var(--muted)}}
  article{{padding:24px 0 80px}}
  .k{{font-family:var(--mono);font-size:12px;color:var(--faint);letter-spacing:0.08em}}
  h1{{font-family:var(--serif);font-weight:400;font-size:clamp(28px,5.6vw,42px);
    line-height:1.16;margin:10px 0 6px;letter-spacing:-0.01em}}
  .tagline{{color:var(--muted);margin:0 0 36px;font-size:15.5px}}
  article h2{{font-family:var(--mono);font-size:12.5px;font-weight:500;color:var(--seal);
    letter-spacing:0.16em;text-transform:uppercase;margin:44px 0 12px}}
  article h3{{font-size:17px;margin:30px 0 8px}}
  article p,article li{{color:var(--ink)}}
  article code{{font-family:var(--mono);font-size:0.86em;background:var(--paper-2);
    padding:2px 5px;border:1px solid var(--rule-soft)}}
  article pre{{background:var(--paper-2);border:1px solid var(--rule);
    padding:16px 18px;overflow-x:auto;font-size:13.5px;line-height:1.6}}
  article pre code{{background:none;border:none;padding:0}}
  article blockquote{{margin:1.2em 0;padding:2px 0 2px 18px;
    border-left:2px solid var(--seal);color:var(--muted)}}
  article hr{{border:none;border-top:1px solid var(--rule);margin:36px 0}}
  article img{{max-width:100%}}
  article table{{border-collapse:collapse;font-size:14.5px}}
  article th,article td{{border:1px solid var(--rule);padding:6px 12px;text-align:left}}
  footer{{border-top:1px solid var(--rule);padding:28px 0 60px;
    font-family:var(--mono);font-size:12px;color:var(--faint)}}
</style>
</head>
<body>
<div class="wrap">
  <a class="back" href="/">← YİĞİT ÇELİK</a>
  <article>
    <div class="k">{date}</div>
    <h1>{title}</h1>
    <p class="tagline">{tagline}</p>
{body}
  </article>
</div>
<footer><div class="wrap">Part of a dated record. yigitcelik.net</div></footer>
</body>
</html>
"""

def frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    meta = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip().strip("'\"")
        text = text[m.end():]
    return meta, text

for src_name, (out_name, date) in POSTS.items():
    p = SRC / src_name
    if not p.exists():
        print(f"YOK: {p}")
        continue
    meta, body_md = frontmatter(p.read_text(encoding="utf-8"))
    title = meta.get("title", out_name)
    tagline = meta.get("tagline", meta.get("preview", ""))
    body = markdown.markdown(body_md, extensions=["fenced_code", "tables"])
    # markdown çıktısındaki ilk H1 başlığı şablonda zaten var — yinelenirse kaldır
    body = re.sub(r"^<h1>.*?</h1>\n?", "", body, count=1)
    out = TPL.format(title=html.escape(title), tagline=html.escape(tagline),
                     date=date, body=body)
    (OUT / out_name).write_text(out, encoding="utf-8")
    print(f"{src_name} → blog/{out_name} ({len(out)//1024} KB)")
