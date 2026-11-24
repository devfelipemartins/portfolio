import type { NextConfig } from "next";

// Origens extras permitidas no dev server (ex.: abrir o site no celular via
// http://<ip>:3000). Defina NEXT_DEV_ORIGINS no .env.local com hostnames/IPs
// separados por vírgula, sem porta nem protocolo. Ex.:
//   NEXT_DEV_ORIGINS=192.168.0.10,*.minha-rede.local
const allowedDevOrigins = (process.env.NEXT_DEV_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  allowedDevOrigins,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
