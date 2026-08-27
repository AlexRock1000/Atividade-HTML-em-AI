/* ═══════════════════════════════════════════════════════════ */
/* SISTEMA DE ENTREGAS DE GÁS - JAVASCRIPT PURO (Vanilla JS)      */
/* Objetivo: demonstrar lógica de navegação entre 'telas', ler/atualizar
   elementos do DOM e manter um estado simples da aplicação.        */
/* Restrição intencional: uso de estruturas básicas (let, if, function,
   addEventListener) para facilitar entendimento por iniciantes.    */
/* ═══════════════════════════════════════════════════════════ */

/* ─── DADOS E ESTADO ───
   O `estadoApp` guarda o estado atual da aplicação (tela atual,
   número de entregas, produto selecionado etc.). Separar o estado
   facilita a manutenção e permite atualizar a UI a partir dos dados.
*/
let estadoApp = {
  telaAtual: "home",           // qual 'tela' está visível
  entregasHoje: 7,             // contador de entregas do dia
  produtoSelecionado: null,    // objeto do produto escolhido
  formaPagamento: null,        // string: 'PIX', 'Dinheiro' ou 'Cartão'
  codigo: gerarCodigo(),       // código de comprovante gerado
  hora: formatHora(),          // hora inicial
  data: formatData()           // data inicial
};

/* Lista de produtos - será preenchida dinamicamente com dados do JSON */
let produtos = [];

/* Variável para armazenar dados completos do JSON */
let dadosAPI = null;

/* Histórico de entregas
   - Array em memória que armazena cada entrega confirmada durante
     a sessão. Em um app real você salvaria isto em backend ou
     localStorage/indexedDB para persistência.
   - Cada item é um objeto simples com: produto, preco, forma, data, hora, codigo.
*/
let historicoEntregas = [];

/* ─── FUNÇÕES UTILITÁRIAS ───
   Pequenas funções puras que não dependem do DOM, fáceis de testar:
*/
function gerarCodigo() {
  // Gera um identificador aleatório curto para o comprovante
  let codigo = "GAS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  return codigo;
}

function formatarBRL(valor) {
  // Formata número em moeda BRL localmente
  let formatado = valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return formatado;
}

function formatHora() {
  // Retorna hora atual no formato HH:MM (padStart garante 2 dígitos)
  let agora = new Date();
  let horas = String(agora.getHours()).padStart(2, "0");
  let minutos = String(agora.getMinutes()).padStart(2, "0");
  return horas + ":" + minutos;
}

function formatData() {
  // Data formatada localmente para pt-BR
  let agora = new Date();
  let data = agora.toLocaleDateString("pt-BR");
  return data;
}

function calcularGanhos() {
  // Regra simples: cada entrega gera R$18,00 de ganho
  let ganhos = estadoApp.entregasHoje * 18;
  return ganhos;
}

/* ─── CARREGAR DADOS DO JSON ───
   Faz fetch do arquivo dados.json e converte os dados para o formato
   esperado pela aplicação. Os produtos ganham um ícone para exibição.
*/
function carregarDadosJSON() {
  return fetch('../JavaScript/dados.json')
    .then(function(resposta) {
      if (!resposta.ok) {
        throw new Error('Erro ao carregar dados: HTTP ' + resposta.status);
      }
      return resposta.json();
    })
    .then(function(dados) {
      dadosAPI = dados;
      
      // Converte produtos do JSON para o formato esperado pela app
      // Se não houver icone definido, usa um padrão
      let icones = ["🔵", "🟠", "🔴", "🟡", "🟢"];
      produtos = dados.produtos.map(function(prod, index) {
        return {
          id: prod.id,
          nome: prod.nome,
          preco: prod.preco,
          icone: icones[index % icones.length],
          descricao: prod.descricao,
          disponivel: prod.disponivel
        };
      });
      
      console.log('✓ Dados do JSON carregados com sucesso!');
      console.log('Produtos:', produtos);
      return dados;
    })
    .catch(function(erro) {
      console.error('✗ Erro ao carregar dados.json:', erro);
      // Se falhar, usa os dados padrão
      produtos = [
        { id: 1, nome: "Botijão P13", preco: 120, icone: "🔵", descricao: "Botijão de gás", disponivel: true },
        { id: 2, nome: "Botijão P20", preco: 185, icone: "🟠", descricao: "Botijão de gás", disponivel: true },
        { id: 3, nome: "Botijão P45", preco: 390, icone: "🔴", descricao: "Botijão de gás", disponivel: true }
      ];
      console.log('Usando produtos padrão como fallback.');
    });
}

