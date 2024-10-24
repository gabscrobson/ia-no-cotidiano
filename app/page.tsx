import Answers from '@/components/sections/Answers'
import ImageGen from '@/components/sections/ImageGen'
import ImageRecognition from '@/components/sections/ImageRecognition'
import TextToSpeech from '@/components/sections/TextToSpeech'

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col items-center p-5 pt-6 text-center gap-2">
      <h1 className="text-4xl font-bold">
        Inteligência artificial no cotidiano
      </h1>
      <p className="text-lg">
        A inteligência artificial já está presente no nosso dia-a-dia, mas quais
        outras mudanças podemos esperar?
      </p>

      <div className="flex flex-col items-center gap-3 mt-10 text-left">
        <Answers />

        <TextToSpeech />

        <ImageGen />

        <ImageRecognition />

        <section className="bg-yellow-500 rounded-md p-5 w-full">
          <h2 className="text-xl font-semibold">
            Recomendações personalizadas
          </h2>
        </section>
      </div>
    </div>
  )
}
