// Definindo os limites de largura do input (mínima e máxima)
const width = { min: 375, max: 600 }

// Inicializa o array de letras para diferentes idiomas (exemplo: russo, japonês, coreano)
const letras = new Letras()

// Variável para controlar se o sistema está falando ou não
let falando = false

// Define o idioma padrão como português brasileiro
let idioma = 'pt-BR'
let lang_destino = 'en-US'
let languages = []

let ativoTraducao = false

const linguagens = [
    { sigla: "pt-BR", lang: "Português" },
    { sigla: "en-US", lang: "Inglês" },
    { sigla: "es-ES", lang: "Espanhol" },
    { sigla: "it-IT", lang: "Italiano" },
    { sigla: "ru-RU", lang: "Russo" },
    { sigla: "ja-JP", lang: "Japonês" },
    { sigla: "ko-KR", lang: "Coreano" }
]

// Identifica se o teclado esta ativo
let tecladoVirtual = false;

// Seleciona todos os elementos com a classe 'bandeiras' no HTML
const bandeiras = document.querySelectorAll('.bandeiras')

// Seleciona o input de texto no HTML
const inp_texto = document.querySelector('#inp-texto')

// Inicializa a largura do input para a largura mínima
inp_texto.style.width = `${width.min}px`

// Seleciona o painel onde o texto será exibido
const painel = document.querySelector("#painel")

// Função de inicialização para configurar o comportamento inicial
const init = () => {
    aminacao() // Aplica animações iniciais
    bandeiras[0].classList.add('selectIdioma') // Marca a bandeira do idioma padrão (português)
    inp_texto.focus() // Foca no input de texto assim que a página carregar
    checkWidth() // Verifica e ajusta a largura do input
    document.querySelector('#toggle-ckeckbok').checked = ativoTraducao
}


// Função para tratar o clique do Enter no input de texto
const clickEnter = () => {
    if (inp_texto.value.trim()) { // Verifica se o input não está vazio
        statusFalando(true) // Marca que o sistema está falando
        const texto = inp_texto.value.trim() // Pega o texto digitado
        //painel.textContent = texto.toUpperCase() // Exibe o texto no painel em maiúsculas
        inp_texto.value = '' // Limpa o campo de texto
        inp_texto.focus() // Foca novamente no input

        if (ativoTraducao) {
            getApi(texto, (result) => {
                falar(result) // Faz o sistema "falar" o texto digitado
                painel.textContent = result.toUpperCase()
                aminacao()
            })
        } else {
            falar(texto) // Faz o sistema "falar" o texto digitado
            painel.textContent = texto.toUpperCase()
        }
    }
    document.querySelector('#boxTeclado').classList.add('display-none') // Esconde o teclado
    tecladoVirtual = false
    aminacao() // Aplica animações
    checkWidth() // Verifica e ajusta a largura do input
}

// Função para falar o texto do painel
const onPainel = () => {
    const texto = painel.textContent // Pega o texto do painel
    if (!falando) { // Se o sistema não está falando
        statusFalando(true) // Marca que o sistema está falando
        falar(texto) // Faz o sistema falar o texto
    }
}

// Função para ajustar a largura do input ao digitar
inp_texto.addEventListener('input', () => checkWidth())

// Função para ajustar a largura do input ao redimensionar a janela
window.addEventListener('resize', () => checkWidth())

