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

const voices = [
  { id: 'alloy', name: 'Alloy' },
  { id: 'echo', name: 'Echo' },
  { id: 'fable', name: 'Fable' },
  { id: 'onyx', name: 'Onyx' },
  { id: 'nova', name: 'Nova' },
  { id: 'shimmer', name: 'Shimmer' },
]

export default function TextToSpeech() {
  const [text, setText] = useState('')
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')

  const handleTextToSpeech = async () => {
    setIsLoading(true)
    // Simulate text-to-speech conversion delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real application, you would call an API to convert text to speech here
    // For this example, we'll just create a dummy audio URL
    setAudioUrl('/audio.mp3')
    setIsLoading(false)
  }

  return (
    <div className="bg-red-500 w-full p-4 rounded-md">
      <h2 className="text-xl font-semibold text-white mb-4">Texto para Fala</h2>
      <div className="flex flex-col gap-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite o texto para converter em fala"
          className="bg-red-600 border-red-400 text-white placeholder:text-red-300 focus-visible:ring-white focus-visible:ring-offset-red-500"
        />
        <div className="space-y-2">
          <Label htmlFor="voice-select" className="text-white">
            Selecione a voz:
          </Label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
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
    </div>
  )
}
