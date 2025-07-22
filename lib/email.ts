import nodemailer from 'nodemailer';

// Configuración del transporter SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true para port 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface ContactFormData {
  name: string;
  phone: string;
  message: string;
  email?: string; // Agregar email opcional del cliente
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const { name, phone, message } = formData;
    const currentDate = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const emailHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Formulario de Contacto - Service Auto Glass LLC</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #fff;
        }
        .info-table th {
            background-color: #f8fafc;
            padding: 15px;
            text-align: left;
            border: 1px solid #e2e8f0;
            font-weight: bold;
            color: #374151;
            width: 30%;
        }
        .info-table td {
            padding: 15px;
            border: 1px solid #e2e8f0;
            background-color: #ffffff;
        }
        .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .message-box h3 {
            margin-top: 0;
            color: #1e40af;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background-color: #f8fafc;
            border-radius: 8px;
            border-top: 3px solid #3b82f6;
        }
        .footer p {
            margin: 5px 0;
            color: #6b7280;
        }
        .urgent {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .urgent p {
            margin: 0;
            color: #dc2626;
            font-weight: bold;
        }
        .contact-info {
            background-color: #eff6ff;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .contact-info h4 {
            margin-top: 0;
            color: #1e40af;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 Service Auto Glass LLC</h1>
            <p>Nuevo Formulario de Contacto Recibido</p>
        </div>

        <div class="urgent">
            <p>⚠️ ¡NUEVO CLIENTE POTENCIAL! Responder lo más pronto posible.</p>
        </div>

        <h2>📋 Información del Cliente</h2>
        <table class="info-table">
            <tr>
                <th>👤 Nombre Completo</th>
                <td><strong>${name}</strong></td>
            </tr>
            <tr>
                <th>📞 Número de Teléfono</th>
                <td><strong><a href="tel:${phone}">${phone}</a></strong></td>
            </tr>
            <tr>
                <th>📅 Fecha y Hora</th>
                <td>${currentDate}</td>
            </tr>
            <tr>
                <th>🌐 Origen</th>
                <td>Sitio Web - Service Auto Glass LLC</td>
            </tr>
        </table>

        <div class="message-box">
            <h3>💬 Mensaje del Cliente</h3>
            <p><em>"${message}"</em></p>
        </div>

        <div class="contact-info">
            <h4>📋 Acciones Recomendadas</h4>
            <ul>
                <li><strong>Llamar al cliente:</strong> <a href="tel:${phone}">${phone}</a></li>
                <li><strong>Tiempo de respuesta ideal:</strong> Dentro de los próximos 15-30 minutos</li>
                <li><strong>Información a solicitar:</strong> Ubicación exacta, tipo de vehículo, descripción del daño</li>
                <li><strong>Servicio a ofrecer:</strong> Evaluación gratuita y presupuesto sin compromiso</li>
            </ul>
        </div>

        <div class="footer">
            <p><strong>Service Auto Glass LLC</strong></p>
            <p>📍 6101 Willard Rd, Fort Worth, TX 76119</p>
            <p>📞 214-939-0707</p>
            <p>🕒 Lunes a Sábado de 8:00 AM a 6:00 PM</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;">
            <p><small>Este email fue generado automáticamente desde el sitio web de Service Auto Glass LLC</small></p>
        </div>
    </div>
</body>
</html>
    `;

    const emailText = `
NUEVO FORMULARIO DE CONTACTO - SERVICE AUTO GLASS LLC

¡NUEVO CLIENTE POTENCIAL! Responder lo más pronto posible.

INFORMACIÓN DEL CLIENTE:
- Nombre: ${name}
- Teléfono: ${phone}
- Fecha: ${currentDate}
- Origen: Sitio Web

MENSAJE DEL CLIENTE:
"${message}"

ACCIONES RECOMENDADAS:
- Llamar al cliente: ${phone}
- Tiempo de respuesta ideal: 15-30 minutos
- Solicitar: ubicación, tipo de vehículo, descripción del daño
- Ofrecer: evaluación gratuita y presupuesto

---
Service Auto Glass LLC
6101 Willard Rd, Fort Worth, TX 76119
214-939-0707
Lunes a Sábado de 8:00 AM a 6:00 PM
    `;

    const mailOptions = {
      from: {
        name: 'Service Auto Glass LLC - Sitio Web',
        address: process.env.SMTP_FROM!,
      },
      to: process.env.EMAIL_TO!,
      subject: `🚗 NUEVO CLIENTE: ${name} - Solicitud de Servicio de Vidrios`,
      text: emailText,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    return true;

  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Función para verificar la configuración del transporter
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}

// Función para enviar email de confirmación al cliente
export async function sendCustomerConfirmationEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const { name, phone, message, email } = formData;
    
    if (!email) {
      console.log('No email provided for customer confirmation');
      return false;
    }

    const currentDate = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const confirmationHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Mensaje - Service Auto Glass LLC</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            color: white;
            padding: 25px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
        }
        .check-icon {
            font-size: 48px;
            color: #10b981;
            text-align: center;
            margin: 20px 0;
        }
        .message-box {
            background-color: #f0f9ff;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #fff;
        }
        .info-table th {
            background-color: #f8fafc;
            padding: 12px;
            text-align: left;
            border: 1px solid #e2e8f0;
            font-weight: bold;
            color: #374151;
            width: 35%;
        }
        .info-table td {
            padding: 12px;
            border: 1px solid #e2e8f0;
            background-color: #ffffff;
        }
        .next-steps {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
        }
        .next-steps h3 {
            margin-top: 0;
            color: #92400e;
        }
        .contact-info {
            background-color: #eff6ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
        .contact-info h4 {
            margin-top: 0;
            color: #1e40af;
        }
        .phone-number {
            font-size: 24px;
            font-weight: bold;
            color: #dc2626;
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background-color: #f8fafc;
            border-radius: 8px;
            border-top: 3px solid #3b82f6;
        }
        .footer p {
            margin: 5px 0;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 Service Auto Glass LLC</h1>
            <p>¡Gracias por contactarnos!</p>
        </div>

        <div class="check-icon">✅</div>

        <h2 style="text-align: center; color: #10b981;">¡Tu mensaje ha sido recibido exitosamente!</h2>

        <div class="message-box">
            <p><strong>Estimado/a ${name},</strong></p>
            <p>Hemos recibido tu solicitud de servicio de vidrios para auto y queremos agradecerte por confiar en nosotros. Tu mensaje es muy importante para nosotros.</p>
        </div>

        <h3>📋 Resumen de tu solicitud</h3>
        <table class="info-table">
            <tr>
                <th>👤 Nombre</th>
                <td>${name}</td>
            </tr>
            <tr>
                <th>📞 Teléfono</th>
                <td>${phone}</td>
            </tr>
            <tr>
                <th>📧 Email</th>
                <td>${email}</td>
            </tr>
            <tr>
                <th>📅 Fecha de solicitud</th>
                <td>${currentDate}</td>
            </tr>
        </table>

        <div class="message-box">
            <h4>💬 Tu mensaje:</h4>
            <p><em>"${message}"</em></p>
        </div>

        <div class="next-steps">
            <h3>⏰ ¿Qué sigue ahora?</h3>
            <ul>
                <li><strong>Respuesta rápida:</strong> Nuestro equipo te contactará dentro de los próximos 30 minutos durante horario laboral</li>
                <li><strong>Evaluación gratuita:</strong> Programaremos una cita para evaluar el daño en tu vehículo</li>
                <li><strong>Presupuesto sin compromiso:</strong> Te daremos un precio justo y transparente</li>
                <li><strong>Servicio móvil:</strong> Vamos hasta donde estés, ¡sin costo adicional!</li>
            </ul>
        </div>

        <div class="contact-info">
            <h4>📞 ¿Necesitas contactarnos de inmediato?</h4>
            <p>Si es una emergencia o necesitas hablar con nosotros ahora mismo:</p>
            <div class="phone-number">214-939-0707</div>
            <p>📍 6101 Willard Rd, Fort Worth, TX 76119</p>
            <p>🕒 Lunes a Sábado de 8:00 AM a 6:00 PM</p>
        </div>

        <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #991b1b; text-align: center;"><strong>⚠️ IMPORTANTE:</strong> Si tu parabrisas está severamente dañado, evita manejar y contáctanos inmediatamente para tu seguridad.</p>
        </div>

        <div class="footer">
            <p><strong>Service Auto Glass LLC</strong></p>
            <p>🏆 Más de 20 años de experiencia</p>
            <p>🔧 Técnicos certificados</p>
            <p>✅ Garantía de satisfacción</p>
            <p>🇺🇸🇲🇽 Atendemos en español e inglés</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;">
            <p><small>Este es un email automático de confirmación. No responder a este email.</small></p>
        </div>
    </div>
</body>
</html>
    `;

    const confirmationText = `
¡GRACIAS POR CONTACTAR A SERVICE AUTO GLASS LLC!

Estimado/a ${name},

Tu mensaje ha sido recibido exitosamente. Nos pondremos en contacto contigo dentro de los próximos 30 minutos durante horario laboral.

RESUMEN DE TU SOLICITUD:
- Nombre: ${name}
- Teléfono: ${phone}
- Email: ${email}
- Fecha: ${currentDate}
- Mensaje: "${message}"

¿QUÉ SIGUE AHORA?
✓ Respuesta rápida (30 minutos)
✓ Evaluación gratuita
✓ Presupuesto sin compromiso
✓ Servicio móvil gratuito

¿NECESITAS CONTACTARNOS DE INMEDIATO?
Teléfono: 214-939-0707
Dirección: 6101 Willard Rd, Fort Worth, TX 76119
Horario: Lunes a Sábado de 8:00 AM a 6:00 PM

IMPORTANTE: Si tu parabrisas está severamente dañado, evita manejar y contáctanos inmediatamente.

Service Auto Glass LLC
Más de 20 años de experiencia
Técnicos certificados
Garantía de satisfacción
Atendemos en español e inglés
    `;

    const mailOptions = {
      from: {
        name: 'Service Auto Glass LLC',
        address: process.env.SMTP_FROM!,
      },
      to: email,
      subject: '✅ Confirmación: Tu solicitud ha sido recibida - Service Auto Glass LLC',
      text: confirmationText,
      html: confirmationHtml,
    };

    await transporter.sendMail(mailOptions);
    return true;

  } catch (error) {
    console.error('Error sending customer confirmation email:', error);
    return false;
  }
}
