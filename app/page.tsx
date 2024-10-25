import Answers from '@/components/sections/Answers'
import ImageGen from '@/components/sections/ImageGen'
import ImageRecognition from '@/components/sections/ImageRecognition'
// import Recomendations from '@/components/sections/Recomendations'
import TextToSpeech from '@/components/sections/TextToSpeech'

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col items-center p-5 pt-6 text-center gap-2">
      <h1 className="text-4xl font-bold">
        Inteligência artificial no cotidiano
      </h1>
      <p className="text-lg">
        A inteligência artificial já está presente no nosso dia-a-dia, mas de
        quais formas ela pode aparecer e o que podemos esperar para o futuro?
      </p>

      <div className="flex flex-col items-center gap-3 mt-4 text-left">
        <Answers />

        <TextToSpeech />

        <ImageGen />

        <ImageRecognition />

        {/* <Recomendations /> */}
      </div>

      <p className="text-lg mt-4">
        Essa é uma experiência desenvolvida pelos alunos de Atividade
        Integradora V: Gabriel Accetta, Matheus Rodrigues, Maria Eduarda
        Gemesio, Rafael Canejo, Cauã Carvalho, Rafael Lucena, Vitor Barros e
        Fernando Ibraim
      </p>
    </div>
  )
}
