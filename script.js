const coresPadrao = ['verde', 'amarelo', 'azul', 'vermelho']
const botoesColoridos = document.querySelectorAll('.game .cores')
let sequenciaDeCoresGeradas = []
let sequenciaDeCoresUsuario = []
let contadorDoTemporizador = 0


function piscaCores(arrayDeCores = sequenciaDeCoresGeradas) {

    contadorDoTemporizador = 0
    rmOrAddEvent('rm')

    let temporizador = setInterval(() => {

        const botaoPiscandoAtual = document.querySelector(`#${arrayDeCores[contadorDoTemporizador]}`)
        botaoPiscandoAtual.classList.add('botaoPiscando')

        contadorDoTemporizador++

        setTimeout(() => {
            botoesColoridos.forEach(item => item.classList.remove('botaoPiscando'))
        }, 900)

        if(contadorDoTemporizador === arrayDeCores.length) {
            clearInterval(temporizador)
            rmOrAddEvent('add')
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

function compararCorClicada() {

    let contadorDeAcertos = 0
    for(let i = 0; i < sequenciaDeCoresUsuario.length; i++) {

        if(sequenciaDeCoresUsuario[i] !== sequenciaDeCoresGeradas[i]) {
            alert('perdeu playboy')
            rmOrAddEvent('rm')
        }

        else if(sequenciaDeCoresUsuario[i] === sequenciaDeCoresGeradas[i]) {
            contadorDeAcertos++
        }
    }

    if(contadorDeAcertos === sequenciaDeCoresGeradas.length) {
        executaSequencia()
    }

}

// function atualizarPontuação()

function rmOrAddEvent(removerOuAdicionar) {
    if(removerOuAdicionar === 'rm') {
        botoesColoridos.forEach(item => item.removeEventListener('click', guardarCorClicada))
        botoesColoridos.forEach(item => item.removeEventListener('click', compararCorClicada))
    }

    else if(removerOuAdicionar === 'add') {
        botoesColoridos.forEach(item => item.addEventListener('click', guardarCorClicada))
        botoesColoridos.forEach(item => item.addEventListener('click', compararCorClicada))
    }
}

function executaSequencia() {
    gerarCorAleatoria()
    sequenciaDeCoresUsuario = []
    piscaCores()
}

function reiniciarJogo() {
    sequenciaDeCoresGeradas = []
    executaSequencia()
}

const botaoComecar = document.querySelector('.centro')
botaoComecar.addEventListener('click', reiniciarJogo)