// Função para verificar e ajustar a largura do input com base no conteúdo
const checkWidth = () => {
    const string_width = inp_texto.value.length * 20 // Calcula a largura do texto digitado
    const box_painel = document.querySelector("#box-painel") // Pega o painel externo

    if (window.innerWidth <= width.min + 50) { // Se a largura da janela for pequena
        inp_texto.style.width = `${window.innerWidth - 20}px` // Ajusta a largura do input
        box_painel.style = "justify-content: flex-start;" // Alinha o painel à esquerda
    } else if (string_width >= width.min && string_width <= width.max) {
        inp_texto.style.width = `${string_width}px` // Ajusta a largura do input com base no texto
        box_painel.style = "justify-content: center;" // Alinha o painel ao centro
    } else if (string_width > width.max) {
        inp_texto.style.width = `${width.max}px` // Limita a largura do input
        box_painel.style = "justify-content: center;" // Alinha o painel ao centro
    } else if (string_width < parseInt(width.min)) {
        inp_texto.style.width = `${width.min}px` // Garante que o input não seja menor que a largura mínima
        box_painel.style = "justify-content: center;" // Alinha o painel ao centro
    }
}

// Função de animação (pode ser utilizada para efeitos visuais)
const aminacao = () => {
    const img_gif = document.querySelector('#img-gif') // Seleciona a imagem GIF
    const box_painel = document.querySelector('#box-painel') // Seleciona o painel externo
    if (painel.textContent === "" && !tecladoVirtual) {
        img_gif.style.display = "block" // Mostra o GIF se não houver texto no painel
        box_painel.style = 'overflow-y: hidden;'
    } else {
        img_gif.style.display = "none" // Oculta o GIF quando houver texto
        box_painel.style = 'overflow-y: auto;'
    }
}

// Função para limpar o input e o painel
const limpar = () => {
    inp_texto.value = '' // Limpa o texto no input
    painel.textContent = '' // Limpa o painel
    inp_texto.focus() // Foca no input novamente
    aminacao() // Aplica animações
    checkWidth() // Verifica e ajusta a largura do input
}

// Captura eventos do teclado para ações específicas (Enter e Delete)
document.querySelector('body').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !falando) { // Se a tecla pressionada for Enter
        inp_texto.style.width = `${width.min}px` // Redefine a largura do input
        clickEnter() // Chama a função para processar o clique no Enter
    } else if (e.key === 'Delete' && !falando) { // Se a tecla pressionada for Delete
        inp_texto.style.width = `${width.min}px` // Redefine a largura do input
        limpar() // Chama a função para limpar o input e o painel
    }
})

// Mantém o foco no input quando o usuário clica na tela
document.querySelector('body').addEventListener('click', (e) => {
    const modal = document.querySelector('#modal')

    if (modal.classList.contains('display-none')) {
        inp_texto.focus()
    }
})

// Função para falar o texto usando a API de síntese de fala do navegador
const falar = (texto) => {
    const utterance = new SpeechSynthesisUtterance(texto) // Cria a fala do texto
    if (!ativoTraducao || lang_destino === idioma) {
        utterance.lang = idioma // Define o idioma
    } else {
        utterance.lang = lang_destino
    }
    utterance.rate = 1 // Define a velocidade da fala
    utterance.pitch = 1 // Define o tom da fala
    utterance.volume = 1 // Define o volume da fala

    utterance.onend = () => { // Quando a fala terminar
        statusFalando(false) // Marca que o sistema terminou de falar
        aminacao()
    }
    window.speechSynthesis.speak(utterance) // Executa a fala
}

// Função para parar a fala
const pararFala = () => {
    window.speechSynthesis.cancel(); // Para a fala imediatamente
    statusFalando(false) // Marca que o sistema não está falando
};

