function formatarBRL(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function LinhaComprovante({ titulo, valor, mono = false }) {
  return (
    <div className="comprovante-row">
      <div className="comprovante-label">{titulo}</div>
      <div className={mono ? 'comprovante-value mono' : 'comprovante-value'}>{valor}</div>
    </div>
  );
}

function TelaComprovante({ produtoSelecionado, formaPagamento, codigo, hora, data, aoNovaEntrega }) {
  const iconePagamento = formaPagamento === 'PIX' ? '📱' : formaPagamento === 'Dinheiro' ? '💵' : '💳';

  return (
    <div id="comprovanteScreen" className="screen">
      <div className="comprovante-top">
        <div className="check-circle">✓</div>
        <div className="check-text">PAGO!</div>
      </div>

      <div className="card-dark comprovante-card">
        <div className="comprovante-header">
          <div className="label">COMPROVANTE DE ENTREGA</div>
          <div className="comprovante-empresa">GasFácil Distribuição</div>
        </div>

        <div className="comprovante-body">
          <LinhaComprovante titulo="Produto" valor={produtoSelecionado.nome} />
          <LinhaComprovante titulo="Pagamento" valor={`${iconePagamento} ${formaPagamento}`} />
          <LinhaComprovante titulo="Data" valor={data} />
          <LinhaComprovante titulo="Hora" valor={hora} />
          <LinhaComprovante titulo="Código" valor={codigo} mono={true} />
        </div>

        <div className="comprovante-total">
          <div className="label">TOTAL PAGO</div>
          <div className="total-value">{formatarBRL(produtoSelecionado.preco)}</div>
        </div>
      </div>

      <div className="spacer"></div>

      <div className="thumb-zone">
        {/* DECISAO SUA: a acao de nova entrega fica em destaque para o entregador sair do comprovante em um toque e seguir viagem. */}
        <button type="button" className="btn-primary btn-large" onClick={aoNovaEntrega}>
          <span className="btn-icon">🚀</span>
          PRÓXIMA ENTREGA
        </button>
      </div>
    </div>
  );
}

export default TelaComprovante;
