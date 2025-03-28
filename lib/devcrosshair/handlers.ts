export function handleMouseMove(): string {
  return `
const handleMouseMove = (event) => {
if (!state.active) return;

const x = event.clientX;
const y = event.clientY;

let displayX = x;
let displayY = y;

if (event.ctrlKey && !event.shiftKey) {
  if (state.fixedYPosition === null) {
    state.fixedYPosition = y;
  }
  ui.verticalLine.style.left = \`\${x}px\`;
  ui.horizontalLine.style.top = \`\${state.fixedYPosition}px\`;
  displayY = state.fixedYPosition;
} else if (event.shiftKey && !event.ctrlKey) {
  if (state.fixedXPosition === null) {
    state.fixedXPosition = x;
  }
  ui.verticalLine.style.left = \`\${state.fixedXPosition}px\`;
  ui.horizontalLine.style.top = \`\${y}px\`;
  displayX = state.fixedXPosition;
} else {
  state.fixedYPosition = null;
  state.fixedXPosition = null;
  ui.verticalLine.style.left = \`\${x}px\`;
  ui.horizontalLine.style.top = \`\${y}px\`;
}

if (state.showCoordinates) {
  ui.coordinatesDisplay.textContent = \`X: \${displayX}px, Y: \${displayY}px\`;
  ui.coordinatesDisplay.style.display = "block";
} else {
  ui.coordinatesDisplay.style.display = "none";
}

state.mousePosition = { x: displayX, y: displayY };

const element = document.elementFromPoint(x, y);
if (
  element &&
  element !== ui.verticalLine &&
  element !== ui.horizontalLine &&
  element !== ui.coordinatesDisplay &&
  element !== ui.elementInfoDisplay &&
  element !== ui.fontInfoDisplay &&
  element !== ui.controlPanel &&
  !ui.controlPanel.contains(element)
) {
  state.hoveredElement = element;
  const computedStyle = window.getComputedStyle(element);

  if (state.showElementInfo) {
    const rect = element.getBoundingClientRect();

    const textColor = rgbToHex(computedStyle.color);
    const bgColor = rgbToHex(computedStyle.backgroundColor);

    ui.elementInfoDisplay.innerHTML = \`
      <strong>Tag:</strong> \${element.tagName.toLowerCase()}<br>
      <strong>ID:</strong> \${element.id || "none"}<br>
      <strong>Class:</strong> \${element.className || "none"}<br>
      <strong>Size:</strong> \${Math.round(rect.width)}px × \${Math.round(rect.height)}px<br>
      <strong>Color:</strong> \${textColor}<br>
      <strong>BG:</strong> \${bgColor}
    \`;

    ui.elementInfoDisplay.style.display = "block";
  } else {
    ui.elementInfoDisplay.style.display = "none";
  }

  if (state.showFontInfo) {
    const fontFamily = computedStyle.fontFamily;
    const fontSize = computedStyle.fontSize;
    const fontWeight = computedStyle.fontWeight;
    const lineHeight = computedStyle.lineHeight;
    const letterSpacing = computedStyle.letterSpacing;
    const textAlign = computedStyle.textAlign;
    const textTransform = computedStyle.textTransform;
    const fontStyle = computedStyle.fontStyle;
    const textDecoration = computedStyle.textDecoration;

    const textContent =
      element.textContent?.trim().substring(0, 30) +
      (element.textContent && element.textContent.trim().length > 30 ? "..." : "");

    ui.fontInfoDisplay.innerHTML = \`
      <div style="margin-bottom: 8px; font-family: \${fontFamily}; font-size: 16px; font-weight: \${fontWeight}; font-style: \${fontStyle}; text-decoration: \${textDecoration}; letter-spacing: \${letterSpacing}; text-transform: \${textTransform}; color: white;">
        \${textContent || "Saiba mais"}
      </div>
      <div style="font-size: 12px; line-height: 1.5;">
        Font Family: \${fontFamily.split(",")[0].replace(/['"]/g, "")}<br>
        Font Size: \${fontSize}<br>
        Font Weight: \${fontWeight}<br>
        Line Height: \${lineHeight}<br>
        Letter Spacing: \${letterSpacing}<br>
        Text Align: \${textAlign}<br>
        Text Transform: \${textTransform}<br>
        Font Style: \${fontStyle}<br>
        Text Decoration: \${textDecoration}
      </div>
    \`;

    ui.fontInfoDisplay.style.display = "block";
  } else {
    ui.fontInfoDisplay.style.display = "none";
  }
}

if (state.measureMode && state.measureStart) {
  const measureEnd = { x, y };

  const dx = measureEnd.x - state.measureStart.x;
  const dy = measureEnd.y - state.measureStart.y;
  const distance = Math.round(Math.sqrt(dx * dx + dy * dy));

  ui.measureDisplay.textContent = \`Distância: \${distance}px (Δx: \${dx}px, Δy: \${dy}px)\`;
  ui.measureDisplay.style.display = "block";

  const angle = Math.atan2(dy, dx);
  const measureLine = document.getElementById("dc-measure-line") || document.createElement("div");
  measureLine.id = "dc-measure-line";
  measureLine.style.position = "fixed";
  measureLine.style.height = "2px";
  measureLine.style.backgroundColor = "#ff0000";
  measureLine.style.transformOrigin = "0 0";
  measureLine.style.zIndex = "999998";
  measureLine.style.pointerEvents = "none";

  measureLine.style.width = \`\${distance}px\`;
  measureLine.style.left = \`\${state.measureStart.x}px\`;
  measureLine.style.top = \`\${state.measureStart.y}px\`;
  measureLine.style.transform = \`rotate(\${angle}rad)\`;

  if (!document.getElementById("dc-measure-line")) {
    document.body.appendChild(measureLine);
  }
}

positionDisplays(displayX, displayY);
};`;
}

