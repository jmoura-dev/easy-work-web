'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/components/ui/carousel'
import { Card } from '../../components/UserCard'
import { useState } from 'react'
import { api } from '@/utils/api'

export default function Home() {
  const [developers, setDevelopers] = useState([])

  async function fetchDevelopers() {
    try {
      const response = await api.get('/developers/list')
      setDevelopers(response.data)
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  const usersArray = [
    {
      id: 1,
      name: 'John Doe',
      price_per_our: 25.3,
      occupation_area: 'Frontend',
      techs: [
        { name: 'JavaScript', id: 1 },
        { name: 'JavaScript', id: 2 },
        { name: 'JavaScript', id: 3 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      price_per_our: 25.3,
      occupation_area: 'Backend',
      techs: [
        { name: 'JavaScript', id: 4 },
        { name: 'JavaScript', id: 5 },
        { name: 'JavaScript', id: 16 },
      ],
    },
    {
      id: 3,
      name: 'Alice Johnson',
      price_per_our: 25.3,
      occupation_area: 'FullStack',
      techs: [
        { name: 'JavaScript', id: 17 },
        { name: 'JavaScript', id: 18 },
        { name: 'JavaScript', id: 19 },
      ],
    },
    {
      id: 4,
      name: 'Bob Williams',
      price_per_our: 25.3,
      occupation_area: 'FullStack',
      techs: [
        { name: 'JavaScript', id: 11 },
        { name: 'JavaScript', id: 12 },
        { name: 'JavaScript', id: 13 },
      ],
    },
    {
      id: 5,
      name: 'Eva Davis',
      price_per_our: 25.3,
      occupation_area: 'FullStack',
      techs: [
        { name: 'JavaScript', id: 14 },
        { name: 'JavaScript', id: 15 },
        { name: 'JavaScript', id: 10 },
      ],
    },
  ]

  return (
    <>
      <Carousel className="w-full max-w-sm bg-violet-50 lg:max-w-4xl">
        <CarouselContent className="">
          {usersArray.length > 0 &&
            usersArray.map((user) => (
              <CarouselItem
                key={user.id}
                className="mr-2 min-w-52 max-w-56 basis-1/2 rounded-md bg-violet-200 pl-px shadow-sm lg:basis-1/4 lg:pl-0"
              >
                <Card
                  name={user.name}
                  techs={user.techs}
                  occupation_area={user.occupation_area}
                  price_per_hour={user.price_per_our}
                  key={user.id}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
      <button
        className="h-5 w-5 bg-black"
        type="button"
        onClick={fetchDevelopers}
      ></button>
    </>
  )
}
