'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/components/ui/carousel'
import * as Input from '@/app/components/Input'
import { useQuery } from '@tanstack/react-query'
import { getDevelopers } from '@/data/developers'
import { Section } from '../../components/Section'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { DialogUser } from '@/app/components/DialogUser'
import { SkeletonDashboard } from '@/app/components/SkeletonDashboard'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const [developerFilterByName, setDeveloperFilterByName] = useState('')

  const {
    data: developers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getDevelopers'],
    queryFn: getDevelopers,
  })

  if (isLoading) {
    return <SkeletonDashboard />
  }

  if (isError) {
    toast.error('Erro ao carregar o dashboard', {
      position: 'top-right',
    })
    return redirect('/signIn')
  }

  if (!developers) {
    return null
  }

  const { developersWithTechs } = developers

  return (
    <div className="flex w-full flex-col gap-5">
      <Input.Root
        className="m-auto my-4 flex w-full max-w-80 items-center gap-2 rounded-2xl border border-zinc-300 px-3 py-2 shadow-sm focus-within:border-violet-400 focus-within:ring-4
        focus-within:ring-violet-100 md:max-w-96 lg:mb-16 lg:max-w-2xl"
      >
        <Input.Prefix className="text-zinc-500">
          <Search />
        </Input.Prefix>
        <Input.Control
          type="text"
          placeholder="Encontre um dev pelo nome"
          onChange={(e) => setDeveloperFilterByName(e.target.value)}
        />
      </Input.Root>

      <Section title="Full-stacks">
        <Carousel className="w-full bg-violet-100/60">
          <CarouselContent>
            {developersWithTechs &&
              (() => {
                const fullstackDevelopers = developersWithTechs.filter(
                  (developer) => developer.occupation_area === 'fullstack',
                )
                let filteredFullstackDevelopers = fullstackDevelopers

                if (developerFilterByName !== '') {
                  filteredFullstackDevelopers = fullstackDevelopers.filter(
                    (developer) =>
                      developer.userName.includes(
                        developerFilterByName.toLowerCase(),
                      ),
                  )
                }
                if (filteredFullstackDevelopers.length === 0) {
                  return (
                    <p className="m-auto w-52 font-semibold text-violet-600">
                      Nenhum(a) DEV fullstack cadastrado(a) 😞
                    </p>
                  )
                }
                return filteredFullstackDevelopers.map((developer) => (
                  <CarouselItem
                    key={developer.developerId}
                    className="mr-2 h-52 min-w-52 max-w-56 basis-1/2 rounded-md border border-violet-800/30 bg-violet-200 pl-px md:h-60 md:max-w-72 lg:h-64 lg:pl-0"
                  >
                    <DialogUser
                      name={developer.userName}
                      avatarUrl={
                        developer.avatarUrl
                          ? `${process.env.URL_DOMAIN}/${developer.avatarUrl}`
                          : null
                      }
                      about={developer.about}
                      techs={developer.techs}
                      available_for_contract={developer.available_for_contract}
                      occupation_area={
                        developer.occupation_area.charAt(0).toUpperCase() +
                        developer.occupation_area.slice(1)
                      }
                      price_per_hour={developer.price_per_hour}
                      github={developer.github}
                      linkedin={developer.linkedin}
                      portfolio={developer.portfolio}
                      key={developer.developerId}
                    />
                  </CarouselItem>
                ))
              })()}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </Section>

      <Section title="Front-ends">
        <Carousel className="w-full bg-violet-100/60">
          <CarouselContent>
            {developersWithTechs &&
              (() => {
                const frontendDevelopers = developersWithTechs.filter(
                  (developer) => developer.occupation_area === 'frontend',
                )
                let filteredFrontendDevelopers = frontendDevelopers

                if (developerFilterByName !== '') {
                  filteredFrontendDevelopers = frontendDevelopers.filter(
                    (developer) =>
                      developer.userName.includes(
                        developerFilterByName.toLowerCase(),
                      ),
                  )
                }
                if (filteredFrontendDevelopers.length === 0) {
                  return (
                    <p className="m-auto w-52 font-semibold text-violet-600">
                      Nenhum(a) DEV frontend cadastrado(a) 😞
                    </p>
                  )
                }
                return filteredFrontendDevelopers.map((developer) => (
                  <CarouselItem
                    key={developer.developerId}
                    className="mr-2 h-52 min-w-52 max-w-56 basis-1/2 rounded-md border border-violet-800/30 bg-violet-200 pl-px md:h-60 md:max-w-72 lg:h-64 lg:pl-0"
                  >
                    <DialogUser
                      name={developer.userName}
                      avatarUrl={
                        developer.avatarUrl
                          ? `${process.env.URL_DOMAIN}/${developer.avatarUrl}`
                          : null
                      }
                      about={developer.about}
                      techs={developer.techs}
                      occupation_area={
                        developer.occupation_area.charAt(0).toUpperCase() +
                        developer.occupation_area.slice(1)
                      }
                      available_for_contract={developer.available_for_contract}
                      price_per_hour={developer.price_per_hour}
                      github={developer.github}
                      linkedin={developer.linkedin}
                      portfolio={developer.portfolio}
                      key={developer.developerId}
                    />
                  </CarouselItem>
                ))
              })()}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </Section>

      <Section title="Back-ends">
        <Carousel className="bg-violet-100/60">
          <CarouselContent>
            {developersWithTechs &&
              (() => {
                const backendDevelopers = developersWithTechs.filter(
                  (developer) => developer.occupation_area === 'backend',
                )
                let filteredBackendDevelopers = backendDevelopers

                if (developerFilterByName !== '') {
                  filteredBackendDevelopers = backendDevelopers.filter(
                    (developer) =>
                      developer.userName.includes(
                        developerFilterByName.toLowerCase(),
                      ),
                  )
                }
                if (filteredBackendDevelopers.length === 0) {
                  return (
                    <p className="m-auto w-52 font-semibold text-violet-600">
                      Nenhum(a) DEV backend cadastrado(a) 😞
                    </p>
                  )
                }
                return filteredBackendDevelopers.map((developer) => (
                  <CarouselItem
                    key={developer.developerId}
                    className="mr-2 h-52 min-w-52 max-w-56 basis-1/2 rounded-md border border-violet-800/30 bg-violet-200 pl-px md:h-60 md:max-w-72 lg:h-64 lg:pl-0"
                  >
                    <DialogUser
                      name={developer.userName}
                      avatarUrl={
                        developer.avatarUrl
                          ? `${process.env.URL_DOMAIN}/${developer.avatarUrl}`
                          : null
                      }
                      about={developer.about}
                      techs={developer.techs}
                      available_for_contract={developer.available_for_contract}
                      occupation_area={
                        developer.occupation_area.charAt(0).toUpperCase() +
                        developer.occupation_area.slice(1)
                      }
                      price_per_hour={developer.price_per_hour}
                      github={developer.github}
                      linkedin={developer.linkedin}
                      portfolio={developer.portfolio}
                      key={developer.developerId}
                    />
                  </CarouselItem>
                ))
              })()}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </Section>
    </div>
  )
}