/* ─── FUNÇÕES DE NAVEGAÇÃO DE TELAS ───
   A aplicação tem várias 'divs' (screens). Para trocar de telas, removemos
   a classe `active` de todas e adicionamos à tela desejada. Isso evita
   recarregar a página e mantém estado em memória.
*/
function mudarTela(nomeTela) {
  if (estadoApp.telaAtual !== nomeTela) {
    let screens = document.querySelectorAll(".screen");
    let i = 0;
    while (i < screens.length) {
      screens[i].classList.remove("active");
      i = i + 1;
    }

    let tela = document.getElementById(nomeTela + "Screen");
    if (tela) {
      tela.classList.add("active");
    }

    estadoApp.telaAtual = nomeTela;
  }
}

/* ─── RENDERIZAR PRODUTOS DINAMICAMENTE ───
   Cria os botões de produto baseado na lista `produtos` carregada do JSON.
   Quando a tela de produtos é exibida, os botões já estão prontos com
   a mesma formatação visual dos botões hardcoded.
*/
function renderizarProdutos() {
  let container = document.getElementById('produtosContainer');
  if (!container) {
    console.log('Container de produtos não encontrado. Aguardando carregamento das telas...');
    return;
  }

  // Limpa conteúdo anterior
  container.innerHTML = '';

  // Cria um botão para cada produto
  let i = 0;
  while (i < produtos.length) {
    let prod = produtos[i];
    let botao = document.createElement('button');
    botao.id = 'btnProduto' + prod.id;
    botao.className = 'btn-produto';
    
    // Cria a estrutura HTML do botão (mesmo formato dos originais)
    botao.innerHTML = 
      '<div class="produto-left">' +
      '  <span class="produto-icon">' + prod.icone + '</span>' +
      '  <div class="produto-info">' +
      '    <div class="produto-nome">' + prod.nome + '</div>' +
      '    <div class="produto-tipo">' + prod.descricao + '</div>' +
      '  </div>' +
      '</div>' +
      '<div class="produto-preco">' + formatarBRL(prod.preco) + '</div>';
    
    // Liga evento de clique
    botao.addEventListener('click', function() {
      selecionarProduto(prod.id);
    });
    
    container.appendChild(botao);
    i = i + 1;
  }
}

/* ─── ATUALIZAR DADOS NAS TELAS ───
   Estas funções são responsáveis por sincronizar o estado com o DOM.
   Chame-as sempre que o estado mudar.
*/
function atualizarTelaHome() {
  let clockHome = document.getElementById("clockHome");
  if (clockHome) {
    clockHome.textContent = formatHora(); // atualiza hora exibida
  }

  let entregasCount = document.getElementById("entregas-count");
  if (entregasCount) {
    entregasCount.textContent = estadoApp.entregasHoje; // contador
  }

  let ganhosValue = document.getElementById("ganhos-value");
  if (ganhosValue) {
    let ganhos = calcularGanhos();
    ganhosValue.textContent = formatarBRL(ganhos); // exibe em BRL
  }
}

function atualizarTelaPagamento() {
  // Preenche os elementos da tela de pagamento com o produto selecionado
  if (estadoApp.produtoSelecionado) {
    let iconeProduto = document.getElementById("iconeProdutoPag");
    let nomeProduto = document.getElementById("nomeProdutoPag");
    let precoProduto = document.getElementById("precoProdutoPag");

    if (iconeProduto) {
      iconeProduto.textContent = estadoApp.produtoSelecionado.icone;
    }
    if (nomeProduto) {
      nomeProduto.textContent = estadoApp.produtoSelecionado.nome;
    }
    if (precoProduto) {
      precoProduto.textContent = formatarBRL(estadoApp.produtoSelecionado.preco);
    }
  }
}

