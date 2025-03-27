import type { State, UI } from "./types"

// Função para posicionar os displays em quadrantes diferentes
export function positionDisplays(state: State, ui: UI, x: number, y: number): void {
  // Determinar em qual quadrante da tela o cursor está
  const isRightHalf = x > window.innerWidth / 2
  const isBottomHalf = y > window.innerHeight / 2

  // Posicionar coordenadas
  if (state.showCoordinates) {
    ui.coordinatesDisplay.style.left = isRightHalf ? `${x - 150}px` : `${x + 15}px`
    ui.coordinatesDisplay.style.top = isBottomHalf ? `${y - 40}px` : `${y + 15}px`
  }

  // Posicionar informações do elemento
  if (state.showElementInfo) {
    ui.elementInfoDisplay.style.left = isRightHalf ? `${x - 320}px` : `${x + 15}px`
    ui.elementInfoDisplay.style.top = isBottomHalf ? `${y - 180}px` : `${y + 50}px`
  }

  // Posicionar informações de fonte
  if (state.showFontInfo) {
    ui.fontInfoDisplay.style.left = isRightHalf ? `${x - 320}px` : `${x + 15}px`
    ui.fontInfoDisplay.style.top = isBottomHalf ? `${y - 250}px` : `${y + 50}px`
  }

  // Posicionar medição
  if (state.measureMode && state.measureStart) {
    ui.measureDisplay.style.left = isRightHalf ? `${x - 250}px` : `${x + 15}px`
    ui.measureDisplay.style.top = isBottomHalf ? `${y - 80}px` : `${y - 30}px`
  }
}

