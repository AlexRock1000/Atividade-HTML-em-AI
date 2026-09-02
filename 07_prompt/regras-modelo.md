# regras.md: tela de [NOME DA PERSONA] em React

Este arquivo vai junto com todo prompt que eu mandar para a IA nesta atividade.
Ele diz quem usa a tela, o que ela precisa ter, o que eu ja sei e o que eu ainda
nao aprendi. Sem ele, a IA entrega uma tela generica para um usuario que nao existe.

---

## 1. Quem usa esta tela

Éder, 34 anos, entregador de gás de cozinha. Ele usa o aplicativo na rua, subindo escadas com um botijão de 13kg no ombro. Opera o celular com apenas uma mão (o dedão), sob a luz direta do sol (que gera reflexo e dificulta a leitura). Sofre constantes interrupções de clientes e precisa ser extremamente rápido para fechar a venda e mostrar o comprovante antes de ir para a próxima entrega.

Frase da persona:

> "Preciso bater o olho, ver o valor, receber do cliente e já correr para a próxima entrega sem ficar caçando botão no sol."

---

## 2. O que a tela e obrigada a ter

Cada item abaixo veio de uma parte da frase ou do perfil. A IA nao pode ignorar
nenhum deles. Se ignorar, eu recuso o codigo.

| A persona diz ou vive | A tela e obrigada a ter |
|---|---|
| enfrenta o sol direto na tela | Alto contraste extremo: Fundo branco puro ou preto puro, textos grandes em negrito e cores com alto contraste para não sumirem no reflexo do sol. |
| opera o celular com apenas uma mão | Zona de alcance do dedão: Botões de ação principais grandes (mínimo de 48px de altura) e posicionados na metade inferior da tela. |
| mostra o valor da cobrança rapidamente | Destaque do valor total: O preço final deve ser o maior elemento visual da tela, localizado no topo ou em um card centralizado. |
| mostrar o comprovante rapidamente | Acesso em 1 toque: Um botão direto e fixo na tela para "Gerar/Mostrar Comprovante", sem menus escondidos. |
| sobe escadas / pressa / interrupções | Confirmação dupla em cliques críticos: O botão de concluir a entrega deve exigir uma confirmação clara (ou ser muito destacado) para evitar cliques acidentais enquanto ele caminha ou guarda o celular. |

---

## 3. O que a tela nao pode ter

- Campos de digitação complexos: O Éder não pode parar para digitar texto ou valores com o teclado virtual no meio da rua. Tudo deve ser resolvido com botões de "+" e "-" ou seleções diretas.
- Textos pequenos ou fontes finas: Letras menores que 16px ou cinza-claro vão desaparecer sob a luz do sol.
- Ícones sem legenda de texto: Ícones abstratos geram dúvida e fazem ele perder tempo tentando adivinhar a função.
- Menus do tipo "Hambúrguer" (três risquinhos) ou dropdowns: Esconder funções essenciais obriga o entregador a dar múltiplos cliques com o celular instável na mão.
- Feedbacks visuais que duram poucos segundos: Se uma mensagem de "Sucesso" sumir sozinha muito rápido (toast), ele pode perder o aviso se o cliente o interromper.

---

## 4. O que eu ja sei e o codigo deve usar

- Projeto criado com Vite (`npm create vite@latest`, template react)
- Componentes escritos com `function`, um por arquivo, na pasta `src/componentes`
- JSX: `className`, chaves `{}` para valor, uma raiz por `return`
- Props recebidas com desestruturacao: `function Botao({ nome, aoTocar })`
- `useState` no componente mais alto que precisa do dado (em geral o `App`)
- Lista na tela com `map` e `key` vinda do id do item, nunca da posicao
- Eventos com `onClick`, chamando funcao recebida por props
- Dados fixos da tela (lista de itens, precos) em um arquivo na pasta `src/dados`
- O CSS da minha versao anterior, reaproveitado sem mudanca

---

## 5. O que eu ainda nao aprendi e o codigo nao pode ter

- `useContext`, `useReducer` ou qualquer outro hook alem de `useState`
- Bibliotecas de componentes (Material UI, Chakra, Bootstrap React) ou de estilo (styled-components, Tailwind)
- Rotas, estado global, `localStorage`, `fetch`
- `innerHTML`, `var`, `==`
- `document.querySelector` dentro de componente
- `push` em lista que esta no estado
- Funcao com seta fora de `onClick` e de `map`
- TypeScript, testes automatizados, animacao

Se a IA achar que precisa de algo desta lista, ela deve parar e me explicar por que,
em vez de usar.

---

## 6. Como eu quero que o codigo chegue

- Nomes de componentes, funcoes, variaveis e props em portugues, sem acento
- Comentarios dizem POR QUE a linha existe, ligando ao requisito da persona.
  Comentario que so repete o que a linha faz sera apagado
- Toda decisao de tela que afeta a persona (tamanho, cor, ordem, o que aparece)
  vem marcada com `// DECISAO SUA:` e uma frase explicando a escolha

---

## 7. Ponto de partida

O codigo abaixo e a minha tela atual, em HTML, CSS e JavaScript puros. A tarefa
e MIGRAR esta tela para React, nao inventar outra. A aparencia final tem que ser a mesma.

### index.html

```html
[colar]
```

### script.js

```js
[colar]
```

### estilo.css

Nao precisa reescrever. Sera copiado para `src/estilo.css` sem alteracao.
