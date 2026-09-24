# Application architecture

The task tracker is a static browser application. It has no backend, API, authentication, or external dependencies. Its state lives in the `tasks` array in app.js and is persisted as JSON under the localStorage key `cab432-task-tracker-v1`.

Each task has a string `id`, a string `title`, and a boolean `completed`. IDs are generated with crypto.randomUUID. Titles are trimmed and limited to 200 characters by the form. The display uses textContent so task titles are not interpreted as HTML.

The filter changes which tasks are displayed without deleting stored tasks. The chosen filter is not persisted. Deleting a task immediately saves the shortened list. No recovery mechanism exists.

On loading invalid saved data, the application starts with an empty in-memory list and displays a warning. The next modification overwrites the saved value. If writes fail, tasks remain available in memory and the interface warns that changes will be lost.

The AWS repository custodian is separate from this application. Future agent implementation must not be described as already deployed.
