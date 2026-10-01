# Feedback Desk

A small, clear feedback management system built with plain HTML, CSS, and JavaScript. It needs no build tools or backend.

## Files

- `index.html` — page structure, login form, feedback form, and feedback list.
- `style.css` — all layout, colors, typography, responsive behavior, and animations.
- `script.js` — demo login, local storage, form handling, and feedback rendering.

## Run it

Open `index.html` in a browser, or serve this folder with any simple local web server.

## Demo login

- **Email:** `demo@feedbackdesk.com`
- **Password:** `demo123`

## How it works

1. Sign in with the demo details.
2. Enter a short title and describe your feedback.
3. Select **Send feedback** to add it to the recent notes list.
4. Feedback is saved in the browser's `localStorage`, so it remains after refreshing the page.
5. **Log out** ends the current browser session. **Clear all** removes saved feedback after confirmation.

## Important note

This is a frontend-only demo. The login and feedback are stored locally and are not secure or connected to a real database. Do not use real passwords or private information.