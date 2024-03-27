'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tech } from './UserCard/Tech'
import { SocialMedia } from './SocialMedia'
import { Wallet } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { SkeletonDashboard } from './SkeletonDashboard'
import { redirect } from 'next/navigation'
import { getDeveloperByUserId } from '@/data/developers'
import { useState } from 'react'

interface DialogDeveloperDetailsProps {
  userName: string
  avatarUrl: string | null
  about: string
  price_per_hour: number
  occupation_area: string
  available_for_contract: boolean
  techs: {
    id: string
    name: string
  }[]
}

interface DialogDeveloperDetailsRequest {
  param: string
}

export function DialogDeveloperDetails({
  param,
}: DialogDeveloperDetailsRequest) {
  const [developer, setDeveloper] = useState<DialogDeveloperDetailsProps>()

  const socials = {
    linkedIn: 'https://www.linkedin.com/in/jackson-moura-a43350246/',
    github: 'https://github.com/jmoura-dev',
    portfolio: undefined,
  }

  async function handleSearchDevelopers(userId: string) {
    try {
      const response = await getDeveloperByUserIdFn(userId)

      if (response.developerWithDetails) {
        return setDeveloper(response.developerWithDetails)
      }
    } catch (err) {
      return alert('Erro ao buscar desenvolvedores.')
    }
  }

  const {
    mutateAsync: getDeveloperByUserIdFn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: getDeveloperByUserId,
  })

  if (isPending) {
    return <SkeletonDashboard />
  }

  if (isError) {
    alert('Erro ao carregar desenvolvedor')
    return redirect('/dashboard')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="ml-auto mt-3 flex h-7 w-full bg-violet-600/90 text-white hover:bg-violet-700 hover:text-white"
          onClick={() => handleSearchDevelopers(param)}
        >
          Detalhes
        </Button>
      </DialogTrigger>

      {developer && (
        <DialogContent className="animate-slideDownAndFade lg:max-w-2xl">
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
              {developer.userName.charAt(0).toUpperCase() +
                developer.userName.slice(1)}
              <p className="text-base font-normal">
                {`Desenvolvedor(a) ${developer.occupation_area.charAt(0).toUpperCase() + developer.occupation_area.slice(1)}`}
              </p>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 divide-y divide-violet-600">
            <div className="flex flex-col gap-4 pt-3 text-sm">
              <h2 className="flex flex-col gap-2 text-base font-semibold text-black">
                Sobre
                <span className="text-sm font-normal">{developer.about}</span>
              </h2>

              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                <span className="flex items-center justify-start gap-1 rounded-md bg-zinc-500/70 px-2 py-1 text-sm font-semibold text-white">
                  <Wallet className="h-4 w-4" />
                  {developer.available_for_contract
                    ? 'Aceita freelancer e/ou contrato'
                    : 'Apenas freelancer'}
                </span>
                <span className="flex items-center gap-1 rounded-md bg-zinc-500/70 px-2 py-1 text-sm font-semibold text-white">
                  R$:{' '}
                  {developer.price_per_hour
                    ? developer.price_per_hour.toFixed(2) + '/hora'
                    : 'N/Informado'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-3 text-sm">
              <h2 className="flex flex-col gap-2 text-base font-semibold text-black">
                Habilidades
                <ul className="flex flex-wrap gap-2 ">
                  {developer.techs.length > 0 &&
                    developer.techs.map((tech) => (
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
      )}
    </Dialog>
  )
}
