export function rgbToHex(): string {
  return `
const rgbToHex = (rgb) => {
  if (rgb.startsWith("#")) {
    return rgb;
  }

  const rgbValues = rgb.match(/\\d+/g);
  if (!rgbValues || rgbValues.length < 3) {
    return rgb;
  }

  return (
    "#" +
    rgbValues
      .slice(0, 3)
      .map((x) => {
        const hex = Number.parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};`
}

export function showNotification(): string {
  return `
const showNotification = (message, isError = false) => {
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.bottom = "80px";
  notification.style.right = "20px";
  notification.style.backgroundColor = isError ? "#ef4444" : "#10b981";
  notification.style.color = "white";
  notification.style.padding = "8px 16px";
  notification.style.borderRadius = "4px";
  notification.style.fontFamily = "system-ui, -apple-system, sans-serif";
  notification.style.fontSize = "14px";
  notification.style.zIndex = "1000001";
  notification.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentNode) {
      document.body.removeChild(notification);
    }
  }, 2000);
};`
}

export function copyUsingExecCommand(): string {
  return `
const copyUsingExecCommand = (text) => {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    if (successful) {
      showNotification("Informações copiadas!");
    } else {
      showNotification("Não foi possível copiar. Tente pressionar Ctrl+C.", true);
    }
  } catch (err) {
    console.error("Erro ao copiar (método 2): ", err);
    showNotification("Erro ao copiar informações", true);
  }
};`
}

// Adicionar a função calculateDistance que estava faltando
export function calculateDistance(): string {
  return `
const calculateDistance = (point1, point2) => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};`
}

