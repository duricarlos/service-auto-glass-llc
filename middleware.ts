import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Solo aplicar a rutas de API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    
    // Agregar headers de seguridad
    const response = NextResponse.next()
    
    // Prevenir clickjacking
    response.headers.set('X-Frame-Options', 'DENY')
    
    // Prevenir MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff')
    
    // Habilitar protección XSS del navegador
    response.headers.set('X-XSS-Protection', '1; mode=block')
    
    // Referrer policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    return response
  }
}

export const config = {
  matcher: '/api/:path*'
}
