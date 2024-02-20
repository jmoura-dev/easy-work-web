'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/components/ui/carousel'
import { Card } from '@/app/components/UserCard'
import { useQuery } from '@tanstack/react-query'
import { getDevelopers } from '@/data/developers'

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
    <>
      <Carousel className="w-full max-w-sm bg-violet-50 lg:max-w-4xl">
        <CarouselContent className="">
          {developersWithTechs &&
            developersWithTechs.map((developer) => (
              <CarouselItem
                key={developer.developerId}
                className="mr-2 min-w-52 max-w-56 basis-1/2 rounded-md bg-violet-200 pl-px shadow-sm lg:basis-1/4 lg:pl-0"
              >
                <Card
                  name={developer.userName}
                  techs={developer.techs}
                  occupation_area={developer.occupation_area}
                  price_per_hour={developer.price_per_hour}
                  key={developer.developerId}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
    </>
  )
}
