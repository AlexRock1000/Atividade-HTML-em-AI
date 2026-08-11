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

## Escopo atual: Aula 7, CSS de aparência

As telas ganham **aparência**, seguindo o style guide que o time definiu na
aula 3. Continua sem comportamento: nada de JavaScript.

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

### Não pode usar

- **Flexbox e grid**: `display: flex`, `display: grid` e tudo que depende deles.
  São assunto da aula 8, e usar hoje atrapalha
- **Media queries** e responsividade: aula 9
- **JavaScript de qualquer forma**: nem `.js`, nem `<script>`, nem `onclick`
- **Frameworks e bibliotecas de estilo**: Bootstrap, Tailwind, nenhum
- **Estilo dentro do HTML**: nem `<style>`, nem `style=""`. O CSS mora no arquivo separado
- **`position` e `float`**: não são necessários neste projeto

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
