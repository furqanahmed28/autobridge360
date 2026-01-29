## AutoBridge360 – Vehicle Import Lifecycle Prototype

This repository contains a **Next.js 14 (App Router)** prototype for **AutoBridge360**, a comprehensive proof-of-capability platform that demonstrates end-to-end vehicle provenance, compliance visibility, AI-assisted document processing, and advanced reporting for UK vehicle imports.

The prototype is optimized for **investor / regulator demos** and **UK Innovator / Founder Visa** evidence, showcasing enterprise-grade security, modern UI/UX, and scalable data architecture. Not for production use.

---

### 1. Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **UI**: React, Tailwind CSS (Modern Gov/FinTech B2B SaaS design system)
- **State Management**: Zustand (authentication, persona switching, global UI state)
- **Animation**: Framer Motion (provenance timeline animations)
- **Charts**: Recharts (Interactive dashboards and risk visualizations)
- **Icons**: Lucide React
- **Authentication**: Custom Zustand-based auth with persistent sessions
- **Backend**: Comprehensive mock data ecosystem (`src/lib/mockData.ts`) – no external APIs or databases required

---

### 2. Core Features Demonstrated

- **Secure Authentication System** – Role-based login with session persistence
- **Provenance Graph™** – Interactive timeline visualization of complete import lifecycle
- **Role-aware Multi-Persona UX** – Dynamic view switching (Importer, Owner, Admin)
- **AI Document Processing Simulation** – Advanced OCR/translation/validation pipeline
- **Adaptive Multi-Sided Risk Score (AMRS)** – Explainable AI risk assessment with visual breakdowns
- **Comprehensive Reporting Suite** – Real-time analytics with interactive charts
- **Expanded Data Model** – Service records, compliance documents, shipment tracking
- **Modern Responsive UI** – Enterprise-grade design with accessibility compliance

---

### 3. Security & Compliance Features

- **Authentication Required** – All routes protected with automatic redirect to login
- **Session Persistence** – Secure login state maintained across browser sessions
- **Role-Based Access Control** – Different data visibility based on user persona
- **Compliance Tracking** – Document management with expiry monitoring
- **Audit Trail** – Complete provenance history for regulatory compliance
- **Data Privacy** – Mock implementation demonstrating GDPR-compliant data handling

---

### 4. Running the Prototype

1. **Install dependencies**

```bash
npm install
```

2. **Run the development server**

```bash
npm run dev
```

3. **Access the application**
   - Open `http://localhost:3000` in your browser
   - **Login Required**: Use credentials `admin` / `password` for demo access
   - No database or external services required – fully offline-capable

---

### 5. Application Usage Guide

#### Initial Access

1. **Login Screen** (`/login`)
   - Enter username: `admin`, password: `password`
   - Session persists across browser restarts
   - Automatic redirect to dashboard upon successful authentication

#### Navigation & Personas

- **Persona Switcher** (top-right header)
  - **Importer**: Full fleet visibility with compliance and risk management tools
  - **Owner**: Simplified "Digital Vehicle Wallet" view for personal vehicles
  - **Admin**: System-wide administrative controls (future expansion)

#### Key Screens

- **Dashboard (`/`)**
  - **Authentication Required** – Protected route with login enforcement
  - Executive metrics: Total Fleet, In Transit/At Port, Compliance Alerts, Average Risk Score
  - **Active Fleet / My Wallet table** with VIN, make/model, status badges, risk scores
  - Real-time compliance monitoring with alert notifications
  - Direct links to detailed vehicle provenance views

- **Reports (`/reports`)**
  - **Authentication Required** – Comprehensive analytics suite
  - **Vehicle Inventory Report**: Make/model distribution, status breakdowns
  - **Compliance Status Report**: Regulatory compliance tracking with visual indicators
  - **Risk Analysis Report**: Risk score distributions and trend analysis
  - **Shipment Tracking Report**: Logistics visibility with timeline correlations
  - Interactive charts powered by Recharts for data exploration

