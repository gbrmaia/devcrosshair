import type { State, UI, SavedPoint } from "./types"
import { rgbToHex, showNotification } from "./utils"
import { positionDisplays } from "./display"

// Função para mover as linhas com o mouse
export function handleMouseMove(state: State, ui: UI, event: MouseEvent): void {
  if (!state.active) return

  const x = event.clientX
  const y = event.clientY

  // Atualizar posição das linhas
  ui.verticalLine.style.left = `${x}px`
  ui.horizontalLine.style.top = `${y}px`

  // Atualizar coordenadas
  if (state.showCoordinates) {
    ui.coordinatesDisplay.textContent = `X: ${x}px, Y: ${y}px`
    ui.coordinatesDisplay.style.display = "block"
  } else {
    ui.coordinatesDisplay.style.display = "none"
  }

  // Atualizar posição do mouse
  state.mousePosition = { x, y }

  // Obter informações do elemento sob o cursor
  const element = document.elementFromPoint(x, y) as HTMLElement
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
    state.hoveredElement = element
    const computedStyle = window.getComputedStyle(element)

    // Atualizar informações do elemento
    if (state.showElementInfo) {
      const rect = element.getBoundingClientRect()

      // Converter cores para hexadecimal
      const textColor = rgbToHex(computedStyle.color)
      const bgColor = rgbToHex(computedStyle.backgroundColor)

      ui.elementInfoDisplay.innerHTML = `
        <strong>Tag:</strong> ${element.tagName.toLowerCase()}<br>
        <strong>ID:</strong> ${element.id || "none"}<br>
        <strong>Class:</strong> ${element.className || "none"}<br>
        <strong>Size:</strong> ${Math.round(rect.width)}px × ${Math.round(rect.height)}px<br>
        <strong>Color:</strong> ${textColor}<br>
        <strong>BG:</strong> ${bgColor}
      `

      ui.elementInfoDisplay.style.display = "block"
    } else {
      ui.elementInfoDisplay.style.display = "none"
    }

    // Atualizar informações de fonte
    if (state.showFontInfo) {
      // Extrair informações de fonte
      const fontFamily = computedStyle.fontFamily
      const fontSize = computedStyle.fontSize
      const fontWeight = computedStyle.fontWeight
      const lineHeight = computedStyle.lineHeight
      const letterSpacing = computedStyle.letterSpacing
      const textAlign = computedStyle.textAlign
      const textTransform = computedStyle.textTransform
      const fontStyle = computedStyle.fontStyle
      const textDecoration = computedStyle.textDecoration

      // Amostra de texto
      const textContent =
        element.textContent?.trim().substring(0, 30) +
        (element.textContent && element.textContent.trim().length > 30 ? "..." : "")

      ui.fontInfoDisplay.innerHTML = `
        <div style="margin-bottom: 8px; font-family: ${fontFamily}; font-size: 16px; font-weight: ${fontWeight}; font-style: ${fontStyle}; text-decoration: ${textDecoration}; letter-spacing: ${letterSpacing}; text-transform: ${textTransform}; color: white;">
          ${textContent || "Saiba mais"}
        </div>
        <div style="font-size: 12px; line-height: 1.5;">
          Font Family: ${fontFamily.split(",")[0].replace(/['"]/g, "")}<br>
          Font Size: ${fontSize}<br>
          Font Weight: ${fontWeight}<br>
          Line Height: ${lineHeight}<br>
          Letter Spacing: ${letterSpacing}<br>
          Text Align: ${textAlign}<br>
          Text Transform: ${textTransform}<br>
          Font Style: ${fontStyle}<br>
          Text Decoration: ${textDecoration}
        </div>
      `

      ui.fontInfoDisplay.style.display = "block"
    } else {
      ui.fontInfoDisplay.style.display = "none"
    }
  }

  // Atualizar medição
  if (state.measureMode && state.measureStart) {
    const measureEnd = { x, y }

    const dx = measureEnd.x - state.measureStart.x
    const dy = measureEnd.y - state.measureStart.y
    const distance = Math.round(Math.sqrt(dx * dx + dy * dy))

    ui.measureDisplay.textContent = `Distância: ${distance}px (Δx: ${dx}px, Δy: ${dy}px)`
    ui.measureDisplay.style.display = "block"

    // Desenhar linha de medição
    const angle = Math.atan2(dy, dx)
    const measureLine = document.getElementById("dc-measure-line") || document.createElement("div")
    measureLine.id = "dc-measure-line"
    measureLine.style.position = "fixed"
    measureLine.style.height = "2px"
    measureLine.style.backgroundColor = "#ff0000"
    measureLine.style.transformOrigin = "0 0"
    measureLine.style.zIndex = "999998"
    measureLine.style.pointerEvents = "none"

    measureLine.style.width = `${distance}px`
    measureLine.style.left = `${state.measureStart.x}px`
    measureLine.style.top = `${state.measureStart.y}px`
    measureLine.style.transform = `rotate(${angle}rad)`

    if (!document.getElementById("dc-measure-line")) {
      document.body.appendChild(measureLine)
    }
  }

  // Posicionar os displays em quadrantes diferentes
  positionDisplays(state, ui, x, y)
}

