"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CopyIcon,
  Github,
  Linkedin,
  MousePointerClick,
  Crosshair,
  Info,
  Ruler,
  Grid,
  Type,
  Copy,
  X,
  Coffee,
  Heart,
  Code,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

  const loaderScript = `(function(){
const script = document.createElement('script');
script.src = '${baseUrl}/api/devcrosshair';
document.body.appendChild(script);
})();`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(loaderScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("usage");
  const [showSupport, setShowSupport] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const rotateX = useTransform(
    smoothY,
    [0, typeof window !== "undefined" ? window.innerHeight : 1000],
    [2, -2]
  );
  const rotateY = useTransform(
    smoothX,
    [0, typeof window !== "undefined" ? window.innerWidth : 1000],
    [-2, 2]
  );

  useEffect(() => {
    // Inicializar os valores no lado do cliente
    if (typeof window !== "undefined") {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });

      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSupport(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const shortcuts = [
    {
      key: "H",
      desc: "Mostrar/ocultar coordenadas",
      icon: <MousePointerClick size={16} />,
    },
    {
      key: "I",
      desc: "Mostrar/ocultar informações do elemento",
      icon: <Info size={16} />,
    },
    {
      key: "F",
      desc: "Mostrar/ocultar informações de fonte",
      icon: <Type size={16} />,
    },
    {
      key: "M",
      desc: "Ativar/desativar modo de medição",
      icon: <Ruler size={16} />,
    },
    { key: "G", desc: "Mostrar/ocultar grade", icon: <Grid size={16} /> },
    {
      key: "C",
      desc: "Copiar coordenadas ou informações",
      icon: <Copy size={16} />,
    },
    {
      key: "ESC",
      desc: "Cancelar medição ou desativar",
      icon: <X size={16} />,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white blueprint-grid">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "DevCrosshair",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Ferramenta de precisão para desenvolvedores web e profissionais de QA que facilita a medição, inspeção e análise de elementos em páginas web.",
            author: {
              "@type": "Person",
              name: "Gabriel Maia",
            },
          }),
        }}
      />
      <div className="absolute top-0 left-0 w-full h-20 ruler-h opacity-30" />
      <div className="absolute top-0 left-0 h-full w-20 ruler-v opacity-30" />

      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />

      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative z-10">
        <motion.div
          ref={containerRef}
          className="w-full max-w-4xl"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            perspective: 1000,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="relative">
              <Crosshair className="w-12 h-12 text-white" />
              <motion.div
                className="absolute inset-0 w-12 h-12 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                style={{ opacity: 0.2 }}
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white">
                Dev<span className="text-gray-400">Crosshair</span>
              </h1>
              <p className="text-gray-400 mt-1">
                Ferramenta de precisão para desenvolvedores web e profissionais
                de QA
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <Card className="w-full overflow-hidden bg-black/40 border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-sm font-mono text-gray-400">
                  DevCrosshair
                </div>
                <div className="w-16"></div>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "usage"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("usage")}
                >
                  Como Usar
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "shortcuts"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("shortcuts")}
                >
                  Atalhos
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "code"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("code")}
                >
                  <Code size={16} className="mr-1 inline-block" />
                  Código
                </button>
                <button
                  className={`px-4 py-2 font-medium flex items-center gap-1 ${
                    activeTab === "support"
                      ? "text-white border-b-2 border-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("support")}
                >
                  <Coffee size={16} className="mr-1" />
                  Apoiar
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 2,
                      duration: 0.5,
                    }}
                  >
                    <Heart
                      size={14}
                      className="text-red-500 ml-1"
                      fill="#ef4444"
                    />
                  </motion.div>
                </button>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "usage" ? (
                    <motion.div
                      key="usage"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-4 text-white">
                        Instalação Rápida
                      </h2>

                      <p className="mb-4 text-gray-300">
                        Ideal para desenvolvedores web e profissionais de QA que
                        precisam testar interfaces com precisão.
                      </p>

                      <ol className="list-decimal pl-5 space-y-3 mb-6 text-gray-300">
                        <li className="transition-colors duration-300 hover:text-white">
                          Copie o script abaixo clicando no botão "Copiar"
                        </li>
                        <li className="transition-colors duration-300 hover:text-white">
                          Abra o console do navegador (F12 ou Ctrl+Shift+J)
                        </li>
                        <li className="transition-colors duration-300 hover:text-white">
                          Cole o script no console e pressione Enter
                        </li>
                        <li className="transition-colors duration-300 hover:text-white">
                          O DevCrosshair será carregado automaticamente
                        </li>
                      </ol>

                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-4 mb-6">
                        <div className="flex items-start gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-amber-500 mt-0.5"
                          >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          <div className="text-amber-200 text-sm">
                            <strong className="font-medium">Observação:</strong>{" "}
                            Por funcionar através de injeção de script, o
                            DevCrosshair pode não ser compatível com todas as
                            páginas. Alguns sites implementam políticas de
                            segurança (CSP) ou outras proteções que podem
                            bloquear scripts externos.
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <pre className="p-4 bg-black text-gray-300 rounded-md overflow-x-auto border border-white/10 font-mono text-sm">
                          <code>{loaderScript}</code>
                        </pre>
                        <Button
                          variant="secondary"
                          size="sm"
                          className={`absolute top-2 right-2 ${
                            copied
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-white/10 hover:bg-white/20 text-white"
                          } transition-all duration-300`}
                          onClick={copyToClipboard}
                        >
                          {copied ? (
                            <>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 15,
                                }}
                              >
                                ✓
                              </motion.div>
                              <span className="ml-1">Copiado</span>
                            </>
                          ) : (
                            <>
                              <CopyIcon className="h-4 w-4 mr-1" />
                              Copiar
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ) : activeTab === "shortcuts" ? (
                    <motion.div
                      key="shortcuts"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-4 text-white">
                        Atalhos do Teclado
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {shortcuts.map((shortcut, index) => (
                          <motion.div
                            key={shortcut.key}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 text-white">
                              {shortcut.icon}
                            </div>
                            <div>
                              <span className="font-mono text-sm bg-white/10 px-2 py-1 rounded text-white">
                                {shortcut.key}
                              </span>
                              <span className="ml-2 text-gray-300">
                                {shortcut.desc}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-4 text-sm text-gray-400 border-t border-white/10 pt-4">
                        <p>
                          Nota: As opções "Info" e "Fontes" não podem ser
                          ativadas simultaneamente.
                        </p>
                        <p className="mt-2">
                          Use{" "}
                          <span className="font-mono bg-white/10 px-1 rounded">
                            CTRL
                          </span>{" "}
                          + Mouse para mover apenas a linha horizontal.
                        </p>
                        <p className="mt-1">
                          Use{" "}
                          <span className="font-mono bg-white/10 px-1 rounded">
                            SHIFT
                          </span>{" "}
                          + Mouse para mover apenas a linha vertical.
                        </p>
                      </div>
                    </motion.div>
                  ) : activeTab === "code" ? (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-4 text-white">
                        Código Aberto
                      </h2>

                      <div className="space-y-4 text-gray-300">
                        <p>
                          O DevCrosshair é um projeto de código aberto,
                          desenvolvido para ajudar a comunidade de
                          desenvolvedores web e profissionais de QA. Todo o
                          código-fonte está disponível no GitHub sob a licença
                          MIT.
                        </p>

                        <div className="bg-white/5 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-white mb-2">
                            Tecnologias Utilizadas
                          </h3>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Next.js para o frontend e API routes</li>
                            <li>TypeScript para tipagem estática</li>
                            <li>Tailwind CSS para estilização</li>
                            <li>Framer Motion para animações</li>
                          </ul>
                        </div>

                        <div className="bg-white/5 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-white mb-2">
                            Estrutura do Projeto
                          </h3>
                          <p className="mb-2">
                            O projeto é organizado em módulos para facilitar a
                            manutenção e extensão:
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              <span className="text-amber-400">
                                lib/devcrosshair/
                              </span>
                              : Contém todos os módulos do script
                            </li>
                            <li>
                              <span className="text-amber-400">
                                api/devcrosshair/
                              </span>
                              : Endpoint que serve o script
                            </li>
                            <li>
                              <span className="text-amber-400">
                                app/page.tsx
                              </span>
                              : Interface do site
                            </li>
                          </ul>
                        </div>

                        <div className="bg-white/5 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-white mb-2">
                            Como Contribuir
                          </h3>
                          <p>
                            Contribuições são bem-vindas! Você pode ajudar de
                            várias formas:
                          </p>
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>Reportando bugs e problemas</li>
                            <li>Sugerindo novas funcionalidades</li>
                            <li>Melhorando a documentação</li>
                            <li>
                              Enviando pull requests com correções ou novos
                              recursos
                            </li>
                          </ul>
                        </div>

                        <p>
                          O código-fonte completo está disponível no GitHub.
                          Sinta-se à vontade para fazer um fork, explorar e
                          contribuir para o projeto!
                        </p>
                      </div>

                      <div className="mt-6 flex justify-center">
                        <motion.a
                          href="https://github.com/gbrmaia/devcrosshair"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md flex items-center gap-2 border border-white/10"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={18} />
                          Ver no GitHub
                        </motion.a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="support"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 text-center"
                      >
                        <h2 className="text-2xl font-bold mb-2 text-white">
                          Apoie este Projeto
                        </h2>
                        <p className="text-gray-300 max-w-md">
                          O DevCrosshair é uma ferramenta gratuita e de código
                          aberto. Se você achou útil, considere me pagar um
                          café! ☕
                        </p>
                      </motion.div>

                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <motion.div
                          className="relative p-2 bg-white rounded-lg shadow-lg"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <Image
                            src="/qr.png"
                            alt="QR Code PIX para apoiar o projeto"
                            width={192}
                            height={192}
                            className="w-48 h-48"
                          />

                          <motion.div
                            className="absolute inset-0 rounded-lg"
                            initial={{ opacity: 0.5 }}
                            animate={{
                              opacity: [0.2, 0.5, 0.2],
                              boxShadow: [
                                "0 0 0 0px rgba(255, 255, 255, 0.2)",
                                "0 0 0 4px rgba(255, 255, 255, 0.2)",
                                "0 0 0 0px rgba(255, 255, 255, 0.2)",
                              ],
                            }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 2,
                              ease: "easeInOut",
                            }}
                            style={{ pointerEvents: "none" }}
                          />
                        </motion.div>

                        <motion.div
                          className="max-w-xs"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          <h3 className="text-xl font-semibold mb-3 text-white">
                            Por que apoiar?
                          </h3>
                          <ul className="space-y-3 text-gray-300">
                            <motion.li
                              className="flex items-start gap-2"
                              whileHover={{ x: 5 }}
                            >
                              <div className="mt-1 text-green-400">✓</div>
                              <div>
                                Ajuda a manter o projeto atualizado e com novas
                                funcionalidades
                              </div>
                            </motion.li>
                            <motion.li
                              className="flex items-start gap-2"
                              whileHover={{ x: 5 }}
                            >
                              <div className="mt-1 text-green-400">✓</div>
                              <div>
                                Incentiva a criação de mais ferramentas
                                gratuitas para desenvolvedores
                              </div>
                            </motion.li>
                            <motion.li
                              className="flex items-start gap-2"
                              whileHover={{ x: 5 }}
                            >
                              <div className="mt-1 text-green-400">✓</div>
                              <div>Café = Código melhor! ☕💻</div>
                            </motion.li>
                          </ul>

                          <motion.p
                            className="mt-4 text-sm text-gray-400 italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                          >
                            "Sua contribuição faz toda a diferença. Obrigado por
                            apoiar desenvolvedores independentes!"
                          </motion.p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center mt-8 gap-4"
          >
            <motion.a
              href="https://www.linkedin.com/in/gabriel-maia-9a701924b/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center gap-2">
                <Linkedin size={18} />
                LinkedIn
              </Button>
            </motion.a>

            <motion.a
              href="https://github.com/gbrmaia/devcrosshair"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center gap-2">
                <Github size={18} />
                GitHub
              </Button>
            </motion.a>

            <motion.button
              onClick={() => setActiveTab("support")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-md flex items-center gap-2 border border-amber-700"
            >
              <Coffee size={18} />
              Apoiar
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-4 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Desenvolvido por Gabriel Maia
        </motion.div>
      </main>

      <AnimatePresence>
        {showSupport && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSupport(false)}
          >
            <motion.div
              className="bg-black/80 border border-white/10 rounded-lg p-6 max-w-md mx-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Coffee className="text-amber-500" size={24} />
                  <h2 className="text-xl font-bold text-white">
                    Gostou do DevCrosshair?
                  </h2>
                </div>
                <button
                  onClick={() => setShowSupport(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-gray-300 mb-4">
                Esta ferramenta foi desenvolvida com ❤️ para ajudar
                desenvolvedores como você. Se ela economizou seu tempo ou
                melhorou seu trabalho, considere me pagar um café!
              </p>

              <div className="flex justify-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-1 rounded-lg"
                >
                  <Image
                    src="/QR.png"
                    alt="QR Code PIX para apoiar o projeto"
                    width={128}
                    height={128}
                    className="w-32 h-32"
                  />
                </motion.div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => {
                    setShowSupport(false);
                    setActiveTab("support");
                  }}
                >
                  <Coffee size={16} className="mr-2" />
                  Apoiar o projeto
                </Button>
                <Button
                  variant="outline"
                  className="border-white/10 text-gray-400 hover:text-white"
                  onClick={() => setShowSupport(false)}
                >
                  Mais tarde
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
