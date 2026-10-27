# Pokédex – Frontend

Midtvejsprojekt, ITA26. Deadline: 2 November at 09:00.

Backend: https://github.com/olde1000/midtvejsprojekt-back

## Who does what

| Page | Folder | Owner | Must have |
|---|---|---|---|
| Pokémon | `pokemon/` | William | List all Pokémon with names and stats; filter by at least 3 criteria (filtering done by the API) |
| Trainers | `trainers/` | Sebastian | List all trainers; show the Pokémon of a selected trainer; create a trainer (POST); add a Pokémon to a trainer (POST) |
| Dashboard | `dashboard/` | Olivier | At least 3 statistics from the API, at least 2 of them as charts (Chart.js) |
| Battle | `battle/` | Thomas | Pick two Pokémon and simulate a battle based on their stats (optional extra) |

## How we work

- Everyone works on `main`. Only change files inside your own folder.
- Commit → pull → push. Always commit before you pull.
- The API runs on `http://localhost:3000` (`API_URL` at the top of each JS file).
