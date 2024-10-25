'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Image as ImageIcon } from 'lucide-react'
import { generateImage } from '@/services/ai'
import { useAnalytics } from '@/analytics/AnalyticsContext'

export default function ImageGen() {
  const analytics = useAnalytics()
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState('')

  const handleGenerateImage = async () => {
    setIsLoading(true)

    try {
      const imageUrl = await generateImage(prompt)

      if (imageUrl) {
        setGeneratedImageUrl(imageUrl)
        analytics.trackEvent('Imagem', {
          prompt,
          imageUrl,
        })
      }
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }

  return (
    <section className="bg-blue-500 w-full max-w-2xl mx-auto p-4 rounded-md">
      <h2 className="text-xl font-semibold text-white mb-4">
        Geração de imagens
      </h2>
      <div className="flex flex-col gap-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Descreva a imagem que você quer gerar"
          className="bg-blue-600 border-blue-400 text-white placeholder:text-blue-300 focus-visible:ring-white focus-visible:ring-offset-blue-500 min-h-[100px]"
        />
        <Button
          onClick={handleGenerateImage}
          className="w-full bg-white text-blue-500 hover:bg-blue-100 focus-visible:ring-offset-blue-500"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? (
            <>
              <span className="animate-pulse">Gerando Imagem</span>
              <Loader className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Gerar Imagem
              <ImageIcon className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="bg-blue-600 rounded-lg overflow-hidden">
          {generatedImageUrl ? (
            <img
              src={generatedImageUrl}
              alt="Imagem gerada por IA"
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="aspect-square flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-blue-300" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
