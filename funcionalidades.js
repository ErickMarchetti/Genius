const coresPadrao = ['verde', 'amarelo', 'azul', 'vermelho']
const botoesColoridos = document.querySelectorAll('.game .cores')
let sequenciaDeCoresGeradas = []
let sequenciaDeCoresUsuario = []
let contadorDoTemporizador = 0
let Pontuacao = 0





function piscaCores(arrayDeCores = sequenciaDeCoresGeradas) {

    contadorDoTemporizador = 0
    rmOrAddEvent('rm')

    let temporizador = setInterval(() => {
        frase.innerHTML = "Atenção na sequência"

        const botaoPiscandoAtual = document.querySelector(`#${arrayDeCores[contadorDoTemporizador]}`)
        botaoPiscandoAtual.classList.add('botaoPiscando')

        contadorDoTemporizador++

        setTimeout(() => {
            botoesColoridos.forEach(item => item.classList.remove('botaoPiscando'))
        }, 500)

        if(contadorDoTemporizador === arrayDeCores.length) {
            clearInterval(temporizador)
            setTimeout(() => {
                rmOrAddEvent('add')
                frase.innerText = 'Sua vez'
            }, 900)
        }

    }, 900)

}



function gerarCorAleatoria() {
    const indexRandom = Math.floor(Math.random() * 4)
    sequenciaDeCoresGeradas.push(coresPadrao[indexRandom])
}



function guardarCorClicada(event) {

    event.stopPropagation()

    const idBotaoClicadoAtual = event.target.id

    sequenciaDeCoresUsuario.push(idBotaoClicadoAtual)

}



function compararCorClicada() {

   let  contadorDeAcertos = 0
    for (let i = 0; i < sequenciaDeCoresUsuario.length; i++) {
        

        if(sequenciaDeCoresUsuario[i] !== sequenciaDeCoresGeradas[i]) {
            frase.innerHTML = "Não foi dessa vez, tente novamente!"
            frase.classList.add('animacaoDerrota')
            botaoComecar.innerHTML = "JOGAR NOVAMENTE"
            rmOrAddEvent('rm')
        }

        else if (sequenciaDeCoresUsuario[i] === sequenciaDeCoresGeradas[i]) {
            contadorDeAcertos++ 
        }
    }

    if (contadorDeAcertos === sequenciaDeCoresGeradas.length) {

        Pontuacao++

        pontos.innerText = Pontuacao

        if(Pontuacao === 1) {
            rmOrAddEvent('rm')
            frase.innerText = 'VITÓRIA'
            frase.classList.add('animacaoVitoria')
            botaoComecar.innerText = 'JOGAR NOVAMENTE'
        }

        else {
            frase.innerHTML = "Acertou!"
            executaSequencia()
        }
        
    }
}



function rmOrAddEvent(removerOuAdicionar) {
    if(removerOuAdicionar === 'rm') {
        botoesColoridos.forEach(item => item.removeEventListener('click', guardarCorClicada))
        botoesColoridos.forEach(item => item.removeEventListener('click', compararCorClicada))
        botoesColoridos.forEach(item => item.classList.remove('botao'))
    }

    else if(removerOuAdicionar === 'add') {
        botoesColoridos.forEach(item => item.addEventListener('click', guardarCorClicada))
        botoesColoridos.forEach(item => item.addEventListener('click', compararCorClicada))
        botoesColoridos.forEach(item => item.classList.add('botao'))
    }
}



let pontos = document.querySelector(".score .pontos")
let frase = document.querySelector(".frase")


function executaSequencia() {
    gerarCorAleatoria()
    sequenciaDeCoresUsuario = []
    piscaCores()
}


function reiniciarJogo() {
    Pontuacao = 0
    pontos.innerHTML = Pontuacao 
    botaoComecar.innerHTML = "INICIAR"
    frase.innerHTML = "Atenção na sequência"
    sequenciaDeCoresGeradas = []
    frase.classList.remove('animacaoDerrota')
    frase.classList.remove('animacaoVitoria')
    executaSequencia()
}



const botaoComecar = document.querySelector('.centro')
botaoComecar.addEventListener('click', reiniciarJogo)



    

