import "./styles/style.scss";

import { pokemonArray } from "./data/pokemon";
import { Pokemon } from "./data/types";

const cardContainer = document.querySelector(".card-container");
const nameFilterInput = document.getElementById(
  "nameFilter"
) as HTMLInputElement;
const numberFilterInput = document.getElementById(
  "numberFilter"
) as HTMLInputElement;

if (!cardContainer) {
  throw new Error("Issue with query selector");
}

const capitalFirstLetter = (capitalise: string) => {
  return capitalise.charAt(0).toUpperCase() + capitalise.slice(1);
};

const renderPokemonCard = (pokemon: Pokemon) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
      <img class="card__image" src="${pokemon.sprite}" />
    <div class="card__content">
      <h2 class="card__heading">${capitalFirstLetter(pokemon.name)}</h2>
      <p class="card__text">${capitalFirstLetter(pokemon.name)} (#${
    pokemon.id
  }) is a ${pokemon.types.join(" & ")} pokemon.</p>
    </div>
  `;
  cardContainer.appendChild(card);
};

pokemonArray.forEach((pokemon) => renderPokemonCard(pokemon));

// filtering cards
const filteredCards = (filteredPokemon: Pokemon[]) => {
  cardContainer.innerHTML = "";
  filteredPokemon.forEach((pokemon) => renderPokemonCard(pokemon));
};

// filtering by name
if (nameFilterInput) {
  nameFilterInput.addEventListener("input", () => {
    const search = nameFilterInput.value.toLowerCase();
    const filteredPokemon = pokemonArray.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search)
    );
    filteredCards(filteredPokemon);
  });
}

// filtering by number of cards
const getRandomPokemonArray = (numberOfCards: number): Pokemon[] => {
  const randomPokemonArray: Pokemon[] = [];
  for (let i = 0; i < numberOfCards; i++) {
    const randomIndex = Math.floor(Math.random() * pokemonArray.length);
    const randomPokemon = pokemonArray[randomIndex];
    randomPokemonArray.push(randomPokemon);
  }
  return randomPokemonArray;
};

if (numberFilterInput) {
  numberFilterInput.addEventListener("input", () => {
    const numberOfCards = parseInt(numberFilterInput.value);
    if (numberOfCards) {
      const randomPokemonArray = getRandomPokemonArray(numberOfCards);
      filteredCards(randomPokemonArray);
    } else {
      filteredCards(pokemonArray);
    }
  });
}
