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
  var modal = document.getElementById('modal-vaga');
  var modalTitulo = document.getElementById('titulo-modal-vaga');
  var modalLocalidade = document.querySelector('[data-modal="localidade"]');
  var modalSalario = document.querySelector('[data-modal="salario"]');
  var modalContrato = document.querySelector('[data-modal="contrato"]');
  var modalRequisitos = document.querySelector('[data-modal="requisitos"]');
  var modalDescricao = document.querySelector('[data-modal="descricao"]');
  var botaoFecharModal = document.querySelector('.modal-fechar');

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

  function abrirModalVaga(vaga) {
    if (!modal || !modalTitulo || !modalLocalidade || !modalSalario || !modalContrato || !modalRequisitos || !modalDescricao) {
      return;
    }

    var titulo = vaga.querySelector('h4') ? vaga.querySelector('h4').textContent.trim() : 'Vaga';
    var localidade = vaga.dataset.localidade || 'Não informado';
    var salario = vaga.dataset.salario || 'Não informado';
    var contrato = vaga.dataset.contrato || 'Não informado';
    var requisitos = vaga.dataset.requisitos || 'Não informado';
    var descricao = vaga.dataset.descricao || 'Não informado';

    modalTitulo.textContent = titulo;
    modalLocalidade.textContent = localidade;
    modalSalario.textContent = salario;
    modalContrato.textContent = contrato;
    modalRequisitos.textContent = requisitos;
    modalDescricao.textContent = descricao;
    modal.classList.add('ativo');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-aberto');
  }

  function fecharModalVaga() {
    if (!modal) {
      return;
    }

    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-aberto');
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
        var article = btn.closest('.vaga-card');
        if (article) {
          abrirModalVaga(article);
        }
      });
    })(i);
  }

  // Fecha a modal ao clicar fora do conteúdo ou no botão de fechar
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target && event.target.matches('[data-fechar-modal="true"]')) {
        fecharModalVaga();
      }
    });
  }

  if (botaoFecharModal) {
    botaoFecharModal.addEventListener('click', fecharModalVaga);
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal && modal.classList.contains('ativo')) {
      fecharModalVaga();
    }
  });

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
