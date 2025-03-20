const width = { min: 375, max: 600 } // Define os limites de largura do input
let falando = false // Indica se o sistema está falando
let idioma = 'pt-BR' // Define o idioma padrão
const bandeiras = document.querySelectorAll('.bandeiras') // Seleciona todas as bandeiras
const inp_texto = document.querySelector('#inp-texto') // Seleciona o input de texto
inp_texto.style.width = `${width.min}px` // Define a largura inicial do input
const painel = document.querySelector("#painel") // Seleciona o painel onde o texto será exibido

const init = () => {
    aminacao() // Aplica animações iniciais
    bandeiras[0].classList.add('selectIdioma') // Seleciona o idioma padrão
    inp_texto.focus() // Foca no input de texto
    checkWidth() // Ajusta a largura do input
}

const clickEnter = () => {
    if (inp_texto.value.trim()) {
        statusFalando(true) // Atualiza o status para "falando"
        const texto = inp_texto.value.trim()
        painel.textContent = texto.toUpperCase() // Exibe o texto no painel em maiúsculas
        inp_texto.value = '' // Limpa o input
        inp_texto.focus() // Foca novamente no input
        falar(texto) // Inicia a fala do texto
    }
    aminacao() // Aplica animações
    checkWidth() // Ajusta a largura do input
}

const onPainel = () => {
    const texto = painel.textContent

    if (!falando) {
        statusFalando(true) // Atualiza o status para "falando"
        falar(texto) // Fala o texto do painel
    }
}

// Ajusta a largura do input ao digitar
inp_texto.addEventListener('input', () => checkWidth())

// Ajusta a largura do input ao redimensionar a janela
window.addEventListener('resize', () => checkWidth())

const checkWidth = () => {
    const string_width = inp_texto.value.length * 20 // Calcula a largura do texto digitado
    const box_painel = document.querySelector("#box-painel") // Seleciona o painel externo

    if (window.innerWidth <= width.min + 50) {
        inp_texto.style.width = `${window.innerWidth -20}px`
        box_painel.style = "justify-content: flex-start;"
    }
    else if (string_width >= width.min && string_width <= width.max) {
        inp_texto.style.width = `${string_width}px`
        box_painel.style = "justify-content: center;"
    }
    else if (string_width > width.max) {
        inp_texto.style.width = `${width.max}px`
        box_painel.style = "justify-content: center;"
    }
    else if (string_width < parseInt(width.min)) {
        inp_texto.style.width = `${width.min}px`
        box_painel.style = "justify-content: center;"
    }
}

const aminacao = () => {
    const img_gif = document.querySelector('#img-gif') // Seleciona a imagem GIF
    const box_painel = document.querySelector('#box-painel') // Seleciona o painel externo
    if (painel.textContent === "") {
        img_gif.style.display = "block" // Mostra o GIF se não houver texto no painel
        box_painel.style = 'overflow-y: hidden;'
    } else {
        img_gif.style.display = "none" // Oculta o GIF quando houver texto
        box_painel.style = 'overflow-y: auto;'
    }
}

const limpar = () => {
    inp_texto.value = '' // Limpa o input
    painel.textContent = '' // Limpa o painel
    inp_texto.focus() // Foca no input
    aminacao() // Aplica animações
}

// Captura eventos do teclado para ativar funções específicas
document.querySelector('body').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !falando) {
        inp_texto.style.width = `${width.min}px`
        clickEnter() // Aciona o evento de "Enter"
    } else if (e.key === 'Delete' && !falando) {
        inp_texto.style.width = `${width.min}px`
        limpar() // Aciona a função de limpar
    }
})

// Mantém o foco no input ao clicar na tela
document.querySelector('body').addEventListener('click', (e) => {
    inp_texto.focus()
})

const falar = (texto) => {
    const utterance = new SpeechSynthesisUtterance(texto) // Cria a fala do texto
    utterance.lang = idioma // Define o idioma
    utterance.rate = 1 // Define a velocidade
    utterance.pitch = 1 // Define o tom
    utterance.volume = 1 // Define o volume

    utterance.onend = () => {
        statusFalando(false) // Atualiza o status após a fala
    }

    window.speechSynthesis.speak(utterance) // Executa a fala
}

const pararFala = () => {
    window.speechSynthesis.cancel(); // Para a fala
    statusFalando(false)
};

const statusFalando = (status) => {
    const btn_falar = document.querySelector("#btn-falar")
    const btn_limpar = document.querySelector("#btn-limpar")
    const box_fone = document.querySelector("#box-fone")
    const pare = document.querySelector("#box-pare")
    if (status) {
        box_fone.style = "visibility: visible;"
        pare.style = "visibility: visible;"
        falando = true
        inp_texto.disabled = true
        btn_falar.style.pointerEvents = 'none'
        btn_falar.style.opacity = '0.5'
        btn_limpar.style.pointerEvents = 'none'
        btn_limpar.style.opacity = '0.5'
    } else {
        inp_texto.disabled = false
        btn_falar.style.pointerEvents = 'auto'
        btn_falar.style.opacity = '1'
        btn_limpar.style.pointerEvents = 'auto'
        btn_limpar.style.opacity = '1'
        inp_texto.focus()
        falando = false
        box_fone.style = "visibility: hidden;"
        pare.style = "visibility: hidden;"
    }
}

const idiomaSimples = (opcao) => {
    bandeiras.forEach(el => {
        el.classList.remove('selectIdioma') // Remove a classe de todas as bandeiras
    })

    switch (opcao) {
        case 'pt-BR':
            bandeiras[0].classList.add('selectIdioma') // Seleciona o português
            break;
        case 'en-US':
            bandeiras[1].classList.add('selectIdioma') // Seleciona o inglês
            break;
        case 'es-ES':
            bandeiras[2].classList.add('selectIdioma') // Seleciona o espanhol
            break;
    }

    idioma = opcao // Atualiza o idioma
}

init() // Inicializa o sistema
