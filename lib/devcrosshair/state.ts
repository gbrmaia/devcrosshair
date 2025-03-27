import type { State } from "./types"

// Estado inicial da aplicação
export const initialState: State = {
  active: true,
  showCoordinates: true,
  showElementInfo: false,
  showGrid: false,
  lineColor: "#000000",
  lineWidth: 1,
  gridSize: 50,
  savedPoints: [],
  measureMode: false,
  measureStart: null,
  mousePosition: { x: 0, y: 0 },
  hoveredElement: null,
  showFontInfo: false,
}

