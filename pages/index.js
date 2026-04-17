import { useState } from "react";

// --- Dados dos sorteios (edite aqui os números do dia) ---
const SORTEIOS = {
  lotofacil: {
    data: "17/04/2025",
    concurso: 3382,
    numeros: [1, 3, 5, 7, 9, 10, 12, 14, 16, 17, 19, 20, 22, 24, 25],
  },
  lotomania: {
    data: "17/04/2025",
    concurso: 2681,
    numeros: [
      4, 8, 13, 21, 27, 33, 38, 44, 51, 56, 62, 68, 74, 80, 85, 90, 95, 97, 99,
      0,
    ],
  },
};

// Cores das bolas por jogo
const CORES = {
  lotofacil: {
    bola: "#9B30FF",
    bola2: "#C77DFF",
    bg: "rgba(155,48,255,0.13)",
    border: "rgba(155,48,255,0.45)",
    glow: "0 0 18px 4px rgba(155,48,255,0.35)",
    badge: "#9B30FF",
  },
  lotomania: {
    bola: "#FF6B00",
    bola2: "#FFA040",
    bg: "rgba(255,107,0,0.13)",
    border: "rgba(255,107,0,0.45)",
    glow: "0 0 18px 4px rgba(255,107,0,0.35)",
    badge: "#FF6B00",
  },
};

function Bola({ numero, cor, cor2, glow, delay }) {
  const label = String(numero).padStart(2, "0");
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: `radial-gradient(circle at 36% 34%, ${cor2}, ${cor} 72%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Oswald', sans-serif",
        fontWeight: 700,
        fontSize: 20,
        color: "#fff",
        boxShadow: `${glow}, inset 0 2px 6px rgba(255,255,255,0.22)`,
        animation: `popIn 0.4s ease both`,
        animationDelay: delay,
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {label}
    </div>
  );
}

function CardSorteio({ tipo, dados }) {
  const c = CORES[tipo];
  const titulo = tipo === "lotofacil" ? "Lotofácil" : "Lotomania";
  const icone = tipo === "lotofacil" ? "🍀" : "🎲";

  return (
    <div
      style={{
        background: "rgba(18,18,28,0.85)",
        border: `1.5px solid ${c.border}`,
        borderRadius: 20,
        padding: "32px 36px 28px",
        boxShadow: `0 8px 48px rgba(0,0,0,0.5), ${c.glow}`,
        backdropFilter: "blur(16px)",
        width: "100%",
        maxWidth: 640,
      }}
    >
      {/* Cabeçalho */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}>{icone}</span>
          <div>
            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: 1,
              }}
            >
              {titulo}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                marginTop: 1,
              }}
            >
              Concurso #{dados.concurso}
            </div>
          </div>
        </div>
        <div
          style={{
            background: c.badge,
            borderRadius: 8,
            padding: "5px 13px",
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: "#fff",
            letterSpacing: 1,
            opacity: 0.92,
          }}
        >
          {dados.data}
        </div>
      </div>

      {/* Divisor */}
      <div
        style={{
          height: 1,
          background: c.border,
          marginBottom: 24,
          opacity: 0.5,
        }}
      />

      {/* Bolas */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {dados.numeros.map((n, i) => (
          <Bola
            key={n}
            numero={n}
            cor={c.bola}
            cor2={c.bola2}
            glow={c.glow}
            delay={`${i * 60}ms`}
          />
        ))}
      </div>

      {/* Rodapé */}
      <div
        style={{
          marginTop: 22,
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          color: "rgba(255,255,255,0.3)",
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        {dados.numeros.length} números sorteados
      </div>
    </div>
  );
}

export default function Home() {
  const hoje = new Date().toLocaleDateString("pt-BR");

  return (
    <>
      {/* Fontes via Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a14;
          min-height: 100vh;
          overflow-x: hidden;
        }

        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          70%  { transform: scale(1.1) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes floatUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* Background com efeito de grade */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 50% at 20% 20%, rgba(155,48,255,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,107,0,0.10) 0%, transparent 60%),
            linear-gradient(180deg, #0a0a14 0%, #0d0d1a 100%)
          `,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Grid de pontos decorativos */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Conteúdo principal */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 20px 80px",
          animation: "floatUp 0.7s ease both",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Resultado do dia — {hoje}
          </div>
          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: 2,
              lineHeight: 1.1,
            }}
          >
            SORTEIOS DA
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #9B30FF, #FF6B00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SORTE
            </span>
          </h1>

          {/* Indicador ao vivo */}
          <div
            style={{
              marginTop: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "5px 14px",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: 1,
              }}
            >
              ATUALIZADO
            </span>
          </div>
        </div>

        {/* Cards dos sorteios */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            width: "100%",
            maxWidth: 680,
            alignItems: "center",
          }}
        >
          <CardSorteio tipo="lotofacil" dados={SORTEIOS.lotofacil} />
          <CardSorteio tipo="lotomania" dados={SORTEIOS.lotomania} />
        </div>

        {/* Rodapé */}
        <div
          style={{
            marginTop: 60,
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          PROVA DE CONCEITO — APENAS PARA FINS INTERNOS
        </div>
      </main>
    </>
  );
}
