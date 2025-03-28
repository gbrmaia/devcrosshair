export function cleanup(): string {
  return `
const cleanup = () => {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleKeyDown);
  
  if (ui.verticalLine.parentNode) document.body.removeChild(ui.verticalLine);
  if (ui.horizontalLine.parentNode) document.body.removeChild(ui.horizontalLine);
  if (ui.coordinatesDisplay.parentNode) document.body.removeChild(ui.coordinatesDisplay);
  if (ui.elementInfoDisplay.parentNode) document.body.removeChild(ui.elementInfoDisplay);
  if (ui.measureDisplay.parentNode) document.body.removeChild(ui.measureDisplay);
  if (ui.fontInfoDisplay.parentNode) document.body.removeChild(ui.fontInfoDisplay);
  if (ui.gridContainer.parentNode) document.body.removeChild(ui.gridContainer);
  if (ui.controlPanel.parentNode) document.body.removeChild(ui.controlPanel);
  
  const measureLine = document.getElementById('dc-measure-line');
  if (measureLine) measureLine.remove();
  
  const settingsPanel = document.getElementById('dc-settings-panel');
  if (settingsPanel) settingsPanel.remove();
  
  console.log('DevCrosshair foi removido. Obrigado por usar!');
};`
}

