import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card } from './UserCard'
import { Tech } from './UserCard/Tech'
import { SocialMedia } from './SocialMedia'
import { Wallet } from 'lucide-react'

interface DialogUserProps {
  name: string
  avatarUrl?: string
  about: string
  price_per_hour: number
  occupation_area: string
  available_for_contract: boolean
  techs: {
    id: string
    name: string
  }[]
}

export function DialogUser({
  name,
  avatarUrl,
  about,
  price_per_hour,
  occupation_area,
  available_for_contract,
  techs,
  ...props
}: DialogUserProps) {
  const socials = {
    linkedIn: 'https://www.linkedin.com/in/jackson-moura-a43350246/',
    github: 'https://github.com/jmoura-dev',
    portfolio: undefined,
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-52 w-full min-w-52 max-w-56 bg-violet-200 hover:bg-violet-200 md:max-w-72 md:p-3 lg:h-64 lg:p-4"
        >
          <Card
            name={name}
            avatarUrl={avatarUrl}
            techs={techs}
            available_for_contract={available_for_contract}
            occupation_area={occupation_area}
            price_per_hour={price_per_hour}
            {...props}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen animate-slideDownAndFade overflow-y-auto lg:max-w-2xl">
        <div className="mb-3 flex w-full flex-col items-center justify-center rounded-md font-mirza text-2xl font-bold text-violet-500">
          <span className="-ml-4">
            E<span className="text-base font-normal">asy</span>
          </span>
          <span className="-mr-2 -mt-4">
            W<span className="text-base font-normal">ork</span>
          </span>
        </div>
        <DialogHeader className="mb-1 divide-y divide-dashed divide-violet-500">
          <DialogTitle className="flex flex-col items-center justify-center divide-y divide-zinc-800 text-xl">
            {name.charAt(0).toUpperCase() + name.slice(1)}
            <p className="text-base font-normal">
              {`Desenvolvedor(a) ${occupation_area.charAt(0).toUpperCase() + occupation_area.slice(1)}`}
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 divide-y divide-violet-600">
          <div className="flex flex-col gap-4 pt-3 text-sm">
            <h2 className="flex flex-col gap-2 text-base font-semibold text-black">
              Sobre
              <span className="text-sm font-normal">{about}</span>
            </h2>

            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
              <span className="flex items-center justify-start gap-1 rounded-md bg-zinc-500/70 px-2 py-1 text-sm font-semibold text-white">
                <Wallet className="h-4 w-4" />
                {available_for_contract
                  ? 'Aceita freelancer e/ou contrato'
                  : 'Apenas freelancer'}
              </span>
              <span className="flex items-center gap-1 rounded-md bg-zinc-500/70 px-2 py-1 text-sm font-semibold text-white">
                R$:{' '}
                {price_per_hour
                  ? price_per_hour.toFixed(2) + '/hora'
                  : 'N/Informado'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-3 text-sm">
            <h2 className="flex flex-col gap-2 text-base font-semibold text-black">
              Habilidades
              <ul className="flex flex-wrap gap-2 ">
                {techs.length > 0 &&
                  techs.map((tech) => (
                    <Tech techName={tech.name} key={tech.id} />
                  ))}
              </ul>
            </h2>
          </div>
          <div className="flex flex-col gap-2 pt-3 text-sm">
            <h2 className="flex flex-col gap-2 text-base font-semibold text-black">
              Redes sociais para contato
            </h2>
            <SocialMedia
              github={socials.github}
              linkedIn={socials.linkedIn}
              portfolio={socials.portfolio}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
