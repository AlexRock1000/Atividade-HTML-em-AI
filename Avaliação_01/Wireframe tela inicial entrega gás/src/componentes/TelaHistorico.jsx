function TelaHistorico({ historico, aoVoltar, aoLimparHistorico }) {
  return (
    <div id="historicoScreen" className="screen">
      <div className="header-back">
        <button type="button" className="btn-back" onClick={aoVoltar}>
          ← Voltar
        </button>
        <div className="title-large">HISTÓRICO DO DIA</div>
        <div className="subtitle">Registros das entregas confirmadas</div>
      </div>

      <div className="spacer"></div>

      <div className="card-dark">
        <div id="historicoList" className="historico-list">
          {historico.length === 0 ? (
            <div className="historico-row">Nenhuma entrega registrada hoje.</div>
          ) : (
            historico.map((registro) => (
              <div key={registro.codigo} className="historico-row">
                <div className="hist-prod">{registro.produto}</div>
                <div className="hist-preco">{registro.preco}</div>
                <div className="hist-meta">
                  {registro.formaPagamento} • {registro.hora}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="spacer"></div>

      <div className="thumb-zone">
        <button type="button" className="btn-secondary btn-medium" onClick={aoLimparHistorico}>
          LIMPAR HISTÓRICO
        </button>
      </div>
    </div>
  );
}

export default TelaHistorico;
