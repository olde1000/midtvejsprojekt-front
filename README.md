# Pokédex – Frontend

Midtvejsprojekt, ITA26. Deadline: 2 November at 09:00.

Backend: https://github.com/olde1000/midtvejsprojekt-back

## Who does what

| Page | Folder | Branch | Owner | Must have |
|---|---|---|---|---|
| Pokémon | `pokemon/` | `pokemon-page` | William | List all Pokémon with names and stats; filter by at least 3 criteria (filtering done by the API) |
| Trainers | `trainers/` | `trainers-page` | Sebastian | List all trainers; show the Pokémon of a selected trainer; create a trainer (POST); add a Pokémon to a trainer (POST) |
| Dashboard | `dashboard/` | `dashboard` | Olivier | At least 3 statistics from the API, at least 2 of them as charts (Chart.js) |
| Battle | `battle/` | `battle-page` | Thomas | Pick two Pokémon and simulate a battle based on their stats (optional extra) |

## How we work

- Work only on your own branch and only inside your own folder.
- Commit and push often.
- When your page is done, open a pull request into `main` on GitHub.
- The API runs on `http://localhost:3000` (`API_URL` at the top of each JS file).
