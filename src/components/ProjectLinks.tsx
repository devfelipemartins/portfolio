import type { Projeto } from "@/data/portfolio";
import { GitHubIcon, ExternalIcon, PlayIcon } from "./icons";

const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-muted transition-colors hover:text-foreground";

export function ProjectLinks({ projeto }: { projeto: Projeto }) {
  return (
    <div className="relative z-10 mt-3 flex flex-wrap items-center gap-x-4 text-sm">
      {projeto.github && (
        <a href={projeto.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <GitHubIcon width={18} height={18} /> Código
        </a>
      )}
      {projeto.demo && (
        <a href={projeto.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <ExternalIcon width={18} height={18} /> Ver online
        </a>
      )}
      {projeto.video && (
        <a href={projeto.video} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <PlayIcon width={18} height={18} /> Vídeo
        </a>
      )}
    </div>
  );
}
