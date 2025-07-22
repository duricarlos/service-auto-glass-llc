'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function EmailTestComponent() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const testEmailConfig = async () => {
    setTesting(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/test-email')
      const data = await response.json()
      
      if (response.ok) {
        setResult(`✅ Configuración verificada: ${data.emailConfigValid ? 'Válida' : 'Inválida'}`)
      } else {
        setResult(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setResult(`❌ Error de conexión: ${error}`)
    } finally {
      setTesting(false)
    }
  }

  const sendTestEmail = async () => {
    setTesting(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST'
      })
      const data = await response.json()
      
      if (response.ok) {
        const notificationStatus = data.notificationEmail.success ? '✅' : '❌'
        const confirmationStatus = data.confirmationEmail.success ? '✅' : '❌'
        
        setResult(`
          ${notificationStatus} Notificación: ${data.notificationEmail.message}
          ${confirmationStatus} Confirmación: ${data.confirmationEmail.message}
        `)
      } else {
        setResult(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setResult(`❌ Error de conexión: ${error}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">🧪 Pruebas de Email</h3>
        
        <div className="space-y-4">
          <Button 
            onClick={testEmailConfig}
            disabled={testing}
            variant="outline"
            className="w-full"
          >
            {testing ? 'Verificando...' : 'Verificar Configuración'}
          </Button>
          
          <Button 
            onClick={sendTestEmail}
            disabled={testing}
            className="w-full"
          >
            {testing ? 'Enviando...' : 'Enviar Emails de Prueba (2)'}
          </Button>
          
          {result && (
            <div className={`p-3 rounded text-sm whitespace-pre-line ${
              result.includes('✅') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {result}
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p><strong>Nota:</strong> Solo usar durante desarrollo</p>
        </div>
      </CardContent>
    </Card>
  )
}
