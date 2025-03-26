// Definindo os limites de largura do input (mínima e máxima)
const width = { min: 375, max: 600 } 

// Inicializa o array de letras para diferentes idiomas (exemplo: russo, japonês, coreano)
const letras = new Letras() 

// Variável para controlar se o sistema está falando ou não
let falando = false 

// Define o idioma padrão como português brasileiro
let idioma = 'pt-BR' 

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
}


// Função para tratar o clique do Enter no input de texto
const clickEnter = () => {
    if (inp_texto.value.trim()) { // Verifica se o input não está vazio
        statusFalando(true) // Marca que o sistema está falando
        const texto = inp_texto.value.trim() // Pega o texto digitado
        painel.textContent = texto.toUpperCase() // Exibe o texto no painel em maiúsculas
        inp_texto.value = '' // Limpa o campo de texto
        inp_texto.focus() // Foca novamente no input
        falar(texto) // Faz o sistema "falar" o texto digitado
    }
    aminacao() // Aplica animações
    checkWidth() // Verifica e ajusta a largura do input
    document.querySelector('#boxTeclado').classList.add('display-none') // Esconde o teclado
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
    checkWidth() // Verifica e ajusta a largura do input
    aminacao() // Aplica animações
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
    inp_texto.focus()
})

// Função para falar o texto usando a API de síntese de fala do navegador
const falar = (texto) => {
    const utterance = new SpeechSynthesisUtterance(texto) // Cria a fala do texto
    utterance.lang = idioma // Define o idioma
    utterance.rate = 1 // Define a velocidade da fala
    utterance.pitch = 1 // Define o tom da fala
    utterance.volume = 1 // Define o volume da fala

    utterance.onend = () => { // Quando a fala terminar
        statusFalando(false) // Marca que o sistema terminou de falar
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
    
    if (status) { // Se estiver falando
        box_fone.style = "visibility: visible;" // Torna visível o ícone de fone de ouvido
        pare.style = "visibility: visible;" // Torna visível o botão de parar
        falando = true // Marca como "falando"
        inp_texto.disabled = true // Desabilita o input de texto
        btn_falar.style.pointerEvents = 'none' // Desabilita o botão de falar
        btn_falar.style.opacity = '0.5' // Torna o botão de falar opaco
        btn_limpar.style.pointerEvents = 'none' // Desabilita o botão de limpar
        btn_limpar.style.opacity = '0.5' // Torna o botão de limpar opaco
    } else { // Se não estiver falando
        inp_texto.disabled = false // Habilita o input de texto
        btn_falar.style.pointerEvents = 'auto' // Habilita o botão de falar
        btn_falar.style.opacity = '1' // Restaura a opacidade do botão de falar
        btn_limpar.style.pointerEvents = 'auto' // Habilita o botão de limpar
        btn_limpar.style.opacity = '1' // Restaura a opacidade do botão de limpar
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
            break;
        case 'en-US': // Inglês
            bandeiras[1].classList.add('selectIdioma') 
            break;
        case 'es-ES': // Espanhol
            bandeiras[2].classList.add('selectIdioma') 
            break;
        case 'it-IT': // Italiano
            bandeiras[3].classList.add('selectIdioma') 
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
}

// Função para alternar a visibilidade do teclado
const click_btn_teclado = () => {
    gerarTeclado() // Gera o teclado de acordo com o idioma
    const boxTeclado = document.querySelector('#boxTeclado')
    boxTeclado.classList.toggle('display-none') // Alterna a visibilidade do teclado

    if(boxTeclado.classList.contains('display-none')){
        tecladoVirtual = false
    }else {
        tecladoVirtual = true
    }
    aminacao()
}

// Chama a função de inicialização assim que o código carrega
init()
