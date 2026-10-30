// DOM-variabler
const attackButtonPokemon1 = document.querySelector('#attackButtonPokemon1');
const attackButtonPokemon2= document.querySelector('#attackButtonPokemon2');
const battleStatusText = document.querySelector('#battleStatusText');
const resetButton = document.querySelector('#resetButton');
const findRandomPokemonButton = document.querySelector('#findRandomPokemonButton');
const pokemon1Title = document.querySelector('#pokemon1Title');
const pokemon2Title = document.querySelector('#pokemon2Title');
const startFightText = document.querySelector('#startFightText');
const specialAttack1Button = document.querySelector('#specialAttack1Button');
const specialAttack2Button = document.querySelector('#specialAttack2Button');
const specialDefence1Button = document.querySelector('#specialDefence1Button');
const specialDefence2Button = document.querySelector('#specialDefence2Button');
const pokemonImage = document.querySelector('#pokemonImage');
const pokemon1Info = document.querySelector('#pokemon1Info');
const pokemon2Info = document.querySelector('#pokemon2Info');


// Render function
const renderBattle = (pokemon1, pokemon2, pokemon1Defence, pokemon2Defence) => {
pokemon1Info.textContent = 
    `Health: ${pokemon1Defence}
     Attack: ${pokemon1.attack}
     Special Defence: ${pokemon1.special_defence}
     Special Attack: ${pokemon1.special_attack}
     Evolution Stage: ${pokemon1.evolution_stage_id}`
pokemon2Info.textContent = 
    `Health: ${pokemon2Defence}
     Attack: ${pokemon2.attack}
     Special Defence: ${pokemon2.special_defence}
     Special Attack: ${pokemon2.special_attack}
     Evolution Stage: ${pokemon2.evolution_stage_id}`
    const battleStatusTextBox = document.createElement('div')
    battleStatusTextBox.textContent = `${pokemon1.name} has ${pokemon1Defence} health back! ${pokemon2.name} has ${pokemon2Defence} health back!`;
    battleStatusText.appendChild(battleStatusTextBox);
}

// Nyt pokemon array
let pokemon = [];

