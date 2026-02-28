# Moto Care

Moto Care is a lightweight motorcycle maintenance tracker that helps you stay on top of service intervals by **km** and/or **time**. It’s designed to be a real, usable app (not a demo), with a deterministic backend so it’s easy to test with Playwright and run via Docker.

## What it does (v1)

- **Garage**
  - Add motorcycles (name/model/year + current odometer in km)
  - Delete motorcycles
  - Open a bike to view its maintenance dashboard

- **Maintenance**
  - Built-in templates (oil, chain, tyres, fluids, etc.)

- **Service logs**
  - Log a service event: "doneAt" (ISO UTC) + "odometerKm"

- **Dashboard reminders (in-app only)**
  - Status: **Overdue / Due now / Due soon / OK**

## Tech stack

- **Frontend:** Vite + Vanilla TypeScript
- **Backend:** Node.js + TypeScript REST API (Express)
- **Database:** SQLite (file-based, mounted as a Docker volume)
- **Docker:** Docker Compose to run the full stack (API + DB) in a reproducible environment for local dev, CI, and deployment-style runs
- **Tests:** Playwright (TypeScript)
