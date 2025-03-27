import { ImageResponse } from "next/og"

// Tamanho da imagem: 32×32
export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/svg+xml"

export default function Icon() {
  return new ImageResponse(
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill="#3B82F6" />
      <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.5" />
      <line x1="16" y1="6" x2="16" y2="26" stroke="white" strokeWidth="1.5" />
      <line x1="6" y1="16" x2="26" y2="16" stroke="white" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2" fill="white" />
    </svg>,
    { ...size },
  )
}

