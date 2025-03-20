# Projeto: Texto para Fala Interativo

## Índice

• Sobre

• Tecnologias

• Funcionalidades

• Estrutura do Código

• Como Usar

• Requisitos

• Possíveis Melhorias

• Autor

## Sobre

Este projeto é uma aplicação interativa que permite a digitação de um texto, que é então exibido em um painel e lido em voz alta usando a API de síntese de fala do navegador.

## Tecnologias

• HTML

• CSS

• JAVASCRIPT


## Funcionalidades

- **Entrada de Texto:** O usuário pode digitar um texto que será exibido no painel e lido em voz alta.
- **Redimensionamento Dinâmico:** A largura do campo de entrada se ajusta com base no tamanho do texto e na largura da tela.
- **Animação de Feedback:** Exibição de um GIF enquanto não há texto no painel.
- **Seleção de Idioma:** Possibilidade de alternar entre os idiomas "pt-BR" e "en-US".
- **Teclas de Atalho:** Pressionar `Enter` ativa a leitura do texto, e `Delete` limpa o painel.
- **Interrupção da Fala:** Opção para parar a leitura antes do término.

## Estrutura do Código

### JavaScript

1. **Configurações Iniciais**

   - Define os tamanhos mínimos e máximos do campo de entrada (`width`).
   - Inicializa o idioma padrão (`pt-BR`).
   - Seleciona elementos do DOM para interação.

2. **Função ****`init()`**

   - Aplica animação inicial.
   - Define o idioma padrão visualmente.
   - Ajusta o tamanho da caixa de entrada e coloca o cursor automaticamente.

3. **Função ****`clickEnter()`**

   - Verifica se o texto foi digitado.
   - Exibe o texto no painel.
   - Limpa a entrada e inicia a síntese de fala.

4. **Função ****`onPainel()`**

   - Reproduz o texto do painel caso não esteja sendo lido no momento.

5. **Eventos de Entrada e Redimensionamento**

   - Ajusta a largura do campo de texto dinamicamente (`checkWidth()`).

6. **Função ****`falar(texto)`**

   - Utiliza a API `SpeechSynthesisUtterance` para converter texto em fala.

7. **Função ****`pararFala()`**

   - Cancela a síntese de fala caso esteja ativa.

8. **Controle de Interface (****`statusFalando()`****)**

   - Ativa ou desativa botões enquanto o texto está sendo lido.

9. **Função ****`idiomaSimples(opcao)`**

   - Permite a mudança de idioma entre português e inglês.

10. **Eventos Globais (****`keydown`**** e ****`click`****)**

    - `Enter`: Inicia a leitura do texto.
    - `Delete`: Limpa o painel.
    - `Click`: Mantém o foco na entrada de texto.

### CSS

- Define estilos de fontes e responsividade.
- Configura a aparência dos botões e do painel.
- Inclui animação para icones de feedback.

## Como Usar

1. Digite um texto na caixa de entrada.
2. Pressione `Enter` ou clique no botão de falar para ouvir o texto.
3. Clique no painel para repetir a leitura.
4. Use `Delete` para limpar o painel.
5. Altere o idioma clicando nas bandeiras.
6. Para interromper a fala, clique no ícone de parar.

## Requisitos

- Um navegador compatível com a API de síntese de fala (Chrome, Firefox, Edge, etc.).

## Possíveis Melhorias

- Adicionar mais idiomas.
- Permitir ajuste na velocidade da fala.
- Melhorar a acessibilidade com suporte a leitores de tela.

---

## Autor

### DANILO CASTRO CE

- [GitHub]\(https\://github.com/DaniloCastroCE)

Este projeto foi desenvolvido por [Danilo Castro CE]. Sinta-se à vontade para entrar em contato ou contribuir!
