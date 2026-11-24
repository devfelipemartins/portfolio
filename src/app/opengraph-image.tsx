import { nomeCompleto } from "@/lib/site";
import { perfil } from "@/data/portfolio";
import { renderOg, ogSize } from "./_og/render";

export const alt = `${nomeCompleto} — ${perfil.cargo}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg();
}
