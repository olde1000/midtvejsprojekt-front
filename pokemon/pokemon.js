const API_URL = "http://localhost:3000";

// Search function.
async function searchPokemon() {
    const name = document.getElementById("pokemonSearch").value.trim();
    const type = document.getElementById("pokemonType").value;
    const evolution = document.getElementById("pokemonEvolution").value;
    const resultsDiv = document.getElementById("searchResults");

    resultsDiv.textContent = "Searching...";

    try {
        let url;

        // Get Pokemon from database.
        if (type) {
            url = `${API_URL}/pokemon/type/${encodeURIComponent(type)}`;
        } else if (name) {
            url = `${API_URL}/pokemon/search?name=${encodeURIComponent(name)}`;
        } else {
            url = `${API_URL}/pokemon`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Search failed: " + response.status);
        }

        let data = await response.json();

        // Filter by name
        if (name && type) {
            data = data.filter(pokemon =>
                pokemon.name &&
                pokemon.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        // Filter evolution stage.
        if (evolution !== "") {
            if (evolution === "null") {
                data = data.filter(pokemon =>
                    pokemon.evolution_stage_id === null ||
                    pokemon.evolution_stage_id === undefined
                );
            } else {
                data = data.filter(pokemon =>
                    String(pokemon.evolution_stage_id) === evolution
                );
            }
        }

        resultsDiv.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
            resultsDiv.textContent = "No Pokemon found.";
            return;
        }

        // Card for each Pokemon.
        data.forEach(pokemon => {
            const card = document.createElement("div");
            card.className = "pokemon-card";

            const heading = document.createElement("h2");
            heading.textContent = pokemon.name;
            card.appendChild(heading);

            const fields = [
                ["Pokedex Number", "pokedex_number"],
                ["HP", "hp"],
                ["Attack", "attack"],
                ["Special Defence", "special_defence"],
                ["Special Attack", "special_attack"],
                ["Defence", "defence"],
                ["Speed", "speed"],
                ["Primary Type", "primary_type"],
                ["Secondary Type", "secondary_type"],
                ["Evolution Stage", "evolution_stage_id"]
            ];

            const list = document.createElement("ul");

            fields.forEach(([label, key]) => {
                const item = document.createElement("li");

                item.textContent =
                    `${label}: ${pokemon[key] ?? "None"}`;

                list.appendChild(item);
            });

            card.appendChild(list);
            resultsDiv.appendChild(card);
        });

    } catch (error) {
        console.error(error);

        resultsDiv.textContent =
            "Could not retrieve Pokemon. Check that the server and database are running.";
    }
}




