## AutoBridge360 – Vehicle Import Lifecycle Prototype

This repository contains a **Next.js 14 (App Router)** prototype for **AutoBridge360**, a proof-of-capability platform that demonstrates end‑to‑end vehicle provenance, compliance visibility, and AI‑assisted document processing for UK vehicle imports.

The prototype is optimised for **investor / regulator demos** and **UK Innovator / Founder Visa** evidence, not for production use.

---

### 1. Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **UI**: React, Tailwind CSS (Gov/FinTech style B2B SaaS)
- **State Management**: Zustand (persona switcher / global UI state)
- **Animation**: Framer Motion (provenance timeline line draw)
- **Charts**: Recharts (Adaptive Risk Score gauge)
- **Icons**: Lucide React
- **Backend**: Mock data only (`src/lib/mockData.ts`) – no external APIs or DB required

---

### 2. Core Concepts Demonstrated

- **Provenance Graph™** – timeline view of auction → export → shipping → UK arrival → DVLA registration.
- **Role‑aware UX** – `View As` persona switcher (Importer vs Owner) changes data visibility.
- **AI Document Simulation** – drag‑and‑drop document upload with simulated OCR / translation / validation pipeline.
- **Adaptive Multi‑Sided Risk Score (AMRS)** – radial gauge with rule‑based, explainable breakdown.

---

### 3. Running the Prototype

1. **Install dependencies**

```bash
npm install
```

2. **Run the dev server**

```bash
npm run dev
```

3. Open `http://localhost:3000` in your browser.

No database or external services are required – everything runs locally with mock data.

---

### 4. Key Screens

- **Dashboard (`/`)**
  - Metric cards: Total Fleet, In Transit / At Port, Compliance Alerts, Average Risk Score.
  - **Active Fleet / My Wallet table** with VIN, make/model, status badges, risk and deep‑link to the provenance timeline.
  - Persona switcher (`Importer` vs `Owner`) in the header:
    - **Importer**: sees all vehicles, risk, and compliance‑oriented labels.
    - **Owner**: sees a simplified “Digital Vehicle Wallet” view for their car.

- **Vehicle Detail & Provenance Graph (`/vehicles/[id]`)**
  - Vertical **Framer Motion‑animated** timeline of lifecycle events.
  - Clicking an event opens a **side panel** with timestamp, location, status and a mock PDF document link.
  - Adaptive Risk Score gauge and risk breakdown (e.g. chassis match vs age‑based IVA requirement).

- **AI Document Processing Simulation (`/upload`)**
  - Drag & drop upload panel (any file).
  - Animated pipeline:
    - **OCR Scanning → Translating Japanese → Verifying VIN & Consistency**.
  - After a few seconds, shows a **success state** and a **pre‑filled form** with:
    - Chassis / VIN, Auction Grade, Mileage, Exporter Name (all editable).
  - This demonstrates the intended behaviour of the AI pipeline without requiring real OCR.

---

### 5. Data Model (Mock Backend)

All demo data lives in `src/lib/mockData.ts`:

- **Vehicles** – seeded with 5 specific cars:
  - 2022 Toyota Harrier – At Port (Nagoya), Low risk.
  - 2018 Nissan Note e‑Power – Customs Clearance, Medium risk (documentation alert).
  - 2015 Honda Vezel – Shipping, Low risk.
  - 2012 Subaru Impreza – Registered, High risk (age / IVA compliance).
  - 2024 Suzuki Swift – Auction Won, Risk Pending.
- **Provenance Events** – auction, export certificate, port drop‑off, vessel departure, UK arrival, customs payment, DVLA registration and service‑style events where relevant.

This “mock backend” is intentionally simple to keep the demo **fast, deterministic and offline‑friendly**.

---

### 6. Demo Flow (Suggested Narrative)

1. **Start on Dashboard**
   - Show fleet metrics and highlight compliance alerts.
   - Point out persona switcher and the contrast between Importer / Owner views.
2. **Open a vehicle (e.g. 2022 Toyota Harrier)**
   - Walk through the Provenance Graph timeline and side panel event metadata.
   - Highlight risk score, explainability and document linkage.
3. **Upload a sample export certificate or auction sheet**
   - Use `/upload` to demonstrate the AI pipeline animation.
   - Show the pre‑filled structured data and explain how confidence scores and manual corrections would work in production.

This end‑to‑end story demonstrates **continuity from auction to ownership, automated data capture, and explainable risk** – matching the Innovator Visa prototype requirements.

