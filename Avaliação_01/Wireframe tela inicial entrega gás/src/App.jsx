import { useState } from 'react';
import TelaHome from './componentes/TelaHome';
import TelaProduto from './componentes/TelaProduto';
import TelaPagamento from './componentes/TelaPagamento';
import TelaComprovante from './componentes/TelaComprovante';
import TelaHistorico from './componentes/TelaHistorico';
import produtos from './dados/produtos';

function formatarBRL(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatarHora() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  return `${horas}:${minutos}`;
}

function formatarData() {
  return new Date().toLocaleDateString('pt-BR');
}

function gerarCodigo() {
  return `GAS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState(null);
  const [codigo, setCodigo] = useState(gerarCodigo);
  const [hora, setHora] = useState(formatarHora);
  const [data] = useState(formatarData);
  const [entregasHoje, setEntregasHoje] = useState(7);
  const [historico, setHistorico] = useState([]);

  function selecionarProduto(produto) {
    setProdutoSelecionado(produto);
    setTelaAtual('pagamento');
  }

  function confirmarPagamento(forma) {
    if (!produtoSelecionado) {
      return;
    }

    const novoCodigo = gerarCodigo();
    const proximaHora = formatarHora();

    setFormaPagamento(forma);
    setEntregasHoje((valorAtual) => valorAtual + 1);
    setCodigo(novoCodigo);
    setHora(proximaHora);
    setHistorico((registros) => [
      ...registros,
      {
        produto: produtoSelecionado.nome,
        preco: formatarBRL(produtoSelecionado.preco),
        formaPagamento: forma,
        hora: proximaHora,
        codigo: novoCodigo,
      },
    ]);
    setTelaAtual('comprovante');
  }

  function novaEntrega() {
    setProdutoSelecionado(null);
    setFormaPagamento(null);
    setTelaAtual('home');
  }

  function limparHistorico() {
    setHistorico([]);
  }

  function abrirHistorico() {
    setTelaAtual('historico');
  }

  return (
    <div className="phone-frame">
      <div className="notch"></div>

      <div className="screen-content">
        {telaAtual === 'home' && (
          <TelaHome
            entregasHoje={entregasHoje}
            hora={hora}
            aoRegistrarEntrega={() => setTelaAtual('produto')}
            aoAbrirHistorico={abrirHistorico}
          />
        )}

        {telaAtual === 'produto' && (
          <TelaProduto
            produtos={produtos}
            aoSelecionarProduto={selecionarProduto}
            aoVoltar={() => setTelaAtual('home')}
          />
        )}

        {telaAtual === 'pagamento' && produtoSelecionado && (
          <TelaPagamento
            produtoSelecionado={produtoSelecionado}
            aoConfirmarPagamento={confirmarPagamento}
            aoVoltar={() => setTelaAtual('produto')}
          />
        )}

        {telaAtual === 'comprovante' && produtoSelecionado && formaPagamento && (
          <TelaComprovante
            produtoSelecionado={produtoSelecionado}
            formaPagamento={formaPagamento}
            codigo={codigo}
            hora={hora}
            data={data}
            aoNovaEntrega={novaEntrega}
          />
        )}

        {telaAtual === 'historico' && (
          <TelaHistorico
            historico={historico}
            aoVoltar={() => setTelaAtual('home')}
            aoLimparHistorico={limparHistorico}
          />
        )}
      </div>

      <div className="home-indicator"></div>
    </div>
  );
}
