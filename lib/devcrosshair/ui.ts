export function createUI(): string {
  return `
const ui = {
  verticalLine: document.createElement("div"),
  horizontalLine: document.createElement("div"),
  coordinatesDisplay: document.createElement("div"),
  elementInfoDisplay: document.createElement("div"),
  measureDisplay: document.createElement("div"),
  gridContainer: document.createElement("div"),
  controlPanel: document.createElement("div"),
  fontInfoDisplay: document.createElement("div")
};`
}

