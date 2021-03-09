const API = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const POKEMONS_TOTALES = 150
const cardsContainer = document.querySelector('.cards-container')

fetch(API)
    .then(response => response.json())
    .then(data => {
        procesarDatos(data)
    })
    .catch(err=>console.log(err))


const procesarDatos = async (data) => {
    try {
        for(let i=0; i<=POKEMONS_TOTALES; i++){
            let nombrePokemon =  data.results[i].name
            await getUrls(data, i, nombrePokemon)
            
        }
    } catch (error) {
        console.error(error)
    }
}


const getUrls = async (data, idPokemon,nombrePokemon) => {
    try {
        const url = await fetch(data.results[idPokemon].url)
        .then(response => response.json())
        .catch(err=>console.log(err))

        crearCards(nombrePokemon, url)
        
    } catch (error) {
        console.error(error)
    }
}

const crearCards = (nombrePokemon, url) => {

    let id = url.id
    let types = url.types.length
    let imgSource = url.sprites.other.dream_world.front_default
    
    
    


    let card = document.createElement('div')
    card.classList.add("card")

    let span = document.createElement('span')
    span.classList.add("pokemon-id")
    span.innerHTML = `#${id}`

    let img = document.createElement('img')
    img.src = imgSource

    let hr = document.createElement('hr')

    let nombre = document.createElement('h4')
    nombre.classList.add("pokemon-name")
    nombre.innerHTML = nombrePokemon
    console.log(nombre)

    let divTypes = document.createElement('div')
    divTypes.classList.add('type-container')

    console.log(cardsContainer)
    cardsContainer.append(card)
    card.append(span)
    card.append(img)
    card.append(hr)
    card.append(nombre)
    card.append(divTypes)


    for (let i = 0; i < types; i++) {
        
        let type = url.types[i].type.name

        let divType
        
        console.log(type)
        switch(type){
            case 'normal': 
                divType = document.createElement('div')
                divType.classList.add('normal')
                divType.innerHTML = 'Normal'
                divTypes.append(divType)
                break;

            case 'fire': 
                divType = document.createElement('div')
                divType.classList.add('fuego')
                divType.innerHTML = 'Fuego'
                divTypes.append(divType)
                break;

            case 'water': 
                divType = document.createElement('div')
                divType.classList.add('agua')
                divType.innerHTML = 'Agua'
                divTypes.append(divType)
                break;
                
            case 'grass': 
                divType = document.createElement('div')
                divType.classList.add('planta')
                divType.innerHTML = 'Planta'
                divTypes.append(divType)
                break;

            case 'electric': 
                divType = document.createElement('div')
                divType.classList.add('electrico')
                divType.innerHTML = 'Electrico'
                divTypes.append(divType)
                break;

            case 'ice': 
                divType = document.createElement('div')
                divType.classList.add('hielo')
                divType.innerHTML = 'Hielo'
                divTypes.append(divType)
                break;

            case 'fighting': 
                divType = document.createElement('div')
                divType.classList.add('lucha')
                divType.innerHTML = 'Lucha'
                divTypes.append(divType)
                break;

            case 'poison': 
                divType = document.createElement('div')
                divType.classList.add('veneno')
                divType.innerHTML = 'Veneno'
                divTypes.append(divType)
                break;

            case 'ground': 
                divType = document.createElement('div')
                divType.classList.add('tierra')
                divType.innerHTML = 'Tierra'
                divTypes.append(divType)
                break;
                
            case 'flying': 
                divType = document.createElement('div')
                divType.classList.add('volador')
                divType.innerHTML = 'Volador'
                divTypes.append(divType)
                break;

            case 'psychic': 
                divType = document.createElement('div')
                divType.classList.add('psiquico')
                divType.innerHTML = 'Psiquico'
                divTypes.append(divType)
                break;

            case 'bug': 
                divType = document.createElement('div')
                divType.classList.add('bicho')
                divType.innerHTML = 'Bicho'
                divTypes.append(divType)
                break;

            case 'rock': 
                divType = document.createElement('div')
                divType.classList.add('roca')
                divType.innerHTML = 'Roca'
                divTypes.append(divType)
                break;
            
            case 'ghost': 
                divType = document.createElement('div')
                divType.classList.add('fantasma')
                divType.innerHTML = 'Fantasma'
                divTypes.append(divType)
                break;
                
            case 'dark': 
                divType = document.createElement('div')
                divType.classList.add('oscuro')
                divType.innerHTML = 'Oscuro'
                divTypes.append(divType)
                break;

            case 'dragon': 
                divType = document.createElement('div')
                divType.classList.add('dragon')
                divType.innerHTML = 'Dragon'
                divTypes.append(divType)
                break;

            case 'acero': 
                divType = document.createElement('div')
                divType.classList.add('acero')
                divType.innerHTML = 'Acero'
                divTypes.append(divType)
                break;

            case 'fairy': 
                divType = document.createElement('div')
                divType.classList.add('hada')
                divType.innerHTML = 'Hada'
                divTypes.append(divType)
                break;
        }
        divType.classList.add('type')
    }
}