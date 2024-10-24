import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col items-center p-5 pt-6 text-center gap-2">
      <h1 className="text-4xl font-bold">Inteligência artificial no cotidiano</h1>
      <p className="text-lg">A inteligência artificial já está presente no nosso dia-a-dia, mas quais outras mudanças podemos esperar?</p>

      <div className="flex flex-col items-center gap-3">
        <section className="bg-zinc-600 rounded-md p-4 w-full">
          <h2 className="text-xl font-semibold">Recomendações personalizadas</h2>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <Input type="text" placeholder="Digite algo" className="bg-black border-none focus-visible:ring-white focus-visible:ring-1" />
              <Button className="bg-white text-black">
                Perguntar <Sparkle size={32} />
              </Button>
            </div>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
            <p>teste</p>
          </div>
        </section>

        <section className="bg-red-500 rounded-md p-5 w-full">
          <h2 className="text-xl font-semibold">Reconhecimento de voz</h2>
        </section>

        <section className="bg-blue-500 rounded-md p-5 w-full">
          <h2 className="text-xl font-semibold">Geração de imagens</h2>
        </section>

        <section className="bg-green-500 rounded-md p-5 w-full">
          <h2 className="text-xl font-semibold">Reconhecimento de imagens</h2>
        </section>
      </div>
    </div>
  );
}
