//Inicializo variables globales
const API = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const POKEMONS_TOTALES = 150
const cardsContainer = document.querySelector('.cards-container')
const typeNames = ['normal','fire','water','grass','electric','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dark','dragon','steel','fairy']

//hacemos peticiones fetch
fetch(API)
    .then(response => response.json())
    .then(data => {
        //Mandamos data a otra funcion
        procesarDatos(data)
    })
    .catch(err=>console.log(err))

//Hacemos la iteracion de todos los pokemons, sacando el id, pasamos la data, id y nombre a una funcion
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

//Conseguimos las url del api de todos los pokemons y pasamos a otra funcion el nombre y el url
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

// Por ultimo, creamos las cards en esta funcion
const crearCards = (nombrePokemon, url) => {

    //Inicializamos las variables del id, el numero de tipos, y la imagen de cada pokemon
    let id = url.id
    let types = url.types.length
    let imgSource = url.sprites.other.dream_world.front_default
    
    
    

    //Creamos los elementos html y le ponemos su clase correspondiente
    //Al span y al nombre le ponemos el texto que debe llevar (id y nombre)
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

    let divTypes = document.createElement('div')
    divTypes.classList.add('type-container')

    //Empezamos a meter los elementos a los contenedores, cardsContainer es contenedor principal, ahi metemos la card
    //Todo lo demas va dentro de card

    cardsContainer.append(card)
    card.append(span)
    card.append(img)
    card.append(hr)
    card.append(nombre)
    card.append(divTypes)

    //Por ulitmo, hacemos un for para iterar todos los tipos del pokemon

    

    for (let i = 0; i < types; i++) {
        let type = url.types[i].type.name
        let divType
        
        for (let i = 0; i < typeNames.length; i++) {
            if (type === typeNames[i]) {
                divType = document.createElement('div')
                divType.classList.add(typeNames[i])
                divType.innerHTML = `${typeNames[i].charAt(0).toUpperCase()}${typeNames[i].slice(1)}`
                divTypes.append(divType)
            }
            
        }
        //Por ultimo, a todos los divs le ponemos la clase type
        divType.classList.add('type')
    }
}