// Função para atualizar o status de "falando"
const statusFalando = (status) => {
    const btn_falar = document.querySelector("#btn-falar")
    const btn_limpar = document.querySelector("#btn-limpar")
    const box_fone = document.querySelector("#box-fone")
    const pare = document.querySelector("#box-pare")
    const menu = document.querySelector("#menu")

    if (status) { // Se estiver falando
        box_fone.style = "visibility: visible;" // Torna visível o ícone de fone de ouvido
        pare.style = "visibility: visible;" // Torna visível o botão de parar
        falando = true // Marca como "falando"
        inp_texto.disabled = true // Desabilita o input de texto
        btn_falar.style.pointerEvents = 'none' // Desabilita o botão de falar
        btn_falar.style.opacity = '0.5' // Torna o botão de falar opaco
        btn_limpar.style.pointerEvents = 'none' // Desabilita o botão de limpar
        btn_limpar.style.opacity = '0.5' // Torna o botão de limpar opaco
        menu.style.pointerEvents = 'none'
        menu.style.opacity = '0.5'

    } else { // Se não estiver falando
        inp_texto.disabled = false // Habilita o input de texto
        btn_falar.style.pointerEvents = 'auto' // Habilita o botão de falar
        btn_falar.style.opacity = '1' // Restaura a opacidade do botão de falar
        btn_limpar.style.pointerEvents = 'auto' // Habilita o botão de limpar
        btn_limpar.style.opacity = '1' // Restaura a opacidade do botão de limpar
        menu.style.pointerEvents = 'auto'
        menu.style.opacity = '1'
        inp_texto.focus() // Foca no input de texto
        falando = false // Marca como "não falando"
        box_fone.style = "visibility: hidden;" // Oculta o ícone de fone de ouvido
        pare.style = "visibility: hidden;" // Oculta o botão de parar
    }
}

// Função para alternar entre os idiomas e mostrar o teclado virtual
const idiomaSimples = (opcao) => {
    document.querySelector('#teclado').classList.add('display-none') // Esconde o teclado
    document.querySelector('#boxTeclado').classList.add('display-none') // Esconde o box do teclado
    bandeiras.forEach(el => {
        el.classList.remove('selectIdioma') // Remove a classe de seleção das bandeiras
    })

    idioma = opcao // Atualiza o idioma escolhido

    // Altera o idioma selecionado com base na opção
    switch (opcao) {
        case 'pt-BR': // Português
            bandeiras[0].classList.add('selectIdioma')
            tecladoVirtual = false
            break;
        case 'en-US': // Inglês
            bandeiras[1].classList.add('selectIdioma')
            tecladoVirtual = false
            break;
        case 'es-ES': // Espanhol
            bandeiras[2].classList.add('selectIdioma')
            tecladoVirtual = false
            break;
        case 'it-IT': // Italiano
            bandeiras[3].classList.add('selectIdioma')
            tecladoVirtual = false
            break;
        case 'ru-RU': // Russo
            bandeiras[4].classList.add('selectIdioma')
            document.querySelector('#teclado').classList.remove('display-none') // Mostra o teclado russo
            break;
        case 'ja-JP': // Japonês
            bandeiras[5].classList.add('selectIdioma')
            document.querySelector('#teclado').classList.remove('display-none') // Mostra o teclado japonês
            break
        case 'ko-KR': // Coreano
            bandeiras[6].classList.add('selectIdioma')
            document.querySelector('#teclado').classList.remove('display-none') // Mostra o teclado coreano
            break
        default:
            break;
    }
    if (tecladoVirtual) {
        document.querySelector('#boxTeclado').classList.remove('display-none')
        gerarTeclado()
    }
    aminacao()
    checkWidth()
}

// Função dedicada apenas para abrir ou fechar o modal para selecionar os idiomas
const selecionarIdiomas = (op, box) => {
    const modal = document.querySelector('#modal')
    const cards = document.querySelector('.cards')
    const translate = document.querySelector('.translate')

    if (op === undefined) {
        modal.classList.toggle('display-none')
        if (box === 'cards') cards.classList.toggle('display-none')
        if (box === 'translate') {
            tradutir()
            translate.classList.toggle('display-none')
        }
    }
    else if (op === 'close' || op === 'body') {
        modal.classList.add('display-none')
        cards.classList.add('display-none')
        translate.classList.add('display-none')

    } else if (op === 'open') {
        modal.classList.remove('display-none')
        if (box === 'cards') cards.classList.remove('display-none')
        if (box === 'translate') {
            tradutir()
            translate.classList.remove('display-none')
        }
    }
    else if (typeof (op) === 'object') {
        if (op.target.id === 'modal') {
            //modal.classList.add('display-none')
            //if(box === 'cards') cards.classList.add('display-none')
            //if(box === 'translate') translate.classList.add('display-none')
        }
    }
}

