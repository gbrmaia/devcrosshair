"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CopyIcon,
  Github,
  Linkedin,
  MousePointerClick,
  Crosshair,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  // Corrigindo o protocolo para HTTP quando estiver rodando localmente
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
  };

  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showLines, setShowLines] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLines(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-blue-500 opacity-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {showLines && (
        <>
          <motion.div
            className="fixed top-0 h-[1px] w-full bg-blue-400/20 pointer-events-none"
            initial={{ opacity: 0, top: mousePosition.y }}
            animate={{ opacity: 0.5, top: mousePosition.y }}
            transition={{ duration: 0.1 }}
            style={{ top: mousePosition.y }}
          />
          <motion.div
            className="fixed left-0 w-[1px] h-full bg-blue-400/20 pointer-events-none"
            initial={{ opacity: 0, left: mousePosition.x }}
            animate={{ opacity: 0.5, left: mousePosition.x }}
            transition={{ duration: 0.1 }}
            style={{ left: mousePosition.x }}
          />
        </>
      )}

      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-3xl opacity-20" />
      <div className="absolute top-1/3 -right-20 w-60 h-60 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-3xl opacity-20" />
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 blur-3xl opacity-20" />

      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <Crosshair className="w-10 h-10 text-blue-400" />
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            DevCrosshair
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="w-full max-w-3xl p-6 mb-8 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <motion.h2
              className="text-2xl font-semibold mb-4 text-blue-300"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Como usar
            </motion.h2>

            <motion.ol
              className="list-decimal pl-5 space-y-2 mb-6 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <li className="transition-colors duration-300 hover:text-blue-300">
                Copie o script abaixo clicando no botão "Copiar"
              </li>
              <li className="transition-colors duration-300 hover:text-blue-300">
                Abra o console do navegador (F12 ou Ctrl+Shift+J)
              </li>
              <li className="transition-colors duration-300 hover:text-blue-300">
                Cole o script no console e pressione Enter
              </li>
              <li className="transition-colors duration-300 hover:text-blue-300">
                O DevCrosshair será carregado automaticamente
              </li>
            </motion.ol>

            <motion.div
              className="relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-md overflow-x-auto border border-gray-700">
                <code>{loaderScript}</code>
              </pre>
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white transition-transform duration-300 hover:scale-105"
                onClick={copyToClipboard}
              >
                <CopyIcon className="h-4 w-4 mr-1" />
                Copiar
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="w-full max-w-3xl p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">
              Atalhos do DevCrosshair
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  key: "H",
                  desc: "Mostrar/ocultar coordenadas",
                  icon: <MousePointerClick size={16} />,
                },
                {
                  key: "I",
                  desc: "Mostrar/ocultar informações do elemento",
                  icon: <MousePointerClick size={16} />,
                },
                {
                  key: "F",
                  desc: "Mostrar/ocultar informações de fonte",
                  icon: <MousePointerClick size={16} />,
                },
                {
                  key: "M",
                  desc: "Ativar/desativar modo de medição",
                  icon: <MousePointerClick size={16} />,
                },
                {
                  key: "G",
                  desc: "Mostrar/ocultar grade",
                  icon: <MousePointerClick size={16} />,
                },
                {
                  key: "C",
                  desc: "Copiar coordenadas ou informações",
                  icon: <MousePointerClick size={16} />,
                },
                {
                  key: "ESC",
                  desc: "Cancelar medição ou desativar",
                  icon: <MousePointerClick size={16} />,
                },
              ].map((shortcut, index) => (
                <motion.div
                  key={shortcut.key}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-500/20 text-blue-300">
                    {shortcut.icon}
                  </div>
                  <div>
                    <span className="font-mono text-sm bg-gray-700 px-2 py-1 rounded text-blue-300">
                      {shortcut.key}
                    </span>
                    <span className="ml-2 text-gray-300">{shortcut.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-400 border-t border-gray-700 pt-4">
              <p>
                Nota: As opções "Info" e "Fontes" não podem ser ativadas
                simultaneamente.
              </p>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <motion.a
                href="https://www.linkedin.com/in/gabriel-maia-9a701924b/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-[#0077B5] hover:bg-[#0077B5]/80 text-white flex items-center gap-2">
                  <Linkedin size={18} />
                  LinkedIn
                </Button>
              </motion.a>

              <motion.a
                href="https://github.com/gbrmaia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-[#333] hover:bg-[#333]/80 text-white flex items-center gap-2">
                  <Github size={18} />
                  GitHub
                </Button>
              </motion.a>
            </div>
          </Card>
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
    </div>
  );
}
