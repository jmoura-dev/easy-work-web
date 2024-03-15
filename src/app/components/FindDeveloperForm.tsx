'use client'

import * as Input from '@/app/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Select } from './Select'
import { SelectItem } from './Select/SelectItem'
import { Trash2 } from 'lucide-react'
import { DialogUser } from './DialogUser'
import { searchDevelopersByFilters } from '@/data/developers'
import { useMutation, useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { SkeletonDashboard } from './SkeletonDashboard'
import { getTechnologies } from '@/data/technologies'

interface DevelopersProps {
  developerId: string
  avatarUrl: string | null
  userName: string
  about: string
  available_for_contract: boolean
  occupation_area: string
  price_per_hour: number
  techs: {
    name: string
    id: string
  }[]
}

const searchDeveloperSchema = z.object({
  name: z.string().optional().default(''),
  occupation_area: z.string().optional().default(''),
  techs: z.array(
    z.object({
      name: z.string(),
    }),
  ),
})

type SearchDeveloperSchema = z.infer<typeof searchDeveloperSchema>

export function FindDeveloperForm() {
  const [techInputValue, setTechInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [developers, setDevelopers] = useState<DevelopersProps[]>([])

  const {
    data: allTechnologies,
    isError: isErrorTechnology,
    isLoading,
  } = useQuery({
    queryKey: ['getTechnologies'],
    queryFn: getTechnologies,
  })

  const {
    mutateAsync: searchDevelopersFn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: searchDevelopersByFilters,
  })

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 100)
  }

  const { register, handleSubmit, control } = useForm<SearchDeveloperSchema>({
    resolver: zodResolver(searchDeveloperSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  })

  const technologiesAlreadyAdded = useWatch({
    control,
    name: 'techs',
    defaultValue: [],
  })

  if (isLoading) {
    return <SkeletonDashboard />
  }

  if (isErrorTechnology) {
    alert('Faça login para continuar navegando')
    return redirect('/signIn')
  }

  if (!allTechnologies) {
    return null
  }

  const technologies = allTechnologies.technologies

  const filteredTechnologies = technologies.filter((item) =>
    item.name.toLowerCase().includes(techInputValue.toLowerCase()),
  )

  function handleTechClick(techName: string) {
    const doesTechnologyAlreadyAdded = technologiesAlreadyAdded.find(
      (tech) => tech.name === techName,
    )

    if (doesTechnologyAlreadyAdded) {
      return alert('Tecnologia já foi adicionada')
    }
    append({ name: techName })
    setTechInputValue('')
  }

  async function handleSearchDevelopers(data: SearchDeveloperSchema) {
    try {
      if (data.occupation_area === 'any') {
        data.occupation_area = ''
      }

      const response = await searchDevelopersFn({
        name: data.name,
        occupation_area: data.occupation_area,
        techs: data.techs,
        page: 1,
      })

      return setDevelopers(response.developersWithTechs)
    } catch (err) {
      return alert('Erro ao buscar desenvolvedores.')
    }
  }

  if (isPending) {
    return <SkeletonDashboard />
  }

  if (isError) {
    alert('Erro ao carregar o dashboard')
    return redirect('/signIn')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSearchDevelopers)}
        className="m-auto max-w-6xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700" htmlFor="name">
              Nome (Opcional)
            </label>
            <Input.Root>
              <Input.Control
                placeholder="Digite um nome específico"
                {...register('name')}
              />
            </Input.Root>
          </div>

          <div className="flex w-full flex-col gap-2 pt-5 md:pt-0">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="occupation_area"
            >
              Área de atuação (Opcional)
            </label>

            <Controller
              name="occupation_area"
              control={control}
              render={({ field: { onChange, ref, value } }) => (
                <Select
                  ref={ref}
                  onValueChange={onChange}
                  value={value}
                  placeholder="Area de atuação desejada"
                >
                  <SelectItem text="FullStack" value="fullstack" />
                  <SelectItem text="Front-end" value="frontend" />
                  <SelectItem text="Back-end" value="backend" />
                  <SelectItem text="Qualquer" value="any" />
                </Select>
              )}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Habilidades
          </h2>

          <div className="relative max-w-48">
            <input
              type="text"
              onFocus={handleFocus}
              onChange={(e) => setTechInputValue(e.target.value)}
              placeholder="Digite uma tecnologia"
              onBlur={handleBlur}
              className="'focus-within:border-violet-400 w-full rounded-md border border-zinc-300 bg-transparent p-2 shadow-sm
          outline-violet-300 focus-within:ring-4 focus-within:ring-violet-100"
            />
            {isFocused && (
              <div className="absolute z-10 flex max-h-36 w-full flex-col gap-1 divide-y divide-zinc-100 overflow-y-auto rounded-bl-md rounded-br-md bg-zinc-300 py-1">
                {filteredTechnologies.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTechClick(item.name)}
                    className="text-base font-semibold text-violet-500"
                  >
                    {item.name}
                  </button>
                ))}
                {filteredTechnologies.length === 0 && (
                  <p className="m-auto p-1 text-sm font-semibold text-violet-600">
                    Habilidade não encontrada
                  </p>
                )}
              </div>
            )}
          </div>

          <ul className="flex flex-wrap gap-1 rounded-md bg-violet-300/20 p-2">
            {fields.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center justify-evenly rounded-md bg-transparent px-1 text-sm font-semibold text-zinc-800"
              >
                <div
                  className="flex max-w-28 items-center gap-2 truncate rounded-md bg-violet-700 px-2 py-1 text-sm font-semibold text-zinc-300 outline-none"
                  {...register(`techs.${index}.name`)}
                >
                  {item.name}

                  <button type="button" onClick={() => remove(index)}>
                    <Trash2 width={16} height={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="mt-6 w-24 rounded-md bg-green-500 py-2 text-sm font-bold text-white hover:bg-green-600"
        >
          Buscar
        </button>
      </form>

      <ul className="m-auto mt-10 flex max-w-7xl flex-wrap justify-evenly gap-2">
        {developers.map((developer) => (
          <DialogUser
            key={developer.developerId}
            about={developer.about}
            available_for_contract={developer.available_for_contract}
            name={developer.userName}
            occupation_area={developer.occupation_area}
            price_per_hour={developer.price_per_hour}
            techs={developer.techs}
          />
        ))}
      </ul>
    </>
  )
}
