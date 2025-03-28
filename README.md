<div align="center">
  <img src="public/logo.png" alt="DevCrosshair Logo" width="180">
  <h1>DevCrosshair</h1>
  <p><strong>Ferramenta de precisão para desenvolvedores web e profissionais de QA</strong></p>
  
  <p>
    <a href="https://github.com/gbrmaia/devcrosshair/stargazers"><img src="https://img.shields.io/github/stars/gbrmaia/devcrosshair?style=flat-square&color=yellow" alt="Estrelas"></a>
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

## 👥 Casos de Uso

### 💻 Desenvolvedores Frontend

Verifique alinhamentos, espaçamentos e propriedades de elementos com precisão, garantindo que sua implementação corresponda exatamente ao design.

### 🎨 Designers UI/UX

Meça distâncias e verifique a consistência visual entre elementos, garantindo que o design seja implementado com fidelidade.

### 🔍 Profissionais de QA

Teste interfaces com precisão e documente problemas visuais com dados exatos, facilitando a comunicação com a equipe de desenvolvimento.

### 📱 Desenvolvedores Mobile

Verifique a responsividade e o comportamento em diferentes tamanhos de tela, garantindo uma experiência consistente em todos os dispositivos.

## 🛠️ Tecnologias Utilizadas

- **Next.js** - Framework React para o frontend e API routes
- **TypeScript** - Para tipagem estática e melhor manutenção do código
- **Tailwind CSS** - Para estilização eficiente e responsiva
- **Framer Motion** - Para animações fluidas e interativas

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## ⚠️ Limitações

Por funcionar através de injeção de script, o DevCrosshair pode não ser compatível com todas as páginas. Alguns sites implementam políticas de segurança (Content Security Policy - CSP) ou outras proteções que podem bloquear a execução de scripts externos. Nestes casos, a ferramenta pode não funcionar como esperado.

## 🙏 Apoie o Projeto

Se você achou o DevCrosshair útil, considere apoiar o desenvolvimento através de:

- ⭐ Dar uma estrela no GitHub
- 🐛 Reportar bugs e sugerir melhorias
- 🔄 Compartilhar com outros desenvolvedores
- ☕ [Pagar um café](https://devcrosshair.vercel.app) para o desenvolvedor
