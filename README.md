# FitForge

FitForge is a responsive fitness and workout planner built with React. It helps users explore exercises, create custom workout plans, complete guided sessions, track goals, and review workout history.

## Features

- Responsive dashboard with live progress summaries
- Searchable and filterable exercise library
- Custom workout builder with validation
- Guided workout sessions and rest timer
- Goal creation and progress tracking
- Persistent workout plans, goals, and history using local storage
- Accessible navigation, empty states, and invalid-route handling

## Technologies

- React 19
- Vite
- React Router
- JavaScript
- CSS
- Browser Local Storage
- Firebase Hosting

## Installation

```bash
git clone https://github.com/gim1203-hue/fitforge.git
cd fitforge
npm install
```

## Running locally

```bash
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Project structure

```text
src/
├── components/     Reusable interface components
├── context/        Shared workout state provider
├── data/           Exercise seed data
├── hooks/          Reusable React hooks
├── pages/          Routed application views
├── App.jsx         Application routes and layout
└── main.jsx        React entry point
```

## How it works

React Router handles navigation without full page reloads. A Context provider shares plans, goals, and history across the application. Changes are synchronized to browser local storage so they remain available after a refresh.

## Screenshots

Screenshots can be added to a `screenshots` directory after deployment.

## Future improvements

- Firebase Authentication and cloud data synchronization
- Progress charts and personal records
- Social workout sharing
- Exercise images and video demonstrations
- AI-assisted workout recommendations

## Author

Built by [gim1203-hue](https://github.com/gim1203-hue).

## Portfolio description

Designed and developed FitForge, a responsive React fitness planner featuring reusable components, routed views, exercise filtering, custom workout creation, guided timers, goal tracking, persistent state, validation, and Firebase deployment.
