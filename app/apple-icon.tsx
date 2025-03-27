import { ImageResponse } from "next/og"

// Tamanho da imagem: 180×180
export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="90" fill="#3B82F6" />
      <circle cx="90" cy="90" r="60" stroke="white" strokeWidth="8" />
      <line x1="90" y1="30" x2="90" y2="150" stroke="white" strokeWidth="8" />
      <line x1="30" y1="90" x2="150" y2="90" stroke="white" strokeWidth="8" />
      <circle cx="90" cy="90" r="12" fill="white" />
    </svg>,
    { ...size },
  )
}

