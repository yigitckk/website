---
title: "Job Queue — Project Postmortem"
uploadDate: "2026-06-24"
---

# Job Queue — Postmortem

This was the second project in my backend foundation series — built to understand the mechanics of async job processing without relying on ready-made tools like Redis or Celery.

---

## What I Set Out to Build

A PostgreSQL-backed async job queue from scratch. The goal was to understand how a backend service can offload long-running work — keeping the system responsive without overwhelming it — by building the push/pop/retry/dead-letter logic manually rather than reaching for an existing library.

---

## What I Actually Built

A job queue service with a FastAPI API layer and a standalone Python worker. Jobs move through five states: pending → processing → completed / failed → retry → dead-letter. The worker polls the database, processes jobs, handles retries with a configurable limit, and moves exhausted jobs to dead-letter. Deployed on Oracle Cloud VPS with systemd.

---

## Where I Got Stuck

Writing the worker loop was significantly harder than setting up the API layer. The API structure came naturally, but integrating structlog took longer than expected — understanding how to wire it into the application correctly, and why structured logging matters for a system that grows, wasn't obvious at first.

---

## What I Can Explain Clearly Now

The full job lifecycle: how a job enters the queue, how the worker picks it up, what happens on failure, how retry logic works, and when a job gets moved to dead-letter. Also how to separate concerns into layers so the system can grow — adding a user module or other services without rewriting the core.

---

## What's Still Unclear

Concepts like UUID strategy and structlog internals haven't fully settled yet. They're functional — I used them — but I couldn't explain the deeper design decisions confidently. These will get more attention during the Event Log project.

---

## What I'm Taking to the Next Project

The state machine pattern from job lifecycle maps directly to event sourcing. In the Event Log project, events also have a lifecycle and ordering guarantees matter — the same discipline of tracking state transitions carefully will apply, but with stronger consistency requirements.

---

**Repo:** [github.com/yigitckk/job-queue](https://github.com/yigitckk/job-queue)
