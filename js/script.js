const width = { min: 375, max: 600 }
let falando = false
let idioma = 'pt-BR'
const bandeiras = document.querySelectorAll('.bandeiras')
const inp_texto = document.querySelector('#inp-texto')
inp_texto.style.width = `${width.min}px`
const painel = document.querySelector("#painel")

const init = () => {
    aminacao()
    bandeiras[0].classList.add('selectIdioma')
    inp_texto.focus()
    checkWidth()
}

const clickEnter = () => {
    if (inp_texto.value.trim()) {
        statusFalando(true)
        const texto = inp_texto.value.trim()
        painel.textContent = texto.toUpperCase()
        inp_texto.value = ''
        inp_texto.focus()
        falar(texto)
    }
    aminacao()
    checkWidth()
}



inp_texto.addEventListener('input', () => checkWidth() )

window.addEventListener('resize', () => checkWidth() )

const checkWidth = () => {
    const string_width = inp_texto.value.length * 20
    const box_painel = document.querySelector("#box-painel")

    if (window.innerWidth <= width.min + 50) {
        inp_texto.style.width = `${window.innerWidth - 20}px`
        box_painel.style = "justify-content: flex-start;"
    }
    else if (string_width >= width.min && string_width <= width.max) {
        inp_texto.style.width = `${inp_texto.value.length * 20}px`
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
    const img_gif = document.querySelector('#img-gif')
    const box_painel = document.querySelector('#box-painel')
    if (painel.textContent === "") {
        img_gif.style.display = "block"
        box_painel.style = 'overflow-y: hidden;'
    } else {
        img_gif.style.display = "none"
        box_painel.style = 'overflow-y: auto;'
    }
}

const limpar = () => {
    inp_texto.value = ''
    painel.textContent = ''
    inp_texto.focus()
    aminacao()
}

document.querySelector('body').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !falando) {
        inp_texto.style.width = `${width.min}px`
        clickEnter()
        //document.querySelector('#btn-falar').click()
    } else if (e.key === 'Delete' && !falando) {
        inp_texto.style.width = `${width.min}px`
        inp_texto.value = ''
        painel.textContent = ''
        inp_texto.focus()
        aminacao()
        //document.querySelector('#btn-limpar').click()
    }

})

document.querySelector('body').addEventListener('click', (e) => {
    inp_texto.focus()
})

const falar = (texto) => {

    const utterance = new SpeechSynthesisUtterance(texto)
    utterance.lang = idioma
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    /*
    utterance.onstart = () => {
        statusFalando(true)
    }
    */

    utterance.onend = () => {
        statusFalando(false)
    }

    window.speechSynthesis.speak(utterance)
}

const pararFala = () => {
    window.speechSynthesis.cancel();
    statusFalando(false)
};

const statusFalando = (status) => {
    const btn_falar = document.querySelector("#btn-falar")
    const btn_limpar = document.querySelector("#btn-limpar")
    const box_fone = document.querySelector("#box-fone")
    const pare = document.querySelector("#box-pare")
    if(status){
        box_fone.style = "visibility: visible;"
        pare.style = "visibility: visible;"
        falando = true
        inp_texto.disabled = true
        btn_falar.style.pointerEvents = 'none'
        btn_falar.style.opacity = '0.5'
        btn_limpar.style.pointerEvents = 'none'
        btn_limpar.style.opacity = '0.5'
    }else if (!status){
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
        el.classList.remove('selectIdioma')
    })

    switch (opcao) {
        case 'pt-BR':
            bandeiras[0].classList.add('selectIdioma')
            break;
        case 'en-US':
            bandeiras[1].classList.add('selectIdioma')
            break;
        default:
            break;
    }

    idioma = opcao
}



init()