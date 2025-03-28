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

## ✨ Funcionalidades

| `<h3>`🎯 Crosshair de Precisão`</h3>`
`<p>`Linhas guias vertical e horizontal que seguem o cursor com precisão de pixel.`</p>`

| `<h3>`📊 Coordenadas em Tempo Real`</h3>`
`<p>`Exibição das coordenadas X e Y do cursor atualizadas instantaneamente.`</p>`

| `<h3>`🔍 Inspeção de Elementos`</h3>`
`<p>`Informações detalhadas sobre o elemento sob o cursor, incluindo tags, classes e estilos.`</p>`

| `<h3>`🔤 Informações de Fonte`</h3>`
`<p>`Detalhes sobre as propriedades de texto do elemento, como família, tamanho e peso da fonte.`</p>`

| `<h3>`📏 Modo de Medição`</h3>`
`<p>`Medir distâncias entre dois pontos na página com precisão de pixel.`</p>`

| `<h3>`📐 Grade de Referência`</h3>`
`<p>`Sobreposição de grade personalizável para alinhamento e verificação de layout.`</p>`

| `<h3>`⌨️ Atalhos de Teclado`</h3>`
`<p>`Controles rápidos para todas as funcionalidades, aumentando sua produtividade.`</p>`

| `<h3>`📋 Copiar Informações`</h3>`
`<p>`Copiar para a área de transferência com um clique para documentação rápida.`</p>`

## ⌨️ Atalhos do Teclado

| Tecla           | Função                                  |
| --------------- | --------------------------------------- |
| `H`             | Mostrar/ocultar coordenadas             |
| `I`             | Mostrar/ocultar informações do elemento |
| `F`             | Mostrar/ocultar informações de fonte    |
| `M`             | Ativar/desativar modo de medição        |
| `G`             | Mostrar/ocultar grade                   |
| `C`             | Copiar coordenadas ou informações       |
| `ESC`           | Cancelar medição ou desativar           |
| `CTRL + Mouse`  | Mover apenas a linha horizontal         |
| `SHIFT + Mouse` | Mover apenas a linha vertical           |

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

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Apoie o Projeto

Se você achou o DevCrosshair útil, considere apoiar o desenvolvimento através de:

- ⭐ Dar uma estrela no GitHub
- 🐛 Reportar bugs e sugerir melhorias
- 🔄 Compartilhar com outros desenvolvedores
- ☕ [Pagar um café](https://devcrosshair.vercel.app/support) para o desenvolvedor
