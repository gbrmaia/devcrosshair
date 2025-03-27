// Funções utilitárias

// Função para converter RGB para Hex
export function rgbToHex(rgb: string): string {
  // Verifica se já é um valor hexadecimal
  if (rgb.startsWith("#")) {
    return rgb
  }

  // Extrai os valores RGB
  const rgbValues = rgb.match(/\d+/g)
  if (!rgbValues || rgbValues.length < 3) {
    return rgb // Retorna o original se não conseguir converter
  }

  // Converte para hexadecimal
  return (
    "#" +
    rgbValues
      .slice(0, 3)
      .map((x) => {
        const hex = Number.parseInt(x).toString(16)
        return hex.length === 1 ? "0" + hex : hex
      })
      .join("")
  )
}

// Função para mostrar notificações
export function showNotification(message: string, isError = false): void {
  const notification = document.createElement("div")
  notification.style.position = "fixed"
  notification.style.bottom = "80px"
  notification.style.right = "20px"
  notification.style.backgroundColor = isError ? "#ef4444" : "#10b981"
  notification.style.color = "white"
  notification.style.padding = "8px 16px"
  notification.style.borderRadius = "4px"
  notification.style.fontFamily = "system-ui, -apple-system, sans-serif"
  notification.style.fontSize = "14px"
  notification.style.zIndex = "1000001"
  notification.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  notification.textContent = message

  document.body.appendChild(notification)

  // Remover após 2 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      document.body.removeChild(notification)
    }
  }, 2000)
}

