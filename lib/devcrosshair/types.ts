// Tipos para o DevCrosshair

export interface Point {
  x: number
  y: number
}

export interface SavedPoint {
  start: Point
  end: Point
  distance: number
}

export interface State {
  active: boolean
  showCoordinates: boolean
  showElementInfo: boolean
  showGrid: boolean
  lineColor: string
  lineWidth: number
  gridSize: number
  savedPoints: SavedPoint[]
  measureMode: boolean
  measureStart: Point | null
  mousePosition: Point
  hoveredElement: HTMLElement | null
  showFontInfo: boolean
}

export interface UI {
  verticalLine: HTMLDivElement
  horizontalLine: HTMLDivElement
  coordinatesDisplay: HTMLDivElement
  elementInfoDisplay: HTMLDivElement
  measureDisplay: HTMLDivElement
  gridContainer: HTMLDivElement
  controlPanel: HTMLDivElement
  fontInfoDisplay: HTMLDivElement
}

