# Job Application Tracker (React + Vite)

A simple job application tracking app built with **React** and **Vite**. Track applications, manage statuses, search/filter, and view basic analytics.

## Features

- Add and manage job applications
- Status workflow (e.g. applied/interview/offer/rejected)
- Search + filters
- Analytics dashboard with charts
- Local persistence (uses browser storage)
- Responsive UI

## Tech Stack

- React 19 + Vite
- React Router
- Tailwind CSS
- Recharts (charts)
- React Hook Form + Yup (forms & validation)
- Axios

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

- `src/pages` — route pages (Dashboard, Applications, Analytics, Add Application)
- `src/components` — UI components (cards, filters, charts, navbar)
- `src/context` — global application state
- `src/hooks` — reusable hooks (debounce, localStorage, data)
- `src/services` — API helpers
- `src/utils` — helper utilities

## Notes

- Data persistence is handled in the browser (local storage). Clearing site data will reset the app.

## License

MIT
