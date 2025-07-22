import { NextRequest, NextResponse } from 'next/server'
import { verifyEmailConfig, sendContactEmail, sendCustomerConfirmationEmail } from '@/lib/email'
import { validateOrigin, validateSecurityHeaders, checkRateLimit } from '@/lib/security'

export async function GET(request: NextRequest) {
  try {
    // Validaciones de seguridad para el endpoint de verificación
    if (!validateOrigin(request)) {
      console.warn('Blocked GET request from invalid origin:', request.headers.get('origin'))
      return NextResponse.json(
        { error: 'Origen no autorizado' },
        { status: 403 }
      )
    }

    if (!checkRateLimit(request)) {
      console.warn('Rate limit exceeded for verification endpoint')
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
        { status: 429 }
      )
    }

    // Verificar configuración de email
    const isConfigValid = await verifyEmailConfig()
    
    return NextResponse.json({
      emailConfigValid: isConfigValid,
      smtpHost: process.env.SMTP_HOST ? 'Configurado' : 'No configurado',
      smtpUser: process.env.SMTP_USER ? 'Configurado' : 'No configurado',
      smtpFrom: process.env.SMTP_FROM ? 'Configurado' : 'No configurado',
      emailTo: process.env.EMAIL_TO ? 'Configurado' : 'No configurado',
    })
  } catch (error) {
    console.error('Error verifying email config:', error)
    return NextResponse.json(
      { error: 'Error verificando configuración de email' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validaciones de seguridad para el endpoint de prueba
    if (!validateOrigin(request)) {
      console.warn('Blocked POST request from invalid origin:', request.headers.get('origin'))
      return NextResponse.json(
        { error: 'Origen no autorizado' },
        { status: 403 }
      )
    }

    if (!validateSecurityHeaders(request)) {
      console.warn('Blocked test email request with invalid security headers')
      return NextResponse.json(
        { error: 'Headers de seguridad inválidos' },
        { status: 400 }
      )
    }

    if (!checkRateLimit(request)) {
      console.warn('Rate limit exceeded for test email endpoint')
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
        { status: 429 }
      )
    }

    // Enviar ambos emails de prueba
    const testData = {
      name: 'Cliente de Prueba',
      email: 'business@carlosduri.com',
      phone: '214-123-4567',
      message: 'Este es un mensaje de prueba del sistema de emails de Service Auto Glass LLC.'
    }

    const notificationEmailSent = await sendContactEmail(testData)
    const confirmationEmailSent = await sendCustomerConfirmationEmail(testData)

    return NextResponse.json({
      notificationEmail: {
        success: notificationEmailSent,
        message: notificationEmailSent 
          ? 'Email de notificación enviado exitosamente a ' + process.env.EMAIL_TO
          : 'Error al enviar email de notificación'
      },
      confirmationEmail: {
        success: confirmationEmailSent,
        message: confirmationEmailSent 
          ? 'Email de confirmación enviado exitosamente a ' + testData.email
          : 'Error al enviar email de confirmación'
      },
      overallSuccess: notificationEmailSent && confirmationEmailSent
    })
  } catch (error) {
    console.error('Error sending test emails:', error)
    return NextResponse.json(
      { error: 'Error enviando emails de prueba' },
      { status: 500 }
    )
  }
}
