const rock = document.getElementById("rock")
const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")
const btnStart = document.getElementById("btn-start")
const vsLogo = document.getElementById("vs")
const contador = document.getElementById("contador")
const elections = document.getElementById('elections')
const playerQuestion = document.getElementById('playerQuestion')
const botQuestion = document.getElementById('botQuestion')



 
class Juego {
    constructor() {
        this.inicializar()      
    }

    inicializar() {
        this.inicializar = this.inicializar.bind(this)
        this.elegirOpcion = this.elegirOpcion.bind(this)
        this.toggleBtnStart()
        this.toggleImg()
        this.elecciones = {
            rock,
            paper,
            scissors
        }
        this.toggleElecciones()
        this.mostrarAlertaDeInicio()
        this.segundoInicial = 4
        this.eleccionDelJugador
        this.eleccionDelBot
        
    }

    toggleBtnStart() {
        if (btnStart.classList.contains('hide')) {
            btnStart.classList.remove('hide')
        } else {
            btnStart.classList.add('hide')
        }
    }

    toggleElecciones() {
        if (elections.classList.contains('hide')) {
            elections.classList.remove('hide')
            this.agregarEventosClick()
        } else {
            elections.classList.add('hide')
        }
        
    }

    toggleImg(){
        playerQuestion.innerHTML = '<i class="fas fa-question"></i>'
        botQuestion.innerHTML = '<i class="fas fa-question"></i>'
    }

    mostrarAlertaDeInicio() {
        swal('Buena suerte!', 'Iniciemos la partida!', 'info')
        .then(() => {
            this.mostrarContador()
        })
        
        
    }

    mostrarContador() {

        const cuentraAtras = setInterval(() => {
            
            vsLogo.innerHTML = this.segundoInicial
            this.segundoInicial--

            if (this.segundoInicial === -1) {
                clearInterval(cuentraAtras)
                vsLogo.innerHTML = "VS"
                this.crearEleccionDelBot()
            }

        },1000);

    }

    transformarNumeroAImagen(numero) {
        switch(numero) {
            case 0:
                return '<img src="img/rock.png" alt="Rock">' 
            case  1:
                return '<img src="img/paper.png" alt="Paper">'
            case 2:
                return '<img src="img/scissors.png" alt="Scissors">'
        }
    }

    transformarClickAImagen(eleccionDelJugador) {
        switch(eleccionDelJugador) {
            case 'rock':
                return '<img src="img/rock.png" alt="Rock">'
            case  'paper':
                return '<img src="img/paper.png" alt="Paper">'
            case 'scissors':
                return '<img src="img/scissors.png" alt="Scissors">'
        }
    }

    crearEleccionDelBot() {
        this.eleccionDelBot = this.transformarNumeroAImagen(Math.floor(Math.random() * 3))
        this.mostrarEleccionDelBot(this.eleccionDelBot)
    }

    agregarEventosClick() {
        this.elecciones.paper.addEventListener('click', this.elegirOpcion)
        this.elecciones.rock.addEventListener('click', this.elegirOpcion)
        this.elecciones.scissors.addEventListener('click', this.elegirOpcion)
    }

    eliminarEventosClick() {
        this.elecciones.rock.removeEventListener('click', this.elegirOpcion)
        this.elecciones.paper.removeEventListener('click', this.elegirOpcion)
        this.elecciones.scissors.removeEventListener('click', this.elegirOpcion)
    }

    elegirOpcion(ev) {

        this.eleccionDelJugador = this.transformarClickAImagen(ev.target.dataset.election)
        this.eliminarEventosClick()
        
        this.mostrarEleccionDelJugador(this.eleccionDelJugador)

    }

    mostrarEleccionDelJugador(eleccionDelJugador) {
        switch(eleccionDelJugador) {
            case '<img src="img/rock.png" alt="Rock">':
                playerQuestion.innerHTML = eleccionDelJugador
                break;
            case '<img src="img/paper.png" alt="Paper">':
                playerQuestion.innerHTML = eleccionDelJugador
                break;
            case '<img src="img/scissors.png" alt="Scissors">':
                playerQuestion.innerHTML = eleccionDelJugador
                break;
        }
    }

    mostrarEleccionDelBot(eleccionDelBot) {
        switch(eleccionDelBot) {
            case '<img src="img/rock.png" alt="Rock">':
                botQuestion.innerHTML = eleccionDelBot
                this.obtenerResultado(this.eleccionDelJugador, eleccionDelBot)
                break;
            case '<img src="img/paper.png" alt="Paper">':
                botQuestion.innerHTML = eleccionDelBot
                this.obtenerResultado(this.eleccionDelJugador, eleccionDelBot)
                break;
            case '<img src="img/scissors.png" alt="Scissors">':
                botQuestion.innerHTML = eleccionDelBot
                this.obtenerResultado(this.eleccionDelJugador, eleccionDelBot)
                break;
        }
    }

    obtenerResultado(eleccionDelJugador, eleccionDelBot) {
        if(eleccionDelJugador === eleccionDelBot) {
            const resultado = 'empate'
            this.mostrarResultado(resultado)

        } else if(eleccionDelJugador === '<img src="img/rock.png" alt="Rock">' && eleccionDelBot === '<img src="img/scissors.png" alt="Scissors">') {
            const resultado = 'jugador'
            this.mostrarResultado(resultado)

        } else if(eleccionDelJugador === '<img src="img/paper.png" alt="Paper">' && eleccionDelBot === '<img src="img/rock.png" alt="Rock">') {
            const resultado = 'jugador'
            this.mostrarResultado(resultado)

        }else if(eleccionDelJugador === '<img src="img/scissors.png" alt="Scissors">' && eleccionDelBot === '<img src="img/paper.png" alt="Paper">') {
            const resultado = 'jugador'
            this.mostrarResultado(resultado)

        } else if(!eleccionDelJugador) {
            const resultado = false
            this.mostrarResultado(resultado)

        } else {
            const resultado = 'bot'
            this.mostrarResultado(resultado)
        }

        

    }

    mostrarResultado(resultado) {
        switch(resultado) {
            case 'empate':
                setTimeout(() => {
                    swal('WOAH!', 'Has empatado!', 'info')
                    .then(() => {
                        this.toggleElecciones()
                        this.toggleBtnStart()
                    })
                }, 800)
                break;
            case 'jugador':
                setTimeout(() => {
                    swal('Bien jugado!', 'Has ganado!', 'success')
                    .then(() => {
                        this.toggleElecciones()
                        this.toggleBtnStart()
                    })
                }, 800)
                break;
            case 'bot':
                setTimeout(() => {
                    swal('Buen intento!', 'Has perdido!', 'warning')
                    .then(() => {
                        this.toggleElecciones()
                        this.toggleBtnStart()
                    })
                }, 800)
                break;
            case false:
                setTimeout(() => {
                    swal('No has elegido nada', 'Has perdido!', 'warning')
                    .then(() => {
                        this.toggleElecciones()
                        this.toggleBtnStart()
                    })
                }, 800)
                break;
        }
    }

}

function empezarJuego() {
    window.juego = new Juego()
}