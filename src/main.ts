import "./styles/style.scss";

import { pokemonArray } from "./data/pokemon";
import { Pokemon } from "./data/types";

const cardContainer = document.querySelector(".card-container");
const nameFilterInput = document.getElementById(
  "nameFilter"
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

// filtering by name
const nameFilteredCards = (filteredPokemon: Pokemon[]) => {
  cardContainer.innerHTML = "";
  filteredPokemon.forEach((pokemon) => renderPokemonCard(pokemon));
};

if (nameFilterInput) {
  nameFilterInput.addEventListener("input", () => {
    const search = nameFilterInput.value.toLowerCase();
    const filteredPokemon = pokemonArray.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search)
    );
    nameFilteredCards(filteredPokemon);
  });
}
