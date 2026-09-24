# CAB432 Task Tracker

A small browser application used as the target repository for a CAB432 Track B repository custodian. The AWS agent is a separate application.

## Run

Open `index.html` in a modern browser. There is no installation or build step. Browser storage behavior for local files can vary; use a local static web server if persistence is unavailable.

## Features

- Add task titles up to 200 characters.
- Mark tasks complete and filter by All, Active, or Completed.
- Delete tasks immediately.
- Keep tasks in this browser using localStorage.

## Limitations

There are no user accounts, cloud sync, due dates, title editing, or undo. Clearing browser storage removes tasks. Duplicate titles are allowed. Do not enter sensitive information.

## Project guide

- `app.js`: task state, rendering, filtering, and persistence.
- `index.html`: interface and styles.
- `docs/architecture.md`: implementation and data model.
- `docs/triage.md`: issue classification guidelines.
- `docs/demo-issues.md`: proposed demonstration issues, not published GitHub issues.
- `docs/manual-checks.md`: browser verification checklist.

The custodian should retrieve this documentation to ground its answers and distinguish implemented behavior from feature requests.
