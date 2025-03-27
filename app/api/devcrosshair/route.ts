export async function GET() {
  // Importar os módulos necessários
  const { initialState } = await import("@/lib/devcrosshair/state")

  // Montar o código do DevCrosshair de forma mais eficiente
  const devCrosshairCode = `// DevCrosshair - Script para console do navegador
(function() {
  // Estado e UI
  const state = ${JSON.stringify(initialState)};
  const ui = {
    verticalLine: document.createElement('div'),
    horizontalLine: document.createElement('div'),
    coordinatesDisplay: document.createElement('div'),
    elementInfoDisplay: document.createElement('div'),
    measureDisplay: document.createElement('div'),
    gridContainer: document.createElement('div'),
    controlPanel: document.createElement('div'),
    fontInfoDisplay: document.createElement('div')
  };

  // Funções utilitárias
  const rgbToHex = (rgb) => {
    // Verifica se já é um valor hexadecimal
    if (rgb.startsWith("#")) {
      return rgb;
    }

    // Extrai os valores RGB
    const rgbValues = rgb.match(/\\d+/g);
    if (!rgbValues || rgbValues.length < 3) {
      return rgb; // Retorna o original se não conseguir converter
    }

    // Converte para hexadecimal
    return (
      "#" +
      rgbValues
        .slice(0, 3)
        .map((x) => {
          const hex = Number.parseInt(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const showNotification = (message, isError = false) => {
    const notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.bottom = "80px";
    notification.style.right = "20px";
    notification.style.backgroundColor = isError ? "#ef4444" : "#10b981";
    notification.style.color = "white";
    notification.style.padding = "8px 16px";
    notification.style.borderRadius = "4px";
    notification.style.fontFamily = "system-ui, -apple-system, sans-serif";
    notification.style.fontSize = "14px";
    notification.style.zIndex = "1000001";
    notification.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remover após 2 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 2000);
  };
  
  // Função para posicionar os displays em quadrantes diferentes
  const positionDisplays = (x, y) => {
    // Determinar em qual quadrante da tela o cursor está
    const isRightHalf = x > window.innerWidth / 2;
    const isBottomHalf = y > window.innerHeight / 2;
    
    // Posicionar coordenadas
    if (state.showCoordinates) {
      ui.coordinatesDisplay.style.left = isRightHalf ? \`\${x - 150}px\` : \`\${x + 15}px\`;
      ui.coordinatesDisplay.style.top = isBottomHalf ? \`\${y - 40}px\` : \`\${y + 15}px\`;
    }
    
    // Posicionar informações do elemento
    if (state.showElementInfo) {
      ui.elementInfoDisplay.style.left = isRightHalf ? \`\${x - 320}px\` : \`\${x + 15}px\`;
      ui.elementInfoDisplay.style.top = isBottomHalf ? \`\${y - 180}px\` : \`\${y + 50}px\`;
    }
    
    // Posicionar informações de fonte
    if (state.showFontInfo) {
      ui.fontInfoDisplay.style.left = isRightHalf ? \`\${x - 320}px\` : \`\${x + 15}px\`;
      ui.fontInfoDisplay.style.top = isBottomHalf ? \`\${y - 250}px\` : \`\${y + 50}px\`;
    }
    
    // Posicionar medição
    if (state.measureMode && state.measureStart) {
      ui.measureDisplay.style.left = isRightHalf ? \`\${x - 250}px\` : \`\${x + 15}px\`;
      ui.measureDisplay.style.top = isBottomHalf ? \`\${y - 80}px\` : \`\${y - 30}px\`;
    }
  };

  // Atualizar a grade
  const updateGrid = () => {
    // Verificar se ui e ui.gridContainer existem
    if (!ui || !ui.gridContainer) return;
    
    // Remover grade existente
    if (ui.gridContainer.parentNode) {
      document.body.removeChild(ui.gridContainer);
    }

    // Criar nova grade se necessário
    if (state.showGrid) {
      ui.gridContainer = document.createElement('div');
      ui.gridContainer.style.position = 'fixed';
      ui.gridContainer.style.top = '0';
      ui.gridContainer.style.left = '0';
      ui.gridContainer.style.width = '100%';
      ui.gridContainer.style.height = '100%';
      ui.gridContainer.style.zIndex = '999997';
      ui.gridContainer.style.pointerEvents = 'none';
      
      // Criar linhas verticais da grade
      for (let x = state.gridSize; x < window.innerWidth; x += state.gridSize) {
        const gridLine = document.createElement('div');
        gridLine.style.position = 'absolute';
        gridLine.style.top = '0';
        gridLine.style.left = \`\${x}px\`;
        gridLine.style.width = '1px';
        gridLine.style.height = '100%';
        gridLine.style.backgroundColor = 'rgba(128, 128, 255, 0.3)';
        ui.gridContainer.appendChild(gridLine);
      }
      
      // Criar linhas horizontais da grade
      for (let y = state.gridSize; y < window.innerHeight; y += state.gridSize) {
        const gridLine = document.createElement('div');
        gridLine.style.position = 'absolute';
        gridLine.style.top = \`\${y}px\`;
        gridLine.style.left = '0';
        gridLine.style.width = '100%';
        gridLine.style.height = '1px';
        gridLine.style.backgroundColor = 'rgba(128, 128, 255, 0.3)';
        ui.gridContainer.appendChild(gridLine);
      }

      document.body.appendChild(ui.gridContainer);
    }
  };

  // Função para alternar ativação
  const toggleActive = () => {
    state.active = !state.active;

    // Atualizar visibilidade dos elementos
    ui.verticalLine.style.display = state.active ? "block" : "none";
    ui.horizontalLine.style.display = state.active ? "block" : "none";
    ui.coordinatesDisplay.style.display = state.active && state.showCoordinates ? "block" : "none";
    ui.elementInfoDisplay.style.display = state.active && state.showElementInfo ? "block" : "none";
    ui.fontInfoDisplay.style.display = state.active && state.showFontInfo ? "block" : "none";

    if (!state.active) {
      // Esconder medição
      ui.measureDisplay.style.display = "none";
      const measureLine = document.getElementById("dc-measure-line");
      if (measureLine) measureLine.remove();

      // Esconder grade
      if (ui.gridContainer.parentNode) {
        document.body.removeChild(ui.gridContainer);
      }
    } else if (state.showGrid) {
      updateGrid();
    }

    // Atualizar botão
    const button = document.getElementById("dc-toggle");
    if (button) {
      button.style.backgroundColor = state.active ? "#3b82f6" : "#e2e8f0";
      button.style.color = state.active ? "white" : "black";
      button.textContent = state.active ? "Ativar" : "Desativar";
    }
  };

  // Função para alternar coordenadas
  const toggleCoordinates = () => {
    state.showCoordinates = !state.showCoordinates;

    // Atualizar botão
    const button = document.getElementById("dc-coords");
    if (button) {
      button.style.backgroundColor = state.showCoordinates ? "#3b82f6" : "#e2e8f0";
      button.style.color = state.showCoordinates ? "white" : "black";
    }
  };

  // Função para alternar informações do elemento
  const toggleElementInfo = () => {
    // Se estiver ativando as informações do elemento, desativar as informações de fonte
    if (!state.showElementInfo) {
      state.showElementInfo = true;

      // Desativar informações de fonte se estiver ativo
      if (state.showFontInfo) {
        state.showFontInfo = false;
        const fontButton = document.getElementById("dc-font");
        if (fontButton) {
          fontButton.style.backgroundColor = "#e2e8f0";
          fontButton.style.color = "black";
        }
        ui.fontInfoDisplay.style.display = "none";
      }
    } else {
      state.showElementInfo = false;
    }

    // Atualizar botão
    const button = document.getElementById("dc-element");
    if (button) {
      button.style.backgroundColor = state.showElementInfo ? "#3b82f6" : "#e2e8f0";
      button.style.color = state.showElementInfo ? "white" : "black";
    }
  };

  // Função para alternar informações de fonte
  const toggleFontInfo = () => {
    // Se estiver ativando as informações de fonte, desativar as informações do elemento
    if (!state.showFontInfo) {
      state.showFontInfo = true;

      // Desativar informações do elemento se estiver ativo
      if (state.showElementInfo) {
        state.showElementInfo = false;
        const elementButton = document.getElementById("dc-element");
        if (elementButton) {
          elementButton.style.backgroundColor = "#e2e8f0";
          elementButton.style.color = "black";
        }
        ui.elementInfoDisplay.style.display = "none";
      }
    } else {
      state.showFontInfo = false;
    }

    // Atualizar botão
    const button = document.getElementById("dc-font");
    if (button) {
      button.style.backgroundColor = state.showFontInfo ? "#3b82f6" : "#e2e8f0";
      button.style.color = state.showFontInfo ? "white" : "black";
    }

    // Mostrar ou esconder display de informações de fonte
    ui.fontInfoDisplay.style.display = state.showFontInfo ? "block" : "none";
  };

  // Função para alternar modo de medição
  const toggleMeasureMode = () => {
    state.measureMode = !state.measureMode;

    // Resetar medição atual
    if (!state.measureMode) {
      state.measureStart = null;
      const measureLine = document.getElementById("dc-measure-line");
      if (measureLine) measureLine.remove();
      ui.measureDisplay.style.display = "none";
    }

    // Atualizar botão
    const button = document.getElementById("dc-measure");
    if (button) {
      button.style.backgroundColor = state.measureMode ? "#3b82f6" : "#e2e8f0";
      button.style.color = state.measureMode ? "white" : "black";
    }
  };

  // Função para alternar grade
  const toggleGrid = () => {
    state.showGrid = !state.showGrid;
    updateGrid();

    // Atualizar botão
    const button = document.getElementById("dc-grid");
    if (button) {
      button.style.backgroundColor = state.showGrid ? "#3b82f6" : "#e2e8f0";
      button.style.color = state.showGrid ? "white" : "black";
    }
  };

  // Função para copiar informações (coordenadas ou informações do elemento)
  const copyInfo = () => {
    let text = "";

    if (state.showElementInfo && state.hoveredElement) {
      // Copiar todas as informações do elemento
      const element = state.hoveredElement;
      const computedStyle = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      // Converter cores para hexadecimal
      const textColor = rgbToHex(computedStyle.color);
      const bgColor = rgbToHex(computedStyle.backgroundColor);

      text =
        \`Posição: X: \${state.mousePosition.x}px, Y: \${state.mousePosition.y}px
\` +
        \`Tag: \${element.tagName.toLowerCase()}
\` +
        \`ID: \${element.id || "none"}
\` +
        \`Class: \${element.className || "none"}
\` +
        \`Tamanho: \${Math.round(rect.width)}px × \${Math.round(rect.height)}px
\` +
        \`Cor do texto: \${textColor}
\` +
        \`Cor de fundo: \${bgColor}\`;
    } else if (state.showFontInfo && state.hoveredElement) {
      // Copiar informações de fonte
      const element = state.hoveredElement;
      const computedStyle = window.getComputedStyle(element);

      text = \`Font Family: \${computedStyle.fontFamily}
Font Size: \${computedStyle.fontSize}
Font Weight: \${computedStyle.fontWeight}
Line Height: \${computedStyle.lineHeight}
Letter Spacing: \${computedStyle.letterSpacing}
Text Align: \${computedStyle.textAlign}
Text Transform: \${computedStyle.textTransform}
Font Style: \${computedStyle.fontStyle}
Text Decoration: \${computedStyle.textDecoration}\`;
    } else {
      // Copiar apenas as coordenadas
      text = \`X: \${state.mousePosition.x}px, Y: \${state.mousePosition.y}px\`;
    }

    // Método alternativo para copiar para o clipboard
    try {
      // Método 1: Usando a API Clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => {
            showNotification("Informações copiadas!");
          })
          .catch(err => {
            console.error("Erro ao copiar (método 1): ", err);
            // Tentar método alternativo
            copyUsingExecCommand(text);
          });
      } else {
        // Método 2: Usando execCommand (fallback)
        copyUsingExecCommand(text);
      }
    } catch (err) {
      console.error("Erro ao copiar: ", err);
      showNotification("Erro ao copiar informações", true);
    }
  };

  // Função auxiliar para copiar usando execCommand (método alternativo)
  const copyUsingExecCommand = (text) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';  // Evita rolar para o elemento
      textarea.style.opacity = '0';       // Torna invisível
      document.body.appendChild(textarea);
      textarea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        showNotification("Informações copiadas!");
      } else {
        showNotification("Não foi possível copiar. Tente pressionar Ctrl+C.", true);
      }
    } catch (err) {
      console.error("Erro ao copiar (método 2): ", err);
      showNotification("Erro ao copiar informações", true);
    }
  };

  // Função para mover as linhas com o mouse
  const handleMouseMove = (event) => {
    if (!state.active) return;

    const x = event.clientX;
    const y = event.clientY;

    // Atualizar posição das linhas
    ui.verticalLine.style.left = \`\${x}px\`;
    ui.horizontalLine.style.top = \`\${y}px\`;

    // Atualizar coordenadas
    if (state.showCoordinates) {
      ui.coordinatesDisplay.textContent = \`X: \${x}px, Y: \${y}px\`;
      ui.coordinatesDisplay.style.display = "block";
    } else {
      ui.coordinatesDisplay.style.display = "none";
    }

    // Atualizar posição do mouse
    state.mousePosition = { x, y };

    // Obter informações do elemento sob o cursor
    const element = document.elementFromPoint(x, y);
    if (
      element &&
      element !== ui.verticalLine &&
      element !== ui.horizontalLine &&
      element !== ui.coordinatesDisplay &&
      element !== ui.elementInfoDisplay &&
      element !== ui.fontInfoDisplay &&
      element !== ui.controlPanel &&
      !ui.controlPanel.contains(element)
    ) {
      state.hoveredElement = element;
      const computedStyle = window.getComputedStyle(element);

      // Atualizar informações do elemento
      if (state.showElementInfo) {
        const rect = element.getBoundingClientRect();

        // Converter cores para hexadecimal
        const textColor = rgbToHex(computedStyle.color);
        const bgColor = rgbToHex(computedStyle.backgroundColor);

        ui.elementInfoDisplay.innerHTML = \`
          <strong>Tag:</strong> \${element.tagName.toLowerCase()}<br>
          <strong>ID:</strong> \${element.id || "none"}<br>
          <strong>Class:</strong> \${element.className || "none"}<br>
          <strong>Size:</strong> \${Math.round(rect.width)}px × \${Math.round(rect.height)}px<br>
          <strong>Color:</strong> \${textColor}<br>
          <strong>BG:</strong> \${bgColor}
        \`;

        ui.elementInfoDisplay.style.display = "block";
      } else {
        ui.elementInfoDisplay.style.display = "none";
      }

      // Atualizar informações de fonte
      if (state.showFontInfo) {
        // Extrair informações de fonte
        const fontFamily = computedStyle.fontFamily;
        const fontSize = computedStyle.fontSize;
        const fontWeight = computedStyle.fontWeight;
        const lineHeight = computedStyle.lineHeight;
        const letterSpacing = computedStyle.letterSpacing;
        const textAlign = computedStyle.textAlign;
        const textTransform = computedStyle.textTransform;
        const fontStyle = computedStyle.fontStyle;
        const textDecoration = computedStyle.textDecoration;

        // Amostra de texto
        const textContent =
          element.textContent?.trim().substring(0, 30) +
          (element.textContent && element.textContent.trim().length > 30 ? "..." : "");

        ui.fontInfoDisplay.innerHTML = \`
          <div style="margin-bottom: 8px; font-family: \${fontFamily}; font-size: 16px; font-weight: \${fontWeight}; font-style: \${fontStyle}; text-decoration: \${textDecoration}; letter-spacing: \${letterSpacing}; text-transform: \${textTransform}; color: white;">
            \${textContent || "Saiba mais"}
          </div>
          <div style="font-size: 12px; line-height: 1.5;">
            Font Family: \${fontFamily.split(",")[0].replace(/['"]/g, "")}<br>
            Font Size: \${fontSize}<br>
            Font Weight: \${fontWeight}<br>
            Line Height: \${lineHeight}<br>
            Letter Spacing: \${letterSpacing}<br>
            Text Align: \${textAlign}<br>
            Text Transform: \${textTransform}<br>
            Font Style: \${fontStyle}<br>
            Text Decoration: \${textDecoration}
          </div>
        \`;

        ui.fontInfoDisplay.style.display = "block";
      } else {
        ui.fontInfoDisplay.style.display = "none";
      }
    }

    // Atualizar medição
    if (state.measureMode && state.measureStart) {
      const measureEnd = { x, y };

      const dx = measureEnd.x - state.measureStart.x;
      const dy = measureEnd.y - state.measureStart.y;
      const distance = Math.round(Math.sqrt(dx * dx + dy * dy));

      ui.measureDisplay.textContent = \`Distância: \${distance}px (Δx: \${dx}px, Δy: \${dy}px)\`;
      ui.measureDisplay.style.display = "block";

      // Desenhar linha de medição
      const angle = Math.atan2(dy, dx);
      const measureLine = document.getElementById("dc-measure-line") || document.createElement("div");
      measureLine.id = "dc-measure-line";
      measureLine.style.position = "fixed";
      measureLine.style.height = "2px";
      measureLine.style.backgroundColor = "#ff0000";
      measureLine.style.transformOrigin = "0 0";
      measureLine.style.zIndex = "999998";
      measureLine.style.pointerEvents = "none";

      measureLine.style.width = \`\${distance}px\`;
      measureLine.style.left = \`\${state.measureStart.x}px\`;
      measureLine.style.top = \`\${state.measureStart.y}px\`;
      measureLine.style.transform = \`rotate(\${angle}rad)\`;

      if (!document.getElementById("dc-measure-line")) {
        document.body.appendChild(measureLine);
      }
    }

    // Posicionar os displays em quadrantes diferentes
    positionDisplays(x, y);
  };

  // Função para lidar com cliques (para medição e pontos salvos)
  const handleClick = (event) => {
    if (!state.active || !state.measureMode) return;

    // Ignorar cliques no painel de controle
    if (ui.controlPanel.contains(event.target)) return;

    if (!state.measureStart) {
      state.measureStart = { x: event.clientX, y: event.clientY };
    } else {
      // Finalizar medição e salvar ponto
      const newPoint = {
        start: state.measureStart,
        end: { x: event.clientX, y: event.clientY },
        distance: Math.round(
          Math.sqrt(
            Math.pow(event.clientX - state.measureStart.x, 2) + Math.pow(event.clientY - state.measureStart.y, 2)
          )
        )
      };

      state.savedPoints.push(newPoint);
      console.log(
        \`Ponto salvo: (\${newPoint.start.x}, \${newPoint.start.y}) → (\${newPoint.end.x}, \${newPoint.end.y}): \${newPoint.distance}px\`
      );

      // Mostrar notificação
      showNotification(\`Medição salva: \${newPoint.distance}px\`);

      // Resetar medição
      state.measureStart = null;

      // Remover linha de medição
      const measureLine = document.getElementById("dc-measure-line");
      if (measureLine) measureLine.remove();

      // Esconder display de medição
      ui.measureDisplay.style.display = "none";
    }
  };

  // Função para mostrar configurações
  const showSettings = () => {
    // Verificar se já existe um painel de configurações
    let settingsPanel = document.getElementById('dc-settings-panel');
    
    if (settingsPanel) {
      // Se já existe, remover
      document.body.removeChild(settingsPanel);
      return;
    }
    
    // Criar painel de configurações
    settingsPanel = document.createElement('div');
    settingsPanel.id = 'dc-settings-panel';
    settingsPanel.style.position = 'fixed';
    settingsPanel.style.top = '50%';
    settingsPanel.style.left = '50%';
    settingsPanel.style.transform = 'translate(-50%, -50%)';
    settingsPanel.style.backgroundColor = 'white';
    settingsPanel.style.padding = '20px';
    settingsPanel.style.borderRadius = '8px';
    settingsPanel.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    settingsPanel.style.zIndex = '1000001';
    settingsPanel.style.width = '300px';
    settingsPanel.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    
    settingsPanel.innerHTML = \`
      <h3 style="margin-top: 0; margin-bottom: 15px; font-size: 16px;">Configurações do Crosshair</h3>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-size: 14px;">Cor da Linha</label>
        <input type="color" id="dc-line-color" value="\${state.lineColor}" style="width: 100%;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="dc-line-width" style="display: block; margin-bottom: 5px; font-size: 14px;">Espessura da Linha: \${state.lineWidth}px</label>
        <input type="range" id="dc-line-width" min="1" max="5" step="1" value="\${state.lineWidth}" style="width: 100%;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="dc-grid-size" style="display: block; margin-bottom: 5px; font-size: 14px;">Tamanho da Grade: \${state.gridSize}px</label>
        <input type="range" id="dc-grid-size" min="10" max="100" step="5" value="\${state.gridSize}" style="width: 100%;">
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <button id="dc-settings-close" style="background-color: #e2e8f0; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Fechar</button>
        <button id="dc-settings-apply" style="background-color: #3b82f6; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Aplicar</button>
      </div>
    \`;
    
    document.body.appendChild(settingsPanel);
    
    // Atualizar valores ao mover sliders
    document.getElementById('dc-line-width').addEventListener('input', function() {
      const value = this.value;
      document.querySelector('label[for="dc-line-width"]').textContent = \`Espessura da Linha: \${value}px\`;
    });
    
    document.getElementById('dc-grid-size').addEventListener('input', function() {
      const value = this.value;
      document.querySelector('label[for="dc-grid-size"]').textContent = \`Tamanho da Grade: \${value}px\`;
    });
    
    // Adicionar event listeners aos botões
    document.getElementById('dc-settings-close').addEventListener('click', function() {
      document.body.removeChild(settingsPanel);
    });
    
    document.getElementById('dc-settings-apply').addEventListener('click', function() {
      // Atualizar configurações
      state.lineColor = document.getElementById('dc-line-color').value;
      state.lineWidth = parseInt(document.getElementById('dc-line-width').value);
      state.gridSize = parseInt(document.getElementById('dc-grid-size').value);
      
      // Aplicar mudanças
      ui.verticalLine.style.backgroundColor = state.lineColor;
      ui.verticalLine.style.width = \`\${state.lineWidth}px\`;
      ui.horizontalLine.style.backgroundColor = state.lineColor;
      ui.horizontalLine.style.height = \`\${state.lineWidth}px\`;
      
      // Atualizar grade se estiver visível
      if (state.showGrid) {
        updateGrid();
      }
      
      // Fechar painel
      document.body.removeChild(settingsPanel);
    });
  };

  // Função para lidar com teclas de atalho
  const handleKeyDown = (event) => {
    // Ignorar eventos de tecla em inputs
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
    
    // Tecla ESC - Desativar
    if (event.key === 'Escape') {
      if (state.measureStart) {
        // Cancelar medição atual
        state.measureStart = null;
        const measureLine = document.getElementById('dc-measure-line');
        if (measureLine) measureLine.remove();
        ui.measureDisplay.style.display = 'none';
      } else {
        // Desativar completamente
        cleanup();
      }
      return;
    }
    
    if (!state.active) return;
    
    // Tecla C - Copiar informações
    if (event.key.toLowerCase() === 'c') {
      copyInfo();
    }
    
    // Tecla H - Alternar coordenadas
    if (event.key.toLowerCase() === 'h') {
      toggleCoordinates();
    }
    
    // Tecla I - Alternar informações do elemento
    if (event.key.toLowerCase() === 'i') {
      toggleElementInfo();
    }
    
    // Tecla M - Alternar modo de medição
    if (event.key.toLowerCase() === 'm') {
      toggleMeasureMode();
    }
    
    // Tecla G - Alternar grade
    if (event.key.toLowerCase() === 'g') {
      toggleGrid();
    }
    
    // Tecla F - Alternar informações de fonte
    if (event.key.toLowerCase() === 'f') {
      toggleFontInfo();
    }
  };

  // Função para limpar tudo
  const cleanup = () => {
    // Remover event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKeyDown);
    
    // Remover elementos da UI
    if (ui.verticalLine.parentNode) document.body.removeChild(ui.verticalLine);
    if (ui.horizontalLine.parentNode) document.body.removeChild(ui.horizontalLine);
    if (ui.coordinatesDisplay.parentNode) document.body.removeChild(ui.coordinatesDisplay);
    if (ui.elementInfoDisplay.parentNode) document.body.removeChild(ui.elementInfoDisplay);
    if (ui.measureDisplay.parentNode) document.body.removeChild(ui.measureDisplay);
    if (ui.fontInfoDisplay.parentNode) document.body.removeChild(ui.fontInfoDisplay);
    if (ui.gridContainer.parentNode) document.body.removeChild(ui.gridContainer);
    if (ui.controlPanel.parentNode) document.body.removeChild(ui.controlPanel);
    
    const measureLine = document.getElementById('dc-measure-line');
    if (measureLine) measureLine.remove();
    
    const settingsPanel = document.getElementById('dc-settings-panel');
    if (settingsPanel) settingsPanel.remove();
    
    // Mostrar mensagem
    console.log('DevCrosshair foi removido. Obrigado por usar!');
  };

  // Inicializar a UI
  function initUI() {
    // Estilizar a linha vertical
    ui.verticalLine.style.position = 'fixed';
    ui.verticalLine.style.backgroundColor = state.lineColor;
    ui.verticalLine.style.width = \`\${state.lineWidth}px\`;
    ui.verticalLine.style.height = '100%';
    ui.verticalLine.style.top = '0';
    ui.verticalLine.style.zIndex = '999998';
    ui.verticalLine.style.pointerEvents = 'none';

    // Estilizar a linha horizontal
    ui.horizontalLine.style.position = 'fixed';
    ui.horizontalLine.style.backgroundColor = state.lineColor;
    ui.horizontalLine.style.height = \`\${state.lineWidth}px\`;
    ui.horizontalLine.style.width = '100%';
    ui.horizontalLine.style.left = '0';
    ui.horizontalLine.style.zIndex = '999998';
    ui.horizontalLine.style.pointerEvents = 'none';

    // Estilizar o display de coordenadas
    ui.coordinatesDisplay.style.position = 'fixed';
    ui.coordinatesDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    ui.coordinatesDisplay.style.color = 'white';
    ui.coordinatesDisplay.style.padding = '4px 8px';
    ui.coordinatesDisplay.style.borderRadius = '4px';
    ui.coordinatesDisplay.style.fontSize = '12px';
    ui.coordinatesDisplay.style.fontFamily = 'monospace';
    ui.coordinatesDisplay.style.zIndex = '999999';
    ui.coordinatesDisplay.style.pointerEvents = 'none';
    ui.coordinatesDisplay.style.display = state.showCoordinates ? 'block' : 'none';

    // Estilizar o display de informações do elemento
    ui.elementInfoDisplay.style.position = 'fixed';
    ui.elementInfoDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    ui.elementInfoDisplay.style.color = 'white';
    ui.elementInfoDisplay.style.padding = '4px 8px';
    ui.elementInfoDisplay.style.borderRadius = '4px';
    ui.elementInfoDisplay.style.fontSize = '12px';
    ui.elementInfoDisplay.style.fontFamily = 'monospace';
    ui.elementInfoDisplay.style.zIndex = '999999';
    ui.elementInfoDisplay.style.pointerEvents = 'none';
    ui.elementInfoDisplay.style.maxWidth = '300px';
    ui.elementInfoDisplay.style.display = state.showElementInfo ? 'block' : 'none';

    // Estilizar o display de medição
    ui.measureDisplay.style.position = 'fixed';
    ui.measureDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    ui.measureDisplay.style.color = 'white';
    ui.measureDisplay.style.padding = '4px 8px';
    ui.measureDisplay.style.borderRadius = '4px';
    ui.measureDisplay.style.fontSize = '12px';
    ui.measureDisplay.style.fontFamily = 'monospace';
    ui.measureDisplay.style.zIndex = '999999';
    ui.measureDisplay.style.pointerEvents = 'none';
    ui.measureDisplay.style.display = 'none';
    
    // Estilizar o display de informações de fonte
    ui.fontInfoDisplay.style.position = 'fixed';
    ui.fontInfoDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    ui.fontInfoDisplay.style.color = 'white';
    ui.fontInfoDisplay.style.padding = '10px 12px';
    ui.fontInfoDisplay.style.borderRadius = '4px';
    ui.fontInfoDisplay.style.fontSize = '12px';
    ui.fontInfoDisplay.style.fontFamily = 'monospace';
    ui.fontInfoDisplay.style.zIndex = '999999';
    ui.fontInfoDisplay.style.pointerEvents = 'none';
    ui.fontInfoDisplay.style.maxWidth = '300px';
    ui.fontInfoDisplay.style.display = 'none';
    ui.fontInfoDisplay.style.lineHeight = '1.5';

    // Criar painel de controle
    ui.controlPanel.style.position = 'fixed';
    ui.controlPanel.style.bottom = '20px';
    ui.controlPanel.style.right = '20px';
    ui.controlPanel.style.backgroundColor = 'white';
    ui.controlPanel.style.padding = '10px';
    ui.controlPanel.style.borderRadius = '8px';
    ui.controlPanel.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    ui.controlPanel.style.zIndex = '1000000';
    ui.controlPanel.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    ui.controlPanel.style.fontSize = '14px';
    ui.controlPanel.style.display = 'flex';
    ui.controlPanel.style.gap = '8px';
    ui.controlPanel.style.border = '1px solid #e2e8f0';

    // Adicionar botões ao painel de controle
    ui.controlPanel.innerHTML = \`
      <button id="dc-toggle" style="background-color: \${state.active ? '#3b82f6' : '#e2e8f0'}; color: \${state.active ? 'white' : 'black'}; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Ativar</button>
      <button id="dc-coords" style="background-color: \${state.showCoordinates ? '#3b82f6' : '#e2e8f0'}; color: \${state.showCoordinates ? 'white' : 'black'}; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Coords (h)</button>
      <button id="dc-element" style="background-color: \${state.showElementInfo ? '#3b82f6' : '#e2e8f0'}; color: \${state.showElementInfo ? 'white' : 'black'}; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Info (i)</button>
      <button id="dc-font" style="background-color: \${state.showFontInfo ? '#3b82f6' : '#e2e8f0'}; color: \${state.showFontInfo ? 'white' : 'black'}; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Fontes (f)</button>
      <button id="dc-measure" style="background-color: \${state.measureMode ? '#3b82f6' : '#e2e8f0'}; color: \${state.measureMode ? 'white' : 'black'}; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Medir (m)</button>
      <button id="dc-grid" style="background-color: \${state.showGrid ? '#3b82f6' : '#e2e8f0'}; color: \${state.showGrid ? 'white' : 'black'}; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Grade (g)</button>
      <button id="dc-copy" style="background-color: #e2e8f0; color: black; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Copiar (c)</button>
      <button id="dc-settings" style="background-color: #e2e8f0; color: black; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Config</button>
    \`;

    // Adicionar elementos ao DOM
    document.body.appendChild(ui.verticalLine);
    document.body.appendChild(ui.horizontalLine);
    document.body.appendChild(ui.coordinatesDisplay);
    document.body.appendChild(ui.elementInfoDisplay);
    document.body.appendChild(ui.measureDisplay);
    document.body.appendChild(ui.fontInfoDisplay);
    document.body.appendChild(ui.controlPanel);

    // Configurar a grade se necessário
    updateGrid();

    // Adicionar event listeners aos botões
    document.getElementById('dc-toggle').addEventListener('click', toggleActive);
    document.getElementById('dc-coords').addEventListener('click', toggleCoordinates);
    document.getElementById('dc-element').addEventListener('click', toggleElementInfo);
    document.getElementById('dc-measure').addEventListener('click', toggleMeasureMode);
    document.getElementById('dc-grid').addEventListener('click', toggleGrid);
    document.getElementById('dc-font').addEventListener('click', toggleFontInfo);
    document.getElementById('dc-copy').addEventListener('click', copyInfo);
    document.getElementById('dc-settings').addEventListener('click', showSettings);
  }

  // Inicializar
  function init() {
    // Verificar se já está inicializado
    if (document.getElementById('dc-toggle')) {
      console.log('DevCrosshair já está em execução!');
      return;
    }
    
    // Inicializar UI
    initUI();
    
    // Adicionar event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    
    // Mostrar mensagem de boas-vindas
    console.log('DevCrosshair inicializado!');
    console.log('Atalhos de teclado:');
    console.log('- H: Mostrar/ocultar coordenadas');
    console.log('- I: Mostrar/ocultar informações do elemento');
    console.log('- F: Mostrar/ocultar informações de fonte');
    console.log('- M: Ativar/desativar modo de medição');
    console.log('- G: Mostrar/ocultar grade');
    console.log('- C: Copiar coordenadas ou informações do elemento');
    console.log('- ESC: Cancelar medição ou desativar');
    
    // Mostrar notificação
    showNotification('DevCrosshair ativado!');
  }

  // Iniciar
  init();
})();`

  // Configurar os headers para JavaScript e CORS
  const headers = new Headers()
  headers.append("Content-Type", "application/javascript")
  headers.append("Access-Control-Allow-Origin", "*")
  headers.append("Access-Control-Allow-Methods", "GET, OPTIONS")
  headers.append("Access-Control-Allow-Headers", "Content-Type")

  // Retornar o código como resposta
  return new Response(devCrosshairCode, {
    status: 200,
    headers,
  })
}

// Adicionar um handler OPTIONS para suportar preflight CORS
export async function OPTIONS() {
  const headers = new Headers()
  headers.append("Access-Control-Allow-Origin", "*")
  headers.append("Access-Control-Allow-Methods", "GET, OPTIONS")
  headers.append("Access-Control-Allow-Headers", "Content-Type")

  return new Response(null, {
    status: 204,
    headers,
  })
}

