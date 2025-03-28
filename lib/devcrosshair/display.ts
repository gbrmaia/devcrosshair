export function positionDisplays(): string {
  return `
const positionDisplays = (x, y) => {
  const isRightHalf = x > window.innerWidth / 2;
  const isBottomHalf = y > window.innerHeight / 2;
  
  ui.verticalLine.style.left = \`\${x}px\`;
  ui.horizontalLine.style.top = \`\${y}px\`;
  
  if (state.showCoordinates) {
    ui.coordinatesDisplay.style.left = isRightHalf ? \`\${x - 150}px\` : \`\${x + 15}px\`;
    ui.coordinatesDisplay.style.top = isBottomHalf ? \`\${y - 40}px\` : \`\${y + 15}px\`;
    ui.coordinatesDisplay.textContent = \`X: \${x}px, Y: \${y}px\`;
    ui.coordinatesDisplay.style.display = "block";
  } else {
    ui.coordinatesDisplay.style.display = "none";
  }
  
  if (state.showElementInfo && state.hoveredElement) {
    const element = state.hoveredElement;
    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    
    const textColor = rgbToHex(computedStyle.color);
    const bgColor = rgbToHex(computedStyle.backgroundColor);
    
    ui.elementInfoDisplay.style.left = isRightHalf ? \`\${x - 320}px\` : \`\${x + 15}px\`;
    ui.elementInfoDisplay.style.top = isBottomHalf ? \`\${y - 180}px\` : \`\${y + 50}px\`;
    ui.elementInfoDisplay.innerHTML = \`
      <div><strong>Tag:</strong> \${element.tagName.toLowerCase()}</div>
      <div><strong>ID:</strong> \${element.id || "none"}</div>
      <div><strong>Class:</strong> \${element.className || "none"}</div>
      <div><strong>Tamanho:</strong> \${Math.round(rect.width)}px × \${Math.round(rect.height)}px</div>
      <div><strong>Cor do texto:</strong> <span style="color:\${textColor}">\${textColor}</span></div>
      <div><strong>Cor de fundo:</strong> <span style="background-color:\${bgColor};padding:0 3px;">\${bgColor}</span></div>
    \`;
    ui.elementInfoDisplay.style.display = "block";
  } else {
    ui.elementInfoDisplay.style.display = "none";
  }
  
  if (state.showFontInfo && state.hoveredElement) {
    const element = state.hoveredElement;
    const computedStyle = window.getComputedStyle(element);
    
    ui.fontInfoDisplay.style.left = isRightHalf ? \`\${x - 320}px\` : \`\${x + 15}px\`;
    ui.fontInfoDisplay.style.top = isBottomHalf ? \`\${y - 250}px\` : \`\${y + 50}px\`;
    ui.fontInfoDisplay.innerHTML = \`
      <div><strong>Font Family:</strong> \${computedStyle.fontFamily}</div>
      <div><strong>Font Size:</strong> \${computedStyle.fontSize}</div>
      <div><strong>Font Weight:</strong> \${computedStyle.fontWeight}</div>
      <div><strong>Line Height:</strong> \${computedStyle.lineHeight}</div>
      <div><strong>Letter Spacing:</strong> \${computedStyle.letterSpacing}</div>
      <div><strong>Text Align:</strong> \${computedStyle.textAlign}</div>
      <div><strong>Text Transform:</strong> \${computedStyle.textTransform}</div>
      <div><strong>Font Style:</strong> \${computedStyle.fontStyle}</div>
      <div><strong>Text Decoration:</strong> \${computedStyle.textDecoration}</div>
    \`;
    ui.fontInfoDisplay.style.display = "block";
  } else {
    ui.fontInfoDisplay.style.display = "none";
  }
  
  if (state.measureMode && state.measureStart) {
    const startX = state.measureStart.x;
    const startY = state.measureStart.y;
    const endX = x;
    const endY = y;
    
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.round(Math.sqrt(dx * dx + dy * dy));
    
    ui.measureDisplay.style.left = isRightHalf ? \`\${x - 250}px\` : \`\${x + 15}px\`;
    ui.measureDisplay.style.top = isBottomHalf ? \`\${y - 80}px\` : \`\${y - 30}px\`;
    ui.measureDisplay.textContent = \`Distância: \${distance}px (Δx: \${Math.abs(dx)}px, Δy: \${Math.abs(dy)}px)\`;
    ui.measureDisplay.style.display = "block";
  }
};`
}

export function updateElementInfo(): string {
  return `
const updateElementInfo = (element) => {
  if (!element) return;
  
  const computedStyle = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  
  const textColor = rgbToHex(computedStyle.color);
  const bgColor = rgbToHex(computedStyle.backgroundColor);
  
  ui.elementInfoDisplay.innerHTML = \`
    <div><strong>Tag:</strong> \${element.tagName.toLowerCase()}</div>
    <div><strong>ID:</strong> \${element.id || "none"}</div>
    <div><strong>Class:</strong> \${element.className || "none"}</div>
    <div><strong>Tamanho:</strong> \${Math.round(rect.width)}px × \${Math.round(rect.height)}px</div>
    <div><strong>Cor do texto:</strong> <span style="color:\${textColor}">\${textColor}</span></div>
    <div><strong>Cor de fundo:</strong> <span style="background-color:\${bgColor};padding:0 3px;">\${bgColor}</span></div>
  \`;
};`
}

export function updateFontInfo(): string {
  return `
const updateFontInfo = (element) => {
  if (!element) return;
  
  const computedStyle = window.getComputedStyle(element);
  
  ui.fontInfoDisplay.innerHTML = \`
    <div><strong>Font Family:</strong> \${computedStyle.fontFamily}</div>
    <div><strong>Font Size:</strong> \${computedStyle.fontSize}</div>
    <div><strong>Font Weight:</strong> \${computedStyle.fontWeight}</div>
    <div><strong>Line Height:</strong> \${computedStyle.lineHeight}</div>
    <div><strong>Letter Spacing:</strong> \${computedStyle.letterSpacing}</div>
    <div><strong>Text Align:</strong> \${computedStyle.textAlign}</div>
    <div><strong>Text Transform:</strong> \${computedStyle.textTransform}</div>
    <div><strong>Font Style:</strong> \${computedStyle.fontStyle}</div>
    <div><strong>Text Decoration:</strong> \${computedStyle.textDecoration}</div>
  \`;
};`
}

export function updateMeasurement(): string {
  return `
const updateMeasurement = (startPoint, endPoint) => {
  if (!startPoint || !endPoint) return;
  
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const distance = Math.round(Math.sqrt(dx * dx + dy * dy));
  
  let measureLine = document.getElementById("dc-measure-line");
  if (!measureLine) {
    measureLine = document.createElement("div");
    measureLine.id = "dc-measure-line";
    document.body.appendChild(measureLine);
  }
  
  const angle = Math.atan2(dy, dx);
  
  measureLine.style.position = "fixed";
  measureLine.style.height = "2px";
  measureLine.style.backgroundColor = "#ff0000";
  measureLine.style.transformOrigin = "0 0";
  measureLine.style.zIndex = "999998";
  measureLine.style.pointerEvents = "none";
  
  measureLine.style.width = \`\${distance}px\`;
  measureLine.style.left = \`\${startPoint.x}px\`;
  measureLine.style.top = \`\${startPoint.y}px\`;
  measureLine.style.transform = \`rotate(\${angle}rad)\`;
  
  ui.measureDisplay.textContent = \`Distância: \${distance}px (Δx: \${Math.abs(dx)}px, Δy: \${Math.abs(dy)}px)\`;
};`
}

