/* ═══════════════════════════════════════════════════════════ */
/* SISTEMA DE ENTREGAS DE GÁS - JAVASCRIPT PURO (Vanilla JS)  */
/* Restrição: let, if, function, addEventListener             */
/* ═══════════════════════════════════════════════════════════ */

/* ─── DADOS E ESTADO ─── */
let estadoApp = {
  telaAtual: "home",
  entregasHoje: 7,
  produtoSelecionado: null,
  formaPagamento: null,
  codigo: gerarCodigo(),
  hora: formatHora(),
  data: formatData()
};

let produtos = [
  { id: 1, nome: "Botijão P13", preco: 120, icone: "🔵" },
  { id: 2, nome: "Botijão P20", preco: 185, icone: "🟠" },
  { id: 3, nome: "Botijão P45", preco: 390, icone: "🔴" }
];

/* ─── FUNÇÕES UTILITÁRIAS ─── */
function gerarCodigo() {
  let codigo = "GAS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  return codigo;
}

function formatarBRL(valor) {
  let formatado = valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return formatado;
}

function formatHora() {
  let agora = new Date();
  let horas = String(agora.getHours()).padStart(2, "0");
  let minutos = String(agora.getMinutes()).padStart(2, "0");
  return horas + ":" + minutos;
}

function formatData() {
  let agora = new Date();
  let data = agora.toLocaleDateString("pt-BR");
  return data;
}

function calcularGanhos() {
  let ganhos = estadoApp.entregasHoje * 18;
  return ganhos;
}

/* ─── FUNÇÕES DE NAVEGAÇÃO DE TELAS ─── */
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

/* ─── ATUALIZAR DADOS NAS TELAS ─── */
function atualizarTelaHome() {
  let clockHome = document.getElementById("clockHome");
  if (clockHome) {
    clockHome.textContent = formatHora();
  }

  let entregasCount = document.getElementById("entregas-count");
  if (entregasCount) {
    entregasCount.textContent = estadoApp.entregasHoje;
  }

  let ganhosValue = document.getElementById("ganhos-value");
  if (ganhosValue) {
    let ganhos = calcularGanhos();
    ganhosValue.textContent = formatarBRL(ganhos);
  }
}

function atualizarTelaPagamento() {
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
  if (estadoApp.produtoSelecionado && estadoApp.formaPagamento) {
    let iconePagamento = "📱";
    if (estadoApp.formaPagamento === "Dinheiro") {
      iconePagamento = "💵";
    } else if (estadoApp.formaPagamento === "Cartão") {
      iconePagamento = "💳";
    }

    let comprovanteBody = document.getElementById("comprovanteBody");
    if (comprovanteBody) {
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

/* ─── FLUXO DE EVENTOS ─── */
function selecionarProduto(produtoId) {
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
  estadoApp.formaPagamento = forma;
  estadoApp.entregasHoje = estadoApp.entregasHoje + 1;
  estadoApp.codigo = gerarCodigo();
  estadoApp.hora = formatHora();
  atualizarTelaComprovante();
  mudarTela("comprovante");
}

function iniciarNovaEntrega() {
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

/* ─── INICIALIZAÇÃO DE EVENTOS ─── */
function inicializarEventos() {
  let btnRegistrarEntrega = document.getElementById("btnRegistrarEntrega");
  if (btnRegistrarEntrega) {
    btnRegistrarEntrega.addEventListener("click", function() {
      registrarEntrega();
    });
  }

  let btnVoltarProduto = document.getElementById("btnVoltarProduto");
  if (btnVoltarProduto) {
    btnVoltarProduto.addEventListener("click", function() {
      voltarProduto();
    });
  }

  let btnProduto1 = document.getElementById("btnProduto1");
  if (btnProduto1) {
    btnProduto1.addEventListener("click", function() {
      selecionarProduto(1);
    });
  }

  let btnProduto2 = document.getElementById("btnProduto2");
  if (btnProduto2) {
    btnProduto2.addEventListener("click", function() {
      selecionarProduto(2);
    });
  }

  let btnProduto3 = document.getElementById("btnProduto3");
  if (btnProduto3) {
    btnProduto3.addEventListener("click", function() {
      selecionarProduto(3);
    });
  }

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
}

/* ─── INICIAR APLICAÇÃO ─── */
function iniciarAplicacao() {
  atualizarTelaHome();
  inicializarEventos();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    iniciarAplicacao();
  });
} else {
  iniciarAplicacao();
}