function atualizarTelaComprovante() {
  // Monta o recibo com as informações atuais do estado
  if (estadoApp.produtoSelecionado && estadoApp.formaPagamento) {
    let iconePagamento = "📱";
    if (estadoApp.formaPagamento === "Dinheiro") {
      iconePagamento = "💵";
    } else if (estadoApp.formaPagamento === "Cartão") {
      iconePagamento = "💳";
    }

    let comprovanteBody = document.getElementById("comprovanteBody");
    if (comprovanteBody) {
      // Limpa o conteúdo anterior e cria linhas novas
      comprovanteBody.innerHTML = "";

      let rowProduto = document.createElement("div");
      rowProduto.className = "comprovante-row";
      rowProduto.innerHTML = '<div class="comprovante-label">Produto</div><div class="comprovante-value">' + estadoApp.produtoSelecionado.nome + "</div>";
      comprovanteBody.appendChild(rowProduto);

      let rowPagamento = document.createElement("div");
      rowPagamento.className = "comprovante-row";
      rowPagamento.innerHTML = '<div class="comprovante-label">Pagamento</div><div class="comprovante-value">' + iconePagamento + " " + estadoApp.formaPagamento + "</div>";
      comprovanteBody.appendChild(rowPagamento);

      let rowData = document.createElement("div");
      rowData.className = "comprovante-row";
      rowData.innerHTML = '<div class="comprovante-label">Data</div><div class="comprovante-value">' + estadoApp.data + "</div>";
      comprovanteBody.appendChild(rowData);

      let rowHora = document.createElement("div");
      rowHora.className = "comprovante-row";
      rowHora.innerHTML = '<div class="comprovante-label">Hora</div><div class="comprovante-value">' + estadoApp.hora + "</div>";
      comprovanteBody.appendChild(rowHora);

      let rowCodigo = document.createElement("div");
      rowCodigo.className = "comprovante-row";
      rowCodigo.innerHTML = '<div class="comprovante-label">Código</div><div class="comprovante-value mono">' + estadoApp.codigo + "</div>";
      comprovanteBody.appendChild(rowCodigo);
    }

    let totalValue = document.getElementById("totalValue");
    if (totalValue) {
      totalValue.textContent = formatarBRL(estadoApp.produtoSelecionado.preco);
    }
  }
}

/* ─── FLUXO DE EVENTOS ───
   Funções acionadas por cliques — alteram o estado e chamam
   as funções de atualização / navegação.
*/
function selecionarProduto(produtoId) {
  // Percorre a lista de produtos e define o selecionado no estado
  let i = 0;
  while (i < produtos.length) {
    if (produtos[i].id === produtoId) {
      estadoApp.produtoSelecionado = produtos[i];
      break;
    }
    i = i + 1;
  }

  atualizarTelaPagamento();
  mudarTela("pagamento");
}

function confirmarPagamento(forma) {
  // Atualiza estado com forma de pagamento, incrementa contador
  estadoApp.formaPagamento = forma;
  estadoApp.entregasHoje = estadoApp.entregasHoje + 1;
  estadoApp.codigo = gerarCodigo();
  estadoApp.hora = formatHora();

  // Registra a entrega no histórico em memória
  if (estadoApp.produtoSelecionado) {
    let registro = {
      produto: estadoApp.produtoSelecionado.nome,
      preco: estadoApp.produtoSelecionado.preco,
      formaPagamento: forma,
      data: estadoApp.data,
      hora: estadoApp.hora,
      codigo: estadoApp.codigo
    };
    historicoEntregas.push(registro);
  }

  atualizarTelaComprovante();
  mudarTela("comprovante");
}

