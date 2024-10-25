'use client'

import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'
import { Loader, Sparkles } from 'lucide-react'
import { generateResponse } from '@/services/ai'
import { useAnalytics } from '@/analytics/AnalyticsContext'

export default function Answers() {
  const analytics = useAnalytics()
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState('')

  const handleAskQuestion = async () => {
    setIsLoading(true)

    const response = await generateResponse(question)

    if (response) {
      setAiResponse(response)
      analytics.trackEvent('Pergunta', {
        pergunta: question,
        resposta: response,
      })
    }

    setIsLoading(false)
  }

  return (
    <section className="bg-zinc-600 rounded-md p-4 w-full">
      <h2 className="text-xl font-semibold">Respostas customizadas</h2>
      <div className="mt-4">
        <div className="flex flex-col gap-3">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Digite algo"
            className="bg-zinc-700 border-zinc-500 text-white placeholder-zinc-400 focus-visible:ring-white focus-visible:ring-offset-zinc-600"
          />
          <Button
            onClick={handleAskQuestion}
            className="w-full bg-white text-black hover:bg-gray-200 focus-visible:ring-offset-zinc-600"
            disabled={isLoading || question.trim() === ''}
          >
            {isLoading ? (
              <>
                <span className="animate-pulse">Pensando</span>
                <Loader className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Perguntar
                <Sparkles className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="bg-zinc-700 border border-zinc-500 p-4 rounded-md">
            {aiResponse ? (
              <p className="text-white">{aiResponse}</p>
            ) : (
              <p className="text-zinc-400">
                A resposta da IA aparecerá aqui...
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
