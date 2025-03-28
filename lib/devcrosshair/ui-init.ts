export function initUI(): string {
  return `
function initUI() {
  ui.verticalLine.style.position = "fixed";
  ui.verticalLine.style.backgroundColor = state.lineColor;
  ui.verticalLine.style.width = \`\${state.lineWidth}px\`;
  ui.verticalLine.style.height = "100%";
  ui.verticalLine.style.top = "0";
  ui.verticalLine.style.zIndex = "999998";
  ui.verticalLine.style.pointerEvents = "none";

  ui.horizontalLine.style.position = "fixed";
  ui.horizontalLine.style.backgroundColor = state.lineColor;
  ui.horizontalLine.style.height = \`\${state.lineWidth}px\`;
  ui.horizontalLine.style.width = "100%";
  ui.horizontalLine.style.left = "0";
  ui.horizontalLine.style.zIndex = "999998";
  ui.horizontalLine.style.pointerEvents = "none";

  ui.coordinatesDisplay.style.position = "fixed";
  ui.coordinatesDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  ui.coordinatesDisplay.style.color = "white";
  ui.coordinatesDisplay.style.padding = "4px 8px";
  ui.coordinatesDisplay.style.borderRadius = "4px";
  ui.coordinatesDisplay.style.fontSize = "12px";
  ui.coordinatesDisplay.style.fontFamily = "monospace";
  ui.coordinatesDisplay.style.zIndex = "999999";
  ui.coordinatesDisplay.style.pointerEvents = "none";
  ui.coordinatesDisplay.style.display = state.showCoordinates ? "block" : "none";

  ui.elementInfoDisplay.style.position = "fixed";
  ui.elementInfoDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  ui.elementInfoDisplay.style.color = "white";
  ui.elementInfoDisplay.style.padding = "4px 8px";
  ui.elementInfoDisplay.style.borderRadius = "4px";
  ui.elementInfoDisplay.style.fontSize = "12px";
  ui.elementInfoDisplay.style.fontFamily = "monospace";
  ui.elementInfoDisplay.style.zIndex = "999999";
  ui.elementInfoDisplay.style.pointerEvents = "none";
  ui.elementInfoDisplay.style.maxWidth = "300px";
  ui.elementInfoDisplay.style.display = state.showElementInfo ? "block" : "none";

  ui.measureDisplay.style.position = "fixed";
  ui.measureDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  ui.measureDisplay.style.color = "white";
  ui.measureDisplay.style.padding = "4px 8px";
  ui.measureDisplay.style.borderRadius = "4px";
  ui.measureDisplay.style.fontSize = "12px";
  ui.measureDisplay.style.fontFamily = "monospace";
  ui.measureDisplay.style.zIndex = "999999";
  ui.measureDisplay.style.pointerEvents = "none";
  ui.measureDisplay.style.display = "none";
  
  ui.fontInfoDisplay.style.position = "fixed";
  ui.fontInfoDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
  ui.fontInfoDisplay.style.color = "white";
  ui.fontInfoDisplay.style.padding = "10px 12px";
  ui.fontInfoDisplay.style.borderRadius = "4px";
  ui.fontInfoDisplay.style.fontSize = "12px";
  ui.fontInfoDisplay.style.fontFamily = "monospace";
  ui.fontInfoDisplay.style.zIndex = "999999";
  ui.fontInfoDisplay.style.pointerEvents = "none";
  ui.fontInfoDisplay.style.maxWidth = "300px";
  ui.fontInfoDisplay.style.display = "none";
  ui.fontInfoDisplay.style.lineHeight = "1.5";

  ui.controlPanel.style.position = "fixed";
  ui.controlPanel.style.bottom = "20px";
  ui.controlPanel.style.right = "20px";
  ui.controlPanel.style.backgroundColor = "white";
  ui.controlPanel.style.padding = "10px";
  ui.controlPanel.style.borderRadius = "8px";
  ui.controlPanel.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  ui.controlPanel.style.zIndex = "1000000";
  ui.controlPanel.style.fontFamily = "system-ui, -apple-system, sans-serif";
  ui.controlPanel.style.fontSize = "14px";
  ui.controlPanel.style.display = "flex";
  ui.controlPanel.style.gap = "8px";
  ui.controlPanel.style.border = "1px solid #e2e8f0";

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

  document.body.appendChild(ui.verticalLine);
  document.body.appendChild(ui.horizontalLine);
  document.body.appendChild(ui.coordinatesDisplay);
  document.body.appendChild(ui.elementInfoDisplay);
  document.body.appendChild(ui.measureDisplay);
  document.body.appendChild(ui.fontInfoDisplay);
  document.body.appendChild(ui.controlPanel);

  updateGrid();

  document.getElementById('dc-toggle').addEventListener('click', toggleActive);
  document.getElementById('dc-coords').addEventListener('click', toggleCoordinates);
  document.getElementById('dc-element').addEventListener('click', toggleElementInfo);
  document.getElementById('dc-measure').addEventListener('click', toggleMeasureMode);
  document.getElementById('dc-grid').addEventListener('click', toggleGrid);
  document.getElementById('dc-font').addEventListener('click', toggleFontInfo);
  document.getElementById('dc-copy').addEventListener('click', copyInfo);
  document.getElementById('dc-settings').addEventListener('click', showSettings);
}`
}

