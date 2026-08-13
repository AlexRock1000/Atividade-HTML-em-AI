/*
POR QUE: separar o JavaScript mantém o comportamento fora do HTML e facilita
leitura e revisão. Este arquivo apenas simula interações básicas de um
candidato: clicar em "Ver vagas", clicar em "Saiba mais" e marcar interesse
em um card. Uso apenas APIs permitidas nesta etapa (querySelector, textContent,
addEventListener, leitura de campos e iterações simples).
*/

document.addEventListener("DOMContentLoaded", function() {
  // área de feedback: uso o parágrafo do cabeçalho da seção de vagas para mostrar mensagens
  var secaoCabecalhoP = document.querySelector('.secao-cabecalho p');

  function setStatus(text) {
    // POR QUE: mostrar uma mensagem clara ao candidato sobre o que a ação faria.
    if (secaoCabecalhoP) {
      secaoCabecalhoP.textContent = text;
    } else {
      var rodapeP = document.querySelector('.rodape p');
      if (rodapeP) {
        rodapeP.textContent = text;
      } else {
        console.log(text);
      }
    }
    console.log('SIMULAÇÃO:', text);
  }

  // Botão principal: "Ver vagas"
  var botaoPrincipal = document.querySelector('.botao-principal');
  if (botaoPrincipal) {
    botaoPrincipal.addEventListener('click', function(event) {
      event.preventDefault();
      // POR QUE: indicar ao candidato a navegação esperada e simular a rolagem/âncora.
      setStatus('SIMULAÇÃO: Navegando para a lista de vagas...');
      window.location.hash = '#vagas';
    });
  }

  // Botões "Saiba mais" em cada card
  var botoesSaiba = document.querySelectorAll('.botao-secundario');
  for (var i = 0; i < botoesSaiba.length; i = i + 1) {
    (function(idx) {
      var btn = botoesSaiba[idx];
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        // POR QUE: exibir ao candidato um resumo da vaga sem navegar para outra página.
        var article = btn.parentElement; // estrutura atual: <a> dentro de <article>
        var tituloEl = article.querySelector('h4');
        var detalhesEl = article.querySelector('.detalhes');
        var titulo = tituloEl ? tituloEl.textContent : 'Vaga';
        var detalhes = detalhesEl ? detalhesEl.textContent : 'Sem detalhes.';
        setStatus('SIMULAÇÃO: ' + titulo + ' — ' + detalhes);
      });
    })(i);
  }

  // Clique no card para marcar/remover interesse (simulação)
  var cards = document.querySelectorAll('.vaga-card');
  for (var j = 0; j < cards.length; j = j + 1) {
    (function(k) {
      var card = cards[k];
      card.addEventListener('click', function(e) {
        // POR QUE: permitir que o candidato simule demonstrar interesse sem enviar formulário.
        var tag = e.target.tagName.toLowerCase();
        if (tag === 'a' || tag === 'button') {
          // não conflitar com o clique em links internos
          return;
        }
        var tituloEl = card.querySelector('h4');
        var nome = tituloEl ? tituloEl.textContent : 'vaga';
        if (card.dataset.aplicado === 'true') {
          card.dataset.aplicado = 'false';
          setStatus('SIMULAÇÃO: Você removeu o interesse em "' + nome + '".');
        } else {
          card.dataset.aplicado = 'true';
          setStatus('SIMULAÇÃO: Você demonstrou interesse em "' + nome + '".');
        }
      });
    })(j);
  }

});
