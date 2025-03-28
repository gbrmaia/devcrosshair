export function toggleActive(): string {
  return `
const toggleActive = () => {
  state.active = !state.active;

  ui.verticalLine.style.display = state.active ? "block" : "none";
  ui.horizontalLine.style.display = state.active ? "block" : "none";
  ui.coordinatesDisplay.style.display = state.active && state.showCoordinates ? "block" : "none";
  ui.elementInfoDisplay.style.display = state.active && state.showElementInfo ? "block" : "none";
  ui.fontInfoDisplay.style.display = state.active && state.showFontInfo ? "block" : "none";

  if (!state.active) {
    ui.measureDisplay.style.display = "none";
    const measureLine = document.getElementById("dc-measure-line");
    if (measureLine) measureLine.remove();

    if (ui.gridContainer.parentNode) {
      document.body.removeChild(ui.gridContainer);
    }
  } else if (state.showGrid) {
    updateGrid();
  }

  const button = document.getElementById("dc-toggle");
  if (button) {
    button.style.backgroundColor = state.active ? "#3b82f6" : "#e2e8f0";
    button.style.color = state.active ? "white" : "black";
    button.textContent = state.active ? "Ativar" : "Desativar";
  }
};`
}

export function toggleCoordinates(): string {
  return `
const toggleCoordinates = () => {
  state.showCoordinates = !state.showCoordinates;

  const button = document.getElementById("dc-coords");
  if (button) {
    button.style.backgroundColor = state.showCoordinates ? "#3b82f6" : "#e2e8f0";
    button.style.color = state.showCoordinates ? "white" : "black";
  }
};`
}

export function toggleElementInfo(): string {
  return `
const toggleElementInfo = () => {
  if (!state.showElementInfo) {
    state.showElementInfo = true;

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

  const button = document.getElementById("dc-element");
  if (button) {
    button.style.backgroundColor = state.showElementInfo ? "#3b82f6" : "#e2e8f0";
    button.style.color = state.showElementInfo ? "white" : "black";
  }
};`
}

export function toggleFontInfo(): string {
  return `
const toggleFontInfo = () => {
  if (!state.showFontInfo) {
    state.showFontInfo = true;

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

  const button = document.getElementById("dc-font");
  if (button) {
    button.style.backgroundColor = state.showFontInfo ? "#3b82f6" : "#e2e8f0";
    button.style.color = state.showFontInfo ? "white" : "black";
  }

  ui.fontInfoDisplay.style.display = state.showFontInfo ? "block" : "none";
};`
}

export function toggleMeasureMode(): string {
  return `
const toggleMeasureMode = () => {
  state.measureMode = !state.measureMode;

  if (!state.measureMode) {
    state.measureStart = null;
    const measureLine = document.getElementById("dc-measure-line");
    if (measureLine) measureLine.remove();
    ui.measureDisplay.style.display = "none";
  }

  const button = document.getElementById("dc-measure");
  if (button) {
    button.style.backgroundColor = state.measureMode ? "#3b82f6" : "#e2e8f0";
    button.style.color = state.measureMode ? "white" : "black";
  }
};`
}

export function toggleGrid(): string {
  return `
const toggleGrid = () => {
  state.showGrid = !state.showGrid;
  updateGrid();

  const button = document.getElementById("dc-grid");
  if (button) {
    button.style.backgroundColor = state.showGrid ? "#3b82f6" : "#e2e8f0";
    button.style.color = state.showGrid ? "white" : "black";
  }
};`
}

export function copyInfo(): string {
  return `
const copyInfo = () => {
  let text = "";

  if (state.showElementInfo && state.hoveredElement) {
    const element = state.hoveredElement;
    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

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
    text = \`X: \${state.mousePosition.x}px, Y: \${state.mousePosition.y}px\`;
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          showNotification("Informações copiadas!");
        })
        .catch(err => {
          console.error("Erro ao copiar (método 1): ", err);
          copyUsingExecCommand(text);
        });
    } else {
      copyUsingExecCommand(text);
    }
  } catch (err) {
    console.error("Erro ao copiar: ", err);
    showNotification("Erro ao copiar informações", true);
  }
};`
}

