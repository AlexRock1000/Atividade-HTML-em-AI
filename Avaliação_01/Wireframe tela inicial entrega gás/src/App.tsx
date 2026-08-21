import { useState } from "react";

type Screen = "home" | "produto" | "pagamento" | "comprovante";
type Produto = { nome: string; preco: number; icone: string };
type FormaPag = "PIX" | "Dinheiro" | "Cartão";

const PRODUTOS: Produto[] = [
  { nome: "Botijão P13", preco: 120, icone: "🔵" },
  { nome: "Botijão P20", preco: 185, icone: "🟠" },
  { nome: "Botijão P45", preco: 390, icone: "🔴" },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatHora() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function formatData() {
  return new Date().toLocaleDateString("pt-BR");
}

function gerarCodigo() {
  return "GAS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [produto, setProduto] = useState<Produto | null>(null);
  const [forma, setForma] = useState<FormaPag | null>(null);
  const [codigo] = useState(gerarCodigo);
  const [hora] = useState(formatHora);
  const [data] = useState(formatData);
  const [entregas, setEntregas] = useState(7);

  function selecionarProduto(p: Produto) {
    setProduto(p);
    setScreen("pagamento");
  }

  function confirmarPagamento(f: FormaPag) {
    setForma(f);
    setEntregas((n) => n + 1);
    setScreen("comprovante");
  }

  function novaEntrega() {
    setProduto(null);
    setForma(null);
    setScreen("home");
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: "#0a0a0a" }}>
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "390px",
          height: "844px",
          background: "#121212",
          borderRadius: "44px",
          boxShadow: "0 0 0 10px #1a1a1a, 0 0 0 12px #333, 0 40px 80px rgba(0,0,0,0.8)",
        }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div style={{ width: 126, height: 34, background: "#000", borderRadius: 20 }} />
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {screen === "home" && <HomeScreen entregas={entregas} onNova={() => setScreen("produto")} hora={hora} />}
          {screen === "produto" && <ProdutoScreen onSelect={selecionarProduto} onBack={() => setScreen("home")} />}
          {screen === "pagamento" && produto && (
            <PagamentoScreen produto={produto} onConfirm={confirmarPagamento} onBack={() => setScreen("produto")} />
          )}
          {screen === "comprovante" && produto && forma && (
            <ComprovanteScreen produto={produto} forma={forma} codigo={codigo} hora={hora} data={data} onNova={novaEntrega} />
          )}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-1 shrink-0">
          <div style={{ width: 134, height: 5, background: "#444", borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
}

/* ─── HOME ─── */
function HomeScreen({ entregas, onNova, hora }: { entregas: number; onNova: () => void; hora: string }) {
  return (
    <div className="flex flex-col h-full" style={{ padding: "0 20px" }}>
      {/* Status bar */}
      <div className="flex justify-between items-center py-2 shrink-0">
        <span style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>{hora}</span>
        <div className="flex gap-2 items-center">
          <span style={{ fontSize: 11, color: "#39FF14", fontWeight: 700 }}>● ONLINE</span>
          <span style={{ fontSize: 13, color: "#888" }}>📶 🔋</span>
        </div>
      </div>

      {/* Top info — read only, passive */}
      <div className="shrink-0" style={{ paddingTop: 8 }}>
        <div style={{ background: "#1e1e1e", borderRadius: 20, padding: "20px 20px" }}>
          <div style={{ color: "#888", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>ENTREGADOR</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginTop: 4 }}>Éder Silva</div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <div style={{ background: "#252525", borderRadius: 12, padding: "10px 16px", flex: 1 }}>
              <div style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>HOJE</div>
              <div style={{ color: "#FFD700", fontSize: 32, fontWeight: 900, lineHeight: 1.1 }}>{entregas}</div>
              <div style={{ color: "#888", fontSize: 12 }}>entregas</div>
            </div>
            <div style={{ background: "#252525", borderRadius: 12, padding: "10px 16px", flex: 1 }}>
              <div style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>GANHOS</div>
              <div style={{ color: "#39FF14", fontSize: 28, fontWeight: 900, lineHeight: 1.1 }}>
                {formatBRL(entregas * 18)}
              </div>
              <div style={{ color: "#888", fontSize: 12 }}>comissão</div>
            </div>
          </div>
        </div>

        {/* Next delivery info */}
        <div style={{ background: "#1e1e1e", borderRadius: 20, padding: "16px 20px", marginTop: 12 }}>
          <div style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
            PRÓXIMA ENTREGA
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                width: 48,
                height: 48,
                background: "#FFD700",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                flexShrink: 0,
              }}
            >
              🏠
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Rua das Flores, 247 — Ap. 32</div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>1,2 km • ~8 min</div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer pushes button to bottom half */}
      <div className="flex-1" />

      {/* THUMB ZONE — bottom half */}
      <div className="shrink-0" style={{ paddingBottom: 20 }}>
        <button
          onClick={onNova}
          style={{
            width: "100%",
            height: 90,
            background: "#FFD700",
            borderRadius: 24,
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            fontWeight: 900,
            color: "#121212",
            letterSpacing: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            boxShadow: "0 4px 32px rgba(255,215,0,0.35)",
          }}
        >
          <span style={{ fontSize: 30 }}>🛵</span>
          REGISTRAR ENTREGA
        </button>

        <button
          style={{
            width: "100%",
            height: 72,
            background: "#1e1e1e",
            borderRadius: 20,
            border: "2px solid #333",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: 700,
            color: "#888",
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 22 }}>📋</span>
          HISTÓRICO DO DIA
        </button>
      </div>
    </div>
  );
}

