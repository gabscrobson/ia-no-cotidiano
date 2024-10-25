'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateResponse(
  question: string,
): Promise<string | null> {
  const prompt = `
    Faça um resposta curta para a pergunta a seguir:
    """
    ${question}
    """

    A resposta não deve ter mais de 200 caracteres.
  `

  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o-mini',
  })

  return response.choices[0].message.content
}

export type Voice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer'

export async function generateTextToSpeech(text: string, voice: Voice) {
  if (text.length > 100) {
    throw new Error('O texto deve ter no máximo 100 caracteres')
  }

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice,
    input: text,
  })

  const buffer = Buffer.from(await mp3.arrayBuffer())
  return buffer.toString('base64')
}

export async function generateImage(prompt: string) {
  const response = await openai.images.generate({
    model: 'dall-e-2',
    prompt,
    n: 1,
    size: '1024x1024',
  })

  return response.data[0].url
}

export async function recognizeImage(image: string): Promise<string | null> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'O que tem nessa imagem? Se não puder descrever pessoas, descreva o ambiente ao redor dizendo só que existe uma pessoa no ambiente',
          },
          {
            type: 'image_url',
            image_url: {
              url: image,
            },
          },
        ],
      },
    ],
  })

  return response.choices[0].message.content
}
