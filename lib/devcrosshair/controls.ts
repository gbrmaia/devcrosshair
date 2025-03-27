import type { State, UI } from "./types"
import { updateGrid } from "./grid"
import { rgbToHex, showNotification } from "./utils"

// Função para alternar ativação
export function toggleActive(state: State, ui: UI): void {
  state.active = !state.active

  // Atualizar visibilidade dos elementos
  ui.verticalLine.style.display = state.active ? "block" : "none"
  ui.horizontalLine.style.display = state.active ? "block" : "none"
  ui.coordinatesDisplay.style.display = state.active && state.showCoordinates ? "block" : "none"
  ui.elementInfoDisplay.style.display = state.active && state.showElementInfo ? "block" : "none"
  ui.fontInfoDisplay.style.display = state.active && state.showFontInfo ? "block" : "none"

  if (!state.active) {
    // Esconder medição
    ui.measureDisplay.style.display = "none"
    const measureLine = document.getElementById("dc-measure-line")
    if (measureLine) measureLine.remove()

    // Esconder grade
    if (ui.gridContainer.parentNode) {
      document.body.removeChild(ui.gridContainer)
    }
  } else if (state.showGrid) {
    updateGrid(state, ui)
  }

  // Atualizar botão
  const button = document.getElementById("dc-toggle")
  if (button) {
    button.style.backgroundColor = state.active ? "#3b82f6" : "#e2e8f0"
    button.style.color = state.active ? "white" : "black"
    button.textContent = state.active ? "Ativar" : "Desativar"
  }
}

// Função para alternar coordenadas
export function toggleCoordinates(state: State, ui: UI): void {
  state.showCoordinates = !state.showCoordinates

  // Atualizar botão
  const button = document.getElementById("dc-coords")
  if (button) {
    button.style.backgroundColor = state.showCoordinates ? "#3b82f6" : "#e2e8f0"
    button.style.color = state.showCoordinates ? "white" : "black"
  }
}

// Função para alternar informações do elemento
export function toggleElementInfo(state: State, ui: UI): void {
  // Se estiver ativando as informações do elemento, desativar as informações de fonte
  if (!state.showElementInfo) {
    state.showElementInfo = true

    // Desativar informações de fonte se estiver ativo
    if (state.showFontInfo) {
      state.showFontInfo = false
      const fontButton = document.getElementById("dc-font")
      if (fontButton) {
        fontButton.style.backgroundColor = "#e2e8f0"
        fontButton.style.color = "black"
      }
      ui.fontInfoDisplay.style.display = "none"
    }
  } else {
    state.showElementInfo = false
  }

  // Atualizar botão
  const button = document.getElementById("dc-element")
  if (button) {
    button.style.backgroundColor = state.showElementInfo ? "#3b82f6" : "#e2e8f0"
    button.style.color = state.showElementInfo ? "white" : "black"
  }
}

// Função para alternar informações de fonte
export function toggleFontInfo(state: State, ui: UI): void {
  // Se estiver ativando as informações de fonte, desativar as informações do elemento
  if (!state.showFontInfo) {
    state.showFontInfo = true

    // Desativar informações do elemento se estiver ativo
    if (state.showElementInfo) {
      state.showElementInfo = false
      const elementButton = document.getElementById("dc-element")
      if (elementButton) {
        elementButton.style.backgroundColor = "#e2e8f0"
        elementButton.style.color = "black"
      }
      ui.elementInfoDisplay.style.display = "none"
    }
  } else {
    state.showFontInfo = false
  }

  // Atualizar botão
  const button = document.getElementById("dc-font")
  if (button) {
    button.style.backgroundColor = state.showFontInfo ? "#3b82f6" : "#e2e8f0"
    button.style.color = state.showFontInfo ? "white" : "black"
  }

  // Mostrar ou esconder display de informações de fonte
  ui.fontInfoDisplay.style.display = state.showFontInfo ? "block" : "none"
}

// Função para alternar modo de medição
export function toggleMeasureMode(state: State, ui: UI): void {
  state.measureMode = !state.measureMode

  // Resetar medição atual
  if (!state.measureMode) {
    state.measureStart = null
    const measureLine = document.getElementById("dc-measure-line")
    if (measureLine) measureLine.remove()
    ui.measureDisplay.style.display = "none"
  }

  // Atualizar botão
  const button = document.getElementById("dc-measure")
  if (button) {
    button.style.backgroundColor = state.measureMode ? "#3b82f6" : "#e2e8f0"
    button.style.color = state.measureMode ? "white" : "black"
  }
}

// Função para alternar grade
export function toggleGrid(state: State, ui: UI): void {
  state.showGrid = !state.showGrid
  updateGrid(state, ui)

  // Atualizar botão
  const button = document.getElementById("dc-grid")
  if (button) {
    button.style.backgroundColor = state.showGrid ? "#3b82f6" : "#e2e8f0"
    button.style.color = state.showGrid ? "white" : "black"
  }
}

// Função para copiar informações (coordenadas ou informações do elemento)
export function copyInfo(state: State): void {
  let text = ""

  if (state.showElementInfo && state.hoveredElement) {
    // Copiar todas as informações do elemento
    const element = state.hoveredElement
    const computedStyle = window.getComputedStyle(element)
    const rect = element.getBoundingClientRect()

    // Converter cores para hexadecimal
    const textColor = rgbToHex(computedStyle.color)
    const bgColor = rgbToHex(computedStyle.backgroundColor)

    text =
      `Posição: X: ${state.mousePosition.x}px, Y: ${state.mousePosition.y}px
` +
      `Tag: ${element.tagName.toLowerCase()}
` +
      `ID: ${element.id || "none"}
` +
      `Class: ${element.className || "none"}
` +
      `Tamanho: ${Math.round(rect.width)}px × ${Math.round(rect.height)}px
` +
      `Cor do texto: ${textColor}
` +
      `Cor de fundo: ${bgColor}`
  } else if (state.showFontInfo && state.hoveredElement) {
    // Copiar informações de fonte
    const element = state.hoveredElement
    const computedStyle = window.getComputedStyle(element)

    text = `Font Family: ${computedStyle.fontFamily}
Font Size: ${computedStyle.fontSize}
Font Weight: ${computedStyle.fontWeight}
Line Height: ${computedStyle.lineHeight}
Letter Spacing: ${computedStyle.letterSpacing}
Text Align: ${computedStyle.textAlign}
Text Transform: ${computedStyle.textTransform}
Font Style: ${computedStyle.fontStyle}
Text Decoration: ${computedStyle.textDecoration}`
  } else {
    // Copiar apenas as coordenadas
    text = `X: ${state.mousePosition.x}px, Y: ${state.mousePosition.y}px`
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotification("Informações copiadas!")
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err)
      showNotification("Erro ao copiar informações", true)
    })
}

