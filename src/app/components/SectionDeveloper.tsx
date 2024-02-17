import DeveloperLogo from '@/assets/developers.jpg'
import Image from 'next/image'

export function SectionDeveloper() {
  return (
    <div className="md:grid-cols-developer mt-5 flex md:grid md:px-2">
      <div className="flex flex-col space-y-5 bg-violet-600 p-2 md:rounded-bl-lg md:rounded-tl-lg lg:items-center lg:justify-center">
        <h2 className="border-b pb-1 font-mirza text-2xl font-semibold text-white md:pl-1">
          Para desenvolvedores
        </h2>
        <ul className="flex list-disc flex-col gap-5 pl-5 font-semibold text-zinc-200">
          <li>
            Encontre as últimas oportunidades de emprego e projetos freelancers
            que correspondem às suas habilidades e interesses.
          </li>
          <li>
            Refine sua busca filtrando oportunidades por área de atuação.
            Encontre exatamente o que você procura para impulsionar sua carreira
            como desenvolvedor.
          </li>
          <li>
            Receba notificações sobre o status das suas candidaturas. Seja
            informado sempre que houver uma atualização importante, garantindo
            que você esteja sempre por dentro do progresso das suas aplicações.
          </li>
        </ul>
      </div>

      <Image
        src={DeveloperLogo}
        alt=""
        className="hidden h-full object-cover md:flex"
        priority
      />
    </div>
  )
}
