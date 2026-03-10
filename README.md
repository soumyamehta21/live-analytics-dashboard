# Live Analytics Dashboard

A production-style live analytics dashboard built with React, TypeScript, Redux Toolkit, Tailwind CSS, and Recharts.

## Live demo

- https://soumyamehta21.github.io/live-analytics-dashboard/

## What I built

This project is a frontend-only real-time analytics experience designed for an interview assignment. The dashboard simulates live business metrics and presents them in a clean, responsive admin layout.

### Core features

- Real-time metric updates for visitors, revenue, orders, and conversion rate
- Live traffic and revenue charts powered by Recharts
- Pause/resume controls for the live feed
- Responsive dashboard layout with sidebar and top navigation
- Dark/light theme toggle with persistence
- Language switcher with persisted selection
- Date-range picker for dashboard exploration
- Recent activity table for transaction-style updates
- GitHub Pages deployment support

## Tech stack

- React + Vite
- TypeScript
- Redux Toolkit + React Redux
- Tailwind CSS
- Recharts
- Radix UI Popover
- react-i18next
- react-day-picker
- react-icons

## Project structure

- `src/pages` – top-level screens
- `src/components/layout` – shell components such as sidebar and topbar
- `src/components/dashboard` – dashboard widgets/cards/table
- `src/components/charts` – chart visualizations
- `src/components/ui` – reusable UI primitives like popover, language dropdown, and date picker
- `src/redux` – store and analytics slice
- `src/hooks` – theme and live analytics behavior

## Key implementation decisions

### 1. Mock live analytics instead of a backend

The assignment does not require a backend, so I used a timed client-side update loop to simulate a streaming analytics feed. This keeps the app easy to run while still demonstrating real-time UX.

### 2. Redux Toolkit for dashboard state

Redux Toolkit keeps the analytics state predictable and makes the live updates easy to manage as the dashboard grows.

### 3. Tailwind CSS for fast UI iteration

Tailwind was used to quickly build a polished admin-style interface with responsive behavior and dark mode support.

### 4. Recharts for data visualization

Recharts provides accessible, responsive chart primitives that work well for dashboard use cases.

## Running locally

Install dependencies and start the development server:

- `npm install`
- `npm run dev`

For a production build:

- `npm run build`
- `npm run preview`

## Deployment

GitHub Pages deployment is configured in `package.json`.

- `npm run predeploy`
- `npm run deploy`

## What I would improve with more time

- Connect the date picker to actual filtering logic
- Add richer KPI cards such as session duration, retention, and traffic source breakdowns
- Add automated unit/component tests
- Introduce a mock API layer for more realistic data scenarios
- Add skeleton loading states and richer empty states

## Notes

This app is intentionally backend-free and uses mock live data so it can be run with standard frontend setup commands.
