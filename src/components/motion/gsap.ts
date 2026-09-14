"use client";

/* Ponto único de registro do GSAP e plugins.
   Importe daqui (não de "gsap" direto) para garantir que os plugins
   estejam registrados antes do uso. */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Curvas e durações padrão do projeto (vocabulário de movimento).
gsap.defaults({ ease: "power3.out", duration: 0.8 });

export { gsap, ScrollTrigger, SplitText, useGSAP };