export function handleClick(): string {
  return `
const handleClick = (event) => {
if (!state.active || !state.measureMode) return;

if (ui.controlPanel.contains(event.target)) return;

if (!state.measureStart) {
  state.measureStart = { x: event.clientX, y: event.clientY };
} else {
  const newPoint = {
    start: state.measureStart,
    end: { x: event.clientX, y: event.clientY },
    distance: Math.round(
      Math.sqrt(
        Math.pow(event.clientX - state.measureStart.x, 2) + Math.pow(event.clientY - state.measureStart.y, 2)
      )
    )
  };

  state.savedPoints.push(newPoint);
  console.log(
    \`Ponto salvo: (\${newPoint.start.x}, \${newPoint.start.y}) → (\${newPoint.end.x}, \${newPoint.end.y}): \${newPoint.distance}px\`
  );

  showNotification(\`Medição salva: \${newPoint.distance}px\`);

  state.measureStart = null;

  const measureLine = document.getElementById("dc-measure-line");
  if (measureLine) measureLine.remove();

  ui.measureDisplay.style.display = "none";
}
};`;
}

export function handleKeyDown(): string {
  return `
const handleKeyDown = (event) => {
if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

if (event.key === 'Escape') {
  if (state.measureStart) {
    state.measureStart = null;
    const measureLine = document.getElementById('dc-measure-line');
    if (measureLine) measureLine.remove();
    ui.measureDisplay.style.display = 'none';
  } else {
    cleanup();
  }
  return;
}

if (!state.active) return;

if (event.key.toLowerCase() === 'c') {
  copyInfo();
}

if (event.key.toLowerCase() === 'h') {
  toggleCoordinates();
}

if (event.key.toLowerCase() === 'i') {
  toggleElementInfo();
}

if (event.key.toLowerCase() === 'm') {
  toggleMeasureMode();
}

if (event.key.toLowerCase() === 'g') {
  toggleGrid();
}

if (event.key.toLowerCase() === 'f') {
  toggleFontInfo();
}
};`;
}

export function handleKeyUp(): string {
  return `
const handleKeyUp = (event) => {
if (event.key === 'Control') {
  state.fixedYPosition = null;
}
if (event.key === 'Shift') {
  state.fixedXPosition = null;
}
};`;
}