/* ─── PRODUTO ─── */
function ProdutoScreen({ onSelect, onBack }: { onSelect: (p: Produto) => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ padding: "0 20px" }}>
      {/* Header */}
      <div className="shrink-0" style={{ paddingTop: 8, paddingBottom: 16 }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#FFD700",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            padding: "8px 0",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ← Voltar
        </button>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginTop: 8 }}>QUAL BOTIJÃO?</div>
        <div style={{ fontSize: 14, color: "#888", marginTop: 4 }}>Toque no produto entregue</div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* THUMB ZONE — product buttons */}
      <div className="shrink-0" style={{ paddingBottom: 20, display: "flex", flexDirection: "column", gap: 14 }}>
        {PRODUTOS.map((p) => (
          <button
            key={p.nome}
            onClick={() => onSelect(p)}
            style={{
              width: "100%",
              height: 100,
              background: "#1e1e1e",
              borderRadius: 24,
              border: "2px solid #333",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 28px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 38 }}>{p.icone}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{p.nome}</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>Botijão de gás</div>
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#FFD700" }}>{formatBRL(p.preco)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── PAGAMENTO ─── */
function PagamentoScreen({
  produto,
  onConfirm,
  onBack,
}: {
  produto: Produto;
  onConfirm: (f: FormaPag) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col h-full" style={{ padding: "0 20px" }}>
      <div className="shrink-0" style={{ paddingTop: 8, paddingBottom: 16 }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#FFD700",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            padding: "8px 0",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ← Voltar
        </button>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginTop: 8 }}>COBRAR CLIENTE</div>
      </div>

      {/* Product summary — top half, read only */}
      <div className="shrink-0">
        <div
          style={{
            background: "#1e1e1e",
            borderRadius: 24,
            padding: "24px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48 }}>{produto.icone}</div>
          <div style={{ fontSize: 18, color: "#888", fontWeight: 600, marginTop: 8 }}>{produto.nome}</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "#FFD700", lineHeight: 1.1, marginTop: 8 }}>
            {formatBRL(produto.preco)}
          </div>
          <div style={{ fontSize: 14, color: "#888", marginTop: 6 }}>Mostre para o cliente conferir</div>
        </div>
      </div>

      <div className="flex-1" />

      {/* THUMB ZONE — payment method */}
      <div className="shrink-0" style={{ paddingBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#888", fontWeight: 700, letterSpacing: 1, marginBottom: 12, textAlign: "center" }}>
          FORMA DE PAGAMENTO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={() => onConfirm("PIX")}
            style={{
              width: "100%",
              height: 84,
              background: "#39FF14",
              borderRadius: 22,
              border: "none",
              cursor: "pointer",
              fontSize: 22,
              fontWeight: 900,
              color: "#121212",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              boxShadow: "0 4px 24px rgba(57,255,20,0.3)",
            }}
          >
            <span style={{ fontSize: 30 }}>📱</span> PIX
          </button>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => onConfirm("Dinheiro")}
              style={{
                flex: 1,
                height: 84,
                background: "#1e1e1e",
                borderRadius: 22,
                border: "2px solid #333",
                cursor: "pointer",
                fontSize: 18,
                fontWeight: 900,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 28 }}>💵</span>
              Dinheiro
            </button>
            <button
              onClick={() => onConfirm("Cartão")}
              style={{
                flex: 1,
                height: 84,
                background: "#1e1e1e",
                borderRadius: 22,
                border: "2px solid #333",
                cursor: "pointer",
                fontSize: 18,
                fontWeight: 900,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 28 }}>💳</span>
              Cartão
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── COMPROVANTE ─── */
function ComprovanteScreen({
  produto,
  forma,
  codigo,
  hora,
  data,
  onNova,
}: {
  produto: Produto;
  forma: FormaPag;
  codigo: string;
  hora: string;
  data: string;
  onNova: () => void;
}) {
  const iconePag = forma === "PIX" ? "📱" : forma === "Dinheiro" ? "💵" : "💳";

  return (
    <div className="flex flex-col h-full" style={{ padding: "0 20px" }}>
      {/* Comprovante card — top portion */}
      <div className="shrink-0" style={{ paddingTop: 12 }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#39FF14",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              margin: "0 auto 8px",
              boxShadow: "0 0 24px rgba(57,255,20,0.4)",
            }}
          >
            ✓
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#39FF14" }}>PAGO!</div>
        </div>

        {/* Receipt */}
        <div
          style={{
            background: "#1e1e1e",
            borderRadius: 24,
            padding: "20px 24px",
            border: "1px solid #333",
          }}
        >
          <div style={{ textAlign: "center", borderBottom: "1px dashed #333", paddingBottom: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: "#888", fontWeight: 700, letterSpacing: 1 }}>COMPROVANTE DE ENTREGA</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>GasFácil Distribuição</div>
          </div>

          <Row label="Produto" value={produto.nome} />
          <Row label="Pagamento" value={`${iconePag} ${forma}`} />
          <Row label="Data" value={data} />
          <Row label="Hora" value={hora} />
          <Row label="Código" value={codigo} mono />

          <div
            style={{
              borderTop: "1px dashed #333",
              marginTop: 16,
              paddingTop: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: "#888" }}>TOTAL PAGO</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#FFD700" }}>{formatBRL(produto.preco)}</div>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {/* THUMB ZONE */}
      <div className="shrink-0" style={{ paddingBottom: 20 }}>
        <button
          onClick={onNova}
          style={{
            width: "100%",
            height: 90,
            background: "#FFD700",
            borderRadius: 24,
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            fontWeight: 900,
            color: "#121212",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            boxShadow: "0 4px 32px rgba(255,215,0,0.35)",
          }}
        >
          <span style={{ fontSize: 30 }}>🚀</span>
          PRÓXIMA ENTREGA
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <div style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>{label}</div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#fff",
          fontFamily: mono ? "monospace" : undefined,
          letterSpacing: mono ? 1 : 0,
        }}
      >
        {value}
      </div>
    </div>
  );
}
