window.onload = () =>{
    let shortBtn = document.querySelector(".cambiarOrden");
    let previousPage = document.querySelector(".btnPrevious");
    let nextPage = document.querySelector(".btnNext");
    let pokemonList = [];
    let limit = 12;
    let currentPage = 1;
    let maxPages = 0


    getData = (offset = 0) =>{
        pokemonList = [];
        xhr = new XMLHttpRequest();
        xhr.open('GET', `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, true);
    
        xhr.onreadystatechange = () =>{
            if (xhr.readyState === 4 && xhr.status === 200){
                let response = xhr.responseText
                let responseJSON = JSON.parse(response);
                maxPages = Math.floor(responseJSON.count/limit);
    
    
                responseJSON.results.forEach(pokemon => {
                    let xhrPokemon = new XMLHttpRequest();
                    xhrPokemon.open('GET', `https://pokeapi.co/api/v2/pokemon/${pokemon['name']}`, true);
    
                    xhrPokemon.onreadystatechange = () =>{
                        if (xhrPokemon.readyState === 4 && xhrPokemon.status === 200){
                            let response = xhrPokemon.responseText
                            let responsePokemonJSON = JSON.parse(response);
                            pokemonList.push(responsePokemonJSON);
                            
                            if (pokemonList.length === limit){
                                pokemonList = pokemonList.sort((a, b) => a.id - b.id);
                                showPokemons(pokemonList);
                            }
                                                       
                        }
                    }
                    xhrPokemon.send();
                });
    
            }
        }
        xhr.send();
    }

    getData();

    showPokemons = (pokemons = pokemonList) =>{

        mainContainer = document.querySelector(".container");
        let gridParent = document.createElement("div");
        gridParent.classList.add('grid');
        mainContainer.appendChild(gridParent);
        mainContainer = document.querySelector(".container");
        
        pokemons.forEach(pokemon => {
        let card = document.createElement('div');
        card.classList.add("card");
        
        let containerImage = document.createElement('div');
        containerImage.classList.add('containerImg')
        let image = document.createElement('img');
        image.classList.add('cardImg');
        image.setAttribute('src', pokemon.sprites.other['official-artwork'].front_shiny)
        containerImage.appendChild(image);
        card.appendChild(containerImage);

        
        let nameContainer = document.createElement('div');
        nameContainer.classList.add('containerName')

        let pokemonName = document.createElement('h5');
        pokemonName.classList.add('cardTitle');
        pokemonName.innerText = pokemon['name'];

        let idPokemon = document.createElement('span');
        idPokemon.classList.add("idPokemon");
        idPokemon.innerText = '#' + pokemon.id.toString().padStart(4, '0');
        
        nameContainer.appendChild(pokemonName);
        nameContainer.appendChild(idPokemon);
        
        card.appendChild(nameContainer);        
        gridParent.appendChild(card)
        });
    
    }
    

    deleteDOMContent = () =>{
        let grid = document.querySelector('.grid');
        if (grid){
            grid.remove();
        }
    }


    shortInfo = () =>{
        deleteDOMContent();
        pokemonListOrdenado = pokemonList.sort((a, b) => b.id - a.id);
        console.log('orden cambiado');
        mostrarInformacion(pokemonListOrdenado);
    }

    changeNextPage = () =>{
        let grid = document.querySelector('.grid');
        if (currentPage < maxPages && grid){
            offset = currentPage*limit
            deleteDOMContent();
            getData(offset);
            currentPage++;
        }
    }

    changePreviousPage = () =>{
        let grid = document.querySelector('.grid');
        if (currentPage > 1 && grid){
            console.log(currentPage)
            currentPage--;
            offset = (currentPage*limit) - limit
            deleteDOMContent();
            getData(offset);
        }
    }


    shortBtn.addEventListener('click', shortInfo);
    nextPage.addEventListener('click', changeNextPage);
    previousPage.addEventListener('click', changePreviousPage)

}