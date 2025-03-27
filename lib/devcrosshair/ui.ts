import type { UI } from "./types"

// Criar elementos da UI
export function createUI(): UI {
  return {
    verticalLine: document.createElement("div"),
    horizontalLine: document.createElement("div"),
    coordinatesDisplay: document.createElement("div"),
    elementInfoDisplay: document.createElement("div"),
    measureDisplay: document.createElement("div"),
    gridContainer: document.createElement("div"),
    controlPanel: document.createElement("div"),
    fontInfoDisplay: document.createElement("div"),
  }
}

