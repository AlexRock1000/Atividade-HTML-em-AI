# Regras de uso de IA neste projeto

**Modo atual: AUTORAL.** A IA só revisa. Quem escreve o código sou eu.

Este arquivo define o que a IA pode e não pode gerar neste repositório.
Se você usa IA pelo navegador, **cole o conteúdo deste arquivo no começo da
conversa**. Se usa assistente dentro do editor, **anexe ou mencione este
arquivo** no pedido.

> O modo é definido pelo professor e muda ao longo do curso. No modo **Autoral**,
> a IA só revisa. No modo **Assistido**, ela também escreve. O escopo de conteúdo
> é o mesmo nos dois.

---

## Escopo atual: Aula 6, formulários

As telas agora também **recebem informação**. Continua sem aparência e sem
comportamento: nada de CSS, nada de JavaScript.

### Pode usar

| Grupo | Tags |
|---|---|
| Documento | `<!DOCTYPE html>` `<html>` `<head>` `<meta>` `<title>` `<body>` |
| Texto | `<h1>` a `<h6>` `<p>` `<strong>` `<em>` `<br>` |
| Listas | `<ul>` `<ol>` `<li>` |
| Mídia e navegação | `<img>` `<a>` `<button>` |
| Estrutura | `<header>` `<nav>` `<main>` `<section>` `<footer>` `<div>` |
| **Formulário (novo)** | `<form>` `<label>` `<input>` `<select>` `<option>` `<textarea>` `<fieldset>` `<legend>` |

Atributos permitidos: `lang`, `charset`, `src`, `alt`, `href`, `type`, `id`, `for`,
`name`, `required`, `placeholder`, `rows`, `value`.

> **Sobre o `id`:** ele estava proibido na aula 5 porque só serviria para estilo.
> Agora é permitido **apenas para ligar `label` e campo** com `for`. Continua
> proibido usar `id` para estilo.

### Não pode usar

- **CSS de qualquer forma**: nem `.css`, nem `<style>`, nem `style=""`, nem `class`
- **JavaScript de qualquer forma**: nem `.js`, nem `<script>`, nem `onclick`
- **Frameworks e bibliotecas**: React, Bootstrap, Tailwind, jQuery, nenhum
- **Tags fora da lista**, incluindo `<table>`, `<article>`, `<aside>`
- **Atributos `action` e `method`** no form: dependem de servidor, e não temos um

---

## Como a IA deve responder

1. **Explicar antes de entregar.** Para cada tag escolhida, dizer em uma linha
   por que aquela e não outra.
2. **Não completar o que não foi pedido.** Se eu pedi uma seção, não devolver a
   página inteira.
3. **Apontar quando eu estiver errado**, em vez de só corrigir em silêncio.
4. **Recusar o que está fora do escopo.** Se eu pedir algo proibido aqui,
   responder que está fora da etapa atual e explicar por quê, sem gerar o código.
5. **Incluir comentários no código explicando cada função.** Todo código
   gerado pela IA deve conter comentários que expliquem o propósito e o
   funcionamento de cada função fornecida.

---

## Método de trabalho

A ordem importa e não é negociável:

1. Escrevo o código **à mão**, olhando o meu wireframe.
2. Testo no navegador.
3. **Só então** peço revisão à IA.
4. Leio a explicação de cada mudança sugerida. Se não me convencer, não mudo.

A IA é revisora, não autora. Se eu não sei explicar uma linha do meu arquivo,
essa linha não pode ficar.

---

## Se eu precisar de algo que não está no escopo

Isso é sinal de uma destas duas coisas:

- a minha solução está **mais complicada do que precisa**, ou
- é **assunto de uma aula futura**.

Nos dois casos, a saída é falar com o professor, e não contornar a regra.

---

## Declaração de uso de IA

Preencher a cada entrega. Isso não tira ponto: usar IA é esperado, esconder não é.

- **O que fiz sozinho:**
- **O que pedi para a IA:**
- **O que a IA sugeriu e eu recusei, e por quê:**

---

## Histórico de escopo

| Aula | O que foi liberado | Modo |
|---|---|---|
| 5 | HTML: estrutura e tags semânticas | Autoral |
| 6 | Formulários: campos, rótulos e validação declarativa | Autoral |
