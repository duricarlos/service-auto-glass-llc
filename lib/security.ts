import { NextRequest } from 'next/server'

/**
 * Valida que la solicitud proviene del mismo host para prevenir ataques CSRF
 * @param request - La solicitud HTTP
 * @returns true si el origen es válido, false en caso contrario
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  const host = request.headers.get('host')
  
  // Obtener el host de la aplicación
  const appHost = host || process.env.NEXT_PUBLIC_APP_URL || 'localhost:3000'
  
  // Lista de hosts permitidos
  const allowedHosts = [
    `http://${appHost}`,
    `https://${appHost}`,
    `http://localhost:3000`,
    `https://localhost:3000`,
    // Agregar más hosts permitidos si es necesario
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean) as string[]

  // Si hay origin, validarlo
  if (origin) {
    return allowedHosts.some(allowedHost => 
      origin === allowedHost || origin.startsWith(allowedHost)
    )
  }

  // Si hay referer, validarlo
  if (referer) {
    return allowedHosts.some(allowedHost => 
      referer.startsWith(allowedHost)
    )
  }

  // Si no hay origin ni referer, rechazar (posible ataque)
  return false
}

/**
 * Valida que la solicitud incluya headers de seguridad apropiados
 * @param request - La solicitud HTTP
 * @returns true si los headers son válidos, false en caso contrario
 */
export function validateSecurityHeaders(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent')
  const contentType = request.headers.get('content-type')
  
  // Rechazar solicitudes sin User-Agent (posible bot malicioso)
  if (!userAgent || userAgent.length < 10) {
    return false
  }

  // Para solicitudes POST, validar Content-Type
  if (request.method === 'POST') {
    if (!contentType || !contentType.includes('application/json')) {
      return false
    }
  }

  return true
}

/**
 * Rate limiting simple basado en IP
 */
const requestCounts = new Map<string, { count: number; lastReset: number }>()
const MAX_REQUESTS_PER_MINUTE = 10
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minuto

export function checkRateLimit(request: NextRequest): boolean {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
    request.headers.get('x-real-ip') || 
    request.headers.get('cf-connecting-ip') || // Cloudflare
    'unknown'

  const now = Date.now()
  const requestData = requestCounts.get(ip)

  if (!requestData) {
    requestCounts.set(ip, { count: 1, lastReset: now })
    return true
  }

  // Reset counter si ha pasado la ventana de tiempo
  if (now - requestData.lastReset > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, lastReset: now })
    return true
  }

  // Incrementar contador
  requestData.count++

  // Verificar si excede el límite
  if (requestData.count > MAX_REQUESTS_PER_MINUTE) {
    return false
  }

  return true
}
