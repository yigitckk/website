---
title: "Auth Service — Project Postmortem"
uploadDate: "2026-06-22"
---

# Auth Service — Postmortem

This project was initiated for my backend development skill build up. I was expecting to gain experience in software development processes.

---

## What I Set Out to Build

It was projected to be a basic login system with backend dev. concepts included. I was aiming to learn how to create the architecture, endpoints, database, and test them — and at the end have them covered in structured logging to make sense of them as if it's a real system where a developer tends to understand activities, errors and experience.

---

## What I Actually Built

A standalone authentication service with register, login, logout, token refresh, token revocation, and session management endpoints. The service tracks sessions by IP and user-agent, blacklists access tokens on logout, and logs everything via structlog. Deployed on Oracle Cloud VPS.

---

## Where I Got Stuck

Refresh and access token distinguishment — plus you need to take into account that some users log out and some do not. Trying to understand what all those concepts are about and why they exist separately was hard at first.

---

## What I'd Do Differently

No strong opinions yet — still processing.

---

## What I'm Taking to the Next Project

I learned the use of Alembic migrations, the JWT concept, PostgreSQL basics, how to structure an application in layers, how to test it, and how to produce results in structured JSON. These carry forward.

---

## One Thing That Surprised Me

Testing processes almost killed me by the end. Also trying to come up with code from theory was very hard for a starter — I admit I couldn't go fully myself without the help of LLMs, but I'm holding one or two skills and valuable experience for further projects: layer separation, structlog setup, and why on earth we have multiple tokens and separate database settings.
