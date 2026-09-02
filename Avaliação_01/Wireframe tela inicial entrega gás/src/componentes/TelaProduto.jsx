function formatarBRL(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function TelaProduto({ produtos, aoSelecionarProduto, aoVoltar }) {
  return (
    <div id="produtoScreen" className="screen">
      <div className="header-back">
        <button type="button" className="btn-back" onClick={aoVoltar}>
          ← Voltar
        </button>
        <div className="title-large">QUAL BOTIJÃO?</div>
        <div className="subtitle">Toque no produto entregue</div>
      </div>

      <div className="spacer"></div>

      <div className="thumb-zone" id="produtosContainer">
        {produtos.map((produto) => (
          <button
            key={produto.id}
            type="button"
            className="btn-produto"
            onClick={() => aoSelecionarProduto(produto)}
          >
            <div className="produto-left">
              <span className="produto-icon">{produto.icone}</span>
              <div className="produto-info">
                <div className="produto-nome">{produto.nome}</div>
                <div className="produto-tipo">{produto.descricao}</div>
              </div>
            </div>
            <div className="produto-preco">{formatarBRL(produto.preco)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TelaProduto;
