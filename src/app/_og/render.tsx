import { ImageResponse } from "next/og";
import { perfil } from "@/data/portfolio";
import { nomeCompleto, siteHost } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

// Imagem de compartilhamento gerada por código (não depende de arquivos em /public).
export function renderOg() {
  const iniciais = `${perfil.nome[0] ?? ""}${perfil.sobrenome[0] ?? ""}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#f5f5f7",
          background:
            "radial-gradient(circle at 85% 15%, #1e3a8a 0%, #0b0b12 55%, #050507 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            fontSize: 44,
            fontWeight: 700,
            background: "linear-gradient(135deg, #6366f1, #22d3ee)",
            color: "#050507",
          }}
        >
          {iniciais}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -2 }}>
            {nomeCompleto}
          </div>
          <div style={{ fontSize: 48, color: "#a5b4fc", marginTop: 12 }}>
            {perfil.cargo}
          </div>
          <div style={{ fontSize: 30, color: "#94a3b8", marginTop: 28 }}>{siteHost}</div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
