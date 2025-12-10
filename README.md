# 🚗 Service Auto Glass LLC - Landing Page

Una landing page moderna y completamente funcional para Service Auto Glass LLC, empresa especializada en reemplazo de vidrios automotrices en Fort Worth, Texas. El proyecto incluye integración con CMS, sistema de emails automatizado y múltiples capas de seguridad.

![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Directus](https://img.shields.io/badge/Directus-CMS-6644FF?style=for-the-badge&logo=directus)

## 🌟 Características Principales

### 📱 **Diseño Responsive**

- ✅ **Mobile-First**: Optimizado para dispositivos móviles
- ✅ **Desktop Compatible**: Experiencia fluida en escritorio
- ✅ **Componentes Modulares**: Reutilizables con shadcn/ui
- ✅ **Iconografía Moderna**: Lucide React icons

### 🎨 **Interfaz de Usuario**

- ✅ **Diseño Profesional**: Colores corporativos azul y rojo
- ✅ **Animaciones Suaves**: Transiciones CSS elegantes
- ✅ **Tipografía Optimizada**: Geist font family
- ✅ **Accesibilidad**: Headers semánticos y navegación por teclado

### 📊 **Gestión de Contenido (CMS)**

- ✅ **Directus Integration**: CMS headless completo
- ✅ **Contenido Dinámico**: Todos los textos editables desde admin
- ✅ **Fallback System**: Valores por defecto si CMS no disponible
- ✅ **API REST**: Conexión eficiente con el backend

### 📧 **Sistema de Emails Automatizado**

- ✅ **Doble Notificación**: Email a empresa + confirmación a cliente
- ✅ **Amazon SES**: Servicio profesional de emails
- ✅ **Templates HTML**: Diseños responsivos y profesionales
- ✅ **Validación Avanzada**: Formato de email y teléfono

### 🔒 **Seguridad Multicapa**

- ✅ **CSRF Protection**: Validación de origen de solicitudes
- ✅ **Rate Limiting**: Máximo 10 solicitudes por minuto por IP
- ✅ **Headers Validation**: Verificación de User-Agent y Content-Type
- ✅ **Security Headers**: X-Frame-Options, XSS Protection, etc.

### 🚀 **Performance**

- ✅ **SSR (Server-Side Rendering)**: Carga rápida inicial
- ✅ **API Routes**: Endpoints optimizados
- ✅ **Image Optimization**: Next.js Image component
- ✅ **Bundle Optimization**: Tree shaking automático

## 🛠️ Tecnologías Utilizadas

### **Frontend**

- **[Next.js 16.0.8](https://nextjs.org/)** - Framework React con SSR
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI reutilizables
- **[Lucide React](https://lucide.dev/)** - Librería de iconos

### **Backend & APIs**

- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Endpoints serverless
- **[Directus SDK](https://docs.directus.io/reference/sdk/)** - Cliente CMS
- **[Nodemailer](https://nodemailer.com/)** - Envío de emails
- **[Amazon SES](https://aws.amazon.com/ses/)** - Servicio de email profesional

### **Gestión de Contenido**

- **[Directus](https://directus.io/)** - CMS headless open source
- **SQLite/PostgreSQL** - Base de datos para contenido
- **REST API** - Comunicación con frontend

### **Seguridad**

- **CSRF Tokens** - Protección contra ataques cross-site
- **Rate Limiting** - Control de velocidad de solicitudes
- **Security Headers** - Protección adicional del navegador
- **Input Validation** - Sanitización de datos de entrada

### **Desarrollo & Deploy**

- **[ESLint](https://eslint.org/)** - Linting de código
- **[PostCSS](https://postcss.org/)** - Procesamiento CSS
- **[Vercel](https://vercel.com/)** - Plataforma de deploy recomendada

## 📂 Estructura del Proyecto

```text
service-auto-glass-llc/
├── 📁 app/                          # App Router (Next.js 13+)
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 contact/              # Endpoint formulario contacto
│   │   └── 📁 test-email/           # Endpoint pruebas email
│   ├── 📄 page.tsx                  # Página principal
│   ├── 📄 layout.tsx                # Layout global
│   └── 📄 globals.css               # Estilos globales
├── 📁 components/                   # Componentes reutilizables
│   ├── 📁 ui/                       # Componentes shadcn/ui
│   ├── 📄 ContactForm.tsx           # Formulario de contacto
│   └── 📄 EmailTestComponent.tsx    # Componente pruebas email
├── 📁 lib/                          # Librerías y utilidades
│   ├── 📄 directus.ts               # Cliente Directus CMS
│   ├── 📄 email.ts                  # Sistema de emails
│   ├── 📄 security.ts               # Funciones de seguridad
│   └── 📄 utils.ts                  # Utilidades generales
├── 📄 middleware.ts                 # Middleware de seguridad
├── 📄 .env.local                    # Variables de entorno
├── 📄 components.json               # Configuración shadcn/ui
├── 📄 tailwind.config.js            # Configuración Tailwind
├── 📄 next.config.ts                # Configuración Next.js
└── 📄 README-DIRECTUS.md            # Documentación CMS
```

## 🚀 Inicio Rápido

### **1. Prerrequisitos**

```bash
Node.js 18+ 
npm, yarn, pnpm o bun
```

### **2. Instalación**

```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd service-auto-glass-llc

# Instalar dependencias
npm install
```

### **3. Configuración de Variables de Entorno**

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar variables necesarias
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Configurar Amazon SES
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=tu_access_key_id
SMTP_PASS=tu_secret_access_key
SMTP_FROM=no-reply@tudominio.com
EMAIL_TO=contacto@tuempresa.com
```

### **4. Ejecutar en Desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el resultado.

### **5. Configurar Directus CMS (Opcional)**

Ver documentación completa en [`README-DIRECTUS.md`](./README-DIRECTUS.md)

## 📧 Sistema de Emails

### **Flujo Automatizado**

1. **Usuario llena formulario** → Validación frontend
2. **API procesa datos** → Validaciones de seguridad
3. **Email a empresa** → Notificación inmediata con datos del cliente
4. **Email a cliente** → Confirmación profesional de recepción
5. **Guardado en CMS** → Historial para seguimiento

### **Características de Emails**

- 🎨 **Diseño HTML Responsive** para todos los dispositivos
- 📊 **Información Organizada** en tablas profesionales
- ⚡ **Respuesta Rápida** con enlaces directos a teléfonos
- 🔒 **Datos Seguros** con validación de formato

## 🔒 Características de Seguridad

### **Protecciones Implementadas**

- **🛡️ CSRF Protection** - Validación de origen de solicitudes
- **⏱️ Rate Limiting** - Máximo 10 solicitudes/minuto por IP
- **🔍 Header Validation** - Verificación User-Agent y Content-Type
- **🔐 Security Headers** - X-Frame-Options, XSS Protection
- **📝 Request Logging** - Registro de intentos de ataque

### **Endpoints Protegidos**

- `/api/contact` - Formulario de contacto
- `/api/test-email` - Pruebas de sistema de email

## 🧪 Testing y Debugging

### **Endpoints de Prueba**

```bash
# Verificar configuración email
GET /api/test-email

# Enviar emails de prueba
POST /api/test-email

# Enviar formulario de contacto
POST /api/contact
```

### **Componente de Pruebas**

El proyecto incluye `EmailTestComponent` para verificar:

- ✅ Configuración SMTP
- ✅ Envío de emails de notificación
- ✅ Envío de emails de confirmación

## 📱 Funcionalidades del Landing Page

### **Secciones Principales**

1. **🏠 Header** - Navegación sticky con información de contacto
2. **🎯 Hero Section** - Llamada a la acción principal
3. **🔧 Servicios** - Reemplazo de vidrios y servicio móvil
4. **⭐ Por Qué Elegirnos** - Credenciales y diferenciadores
5. **📞 Contacto** - Información y formulario integrado
6. **🦶 Footer** - Links de redes sociales

### **Contenido Editable via CMS**

- ✏️ Todos los textos y títulos
- 🔗 URLs de redes sociales
- 📞 Información de contacto
- 🎨 Placeholders de formularios

## 🚀 Deploy en Producción

### **Vercel (Recomendado)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy automático
vercel

# Configurar variables de entorno en dashboard
```

### **Variables de Entorno para Producción**

```bash
NEXT_PUBLIC_DIRECTUS_URL=https://tu-directus-instance.com
NEXT_PUBLIC_APP_URL=https://tudominio.com
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
# ... resto de configuración SES
```

## 📈 Optimizaciones Incluidas

### **Performance**

- ⚡ **Server-Side Rendering** para SEO
- 🗜️ **Bundle Optimization** automático
- 🖼️ **Image Optimization** con Next.js
- 📱 **Mobile-First Design** responsive

### **SEO**

- 🎯 **Meta Tags** configurables
- 📋 **Structured Data** para motores de búsqueda
- 🔗 **Semantic HTML** con headers apropiados
- 📱 **Mobile Responsive** design

## 🤝 Contribución

### **Estructura de Desarrollo**

1. **Fork** el repositorio
2. **Crear rama** para feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** cambios: `git commit -m 'Add: nueva funcionalidad'`
4. **Push** a rama: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### **Estándares de Código**

- ✅ **TypeScript** estricto
- ✅ **ESLint** configurado
- ✅ **Componentes funcionales** con hooks
- ✅ **Nomenclatura consistente**

---

## 🏆 Desarrollado para Service Auto Glass LLC

### Especialistas en reemplazo de vidrios automotrices en Fort Worth, Texas
