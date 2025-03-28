import { generateDevCrosshairScript } from "@/lib/devcrosshair"

export async function GET() {
  const devCrosshairCode = generateDevCrosshairScript()

  const headers = new Headers()
  headers.append("Content-Type", "application/javascript")
  headers.append("Access-Control-Allow-Origin", "*")
  headers.append("Access-Control-Allow-Methods", "GET, OPTIONS")
  headers.append("Access-Control-Allow-Headers", "Content-Type")

  return new Response(devCrosshairCode, {
    status: 200,
    headers,
  })
}

export async function OPTIONS() {
  const headers = new Headers()
  headers.append("Access-Control-Allow-Origin", "*")
  headers.append("Access-Control-Allow-Methods", "GET, OPTIONS")
  headers.append("Access-Control-Allow-Headers", "Content-Type")

  return new Response(null, {
    status: 204,
    headers,
  })
}