- **Vehicle Detail & Provenance Graph (`/vehicles/[id]`)**
  - **Authentication Required** – Deep-dive vehicle lifecycle analysis
  - Vertical Framer Motion-animated timeline of all lifecycle events
  - Interactive event panels with timestamps, locations, and document links
  - Adaptive Risk Score gauge with detailed breakdown components
  - Service history integration for complete vehicle story

- **AI Document Processing (`/upload`)**
  - **Authentication Required** – Simulated AI pipeline demonstration
  - Drag-and-drop interface for document upload (any file type accepted)
  - Animated processing pipeline: OCR Scanning → Japanese Translation → VIN Verification
  - Pre-filled form generation with editable fields
  - Confidence scoring simulation for AI-assisted data extraction

---

### 6. Data Architecture (Mock Backend)

The prototype includes a comprehensive mock data ecosystem in `src/lib/mockData.ts`:

#### Core Entities

- **Vehicles** (20 seeded vehicles) – Diverse makes/models with realistic import scenarios
  - Risk levels: Low, Medium, High, Pending
  - Status progression: Auction Won → At Port → Customs Clearance → Shipping → Registered
  - Persona-specific visibility controls

- **Provenance Events** – Complete audit trail for each vehicle
  - Auction purchase, export certification, port operations
  - Shipping logistics, UK customs clearance, DVLA registration
  - Service and maintenance events

#### Extended Data Model

- **Service Records** – Maintenance history with costs and mileage tracking
- **Compliance Documents** – Regulatory certificates with expiry monitoring
- **Shipment Details** – Container tracking, vessel information, routing data

#### Data Characteristics

- **Realistic Scale**: 20 vehicles with comprehensive associated data
- **Regulatory Compliance**: IVA requirements, age-based restrictions, documentation standards
- **Performance Optimized**: Fast, deterministic, offline-friendly for demos
- **Extensible**: Easy to add new vehicles, events, or data types

---

### 7. Investor & Regulator Considerations

#### Security Architecture

- **Authentication Layer**: Demonstrates enterprise-grade access control
- **Session Management**: Persistent but secure login state handling
- **Protected Routes**: Automatic redirection and access enforcement
- **Data Isolation**: Role-based data visibility and privacy controls

#### Compliance Readiness

- **Audit Trail**: Complete provenance tracking for regulatory scrutiny
- **Document Management**: Secure handling of compliance certificates
- **Risk Assessment**: Explainable AI scoring for transparency
- **GDPR Alignment**: Data privacy principles in mock implementation

#### Scalability Demonstration

- **Modern Tech Stack**: Next.js 14, TypeScript, React for enterprise development
- **State Management**: Zustand for complex application state
- **UI/UX Standards**: Professional design system with accessibility
- **Data Architecture**: Extensible mock backend showing real-world patterns

---

### 8. Demo Flow (Comprehensive Narrative)

1. **Authentication & Access**
   - Demonstrate secure login process
   - Show session persistence and automatic redirects

2. **Executive Dashboard Overview**
   - Highlight key metrics and compliance alerts
   - Demonstrate persona switching and data visibility changes
   - Show real-time fleet monitoring capabilities

3. **Deep-Dive Vehicle Analysis**
   - Select a vehicle and explore the Provenance Graph timeline
   - Examine event details, document linkages, and risk breakdowns
   - Demonstrate service history integration

4. **Advanced Reporting Suite**
   - Navigate through different report types
   - Interact with charts and data visualizations
   - Show filtering and analysis capabilities

5. **AI-Powered Document Processing**
   - Upload sample documents to demonstrate pipeline
   - Show automated data extraction and form pre-filling
   - Explain confidence scoring and manual override capabilities

6. **Compliance & Security Features**
   - Demonstrate role-based access controls
   - Show compliance document tracking
   - Highlight audit trail completeness

This comprehensive demonstration showcases **enterprise-grade security, modern UX, scalable architecture, and regulatory compliance** – positioning AutoBridge360 as a market-ready solution for the UK vehicle import ecosystem.
