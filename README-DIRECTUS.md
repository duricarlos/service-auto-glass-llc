# Serv### 2. Variables de Entorno

Crea o edita el archivo `.env.local` con la siguiente configuración:

```bash
# URL de tu instancia de Directus
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055

# Token de acceso (opcional, solo si requiere autenticación)
# DIRECTUS_TO4. **Emails no llegan**
   - Revisa la bandeja de spam
   - Verifica los logs de SES en AWS Console
   - Confirma que no hayas alcanzado límites de envío

## 🔒 **Seguridad Implementada:**

### **Protecciones de API:**

1. **Validación de Origen (CSRF Protection)**
   - Solo acepta solicitudes del mismo host/dominio
   - Valida headers `Origin` y `Referer`
   - Bloquea solicitudes de dominios no autorizados

2. **Rate Limiting**
   - Máximo 10 solicitudes por minuto por IP
   - Previene ataques de spam y DoS
   - Ventana deslizante de 60 segundos

3. **Validación de Headers de Seguridad**
   - Requiere `User-Agent` válido
   - Valida `Content-Type` para solicitudes POST
   - Rechaza solicitudes sospechosas

4. **Headers de Seguridad Adicionales**
   - `X-Frame-Options: DENY` (previene clickjacking)
   - `X-Content-Type-Options: nosniff` (previene MIME sniffing)
   - `X-XSS-Protection: 1; mode=block` (protección XSS)
   - `Referrer-Policy: strict-origin-when-cross-origin`

### **Logs de Seguridad:**
Todas las solicitudes bloqueadas se registran en los logs con:
- IP del atacante
- Razón del bloqueo
- Headers de la solicitud

### **Configuración para Producción:**
1. Actualizar `NEXT_PUBLIC_APP_URL` con tu dominio real
2. Configurar proxy/CDN para headers de IP correctos
3. Monitorear logs de seguridad regularmentetu_token_aqui

# Configuración de Email SMTP (SES)
SMTP_HOST=tu_host_ses_aqui
SMTP_PORT=587
SMTP_USER=tu_username_ses_aqui
SMTP_PASS=tu_password_ses_aqui
SMTP_FROM=tu_email_from_aqui
EMAIL_TO=Genesisyulm@gmail.com

# Configuración de Seguridad
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Para producción cambiar a tu dominio:
# NEXT_PUBLIC_APP_URL=https://tudominio.com
```

**Configuración de SES (Amazon Simple Email Service):**

- `SMTP_HOST`: Por ejemplo `email-smtp.us-east-1.amazonaws.com`
- `SMTP_PORT`: Usar `587` para STARTTLS
- `SMTP_USER`: Tu Access Key ID de SES
- `SMTP_PASS`: Tu Secret Access Key de SES
- `SMTP_FROM`: Email verificado en SES para envío
- `EMAIL_TO`: Email donde recibirás las notificaciones

**Configuración de Seguridad:**

- `NEXT_PUBLIC_APP_URL`: URL de tu aplicación para validación de origenass LLC - Landing Page con Directus CMS

Este proyecto es un landing page para Service Auto Glass LLC integrado con Directus CMS para gestión de contenido.

## Configuración del Proyecto

### 1. Variables de Entorno

Crea o edita el archivo `.env.local` con la siguiente configuración:

```bash
# URL de tu instancia de Directus
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055

# Token de acceso (opcional, solo si requiere autenticación)
# DIRECTUS_TOKEN=tu_token_aqui
```

### 2. Instalación de Dependencias

```bash
npm install
```

### 3. Ejecutar el Proyecto

```bash
npm run dev
```

## Configuración de Directus CMS

### Paso 1: Instalar Directus

```bash
# Instalar Directus localmente
npm create directus-project@latest directus-cms
cd directus-cms
npm install
```

### Paso 2: Configurar Base de Datos

Edita el archivo `.env` en tu instancia de Directus:

```bash
DB_CLIENT="sqlite3"
DB_FILENAME="./data.db"

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="password"

KEY="replace-with-random-value"
SECRET="replace-with-random-value"
```

### Paso 3: Inicializar Directus

```bash
npx directus bootstrap
npx directus start
```

## Estructura de Datos en Directus

### Colección: `landing_page_content`