/* Mostrar histórico
   - Cria um overlay/modal simples listando os registros de `historicoEntregas`.
   - Uso: botão 'HISTÓRICO DO DIA' invoca esta função.
*/
function mostrarHistorico() {
  // Evita criar múltiplos overlays
  if (document.getElementById('historicoOverlay')) return;

  let overlay = document.createElement('div');
  overlay.id = 'historicoOverlay';
  overlay.className = 'historico-overlay';

  // Cabeçalho do modal
  let card = document.createElement('div');
  card.className = 'historico-card';
  card.innerHTML = '<div class="historico-header">HISTÓRICO DO DIA <button id="closeHistorico" class="historico-close">FECHAR</button></div>';

  let body = document.createElement('div');
  body.className = 'historico-body';

  if (historicoEntregas.length === 0) {
    body.innerHTML = '<div class="historico-row">Nenhuma entrega registrada hoje.</div>';
  } else {
    // Lista cada entrega em linha
    let i = 0;
    while (i < historicoEntregas.length) {
      let r = historicoEntregas[i];
      let row = document.createElement('div');
      row.className = 'historico-row';
      row.innerHTML = '<div class="hist-prod">' + r.produto + '</div><div class="hist-preco">' + formatarBRL(r.preco) + '</div><div class="hist-meta">' + r.formaPagamento + ' • ' + r.hora + '</div>';
      body.appendChild(row);
      i = i + 1;
    }
  }

  card.appendChild(body);
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // Fecha o modal ao clicar no botão
  let btnClose = document.getElementById('closeHistorico');
  if (btnClose) {
    btnClose.addEventListener('click', function() {
      let el = document.getElementById('historicoOverlay');
      if (el) el.remove();
    });
  }
}

/* ─── TELA DE HISTÓRICO (versão tela completa) ───
   Popula o container `#historicoList` com os registros existentes
   e exibe a tela `historico` com `mudarTela('historico')`.
*/
function atualizarTelaHistorico() {
  let list = document.getElementById('historicoList');
  if (!list) return;
  list.innerHTML = '';

  if (historicoEntregas.length === 0) {
    let empty = document.createElement('div');
    empty.className = 'historico-row';
    empty.textContent = 'Nenhuma entrega registrada hoje.';
    list.appendChild(empty);
    return;
  }

  let i = 0;
  while (i < historicoEntregas.length) {
    let r = historicoEntregas[i];
    let row = document.createElement('div');
    row.className = 'historico-row';
    row.innerHTML = '<div class="hist-prod">' + r.produto + '</div><div class="hist-preco">' + formatarBRL(r.preco) + '</div><div class="hist-meta">' + r.formaPagamento + ' • ' + r.hora + '</div>';
    list.appendChild(row);
    i = i + 1;
  }
}

function mostrarHistoricoScreen() {
  // Atualiza conteúdo e navega para a tela de histórico
  atualizarTelaHistorico();
  mudarTela('historico');
}

function iniciarNovaEntrega() {
  // Reseta seleção para registrar nova entrega
  estadoApp.produtoSelecionado = null;
  estadoApp.formaPagamento = null;
  atualizarTelaHome();
  mudarTela("home");
}

function registrarEntrega() {
  mudarTela("produto");
}

function voltarProduto() {
  mudarTela("home");
}

function voltarPagamento() {
  mudarTela("produto");
}

