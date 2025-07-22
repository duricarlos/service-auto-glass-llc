import { NextRequest, NextResponse } from 'next/server'
import { createDirectus, rest, createItem } from '@directus/sdk'
import { sendContactEmail, sendCustomerConfirmationEmail } from '@/lib/email'
import { validateOrigin, validateSecurityHeaders, checkRateLimit } from '@/lib/security'

// Configurar cliente de Directus para escritura
const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!).with(rest())

export async function POST(request: NextRequest) {
  try {
    // Validaciones de seguridad
    if (!validateOrigin(request)) {
      console.warn('Blocked request from invalid origin:', request.headers.get('origin'))
      return NextResponse.json(
        { error: 'Origen no autorizado' },
        { status: 403 }
      )
    }

    if (!validateSecurityHeaders(request)) {
      console.warn('Blocked request with invalid security headers')
      return NextResponse.json(
        { error: 'Headers de seguridad inválidos' },
        { status: 400 }
      )
    }

    if (!checkRateLimit(request)) {
      console.warn('Rate limit exceeded for IP:', request.headers.get('x-forwarded-for'))
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
        { status: 429 }
      )
    }

    const { name, email, phone, message } = await request.json()

    // Validar datos
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    // Validar formato del teléfono (básico)
    const phoneRegex = /^[\d\s\-\+\(\)\.]+$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Formato de teléfono inválido' },
        { status: 400 }
      )
    }

    // Validar longitud de campos
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'El nombre debe tener entre 2 y 100 caracteres' },
        { status: 400 }
      )
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: 'El mensaje debe tener entre 10 y 1000 caracteres' },
        { status: 400 }
      )
    }

    const formData = { 
      name: name.trim(), 
      email: email.trim().toLowerCase(),
      phone: phone.trim(), 
      message: message.trim() 
    }

    // Enviar email de notificación a la empresa
    const notificationEmailSent = await sendContactEmail(formData)
    
    if (!notificationEmailSent) {
      console.error('Failed to send notification email to company')
      // No devolvemos error para no afectar la experiencia del usuario
    }

    // Enviar email de confirmación al cliente
    const confirmationEmailSent = await sendCustomerConfirmationEmail(formData)
    
    if (!confirmationEmailSent) {
      console.error('Failed to send confirmation email to customer')
      // No devolvemos error para no afectar la experiencia del usuario
    }

    // Guardar en Directus (opcional)
    try {
      await directus.request(
        createItem('contact_submissions', {
          ...formData,
          submitted_at: new Date().toISOString(),
          status: 'new',
          notification_email_sent: notificationEmailSent,
          confirmation_email_sent: confirmationEmailSent
        })
      )
    } catch (directusError) {
      console.error('Error saving to Directus:', directusError)
      // Continúa aunque falle Directus
    }

    return NextResponse.json(
      { 
        message: 'Mensaje enviado exitosamente',
        notificationEmailSent,
        confirmationEmailSent
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