// FUnção para deixar os cards dos idiomas  com aspecto de selecionado
const card_seleciona_lang = (obj, lang) => {
    const img = document.querySelector(`#img-${lang}`)
    obj.classList.toggle('card-selected')
    if (obj.classList.contains('card-selected')) {
        img.classList.remove('display-none')
    } else {
        img.classList.add('display-none')
        if (lang === idioma) { // verificar se o idioma removido é o que esta selcionado
            idiomaSimples('pt-BR') // deixa o idioma padrao para português
        }
    }

}

const tradutir = () => {
    const bandeiras = document.querySelectorAll('.bandeiras')
    const box_select_lang = document.querySelector('.box-select-lang')
    box_select_lang.innerHTML = ""

    languages = []

    bandeiras.forEach(bandeira => {
        const text_lang = linguagens.find(obj => obj.sigla === bandeira.id.slice(4))
        if (bandeira.classList.contains('selectIdioma')) {
            document.querySelector('#text-origem').innerHTML = `
                <p>de</p>    
                <div class="card centralizar">
                    <img id="img-orig" class="card-bandeiras" src="${bandeira.src}" alt="${bandeira.alt}">
                    <p id="pais-orig" class="pais lilita-one-regular">${bandeira.alt.toUpperCase()}</p>
                    <p id="lang-orig" class="card-lang">${text_lang.lang}</p>   
                </div>
            `
        }

        if (bandeira.id.slice(4) === lang_destino) {
            document.querySelector('#text-destino').innerHTML = `
                <p>para</p>    
                <div class="card centralizar">
                    <img id="img-orig" class="card-bandeiras" src="${bandeira.src}" alt="${bandeira.alt}">
                    <p id="pais-orig" class="pais lilita-one-regular">${bandeira.alt.toUpperCase()}</p>
                    <p id="lang-orig" class="card-lang">${text_lang.lang}</p>   
                </div>
            `
        }

        if (!bandeira.classList.contains('display-none')) {
            const lang = {
                pais: bandeira.alt,
                src: bandeira.src,
                idioma: bandeira.id.slice(4)
            }
            languages.push(lang)

            if (lang_destino === lang.idioma) {
                box_select_lang.innerHTML += `
                <img 
                    class="bandeiras-langueges selectIdioma-lang"
                    src="${lang.src}" 
                    alt="${lang.pais}" 
                    onclick="escolha_traducao(this,'${lang.idioma}')">
            `
            } else {
                box_select_lang.innerHTML += `
                    <img 
                        class="bandeiras-langueges"
                        src="${lang.src}" 
                        alt="${lang.pais}" 
                        onclick="escolha_traducao(this,'${lang.idioma}')">
                `
            }
        }

    })

    statusElementoEscolha(document.querySelector('#toggle-ckeckbok').checked)

}

const escolha_traducao = (obj, language) => {
    lang_destino = language
    const lang_selected = languages.find(obj => obj.idioma === language)
    const bandeiras_langueges = document.querySelectorAll('.bandeiras-langueges')
    bandeiras_langueges.forEach(el => el.classList.remove('selectIdioma-lang'))
    const lang = languages.find(obj => obj.idioma === language)
    obj.classList.add('selectIdioma-lang')
    const text_lang = linguagens.find(obj => obj.sigla === lang_selected.idioma)
    document.querySelector('#text-destino').innerHTML = `
        <p>para</p>    
        <div class="card centralizar">
            <img id="img-orig" class="card-bandeiras" src="${lang_selected.src}" alt="${lang_selected.pais}">
            <p id="pais-orig" class="pais lilita-one-regular">${lang_selected.pais.toUpperCase()}</p>
            <p id="lang-orig" class="card-lang">${text_lang.lang}</p>   
        </div>
    `
    statusElementoEscolha(document.querySelector('#toggle-ckeckbok').checked)
}


