import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Libera o acesso aos recursos de dev (HMR) a partir dos IPs desta máquina,
  // permitindo abrir o site em outro dispositivo via http://<ip>:3000.
  // 192.168.15.6 = Wi-Fi (rede local) · 26.118.96.209 = Radmin VPN.
  allowedDevOrigins: ["192.168.15.6", "26.118.96.209"],
};

export default nextConfig;
