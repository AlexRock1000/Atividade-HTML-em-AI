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

## Escopo atual: Aula 15, estado, listas e arquitetura

O projeto é reconstruído em **React**. A tela deixa de ser montada com
`createElement` e passa a ser descrita em componentes reaproveitáveis.
Hoje ela é estática: recebe dados por props e ainda não reage a nada.

### Pode usar

### React: componentes e props (novo)

O projeto passa a ser criado com Vite. Na pasta do projeto:
`npm create vite@latest`, escolher **React** e **JavaScript**, depois
`npm install` e `npm run dev`.

| Grupo | O que pode |
|---|---|
| Componente | `function NomeDoComponente() { return ( ... ); }` |
| Entregar | `export default NomeDoComponente;` |
| Usar | `import Nome from "./Nome";` e depois `<Nome />` |
| Props | `<Item nome="X-Burger" preco={18} />` e `props.nome` dentro |
| JSX | HTML no `return`, com `{ }` para voltar ao JavaScript |
| Estilo | `className`, usando o CSS das aulas 7 e 8 |

> **Componente é uma função que devolve tela**, e o nome começa com letra
> maiúscula. Se começar com minúscula, o React trata como tag do HTML.

> **Três regras do JSX:** `className` no lugar de `class`; toda tag fecha,
> inclusive `<img />` e `<input />`; e o `return` devolve um elemento pai só.

> **Props são os parâmetros do componente.** Texto vai com aspas, e qualquer
> outra coisa vai com chaves. `qtd="2"` entrega o texto 2, e a conta dá errado.

> **Hoje a tela é estática.** Ela mostra dados que vieram por props e não reage
> a nada. Isso é de propósito: estado e eventos são a aula 15.

### Estado, eventos e listas (novo)

| Grupo | O que pode |
|---|---|
| Estado | `useState`, e só ele. Nenhum outro hook |
| Mudar estado | sempre pelo `set`, com um valor **novo** |
| Eventos | `onClick` e `onChange`, escritos na tag |
| Listas | `.map()` com `key` |
| Escrita com seta | `() => ...`, **somente** dentro de evento e de `map` |

> **Nunca mexa no estado direto.** Nada de `push` numa lista que está no estado.
> Monte uma lista nova com `[...lista, novoItem]` e entregue ao `set`. É o mesmo
> que vocês faziam com `for` e `push` na aula 11, com escrita mais curta.

> **A palavra `renderizar` não deve aparecer no seu código.** Se apareceu, você
> está tentando controlar a tela na mão, e é justamente isso que o estado resolve.

> **Um componente por arquivo,** na pasta `componentes`, com o nome do arquivo
> igual ao do componente. O nome precisa dizer o que a peça faz.

> **O estado mora no componente mais alto que precisa dele.** Props descem, e
> avisos sobem por funções passadas como props.

### Não pode usar

- **Outros hooks**: `useEffect`, `useContext`, `useReducer` e afins. Têm
  armadilhas que exigem tempo, e não cabem em duas aulas de React
- **Bibliotecas de componentes prontos**: Material UI, Chakra, Bootstrap React.
  Usar peça pronta agora significa não entender o que está acontecendo
- **Rotas** e gerenciamento de estado global
- **Escrita com seta fora de evento e de `map`**: nas outras funções, use `function`
- **`innerHTML`**, **`var`** e **`==`**
- **Manipular o DOM direto** com `document.querySelector` dentro de componente:
  quem cuida da tela agora é o React

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
| 11 | Listas simulando tabelas, buscar por id e renderizar | Assistido |
| 12 | Validação, mensagens na tela e classList | Assistido |
| 13 | fetch, async e await, e os três estados | Assistido |
| 14 | React: componentes, JSX e props | Assistido |
| 15 | Estado, listas com map e arquitetura | Assistido |
