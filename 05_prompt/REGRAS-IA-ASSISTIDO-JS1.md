# Regras de uso de IA neste projeto

**Modo atual: ASSISTIDO.** A IA pode escrever o código, dentro das condições abaixo.

Este arquivo define o que a IA pode gerar neste repositório e como ela deve
entregar. Se você usa IA pelo navegador, **cole o conteúdo deste arquivo no
começo da conversa**. Se usa assistente dentro do editor, **anexe ou mencione
este arquivo** no pedido.

> O modo é definido pelo professor e muda ao longo do curso. No modo **Autoral**,
> a IA só revisa. No modo **Assistido**, ela também escreve. O escopo de conteúdo
> é o mesmo nos dois.

---

## Escopo atual: Aula 11, listas e criação de elementos

Os dados do pedido passam a viver numa **lista dentro do JavaScript**, e a tela
é desenhada a partir dela. Ainda não guarda nada ao recarregar.

### Pode usar

| Grupo | Tags |
|---|---|
| Documento | `<!DOCTYPE html>` `<html>` `<head>` `<meta>` `<title>` `<body>` `<link>` |
| Texto | `<h1>` a `<h6>` `<p>` `<strong>` `<em>` `<br>` |
| Listas | `<ul>` `<ol>` `<li>` |
| Mídia e navegação | `<img>` `<a>` `<button>` |
| Estrutura | `<header>` `<nav>` `<main>` `<section>` `<footer>` `<div>` |
| Formulário | `<form>` `<label>` `<input>` `<select>` `<option>` `<textarea>` `<fieldset>` `<legend>` |

Atributos permitidos: `lang`, `charset`, `src`, `alt`, `href`, `rel`, `type`, `id`,
`for`, `name`, `required`, `placeholder`, `rows`, `value`, **`class`**.

### CSS (novo)

Arquivo `estilo.css` separado, ligado no `<head>` com `<link>`. Permitido:

| Grupo | Propriedades |
|---|---|
| Seletores | por tag, por `.class`, por `#id` |
| Cor | `color`, `background-color` |
| Letra | `font-family`, `font-size`, `font-weight`, `text-align` |
| Caixa | `padding`, `margin`, `border`, `border-radius`, `width`, `height` |
| Exibição | `display: block`, `display: none` |
| Variáveis | `:root` com `--nome`, e `var(--nome)` |

> **Sobre a `class`:** estava proibida desde a aula 5 porque não havia CSS.
> Agora é o jeito certo de marcar um grupo de elementos. Nome de class descreve
> o papel, não a aparência: `botao-principal`, e não `botao-laranja`.

### CSS de layout (novo)

| Grupo | Permitido |
|---|---|
| Flexbox, no pai | `display: flex`, `flex-direction`, `justify-content`, `align-items`, `gap` |
| Flexbox, no filho | `flex: 1` |
| Grid | `display: grid`, `grid-template-columns` com `fr`, `gap` |
| Responsivo | `@media (min-width: ...)` |

> **Só estas seis propriedades de flex.** Flexbox tem dezenas, e usar mais do que
> isso deixa o código ilegível para quem está aprendendo. Se você precisar de
> `flex-basis`, `align-self`, `flex-wrap` ou `order`, pergunte ao professor antes.

> **Mobile-first é obrigatório.** As regras base descrevem o celular. A media query
> só acrescenta quando sobra espaço, e nunca desfaz o que veio antes. Use apenas
> `min-width`, nunca `max-width`.

### JavaScript (novo)

Arquivo `script.js` separado, ligado no fim do `<body>` com
`<script src="script.js"></script>`. Permitido:

| Grupo | O que pode |
|---|---|
| Variáveis | `let` e `const`. Nunca `var` |
| Tipos | número, texto, booleano, `null` |
| Operadores | `+ - * /`, `=== !== > <`, `&& || !` |
| Decisão | `if`, `else if`, `else` |
| Repetição | `for ... of` |
| Funções | `function nome(parametros) { return ... }` |
| Saída | `console.log` |
| Dados | listas `[]` e objetos `{ chave: valor }` |

> **Comparação sempre com `===`.** O `==` converte tipos antes de comparar e
> gera erro difícil de achar.

> **Nada de mexer na tela hoje.** Isso é a aula 10.

### DOM e eventos (novo)

| Grupo | O que pode |
|---|---|
| Achar elemento | `document.querySelector("#id")`, `.class` ou tag |
| Ler e mudar texto | `.textContent` |
| Ler campo | `.value` |
| Converter | `Number(...)` |
| Reagir | `.addEventListener("click", funcao)` e `"input"` |

> **Só os eventos `click` e `input`.** Existem dezenas, e dois resolvem tudo
> que este projeto precisa agora.

> **Todo `.value` que entra em conta passa por `Number()` antes.** O valor de um
> campo chega sempre como texto, mesmo em `type="number"`, e o `+` junta texto
> em vez de somar.

> **No `addEventListener`, a função vai sem parênteses.** Com parênteses ela
> roda na hora, em vez de ficar guardada para o clique.

### Listas e criação de elementos (novo)

| Grupo | O que pode |
|---|---|
| Dados | array de objetos: `[{ nome: "X", preco: 18, qtd: 1 }]` |
| Acessar | `lista[0]`, `item.nome`, `item.preco` |
| Adicionar | `.push(objeto)` |
| Remover | montar lista nova com `for ... of`, `if` e `push` |
| Criar elemento | `document.createElement("li")` |
| Pendurar | `elementoPai.appendChild(filho)` |
| Limpar | `elementoPai.textContent = ""` |

