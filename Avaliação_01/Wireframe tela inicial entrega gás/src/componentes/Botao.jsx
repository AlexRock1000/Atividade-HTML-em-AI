function Botao({ nome, aoTocar, icone, classe = 'btn-primary', tipo = 'botao' }) {
  return (
    <button type={tipo} className={classe} onClick={aoTocar}>
      {icone ? <span className="btn-icon">{icone}</span> : null}
      {nome}
    </button>
  );
}

export default Botao;