// Função para lidar com cliques (para medição e pontos salvos)
export function handleClick(state: State, ui: UI, event: MouseEvent): void {
  if (!state.active || !state.measureMode) return

  // Ignorar cliques no painel de controle
  if (ui.controlPanel.contains(event.target as Node)) return

  if (!state.measureStart) {
    state.measureStart = { x: event.clientX, y: event.clientY }
  } else {
    // Finalizar medição e salvar ponto
    const newPoint: SavedPoint = {
      start: state.measureStart,
      end: { x: event.clientX, y: event.clientY },
      distance: Math.round(
        Math.sqrt(
          Math.pow(event.clientX - state.measureStart.x, 2) + Math.pow(event.clientY - state.measureStart.y, 2),
        ),
      ),
    }

    state.savedPoints.push(newPoint)
    console.log(
      `Ponto salvo: (${newPoint.start.x}, ${newPoint.start.y}) → (${newPoint.end.x}, ${newPoint.end.y}): ${newPoint.distance}px`,
    )

    // Mostrar notificação
    showNotification(`Medição salva: ${newPoint.distance}px`)

    // Resetar medição
    state.measureStart = null

    // Remover linha de medição
    const measureLine = document.getElementById("dc-measure-line")
    if (measureLine) measureLine.remove()

    // Esconder display de medição
    ui.measureDisplay.style.display = "none"
  }
}

// Função para lidar com teclas de atalho
export function handleKeyDown(state: State, ui: UI, handlers: any, event: KeyboardEvent): void {
  // Ignorar eventos de tecla em inputs
  if ((event.target as HTMLElement).tagName === "INPUT" || (event.target as HTMLElement).tagName === "TEXTAREA") return

  // Tecla ESC - Desativar
  if (event.key === "Escape") {
    if (state.measureStart) {
      // Cancelar medição atual
      state.measureStart = null
      const measureLine = document.getElementById("dc-measure-line")
      if (measureLine) measureLine.remove()
      ui.measureDisplay.style.display = "none"
    } else {
      // Desativar completamente
      handlers.cleanup()
    }
    return
  }

  if (!state.active) return

  // Tecla C - Copiar informações
  if (event.key.toLowerCase() === "c") {
    handlers.copyInfo()
  }

  // Tecla H - Alternar coordenadas
  if (event.key.toLowerCase() === "h") {
    handlers.toggleCoordinates()
  }

  // Tecla I - Alternar informações do elemento
  if (event.key.toLowerCase() === "i") {
    handlers.toggleElementInfo()
  }

  // Tecla M - Alternar modo de medição
  if (event.key.toLowerCase() === "m") {
    handlers.toggleMeasureMode()
  }

  // Tecla G - Alternar grade
  if (event.key.toLowerCase() === "g") {
    handlers.toggleGrid()
  }

  // Tecla F - Alternar informações de fonte
  if (event.key.toLowerCase() === "f") {
    handlers.toggleFontInfo()
  }
}

