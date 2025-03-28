export function getInitialState(): string {
  return `
const state = {
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
fixedYPosition: null,
fixedXPosition: null
};`;
}