> **A regra da aula: muda o dado primeiro, e só depois manda redesenhar.**
> A tela nunca guarda informação; ela é sempre desenhada a partir do array.

> **Renderizar é apagar tudo e refazer.** Limpe o elemento pai e recrie a lista
> inteira a partir dos dados. Não tente remendar item por item.

### Não pode usar

- **`.map()` e `.filter()`**: fazem isso em uma linha, mas dependem de escrita
  que ainda não vimos. Para remover, monte a lista nova com `for ... of` e `if`
- **`innerHTML`**: continua proibido por segurança. Use `createElement` e `textContent`
- **`fetch` e código assíncrono**: aula 13
- **`var`** e **função com seta (`=>`)**
- **`==` no lugar de `===`**
- **Outros eventos** além de `click` e `input`
- **Frameworks e bibliotecas**: React, jQuery, nenhum

---

## Antes de pedir: a especificação

Não peça "faça a tela de pedido". Preencha isto primeiro, olhando o seu wireframe:

```
TELA: .......................................
QUEM USA: ................ (Rafael ou Marta)
O QUE PRECISA APARECER:
  - ...........................................
  - ...........................................
  - ...........................................
TAGS QUE EU ESPERO USAR: ......................
O QUE É MAIS IMPORTANTE NESTA TELA: ...........
```

Só depois disso, faça o pedido à IA colando este arquivo junto.

---

## Como a IA deve entregar o código

### 1. Comentar o porquê, nunca o quê

Comentário que descreve o óbvio não serve. O comentário precisa dizer
**por que aquela tag e não outra**.

```html
<!-- RUIM: comentário que só repete o que já se lê -->
<!-- cabeçalho -->
<header>

<!-- BOM: comentário que justifica a escolha -->
<!-- POR QUE: header agrupa o que identifica a tela. Não é div porque tem papel definido. -->
<header>
```

### 2. Marcar as decisões que são minhas

Onde houver julgamento de significado, **não escolher em silêncio**. Marcar assim:

```html
<!-- DECISAO SUA: a mesa é informação de apoio ou título da tela?
     Coloquei como p com strong. Se for título, vira h2. Confirme. -->
<p>Mesa <strong>3</strong></p>
```

### 3. Deixar três lacunas para eu preencher à mão

Nas partes mais importantes da tela, **não entregar pronto**. Deixar marcado:

```html
<!-- COMPLETAR: escrever aqui a lista dos itens do pedido, usando ul e li -->
```

Escolher para lacuna o que é central na tela, e não o que é acessório.

### 4. Recusar o que está fora do escopo

Se eu pedir algo proibido aqui, responder que está fora da etapa atual e
explicar por quê, **sem gerar o código**.

### 5. Não completar o que não foi pedido

Se eu pedi uma seção, entregar aquela seção. Não devolver a página inteira.

### 6. Regra permanente: eu preciso prever antes de rodar

Antes de salvar qualquer código que a IA gerou:

1. Leio o código linha por linha.
2. **Digo em voz alta o que vai acontecer**: o que aparece na tela, ou o que a
   função vai devolver.
3. Rodo e confiro.

Se o resultado me surpreendeu, aquele trecho eu ainda não entendi, e ele não
fica no meu arquivo até eu entender.

---

## O que eu preciso fazer depois

A entrega **não é o arquivo gerado**. É o arquivo gerado mais o meu trabalho em cima dele.

1. **Preencher as lacunas** marcadas com `COMPLETAR`, à mão, sem pedir de volta à IA.
2. **Responder as decisões** marcadas com `DECISAO SUA`, escolhendo e ajustando o código.
3. **Anotar o que mudei**, com um comentário meu, marcado assim:

```html
<!-- EU: troquei para h2 porque na minha tela isto é subtítulo da seção, não título principal -->
```

4. **Apagar os comentários da IA que eu não entendi.** Se eu não sei explicar,
   não posso deixar no meu arquivo fingindo que sei.

> Regra que não muda em nenhum modo: **se eu não sei explicar uma linha do meu
> arquivo, essa linha não pode ficar.** A defesa oral continua sendo sobre o meu
> entendimento, não sobre o código funcionar.

---

## Se eu precisar de algo que não está no escopo

Isso é sinal de uma destas duas coisas:

- a minha solução está **mais complicada do que precisa**, ou
- é **assunto de uma aula futura**.

Nos dois casos, a saída é falar com o professor, e não contornar a regra.

---

## Declaração de uso de IA

Preencher a cada entrega. Isso não tira ponto: usar IA é esperado, esconder não é.

- **A especificação que escrevi antes de pedir:**
- **O que a IA gerou:**
- **As lacunas que preenchi à mão:**
- **O que mudei no que ela entregou, e por quê:**
- **O que ela sugeriu e eu recusei, e por quê:**

---

## Histórico de escopo

| Aula | O que foi liberado | Modo |
|---|---|---|
| 5 | HTML: estrutura e tags semânticas | Assistido |
| 6 | Formulários: campos, rótulos e validação declarativa | Assistido |
| 7 | CSS: cores, letra, caixa e variáveis | Assistido |
| 8 | Layout: flexbox, grid e mobile-first | Assistido |
| 9 | JavaScript: variáveis, decisão, repetição e funções | Assistido |
| 10 | DOM e eventos: ler, mudar e reagir | Assistido |
| 11 | Listas de objetos e renderizar a tela | Assistido |
