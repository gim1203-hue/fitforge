# FitForge

FitForge is a responsive fitness and workout planner built with React. It helps users explore exercises, create custom workout plans, complete guided sessions, track goals, and review workout history.

## Features

- Responsive dashboard with live progress summaries
- Google sign-in with persistent Firebase Authentication sessions
- Private, per-user cloud synchronization with Cloud Firestore
- Searchable and filterable exercise library
- Custom workout builder with validation
- Guided workout sessions and rest timer
- Goal creation and progress tracking
- Persistent workout plans, goals, and history using Firestore with a local fallback
- Accessible navigation, empty states, and invalid-route handling

## Technologies

- React 19
- Vite
- React Router
- JavaScript
- CSS
- Browser Local Storage
- Firebase Hosting
- Firebase Authentication
- Cloud Firestore

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

React Router handles navigation without full page reloads. Firebase Authentication protects the application and restores Google sessions after refreshes. Plans, goals, and history are stored below each authenticated user's UID in Cloud Firestore. Security rules prevent users from reading or changing another user's records, while local storage provides a browser-specific fallback if cloud synchronization is temporarily unavailable.

## Screenshots

Screenshots can be added to a `screenshots` directory after deployment.

## Future improvements

- Progress charts and personal records
- Social workout sharing
- Exercise images and video demonstrations
- AI-assisted workout recommendations

## Author

Built by [gim1203-hue](https://github.com/gim1203-hue).

## Portfolio description

Designed and developed FitForge, a responsive React fitness planner featuring reusable components, routed views, exercise filtering, custom workout creation, guided timers, goal tracking, persistent state, validation, and Firebase deployment.
