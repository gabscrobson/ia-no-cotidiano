'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Volume2 } from 'lucide-react'
import { Label } from '../ui/label'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '../ui/select'
import { generateTextToSpeech, Voice } from '@/services/ai'
import { useAnalytics } from '@/analytics/AnalyticsContext'

const voices: { id: Voice; name: string }[] = [
  { id: 'alloy', name: 'Alloy' },
  { id: 'echo', name: 'Echo' },
  { id: 'fable', name: 'Fable' },
  { id: 'onyx', name: 'Onyx' },
  { id: 'nova', name: 'Nova' },
  { id: 'shimmer', name: 'Shimmer' },
]

export default function TextToSpeech() {
  const analytics = useAnalytics()
  const [text, setText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState<Voice>(voices[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleTextToSpeech = async () => {
    setIsLoading(true)

    try {
      const base64Audio = await generateTextToSpeech(text, selectedVoice)
      const audioBlob = base64ToBlob(base64Audio, 'audio/mp3')
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)
      analytics.trackEvent('Texto para Fala', {
        texto: text,
        voz: selectedVoice,
        audioUrl,
      })
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }

  const base64ToBlob = (base64: string, contentType: string) => {
    const byteCharacters = atob(base64)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.slice(0, 100)
    setText(newText)
    setCharCount(newText.length)
  }

  return (
    <section className="bg-red-500 w-full p-4 rounded-md">
      <h2 className="text-xl font-semibold text-white mb-4">Texto para Fala</h2>
      <div className="flex flex-col gap-3">
        <div>
          <Textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Digite o texto para converter em fala"
            className="bg-red-600 border-red-400 text-white placeholder:text-red-300 focus-visible:ring-white focus-visible:ring-offset-red-500"
          />
          <div className="text-white text-right text-xs mt-1">
            {charCount}/100
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="voice-select" className="text-white">
            Selecione a voz:
          </Label>
          <Select
            value={selectedVoice}
            onValueChange={(value: Voice) => setSelectedVoice(value)}
          >
            <SelectTrigger
              id="voice-select"
              className="bg-red-600 border-red-400 text-white focus:ring-white focus:ring-offset-red-500"
            >
              <SelectValue placeholder="Selecione uma voz" />
            </SelectTrigger>
            <SelectContent className="bg-red-600 border-red-400 text-white">
              {voices.map((voice) => (
                <SelectItem
                  key={voice.id}
                  value={voice.id}
                  className="focus:bg-red-700 focus:text-white"
                >
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleTextToSpeech}
          className="w-full bg-white text-red-500 hover:bg-red-100 focus-visible:ring-offset-red-500"
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? (
            <>
              <span className="animate-pulse">Convertendo</span>
              <Loader className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Converter para Fala
              <Volume2 className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {audioUrl && (
          <div className="mt-4">
            <audio controls className="w-full" src={audioUrl}>
              Seu navegador não suporta o elemento de áudio.
            </audio>
          </div>
        )}

        {!audioUrl && !isLoading && (
          <p className="text-red-200 text-center mt-2">
            O áudio gerado aparecerá aqui...
          </p>
        )}
      </div>
    </section>
  )
}