// Apit-fetch Pokemon database
const API_URL = "http://localhost:3000";
fetch (`${API_URL}/`)
    .then(response => response.json())
    .then(data => {
        pokemon = data;


// Globale variabler 
let pokemon1;
let pokemon2;
let pokemon1Defence;
let pokemon2Defence;
let specialAttack1Used = false;
let specialDefence1Used = false;
let specialAttack2Used = false;
let specialDefence2Used = false;

// Disable buttons 1
const disableButtons1 = () => { 
attackButtonPokemon1.disabled = true;
specialDefence1Button.disabled = true;
specialAttack1Button.disabled = true;
attackButtonPokemon2.disabled = false;
specialAttack2Button.disabled = specialAttack2Used;
specialDefence2Button.disabled = specialDefence2Used;
}

// Disabel buttons 2
const disableButtons2 = () => { 
attackButtonPokemon2.disabled = true;
specialDefence2Button.disabled = true;
specialAttack2Button.disabled = true;
attackButtonPokemon1.disabled = false;
specialAttack1Button.disabled = specialAttack1Used;
specialDefence1Button.disabled = specialDefence1Used;
}

// Disable all buttons
const disableAllButtons = () => {
attackButtonPokemon1.disabled = true;
attackButtonPokemon2.disabled = true;
specialAttack1Button.disabled = true;
specialAttack2Button.disabled = true;
specialDefence1Button.disabled = true;
specialDefence2Button.disabled = true;
};


// Find tilfældige pokemon der skal starte
const findRandomPokemon = () => {
let randomNumber1 = Math.floor(Math.random() * pokemon.length);
let randomNumber2 = Math.floor(Math.random() * pokemon.length);
pokemon1 = pokemon[randomNumber1];
pokemon2 = pokemon[randomNumber2];
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
// Start fight button
const startBattle = () => {
findRandomPokemon()
specialAttack1Used = false;
specialAttack2Used = false;
specialDefence1Used = false;
specialDefence2Used = false;
pokemonImage1.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon1.pokedex_number}.png`;
pokemonImage2.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon2.pokedex_number}.png`;
pokemon1Defence = (pokemon1.hp + pokemon1.defence);
pokemon2Defence = (pokemon2.hp + pokemon2.defence);
renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
battleStatusText.replaceChildren();
pokemon1Title.textContent =`${pokemon1.name}`;
pokemon2Title.textContent =`${pokemon2.name}`;
attackButtonPokemon1.disabled = false;
attackButtonPokemon2.disabled = false;
specialDefence1Button.disabled = false;
specialDefence2Button.disabled = false;
specialAttack1Button.disabled = false;
specialAttack2Button.disabled = false;
pokemonImage1.hidden = false;
pokemonImage2.hidden = false;
// Find hvilken pokemon der skal starte
let startTextArray = [`${pokemon1.name} Start!`, `${pokemon2.name} Start!`]
randomNumberStart = Math.floor(Math.random() * startTextArray.length);
startFightText.textContent = startTextArray[randomNumberStart]
// Sluk/tænd hvilke knapper afhængigt af resultat
if (startTextArray[randomNumberStart] === startTextArray[0]) {
    attackButtonPokemon2.disabled = true;
    specialDefence2Button.disabled = true;
    specialAttack2Button.disabled = true;
} else if (startTextArray[randomNumberStart] === startTextArray[1]) {
    attackButtonPokemon1.disabled = true;
    specialDefence1Button.disabled = true;
    specialAttack1Button.disabled = true;
 }
}

// Start battle ved start
startBattle();
findRandomPokemonButton.addEventListener('click', startBattle);


//Attack Pokemon 1
attackButtonPokemon1.addEventListener('click', () => {
    if (pokemon1 === undefined || pokemon2 === undefined) {
        battleStatusText.replaceChildren()
        startFightText.textContent = `Start the fight to begin!`;
    } else if (pokemon2Defence - pokemon1.attack <= 0) {
        battleStatusText.replaceChildren()
        pokemon2Defence = 0;
        renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
        startFightText.textContent = `${pokemon1.name} won the battle!`;
        disableAllButtons();
    } else {
       const battleResultPokemon1 = (pokemon2Defence -= pokemon1.attack)
        battleStatusText.replaceChildren()
        startFightText.textContent = '';
         renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
         // Pokemon 1
         attackButtonPokemon1.disabled = true;
         specialDefence1Button.disabled = true;
         specialAttack1Button.disabled = true;
         // Pokemon 2
         attackButtonPokemon2.disabled = false;
         specialAttack2Button.disabled = specialAttack2Used;
         specialDefence2Button.disabled = specialDefence2Used;
    }
});


// Attack Pokemon 2
attackButtonPokemon2.addEventListener('click', () => {
    if (pokemon1 === undefined || pokemon2 === undefined) {
        battleStatusText.replaceChildren()
        battleStatusText.textContent = `Start the fight to begin!`;
    } else if (pokemon1Defence - pokemon2.attack <= 0) {
        battleStatusText.replaceChildren()
        pokemon1Defence = 0;
        renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
        startFightText.textContent = `${pokemon2.name} won the battle!`;
        disableAllButtons();
    } else {
       const battleResultPokemon2 = (pokemon1Defence -= pokemon2.attack)
        battleStatusText.replaceChildren()
        startFightText.textContent = '';
         renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
         // Pokemon 1
         attackButtonPokemon1.disabled = false;
         specialAttack1Button.disabled = specialAttack1Used;
         specialDefence1Button.disabled = specialDefence1Used;
         // Pokemon 2
         attackButtonPokemon2.disabled = true;
         specialAttack2Button.disabled = true;
         specialDefence2Button.disabled = true;
    }
});

//Special defence button pokemon 1
specialDefence1Button.addEventListener('click', () => {
    specialDefence1Used = true
    startFightText.textContent = '';
    const addSpecialDefence1 = (pokemon1Defence += pokemon1.special_defence)
    disableButtons1();
    battleStatusText.replaceChildren();
    battleStatusText.textContent = `${pokemon1.name} has used Special Defence for ${pokemon1.special_defence} health and now have ${addSpecialDefence1} health!`
    renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
});

//Special defence button pokemon 2
specialDefence2Button.addEventListener('click', () => {
    specialDefence2Used = true
    startFightText.textContent = '';
    const addSpecialDefence2 = (pokemon2Defence += pokemon2.special_defence)
    disableButtons2();
    battleStatusText.replaceChildren();
    battleStatusText.textContent = `${pokemon1.name} has used Special Defence for ${pokemon2.special_defence} health and now have ${addSpecialDefence2} health!`
    renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
});

//Special attack button pokemon 1
specialAttack1Button.addEventListener('click', () => {
    specialAttack1Used = true
    startFightText.textContent = '';
    const pokemonSpecialAttack1 = (pokemon2Defence -= pokemon1.special_attack)
    if (pokemonSpecialAttack1 <= 0) {
        pokemon2Defence = 0;
        renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
        disableAllButtons();
        battleStatusText.replaceChildren()
        startFightText.textContent = `${pokemon1.name} won the battle!`;
    } else {
    specialAttack1Button.disabled = true;
    disableButtons1();
    pokemonSpecialAttack1
    renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
    battleStatusText.replaceChildren();
    battleStatusText.textContent = `${pokemon1.name} used Special Attack for ${pokemonSpecialAttack1} damage! ${pokemon2.name} has ${pokemon2Defence} health back!`;
    }
});
    
//Special attack button pokemon 2
specialAttack2Button.addEventListener('click', () => {
    specialAttack2Used = true
    startFightText.textContent = '';
    const pokemonSpecialAttack2 = (pokemon1Defence -= pokemon2.special_attack)
    if (pokemonSpecialAttack2 <= 0) {
        pokemon1Defence = 0;
        renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
        disableAllButtons();
        battleStatusText.replaceChildren()
        startFightText.textContent = `${pokemon2.name} won the battle!`;
    } else {
    specialAttack2Button.disabled = true;
    disableButtons2();
    pokemonSpecialAttack2
    renderBattle(pokemon1, pokemon2, pokemon1Defence, pokemon2Defence);
    battleStatusText.replaceChildren();
    battleStatusText.textContent = `${pokemon1.name} used Special Attack for ${pokemonSpecialAttack2} damage! ${pokemon1.name} has ${pokemon1Defence} health back!`;
    }
});


//Reset button
resetButton.addEventListener('click', () => {
    battleStatusText.replaceChildren()
    renderBattle;
    location.reload();
    attackButtonPokemon1.disabled = false;
    attackButtonPokemon2.disabled = false;
  })
});