/* ─── INICIALIZAÇÃO DE EVENTOS ───
   Procura elementos no DOM e liga os handlers de clique.
   Uso de `if (element)` evita erros se algum ID estiver faltando.
*/
function inicializarEventos() {
  let btnRegistrarEntrega = document.getElementById("btnRegistrarEntrega");
  if (btnRegistrarEntrega) {
    btnRegistrarEntrega.addEventListener("click", function() {
      registrarEntrega();
    });
  }

  // Vincula botão de histórico para abrir a tela de histórico
  // (substitui o modal flutuante). A função `mostrarHistoricoScreen`
  // atualiza o conteúdo e navega para a tela `historico`.
  let btnHistorico = document.getElementById('btnHistorico');
  if (btnHistorico) {
    btnHistorico.addEventListener('click', function() {
      mostrarHistoricoScreen();
    });
  }

  let btnVoltarProduto = document.getElementById("btnVoltarProduto");
  if (btnVoltarProduto) {
    btnVoltarProduto.addEventListener("click", function() {
      voltarProduto();
    });
  }

  // Nota: os botões de produto (btnProduto1, btnProduto2, btnProduto3) 
  // são criados dinamicamente na função renderizarProdutos()
  // baseado nos dados carregados do JSON. Não precisam de inicialização aqui.

  let btnVoltarPagamento = document.getElementById("btnVoltarPagamento");
  if (btnVoltarPagamento) {
    btnVoltarPagamento.addEventListener("click", function() {
      voltarPagamento();
    });
  }

  let btnPix = document.getElementById("btnPix");
  if (btnPix) {
    btnPix.addEventListener("click", function() {
      confirmarPagamento("PIX");
    });
  }

  let btnDinheiro = document.getElementById("btnDinheiro");
  if (btnDinheiro) {
    btnDinheiro.addEventListener("click", function() {
      confirmarPagamento("Dinheiro");
    });
  }

  let btnCartao = document.getElementById("btnCartao");
  if (btnCartao) {
    btnCartao.addEventListener("click", function() {
      confirmarPagamento("Cartão");
    });
  }

  let btnProxima = document.getElementById("btnProxima");
  if (btnProxima) {
    btnProxima.addEventListener("click", function() {
      iniciarNovaEntrega();
    });
  }

  // Botões da tela de histórico (existirão após o carregamento dos fragmentos)
  let btnVoltarHistorico = document.getElementById('btnVoltarHistorico');
  if (btnVoltarHistorico) {
    btnVoltarHistorico.addEventListener('click', function() {
      mudarTela('home');
    });
  }

  let btnLimparHistorico = document.getElementById('btnLimparHistorico');
  if (btnLimparHistorico) {
    btnLimparHistorico.addEventListener('click', function() {
      // Limpa o array de histórico e atualiza a tela
      historicoEntregas = [];
      atualizarTelaHistorico();
    });
  }
}

/* ─── INICIAR APLICAÇÃO ───
   Aguardamos DOMContentLoaded para garantir que os elementos existam
   antes de tentar acessá-los. Em páginas simples, verificar
   `document.readyState` permite inicializar imediatamente se já
   estiver pronto.
*/
function iniciarAplicacao() {
  renderizarProdutos(); // Renderiza os produtos carregados do JSON
  atualizarTelaHome();
  inicializarEventos();
}

/* ─── CARREGAMENTO DINÂMICO DAS TELAS ───
   Para facilitar manutenção, cada 'tela' foi extraída para um arquivo
   HTML separado (ex.: `home.html`). Esta função faz fetch desses
   fragmentos e os injeta dentro de `#screenContent` antes de iniciar
   a aplicação.
   
   IMPORTANTE: Primeiro carrega os dados JSON, depois carrega as telas.
*/
function loadScreens() {
  let container = document.getElementById("screenContent");
  
  // Primeiro, carrega os dados do JSON
  carregarDadosJSON().then(function() {
    if (!container) {
      // Se o container não existir, inicializamos para evitar erro
      iniciarAplicacao();
      return;
    }

    let parts = ["home.html", "produto.html", "pagamento.html", "comprovante.html", "historico.html"];
    let idx = 0;

    function next() {
      if (idx >= parts.length) {
        // Todas as partes carregadas - inicializa a app
        iniciarAplicacao();
        return;
      }

      let path = parts[idx];
      fetch(path).then(function(resp) {
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        return resp.text();
      }).then(function(html) {
        // Injeta o fragmento ao final do container
        container.insertAdjacentHTML('beforeend', html);
        idx = idx + 1;
        next();
      }).catch(function(err) {
        // Em caso de erro (ex.: abrir via file:// pode bloquear fetch em alguns navegadores),
        // logamos e continuamos para não travar a aplicação.
        console.error('Falha ao carregar', path, err);
        idx = idx + 1;
        next();
      });
    }

    next();
  });
}

// Inicia o carregamento das telas imediatamente (script é carregado no fim do body)
loadScreens();
