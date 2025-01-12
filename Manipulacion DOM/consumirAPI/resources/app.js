window.onload = () =>{
    console.log("Hola mundo")
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=8', true);

    xhr.onreadystatechange = () =>{
        if (xhr.readyState === 4 && xhr.status === 200){
            let response = xhr.responseText
            let responseJSON = JSON.parse(response);
            mainContainer = document.querySelector(".container");

            let gridParent = document.createElement("div");
            gridParent.classList.add('grid');
            mainContainer.appendChild(gridParent);

            responseJSON.results.forEach(pokemon => {
                let xhrPokemon = new XMLHttpRequest();
                xhrPokemon.open('GET', `https://pokeapi.co/api/v2/pokemon/${pokemon['name']}`, true);

                xhrPokemon.onreadystatechange = () =>{
                    if (xhrPokemon.readyState === 4 && xhrPokemon.status === 200){
                        let response = xhrPokemon.responseText
                        let responsePokemonJSON = JSON.parse(response);
                        mainContainer = document.querySelector(".container");

                        let card = document.createElement('div');
                        card.classList.add("card");

                        let pokemonName = document.createElement('h5');
                        pokemonName.classList.add('cardTitle');
                        pokemonName.innerText = pokemon['name'];
                        card.appendChild(pokemonName);
                        
                        let containerImage = document.createElement('div');
                        containerImage.classList.add('containerImg')
                        let image = document.createElement('img');
                        image.classList.add('cardImg');
                        image.setAttribute('src', responsePokemonJSON.sprites.other.dream_world.front_default)
                        containerImage.appendChild(image);
                        card.appendChild(containerImage);
        
                        gridParent.appendChild(card)
                    }
                }
                xhrPokemon.send();
            });


        }
    }
    xhr.send();
}