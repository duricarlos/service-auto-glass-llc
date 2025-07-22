'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactFormProps {
  formTitle: string
  namePlaceholder: string
  emailPlaceholder: string
  phonePlaceholder: string
  messagePlaceholder: string
  submitText: string
}

export default function ContactForm({ 
  formTitle, 
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder, 
  messagePlaceholder, 
  submitText 
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{formTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={namePlaceholder}
            className="w-full" 
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Input 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={emailPlaceholder}
            type="email" 
            className="w-full" 
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Input 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={phonePlaceholder}
            type="tel" 
            className="w-full" 
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={messagePlaceholder}
            className="w-full h-32" 
            required
            disabled={isSubmitting}
          />
        </div>
        
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            ¡Mensaje enviado exitosamente! Te contactaremos pronto y recibirás un email de confirmación.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Error al enviar el mensaje. Por favor intenta de nuevo.
          </div>
        )}
        
        <Button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : submitText}
        </Button>
      </form>
    </div>
  )
}
