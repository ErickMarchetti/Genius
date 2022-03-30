const coresPadrao = ['verde', 'amarelo', 'azul', 'vermelho']
const botoesColoridos = document.querySelectorAll('.game .cores')
let sequenciaDeCoresGeradas = []
let sequenciaDeCoresUsuario = []
let contadorDoTemporizador = 0


function piscaCores(arrayDeCores = sequenciaDeCoresGeradas) {

    contadorDoTemporizador = 0
    botoesColoridos.forEach(item => item.removeEventListener('click', guardarCorClicada))

    let temporizador = setInterval(() => {

        const botaoPiscandoAtual = document.querySelector(`#${arrayDeCores[contadorDoTemporizador]}`)
        botaoPiscandoAtual.classList.add('botaoPiscando')

        contadorDoTemporizador++

        setTimeout(() => {
            botoesColoridos.forEach(item => item.classList.remove('botaoPiscando'))
        }, 900)

        if(contadorDoTemporizador === arrayDeCores.length) {
            clearInterval(temporizador)
            botoesColoridos.forEach(item => item.addEventListener('click', guardarCorClicada))
        }

    }, 1200)

}

function gerarCorAleatoria() {
    const indexRandom = Math.floor(Math.random() * 4)
    sequenciaDeCoresGeradas.push(coresPadrao[indexRandom])
}

function guardarCorClicada(event) {

    event.stopPropagation()

    const botaoClicadoAtual = event.target.id

    sequenciaDeCoresUsuario.push(botaoClicadoAtual)

}

// function compararCorClicada()

// function atualizarPontuação()

function executaSequencia() {

    gerarCorAleatoria()

    piscaCores()

}