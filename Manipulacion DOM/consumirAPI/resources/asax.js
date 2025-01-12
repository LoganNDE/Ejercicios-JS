mainContainer = document.querySelector(".container");

let card = document.createElement('div');
card.classList.add("card");

let image = document.createElement('img');
image.classList.add('card-img-top');
console.log(responsePokemonJSON['sprites']);

card.appendChild(image);


let pokemonName = document.createElement('h5');
pokemonName.classList.add('card-title');
pokemonName.innerText = pokemon['name'];
card.appendChild(pokemonName);

mainContainer.appendChild(card)