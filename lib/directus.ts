import { createDirectus, rest, readItem, readItems } from '@directus/sdk';

// Tipos para nuestro CMS
export interface LandingPageContent {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  hero_phone_button_text: string;
  hero_quote_button_text: string;
  services_title: string;
  services_subtitle: string;
  windshield_replacement_title: string;
  windshield_replacement_description: string;
  mobile_service_title: string;
  mobile_service_description: string;
  why_choose_title: string;
  why_choose_subtitle: string;
  experience_title: string;
  experience_description: string;
  certified_title: string;
  certified_description: string;
  satisfaction_title: string;
  satisfaction_description: string;
  spanish_title: string;
  spanish_description: string;
  contact_title: string;
  contact_subtitle: string;
  address_label: string;
  address_value: string;
  phone_label: string;
  phone_value: string;
  schedule_label: string;
  schedule_value: string;
  form_title: string;
  form_name_placeholder: string;
  form_email_placeholder: string;
  form_phone_placeholder: string;
  form_message_placeholder: string;
  form_submit_text: string;
  footer_copyright: string;
  facebook_url?: string;
  instagram_url?: string;
  whatsapp_url?: string;
  updated_at: string;
}

export interface NavigationItem {
  id: number;
  label: string;
  href: string;
  order: number;
}

export interface CompanyInfo {
  id: number;
  company_name: string;
  phone_number: string;
  email?: string;
  address: string;
  updated_at: string;
}

// Crear cliente de Directus
const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!).with(rest());

// Funciones para obtener datos
export async function getLandingPageContent(): Promise<LandingPageContent | null> {
  try {
    const content = await directus.request(
      readItem('landing_page_content', 1, {
        fields: ['*'],
      })
    );
    return content as LandingPageContent;
  } catch (error) {
    console.error('Error fetching landing page content:', error);
    return null;
  }
}

export async function getNavigationItems(): Promise<NavigationItem[]> {
  try {
    const items = await directus.request(
      readItems('navigation', {
        fields: ['*'],
        sort: ['order'],
        filter: {
          status: {
            _eq: 'published'
          }
        }
      })
    );
    return items as NavigationItem[];
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    return [];
  }
}

export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const info = await directus.request(
      readItem('company_info', 1, {
        fields: ['*'],
      })
    );
    return info as CompanyInfo;
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
}

// Valores por defecto en caso de que no se pueda conectar al CMS
export const defaultContent: LandingPageContent = {
  id: 1,
  hero_title: "Servicio Móvil de Vidrios para Autos en Fort Worth, TX",
  hero_subtitle: "Reemplazamos el parabrisas de tu auto donde estés",
  hero_phone_button_text: "Llámanos Ahora",
  hero_quote_button_text: "Solicita Presupuesto",
  services_title: "Nuestros Servicios",
  services_subtitle: "Ofrecemos servicios profesionales de reemplazo de vidrios automotrices con la mejor calidad y garantía",
  windshield_replacement_title: "Reemplazo de Parabrisas",
  windshield_replacement_description: "Reemplazamos parabrisas dañados con vidrios de la más alta calidad y técnicas profesionales.",
  mobile_service_title: "Servicio Móvil Gratuito",
  mobile_service_description: "Vamos hasta donde estés sin costo adicional. Tu comodidad es nuestra prioridad.",
  why_choose_title: "¿Por Qué Elegirnos?",
  why_choose_subtitle: "Somos tu mejor opción para servicios de vidrios automotrices en Fort Worth",
  experience_title: "Más de 20 años de experiencia",
  experience_description: "Décadas de experiencia nos respaldan en cada trabajo que realizamos.",
  certified_title: "Técnicos certificados",
  certified_description: "Nuestro equipo cuenta con las certificaciones más importantes del sector.",
  satisfaction_title: "Garantía de satisfacción",
  satisfaction_description: "Garantizamos la calidad de nuestro trabajo y tu completa satisfacción.",
  spanish_title: "Hablamos español",
  spanish_description: "Comunicación clara en español para tu comodidad y tranquilidad.",
  contact_title: "Contáctanos",
  contact_subtitle: "Estamos listos para ayudarte. Llámanos o envíanos un mensaje",
  address_label: "Dirección",
  address_value: "6101 Willard Rd, Fort Worth, TX 76119",
  phone_label: "Teléfono",
  phone_value: "214-939-0707",
  schedule_label: "Horario",
  schedule_value: "Lunes a Sábado de 8:00 AM a 6:00 PM",
  form_title: "Solicita tu presupuesto",
  form_name_placeholder: "Tu nombre completo",
  form_email_placeholder: "Tu email para confirmación",
  form_phone_placeholder: "Tu número de teléfono",
  form_message_placeholder: "Describe el daño en tu parabrisas...",
  form_submit_text: "Enviar Mensaje",
  footer_copyright: "© 2025 Service Auto Glass LLC – Todos los derechos reservados",
  facebook_url: "",
  instagram_url: "",
  whatsapp_url: "",
  updated_at: new Date().toISOString()
};

export const defaultNavigation: NavigationItem[] = [
  { id: 1, label: "Inicio", href: "#inicio", order: 1 },
  { id: 2, label: "Servicios", href: "#servicios", order: 2 },
  { id: 3, label: "Contacto", href: "#contacto", order: 3 }
];

export const defaultCompanyInfo: CompanyInfo = {
  id: 1,
  company_name: "Service Auto Glass LLC",
  phone_number: "214-939-0707",
  address: "6101 Willard Rd, Fort Worth, TX 76119",
  updated_at: new Date().toISOString()
};
