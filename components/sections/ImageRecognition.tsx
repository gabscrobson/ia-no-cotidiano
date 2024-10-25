'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Loader, Camera, Upload, Eye } from 'lucide-react'
import { recognizeImage } from '@/services/ai'
import imageCompression from 'browser-image-compression'
import { useAnalytics } from '@/analytics/AnalyticsContext'

export default function ImageRecognition() {
  const analytics = useAnalytics()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recognitionResult, setRecognitionResult] = useState<string | null>(
    null,
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        const compressedFile = await imageCompression(file, options)
        const compressedImage =
          await imageCompression.getDataUrlFromFile(compressedFile)
        setSelectedImage(compressedImage)
        setRecognitionResult(null)
      } catch (error) {
        console.error('Error compressing image:', error)
      }
    }
  }

  const handleRecognize = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    setRecognitionResult(null)

    try {
      const response = await recognizeImage(selectedImage)
      setRecognitionResult(response)
      analytics.trackEvent('Reconhecimento de Imagem', {
        imagem: selectedImage,
        resultado: response,
      })
    } catch (error) {
      console.error(error)
      setRecognitionResult('Erro ao reconhecer a imagem')
    }

    setIsLoading(false)
  }

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture')
      fileInputRef.current.click()
    }
  }

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment')
      fileInputRef.current.click()
    }
  }

  return (
    <section className="bg-green-500 w-full max-w-2xl mx-auto p-4 rounded-md">
      <h2 className="text-xl font-semibold text-white mb-4">
        Reconhecimento de imagens
      </h2>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageSelect}
            className="hidden"
            ref={fileInputRef}
            id="image-input"
          />
          <div className="flex flex-col gap-2 sm:flex-col">
            <Button
              onClick={openFileSelector}
              className="bg-white text-green-500 hover:bg-green-100 focus-visible:ring-offset-green-500"
            >
              <Upload className="mr-2 h-4 w-4" />
              Selecionar Imagem
            </Button>
            <Button
              onClick={openCamera}
              className="bg-white text-green-500 hover:bg-green-100 focus-visible:ring-offset-green-500"
            >
              <Camera className="mr-2 h-4 w-4" />
              Tirar Foto
            </Button>
          </div>
        </div>

        {selectedImage && (
          <div className="mt-4 bg-green-600 rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt="Imagem selecionada"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <Button
          onClick={handleRecognize}
          className="w-full bg-white text-green-500 hover:bg-green-100 focus-visible:ring-offset-green-500"
          disabled={isLoading || !selectedImage}
        >
          {isLoading ? (
            <>
              <span className="animate-pulse">Analisando Imagem</span>
              <Loader className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Reconhecer Imagem
              <Eye className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {recognitionResult && (
          <div className="mt-4 p-4 bg-green-600 rounded-lg text-white">
            <h3 className="font-semibold mb-2">Resultado do Reconhecimento:</h3>
            <p>{recognitionResult}</p>
          </div>
        )}

        {!selectedImage && !isLoading && (
          <p className="text-green-200 text-center mt-2">
            Selecione ou tire uma foto para começar...
          </p>
        )}
      </div>
    </section>
  )
}
