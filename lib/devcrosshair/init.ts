export function init(): string {
  return `
function init() {
if (document.getElementById('dc-toggle')) {
  console.log('DevCrosshair já está em execução!');
  return;
}

initUI();

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

console.log('DevCrosshair inicializado!');
console.log('Atalhos de teclado:');
console.log('- H: Mostrar/ocultar coordenadas');
console.log('- I: Mostrar/ocultar informações do elemento');
console.log('- F: Mostrar/ocultar informações de fonte');
console.log('- M: Ativar/desativar modo de medição');
console.log('- G: Mostrar/ocultar grade');
console.log('- C: Copiar coordenadas ou informações do elemento');
console.log('- ESC: Cancelar medição ou desativar');
console.log('- CTRL + Mouse: Mover apenas a linha horizontal');
console.log('- SHIFT + Mouse: Mover apenas a linha vertical');

showNotification('DevCrosshair ativado!');
}`;
}
