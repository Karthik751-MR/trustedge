# TrustEdge

> A security, compliance, and vendor-risk dashboard concept built with Next.js and TypeScript.

TrustEdge presents enterprise risk information through dashboards, compliance-oriented views, vendor risk workflows, and geographic analytics. The project focuses on a modern SaaS-style interface and reusable UI components.

## Features

- Risk and compliance dashboard views
- Vendor/security risk tracking interface
- Geographic security visualization
- Compliance-oriented reporting views
- Responsive dashboard layout
- Accessible component primitives through Radix UI

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Radix UI
- Leaflet

## Project Structure

```text
trustedge/
├── app/ or pages/       # Next.js routes
├── components/          # Reusable UI components
├── public/              # Static assets
├── lib/                 # Utilities/integrations where present
├── package.json
└── README.md
```

Use the existing route/component layout as the source of truth when extending the application.

## Getting Started

```bash
git clone https://github.com/Karthik751-MR/trustedge.git
cd trustedge
npm install
npm run dev
```

Open `http://localhost:3000`.

## Security Note

This is a dashboard/application project, not a substitute for a formal compliance assessment. Keep all secrets and service credentials in environment variables.

## Author

**Karthik Raj M R** — [@Karthik751-MR](https://github.com/Karthik751-MR)