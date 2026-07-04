# JanVaani AI 🇮🇳

> **"Where Every Voice Shapes Development."**

---

## Overview

**JanVaani AI** is an AI-powered Constituency Decision Support System built for the **Google Build With AI Competition** under **Track 1 – People's Priorities (AI for Constituency Development Planning)**.

It transforms scattered citizen complaints into### Phase 3-12: Full Backend Ecosystem
- Complete Citizen, MP, and Admin authentication.
- Secure Role-Based Access Control (RBAC) and real JWT integration.
- Robust file upload validation (extensions and file size limits).
- Automated AI mock services.
- Fully automated Complaint tracking and Notification workflow engine.
- MP Dashboard APIs (Insights, Trends, Geo-Hotspots).
- Public Transparency APIs.
- Logging middleware and unified JSON error handling.

---

## Problem Statement

MPs receive thousands of development requests through meetings, letters, WhatsApp, grievance portals, and social media. These requests are scattered, duplicated, and hard to analyze — making it difficult to prioritize where to invest next.

---

## Our Solution

JanVaani AI listens to every citizen, understands their concerns, identifies recurring problems, recommends the highest-impact development projects, and provides complete transparency throughout the process.

---

## Core Loop

```
Citizen Voice → AI Understanding → AI Analysis → Government Decision → Development Work → Public Impact
```

---

## Project Structure

```
janvaani-ai/
│
├── frontend/
│   └── citizen-dashboard/     # React + Tailwind UI (Citizen & MP interfaces)
│
├── backend/                   # FastAPI REST APIs
│
├── ai-engine/                 # Gemini AI, image analysis, voice processing,
│                              # duplicate detection, priority scoring
│
├── database/                  # Firebase/Firestore schema and seed data
│
├── docs/                      # Architecture, API planning, pitch content
│
└── README.md
```

---

## Key Features

- 🎙️ **Voice-First Complaint Registration** — Speak naturally, AI registers the issue
- 📸 **Media Upload** — Photos, voice notes, short videos
- 🤖 **AI Categorization** — Auto-detects complaint type and urgency
- 📊 **AI Priority Scoring** — Transparent, explainable scoring per issue cluster
- 🗺️ **Hotspot Map** — Geospatial view of demand concentration
- 👍 **Community Support** — Upvote existing issues instead of duplicating
- 📋 **MP Dashboard** — Analytics, recommendations, project approval workflow
- 🌐 **"You Said → We Did"** — Public transparency dashboard
- 📱 **SMS Updates** — Automated citizen communication at every stage

---

## Tech Stack (Planned)

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS |
| Backend | FastAPI (Python) |
| AI Engine | Google Gemini API |
| Database | Firebase / Firestore |
| Maps | Google Maps API |
| SMS | Twilio / MSG91 |
| Auth | Firebase Auth |

---

## Competition

**Google Build With AI Competition**
Track 1 – People's Priorities (AI for Constituency Development Planning)

---

*Built with ❤️ to make every citizen's voice matter.*
