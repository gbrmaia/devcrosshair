export function showSettings(): string {
  return `
const showSettings = () => {
  let settingsPanel = document.getElementById('dc-settings-panel');
  
  if (settingsPanel) {
    document.body.removeChild(settingsPanel);
    return;
  }
  
  settingsPanel = document.createElement('div');
  settingsPanel.id = 'dc-settings-panel';
  settingsPanel.style.position = 'fixed';
  settingsPanel.style.top = '50%';
  settingsPanel.style.left = '50%';
  settingsPanel.style.transform = 'translate(-50%, -50%)';
  settingsPanel.style.backgroundColor = 'white';
  settingsPanel.style.padding = '20px';
  settingsPanel.style.borderRadius = '8px';
  settingsPanel.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
  settingsPanel.style.zIndex = '1000001';
  settingsPanel.style.width = '300px';
  settingsPanel.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  
  settingsPanel.innerHTML = \`
    <h3 style="margin-top: 0; margin-bottom: 15px; font-size: 16px;">Configurações do Crosshair</h3>
    
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-size: 14px;">Cor da Linha</label>
      <input type="color" id="dc-line-color" value="\${state.lineColor}" style="width: 100%;">
    </div>
    
    <div style="margin-bottom: 15px;">
      <label for="dc-line-width" style="display: block; margin-bottom: 5px; font-size: 14px;">Espessura da Linha: \${state.lineWidth}px</label>
      <input type="range" id="dc-line-width" min="1" max="5" step="1" value="\${state.lineWidth}" style="width: 100%;">
    </div>
    
    <div style="margin-bottom: 15px;">
      <label for="dc-grid-size" style="display: block; margin-bottom: 5px; font-size: 14px;">Tamanho da Grade: \${state.gridSize}px</label>
      <input type="range" id="dc-grid-size" min="10" max="100" step="5" value="\${state.gridSize}" style="width: 100%;">
    </div>
    
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <button id="dc-settings-close" style="background-color: #e2e8f0; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Fechar</button>
      <button id="dc-settings-apply" style="background-color: #3b82f6; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Aplicar</button>
    </div>
  \`;
  
  document.body.appendChild(settingsPanel);
  
  document.getElementById('dc-line-width').addEventListener('input', function() {
    const value = this.value;
    document.querySelector('label[for="dc-line-width"]').textContent = \`Espessura da Linha: \${value}px\`;
  });
  
  document.getElementById('dc-grid-size').addEventListener('input', function() {
    const value = this.value;
    document.querySelector('label[for="dc-grid-size"]').textContent = \`Tamanho da Grade: \${value}px\`;
  });
  
  document.getElementById('dc-settings-close').addEventListener('click', function() {
    document.body.removeChild(settingsPanel);
  });
  
  document.getElementById('dc-settings-apply').addEventListener('click', function() {
    state.lineColor = document.getElementById('dc-line-color').value;
    state.lineWidth = parseInt(document.getElementById('dc-line-width').value);
    state.gridSize = parseInt(document.getElementById('dc-grid-size').value);
    
    ui.verticalLine.style.backgroundColor = state.lineColor;
    ui.verticalLine.style.width = \`\${state.lineWidth}px\`;
    ui.horizontalLine.style.backgroundColor = state.lineColor;
    ui.horizontalLine.style.height = \`\${state.lineWidth}px\`;
    
    if (state.showGrid) {
      updateGrid();
    }
    
    document.body.removeChild(settingsPanel);
  });
};`
}

