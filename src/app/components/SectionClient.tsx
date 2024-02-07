import Image from 'next/image'
import Client from '@/assets/client.jpg'

export function SectionClient() {
  return (
    <div className="md:grid-cols-client mt-5 flex md:grid md:px-2">
      <Image
        src={Client}
        alt=""
        className="hidden h-full object-cover md:flex"
      />

      <div className="flex flex-col space-y-5 bg-green-600 p-2 md:rounded-br-lg md:rounded-tr-lg lg:items-center lg:justify-center">
        <h2 className="border-b pb-1 font-mirza text-2xl font-semibold text-white">
          Para clientes
        </h2>
        <ul className="flex list-disc flex-col gap-5 pl-5 font-semibold text-zinc-200">
          <li>
            Explore uma base diversificada de desenvolvedores talentosos prontos
            para colaborar nos seus projetos. Utilize filtros avançados para
            encontrar candidatos de acordo com as habilidades técnicas
            necessárias para atender às suas demandas específicas.
          </li>
          <li>
            Mantenha o controle total sobre suas vagas publicadas. Gerencie
            facilmente todas as etapas do processo de recrutamento, desde a
            criação e publicação das vagas até a seleção e contratação dos
            candidatos ideais.
          </li>
        </ul>
      </div>
    </div>
  )
}
