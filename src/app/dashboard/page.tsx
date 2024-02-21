'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/components/ui/carousel'
import * as Input from '@/app/components/Input'
import { Card } from '@/app/components/UserCard'
import { useQuery } from '@tanstack/react-query'
import { getDevelopers } from '@/data/developers'
import { Section } from '../components/Section'
import { Search } from 'lucide-react'

export default function Dashboard() {
  const {
    data: developers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['developers'],
    queryFn: getDevelopers,
  })

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (isError) {
    return <p>Ocorreu um erro ao carregar os desenvolvedores.</p>
  }

  if (!developers) {
    return null
  }

  const { developersWithTechs } = developers

  return (
    <div className="flex flex-col gap-5">
      <Input.Root
        className="m-auto my-4 flex w-full max-w-80 items-center gap-2 rounded-2xl border border-zinc-300 px-3 py-2 shadow-sm focus-within:border-violet-400
        focus-within:ring-4 focus-within:ring-violet-100 md:max-w-96 lg:max-w-4xl"
      >
        <Input.Prefix className="text-zinc-500">
          <Search />
        </Input.Prefix>
        <Input.Control type="text" placeholder="Encontre um dev pelo nome" />
        <button className="rounded-md bg-violet-500 px-2 py-1 text-sm font-semibold text-zinc-200 hover:bg-violet-600">
          Buscar
        </button>
      </Input.Root>

      <Section title="Full-stacks">
        <Carousel className="w-full max-w-sm bg-violet-50 lg:max-w-4xl">
          <CarouselContent>
            {developersWithTechs &&
              (() => {
                const fullstackDevelopers = developersWithTechs.filter(
                  (developer) => developer.occupation_area === 'fullstack',
                )
                if (fullstackDevelopers.length === 0) {
                  return (
                    <p className="m-auto w-52 font-semibold text-violet-600">
                      Nenhum(a) DEV fullstack cadastrado(a) 😞
                    </p>
                  )
                }
                return fullstackDevelopers.map((developer) => (
                  <CarouselItem
                    key={developer.developerId}
                    className="mr-2 min-w-52 max-w-56 basis-1/2 rounded-md bg-violet-200 pl-px shadow-sm lg:basis-1/4 lg:pl-0"
                  >
                    <Card
                      name={developer.userName}
                      techs={developer.techs}
                      occupation_area={
                        developer.occupation_area.charAt(0).toUpperCase() +
                        developer.occupation_area.slice(1)
                      }
                      price_per_hour={developer.price_per_hour}
                      key={developer.developerId}
                    />
                  </CarouselItem>
                ))
              })()}
          </CarouselContent>
          <CarouselPrevious className="hidden" />
          <CarouselNext className="hidden" />
        </Carousel>
      </Section>

      <Section title="Front-ends">
        <Carousel className="w-full max-w-sm bg-violet-50 lg:max-w-4xl">
          <CarouselContent>
            {developersWithTechs &&
              (() => {
                const frontendDevelopers = developersWithTechs.filter(
                  (developer) => developer.occupation_area === 'frontend',
                )
                if (frontendDevelopers.length === 0) {
                  return (
                    <p className="m-auto w-52 font-semibold text-violet-600">
                      Nenhum(a) DEV frontend cadastrado(a) 😞
                    </p>
                  )
                }
                return frontendDevelopers.map((developer) => (
                  <CarouselItem
                    key={developer.developerId}
                    className="mr-2 min-w-52 max-w-56 basis-1/2 rounded-md bg-violet-200 pl-px shadow-sm lg:basis-1/4 lg:pl-0"
                  >
                    <Card
                      name={developer.userName}
                      techs={developer.techs}
                      occupation_area={
                        developer.occupation_area.charAt(0).toUpperCase() +
                        developer.occupation_area.slice(1)
                      }
                      price_per_hour={developer.price_per_hour}
                      key={developer.developerId}
                    />
                  </CarouselItem>
                ))
              })()}
          </CarouselContent>
          <CarouselPrevious className="hidden" />
          <CarouselNext className="hidden" />
        </Carousel>
      </Section>

      <Section title="Back-ends">
        <Carousel className="w-full max-w-sm bg-violet-50 lg:max-w-4xl">
          <CarouselContent>
            {developersWithTechs &&
              (() => {
                const backendDevelopers = developersWithTechs.filter(
                  (developer) => developer.occupation_area === 'backend',
                )
                if (backendDevelopers.length === 0) {
                  return (
                    <p className="m-auto w-52 font-semibold text-violet-600">
                      Nenhum(a) DEV backend cadastrado(a) 😞
                    </p>
                  )
                }
                return backendDevelopers.map((developer) => (
                  <CarouselItem
                    key={developer.developerId}
                    className="mr-2 min-w-52 max-w-56 basis-1/2 rounded-md bg-violet-200 pl-px shadow-sm lg:basis-1/4 lg:pl-0"
                  >
                    <Card
                      name={developer.userName}
                      techs={developer.techs}
                      occupation_area={
                        developer.occupation_area.charAt(0).toUpperCase() +
                        developer.occupation_area.slice(1)
                      }
                      price_per_hour={developer.price_per_hour}
                      key={developer.developerId}
                    />
                  </CarouselItem>
                ))
              })()}
          </CarouselContent>
          <CarouselPrevious className="hidden" />
          <CarouselNext className="hidden" />
        </Carousel>
      </Section>
    </div>
  )
}
