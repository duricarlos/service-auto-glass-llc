
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ContactForm from "@/components/ContactForm"
import { 
  getLandingPageContent, 
  getNavigationItems, 
  getCompanyInfo,
  defaultContent,
  defaultNavigation,
  defaultCompanyInfo 
} from "@/lib/directus"

import {
  Phone,
  MapPin,
  Clock,
  Shield,
  Truck,
  CheckCircle,
  Users,
  Award,
  MessageCircle,
  Facebook,
  Instagram,
} from "lucide-react"
import Link from "next/link"

export default async function ServiceAutoGlassLanding() {
  // Obtener datos del CMS
  const content = await getLandingPageContent() || defaultContent;
  const navigation = await getNavigationItems() || defaultNavigation;
  const companyInfo = await getCompanyInfo() || defaultCompanyInfo;
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo placeholder - CMS editable */}
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-700">{companyInfo.company_name}</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.id} href={item.href} className="text-gray-700 hover:text-blue-600 font-medium">
                {item.label}
              </Link>
            ))}
          </nav>

          <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold">
            <Phone className="h-4 w-4 mr-2" />
            {companyInfo.phone_number}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative bg-gradient-to-r from-blue-700 to-blue-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.hero_title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {content.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg">
                <Phone className="h-5 w-5 mr-2" />
                {content.hero_phone_button_text}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-8 py-4 text-lg bg-transparent"
              >
                {content.hero_quote_button_text}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.services_title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.services_subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{content.windshield_replacement_title}</h3>
                <p className="text-gray-600">
                  {content.windshield_replacement_description}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{content.mobile_service_title}</h3>
                <p className="text-gray-600">
                  {content.mobile_service_description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.why_choose_title}</h2>
              <p className="text-lg text-gray-600">
                {content.why_choose_subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.experience_title}</h3>
                  <p className="text-gray-600">{content.experience_description}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.certified_title}</h3>
                  <p className="text-gray-600">
                    {content.certified_description}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.satisfaction_title}</h3>
                  <p className="text-gray-600">
                    {content.satisfaction_description}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.spanish_title}</h3>
                  <p className="text-gray-600">{content.spanish_description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.contact_title}</h2>
            <p className="text-lg text-gray-600">{content.contact_subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Información de contacto */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{content.address_label}</h3>
                  <p className="text-gray-600">{content.address_value}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{content.phone_label}</h3>
                  <p className="text-gray-600 text-xl font-semibold">{content.phone_value}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{content.schedule_label}</h3>
                  <p className="text-gray-600">{content.schedule_value}</p>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <Card className="p-6">
              <CardContent className="pt-0">
                <ContactForm
                  formTitle={content.form_title}
                  namePlaceholder={content.form_name_placeholder}
                  emailPlaceholder={content.form_email_placeholder}
                  phonePlaceholder={content.form_phone_placeholder}
                  messagePlaceholder={content.form_message_placeholder}
                  submitText={content.form_submit_text}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300">{content.footer_copyright}</p>
            </div>
            <div className="flex space-x-4">
              {content.facebook_url && (
                <Link href={content.facebook_url} className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
              )}
              {content.instagram_url && (
                <Link href={content.instagram_url} className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
              )}
              {content.whatsapp_url && (
                <Link href={content.whatsapp_url} className="text-gray-300 hover:text-white transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
