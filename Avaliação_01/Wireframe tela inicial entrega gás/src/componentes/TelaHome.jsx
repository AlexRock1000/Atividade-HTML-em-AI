import Botao from './Botao';

function formatarBRL(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function TelaHome({ entregasHoje, hora, aoRegistrarEntrega, aoAbrirHistorico }) {
  const ganhosHoje = entregasHoje * 18;

  return (
    <div id="homeScreen" className="screen active">
      <div className="status-bar">
        <span className="time">{hora}</span>
        <div className="status-info">
          <span className="status-online">● ONLINE</span>
          <span className="status-icons">📶 🔋</span>
        </div>
      </div>

      <div className="top-info">
        <div className="card-dark">
          <div className="label">ENTREGADOR</div>
          <div className="title-large">Éder Silva</div>
          <div className="stats-row">
            <div className="stat-box">
              <div className="label">HOJE</div>
              <div id="entregas-count" className="stat-value gold">
                {entregasHoje}
              </div>
              <div className="label-small">entregas</div>
            </div>
            <div className="stat-box">
              <div className="label">GANHOS</div>
              <div id="ganhos-value" className="stat-value green">
                {formatarBRL(ganhosHoje)}
              </div>
              <div className="label-small">comissão</div>
            </div>
          </div>
        </div>

        <div className="card-dark next-delivery">
          <div className="label">PRÓXIMA ENTREGA</div>
          <div className="delivery-info">
            <div className="delivery-icon">🏠</div>
            <div>
              <div className="delivery-address">Rua das Flores, 247 — Ap. 32</div>
              <div className="delivery-distance">1,2 km • ~8 min</div>
            </div>
          </div>
        </div>
      </div>

      <div className="spacer"></div>

      <div className="thumb-zone">
        {/* DECISAO SUA: o botao principal fica no fundo da tela para ser alcançado com o polegar sem precisar procurar. */}
        <Botao
          nome="REGISTRAR ENTREGA"
          icone="🛵"
          classe="btn-primary btn-large"
          aoTocar={aoRegistrarEntrega}
        />
        {/* DECISAO SUA: o historico fica como segundo atalho rapido, para o entregador rever o dia sem abrir uma arvore de menus. */}
        <Botao
          nome="HISTORICO DO DIA"
          icone="📋"
          classe="btn-secondary btn-medium"
          aoTocar={aoAbrirHistorico}
        />
      </div>
    </div>
  );
}

export default TelaHome;
