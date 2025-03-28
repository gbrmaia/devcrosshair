<div align="center">
  <img src="public/logo.png" alt="DevCrosshair Logo" width="180">
  <h1>DevCrosshair</h1>
  <p><strong>Ferramenta de precisão para desenvolvedores web e profissionais de QA</strong></p>
  
  <p>
    <a href="https://github.com/gbrmaia/devcrosshair/stargazers"><img src="https://img.shields.io/github/stars/gbrmaia/devcrosshair?style=flat-square&color=yellow" alt="Stars"></a>
    <a href="https://github.com/gbrmaia/devcrosshair/issues"><img src="https://img.shields.io/github/issues/gbrmaia/devcrosshair?style=flat-square&color=red" alt="Issues"></a>
    <a href="https://github.com/gbrmaia/devcrosshair/blob/main/LICENSE"><img src="https://img.shields.io/github/license/gbrmaia/devcrosshair?style=flat-square&color=blue" alt="License"></a>
    <a href="https://devcrosshair.vercel.app"><img src="https://img.shields.io/badge/demo-online-brightgreen?style=flat-square" alt="Demo"></a>
  </p>
  
  <br>
  
  <p>
    <a href="https://devcrosshair.vercel.app">🌐 Website</a> •
    <a href="#-instalação-rápida">🚀 Instalação</a> •
    <a href="#-funcionalidades">✨ Funcionalidades</a> •
    <a href="#-casos-de-uso">👥 Casos de Uso</a> •
    <a href="#-como-contribuir">🤝 Contribuir</a>
  </p>
</div>

## 📋 Sobre o Projeto

**DevCrosshair** é uma ferramenta de precisão para desenvolvedores web e profissionais de QA que facilita a medição, inspeção e análise de elementos em páginas web.

Projetada para ser **leve**, **não-intrusiva** e **fácil de usar**, o DevCrosshair pode ser carregado em qualquer site através do console do navegador, proporcionando uma experiência de desenvolvimento e teste mais eficiente.

<div align="center">
  <img src="public/screenshot.png" alt="DevCrosshair Screenshot" width="80%">
</div>

## 🚀 Instalação Rápida

1. Copie o script de carregamento abaixo
2. Abra o console do navegador (`F12` ou `Ctrl+Shift+J`)
3. Cole o script no console e pressione `Enter`
4. O DevCrosshair será carregado automaticamente

```javascript
(function () {
  const script = document.createElement("script");
  script.src = "https://devcrosshair.vercel.app/api/devcrosshair";
  document.body.appendChild(script);
})();
```