const checkBok = (e) => {
    ativoTraducao = e.target.checked
    statusElementoEscolha(ativoTraducao)
}

const statusElementoEscolha = (status) => {
    const box_translate = document.querySelector('.box-translate')
    const box_select_lang = document.querySelector('.box-select-lang')
    const btn_translate = document.querySelector('#btn-translate')
    const img_falar = document.querySelector('.img-falar')
    const svg_falar = document.querySelector('.svg-falar')
    img_falar.src = languages.find(obj => obj.idioma === lang_destino).src

    if (status) {
        box_translate.style.opacity = '1'
        box_translate.style.pointerEvents = 'auto'
        box_select_lang.style.opacity = '1'
        box_select_lang.style.pointerEvents = 'auto'
        btn_translate.classList.add('selectIdioma-btn')
        img_falar.classList.remove('display-none')
        svg_falar.classList.add('display-none')
    } else {
        box_translate.stylepointerEvents = 'none'
        box_translate.style.opacity = '0.2'
        box_select_lang.style.pointerEvents = 'none'
        box_select_lang.style.opacity = '0.2'
        btn_translate.classList.remove('selectIdioma-btn')
        img_falar.classList.add('display-none')
        svg_falar.classList.remove('display-none')
    }
}


// Função para gerar o teclado virtual com base no idioma
const gerarTeclado = () => {
    const boxTeclado = document.querySelector('#boxTeclado')
    boxTeclado.innerHTML = '' // Limpa o conteúdo do teclado
    switch (idioma) {
        case 'ru-RU':
            letras.russo.forEach((el, index) => {
                boxTeclado.innerHTML += `<button class="btns centralizar" onclick="click_teclado('${idioma}','${index}')">${el.html}</button>`
            })
            break;
        case 'ja-JP':
            letras.japones.forEach((el, index) => {
                boxTeclado.innerHTML += `<button class="btns centralizar" onclick="click_teclado('${idioma}','${index}')">${el.html}</button>`
            })
            break;
        case 'ko-KR':
            letras.coreano.forEach((el, index) => {
                boxTeclado.innerHTML += `<button class="btns centralizar" onclick="click_teclado('${idioma}','${index}')">${el.html}</button>`
            })
            break;

        default:
            break;
    }
    checkWidth()
}

// Função para lidar com o clique das teclas do teclado virtual
const click_teclado = (tecla_idioma, index) => {
    let letra_click = ''
    if (tecla_idioma === 'ru-RU') {
        letra_click = letras.russo[index].char
    }
    else if (tecla_idioma === 'ja-JP') {
        letra_click = letras.japones[index].char
    }
    else if (tecla_idioma === 'ko-KR') {
        letra_click = letras.coreano[index].char
    }

    inp_texto.value += letra_click // Adiciona a letra ao input
    checkWidth()
}

// Função para alternar a visibilidade do teclado
const click_btn_teclado = () => {
    gerarTeclado() // Gera o teclado de acordo com o idioma
    const boxTeclado = document.querySelector('#boxTeclado')
    boxTeclado.classList.toggle('display-none') // Alterna a visibilidade do teclado

    if (boxTeclado.classList.contains('display-none')) {
        tecladoVirtual = false
    } else {
        tecladoVirtual = true
    }
    aminacao()
}

const getApi = async (texto, callback) => {

    try {

        const idiomaOrigem = idioma.slice(0, 2)
        const idiomaDestino = lang_destino.slice(0, 2)

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${idiomaOrigem}|${idiomaDestino}&mt=0`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Erro na requisição da api')
        }

        const data = await response.json()
        console.log(data)
        callback(data.responseData.translatedText)


    } catch (error) {
        console.error('Errou na api:', error)
    }

}

// Chama a função de inicialização assim que o código carrega
init()
