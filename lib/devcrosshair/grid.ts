import type { State, UI } from "./types"

// Atualizar a grade
export function updateGrid(state: State, ui: UI): void {
  // Remover grade existente
  if (ui.gridContainer.parentNode) {
    document.body.removeChild(ui.gridContainer)
  }

  // Criar nova grade se necessário
  if (state.showGrid) {
    ui.gridContainer = document.createElement("div")
    ui.gridContainer.style.position = "fixed"
    ui.gridContainer.style.top = "0"
    ui.gridContainer.style.left = "0"
    ui.gridContainer.style.width = "100%"
    ui.gridContainer.style.height = "100%"
    ui.gridContainer.style.zIndex = "999997"
    ui.gridContainer.style.pointerEvents = "none"

    // Criar linhas verticais da grade
    for (let x = state.gridSize; x < window.innerWidth; x += state.gridSize) {
      const gridLine = document.createElement("div")
      gridLine.style.position = "absolute"
      gridLine.style.top = "0"
      gridLine.style.left = `${x}px`
      gridLine.style.width = "1px"
      gridLine.style.height = "100%"
      gridLine.style.backgroundColor = "rgba(128, 128, 255, 0.3)"
      ui.gridContainer.appendChild(gridLine)
    }

    // Criar linhas horizontais da grade
    for (let y = state.gridSize; y < window.innerHeight; y += state.gridSize) {
      const gridLine = document.createElement("div")
      gridLine.style.position = "absolute"
      gridLine.style.top = `${y}px`
      gridLine.style.left = "0"
      gridLine.style.width = "100%"
      gridLine.style.height = "1px"
      gridLine.style.backgroundColor = "rgba(128, 128, 255, 0.3)"
      ui.gridContainer.appendChild(gridLine)
    }

    document.body.appendChild(ui.gridContainer)
  }
}