Crear una colección con los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `hero_title` | Text | Título principal del hero |
| `hero_subtitle` | Text | Subtítulo del hero |
| `hero_phone_button_text` | String | Texto del botón de teléfono |
| `hero_quote_button_text` | String | Texto del botón de presupuesto |
| `services_title` | String | Título de la sección servicios |
| `services_subtitle` | Text | Subtítulo de servicios |
| `windshield_replacement_title` | String | Título del servicio de reemplazo |
| `windshield_replacement_description` | Text | Descripción del reemplazo |
| `mobile_service_title` | String | Título del servicio móvil |
| `mobile_service_description` | Text | Descripción del servicio móvil |
| `why_choose_title` | String | Título "Por qué elegirnos" |
| `why_choose_subtitle` | Text | Subtítulo "Por qué elegirnos" |
| `experience_title` | String | Título de experiencia |
| `experience_description` | Text | Descripción de experiencia |
| `certified_title` | String | Título de certificación |
| `certified_description` | Text | Descripción de certificación |
| `satisfaction_title` | String | Título de satisfacción |
| `satisfaction_description` | Text | Descripción de satisfacción |
| `spanish_title` | String | Título de español |
| `spanish_description` | Text | Descripción de español |
| `contact_title` | String | Título de contacto |
| `contact_subtitle` | Text | Subtítulo de contacto |
| `address_label` | String | Etiqueta de dirección |
| `address_value` | String | Valor de dirección |
| `phone_label` | String | Etiqueta de teléfono |
| `phone_value` | String | Valor de teléfono |
| `schedule_label` | String | Etiqueta de horario |
| `schedule_value` | String | Valor de horario |
| `form_title` | String | Título del formulario |
| `form_name_placeholder` | String | Placeholder del nombre |
| `form_phone_placeholder` | String | Placeholder del teléfono |
| `form_message_placeholder` | String | Placeholder del mensaje |
| `form_submit_text` | String | Texto del botón enviar |
| `footer_copyright` | String | Texto de copyright |
| `facebook_url` | String | URL de Facebook (opcional) |
| `instagram_url` | String | URL de Instagram (opcional) |
| `whatsapp_url` | String | URL de WhatsApp (opcional) |

### Colección: `navigation`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `label` | String | Texto del enlace |
| `href` | String | URL o anchor del enlace |
| `order` | Integer | Orden de aparición |
| `status` | String | Estado (published/draft) |

### Colección: `company_info`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `company_name` | String | Nombre de la empresa |
| `phone_number` | String | Número de teléfono |
| `email` | String | Email (opcional) |
| `address` | String | Dirección física |

## Configuración de Permisos en Directus

### Rol Público (Public)

Para que el sitio web pueda leer el contenido sin autenticación:

1. Ve a **Settings > Roles & Permissions**
2. Edita el rol **Public**
3. Configura los permisos para cada colección:
   - `landing_page_content`: **Read** (Solo lectura)
   - `navigation`: **Read** (Solo lectura)
   - `company_info`: **Read** (Solo lectura)

### Configuración de CORS

Si tienes problemas de CORS, edita el archivo `.env` de Directus:

```bash
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000,https://tu-dominio.com
```

## Uso del CMS

1. Accede a tu panel de Directus en `http://localhost:8055`
2. Inicia sesión con las credenciales de administrador
3. Crea los registros iniciales en cada colección
4. El sitio web se actualizará automáticamente al cambiar el contenido

## Datos de Ejemplo

### landing_page_content (ID: 1)

```json
{
  "hero_title": "Servicio Móvil de Vidrios para Autos en Fort Worth, TX",
  "hero_subtitle": "Reemplazamos el parabrisas de tu auto donde estés",
  "hero_phone_button_text": "Llámanos Ahora",
  "hero_quote_button_text": "Solicita Presupuesto",
  // ... resto de campos con valores por defecto
}
```

### navigation

```json
[
  {"id": 1, "label": "Inicio", "href": "#inicio", "order": 1, "status": "published"},
  {"id": 2, "label": "Servicios", "href": "#servicios", "order": 2, "status": "published"},
  {"id": 3, "label": "Contacto", "href": "#contacto", "order": 3, "status": "published"}
]
```

### company_info (ID: 1)

```json
{
  "company_name": "Service Auto Glass LLC",
  "phone_number": "214-939-0707",
  "address": "6101 Willard Rd, Fort Worth, TX 76119"
}
```

## Troubleshooting

### Error de Conexión a Directus

1. Verifica que la URL en `.env.local` sea correcta
2. Asegúrate de que Directus esté ejecutándose
3. Revisa los permisos del rol Public
4. Verifica la configuración de CORS

### Contenido No Se Actualiza

1. El sitio usa valores por defecto si no puede conectarse al CMS
2. Revisa la consola del navegador para errores
3. Verifica que las colecciones y campos existan en Directus

### Problemas con el Envío de Emails

#### Verificar Configuración

Visita `http://localhost:3000/api/test-email` para verificar la configuración SMTP.

#### Enviar Email de Prueba

Haz un POST a `http://localhost:3000/api/test-email` para enviar un email de prueba.

```bash
curl -X POST http://localhost:3000/api/test-email
```

#### Errores Comunes

1. **"Error connecting to SMTP server"**
   - Verifica `SMTP_HOST` y `SMTP_PORT`
   - Asegúrate de que SES esté configurado correctamente

2. **"Authentication failed"**
   - Verifica `SMTP_USER` y `SMTP_PASS`
   - Confirma que las credenciales de SES sean correctas

3. **"Email address not verified"**
   - Verifica que `SMTP_FROM` esté verificado en SES
   - Verifica que `EMAIL_TO` esté verificado (si SES está en sandbox)

4. **"Emails no llegan"**
   - Revisa la bandeja de spam
   - Verifica los logs de SES en AWS Console
   - Confirma que no hayas alcanzado límites de envío
