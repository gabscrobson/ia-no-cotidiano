'use server'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateResponse(
  question: string,
): Promise<string | null> {
  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: question }],
    model: 'gpt-4o-mini',
  })

  console.log(response.choices[0].message)
  return response.choices[0].message.content
}
