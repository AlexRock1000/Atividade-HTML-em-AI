function formatarBRL(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function TelaPagamento({ produtoSelecionado, aoConfirmarPagamento, aoVoltar }) {
  return (
    <div id="pagamentoScreen" className="screen">
      <div className="header-back">
        <button type="button" className="btn-back" onClick={aoVoltar}>
          ← Voltar
        </button>
        <div className="title-large">COBRAR CLIENTE</div>
      </div>

      <div className="product-summary">
        {/* DECISAO SUA: o valor fica em destaque central para o cliente confirmar a cobrança sem perder tempo. */}
        <div className="summary-icon">{produtoSelecionado.icone}</div>
        <div className="summary-nome">{produtoSelecionado.nome}</div>
        <div className="summary-preco">{formatarBRL(produtoSelecionado.preco)}</div>
        <div className="summary-hint">Mostre para o cliente conferir</div>
      </div>

      <div className="spacer"></div>

      <div className="thumb-zone">
        <div className="payment-label">FORMA DE PAGAMENTO</div>
        <button type="button" className="btn-pagamento btn-pix" onClick={() => aoConfirmarPagamento('PIX')}>
          <span className="btn-icon">📱</span> PIX
        </button>
        <div className="pagamento-row">
          <button type="button" className="btn-pagamento btn-pagamento-alt" onClick={() => aoConfirmarPagamento('Dinheiro')}>
            <span className="btn-icon">💵</span>
            <span>Dinheiro</span>
          </button>
          <button type="button" className="btn-pagamento btn-pagamento-alt" onClick={() => aoConfirmarPagamento('Cartão')}>
            <span className="btn-icon">💳</span>
            <span>Cartão</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelaPagamento;
