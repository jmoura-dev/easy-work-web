'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Select } from '@/app/components/Select'
import { SelectItem } from '@/app/components/Select/SelectItem'
import * as Input from '@/app/components/Input'
import { X } from 'lucide-react'
import { useState } from 'react'

const searchDeveloperSchema = z.object({
  name: z.string().optional(),
  occupation_area: z.string().optional(),
  techs: z.array(
    z.object({
      name: z.string(),
    }),
  ),
})

type SearchDeveloperSchema = z.infer<typeof searchDeveloperSchema>

export default function FindDeveloper() {
  const [techInputValue, setTechInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  console.log(isFocused)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SearchDeveloperSchema>({
    resolver: zodResolver(searchDeveloperSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  })

  async function handleGetDevelopers(data: SearchDeveloperSchema) {
    console.log(data)
  }

  const techsToTest = [
    { name: 'Typescript', id: 1 },
    { name: 'Docker', id: 2 },
    { name: 'Spring Boot', id: 3 },
    { name: 'Spring Boot', id: 4 },
    { name: 'Spring Boot', id: 5 },
    { name: 'Spring Boot', id: 6 },
    { name: 'Spring Boot', id: 7 },
    { name: 'Spring Boot', id: 8 },
    { name: 'Spring Boot', id: 9 },
    { name: 'Spring Boot', id: 10 },
    { name: 'Spring Boot', id: 11 },
    { name: 'Spring Boot', id: 12 },
  ]

  return (
    <div>
      <h1 className="mb-10 text-center font-mirza text-2xl font-semibold text-zinc-800 lg:text-3xl 2xl:text-4xl">
        Com o filtro avançado, você encontra o talento perfeito para seu negócio
      </h1>

      <form onSubmit={handleSubmit(handleGetDevelopers)}>
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
              onBlur={handleBlur}
              className="w-full"
            />
            {isFocused && (
              <div className="absolute z-10 flex max-h-36 w-full flex-col overflow-y-auto bg-zinc-300">
                {techsToTest &&
                  (() => {
                    let filteredTechs = techsToTest

                    if (techInputValue !== '') {
                      filteredTechs = techsToTest.filter((tech) =>
                        tech.name
                          .toLowerCase()
                          .includes(techInputValue.toLowerCase()),
                      )
                    }
                    if (filteredTechs.length === 0) {
                      return (
                        <p className="m-auto w-52 font-semibold text-violet-600">
                          Habilidade não encontrada
                        </p>
                      )
                    }
                    return filteredTechs.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => append({ name: item.name })}
                      >
                        {item.name}
                      </button>
                    ))
                  })()}
              </div>
            )}
          </div>

          <ul className="flex flex-wrap justify-evenly gap-1">
            {fields.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center justify-evenly rounded-md border border-dashed border-violet-800 bg-violet-100 px-1 text-sm font-semibold text-zinc-800"
              >
                <input
                  className="max-w-28 truncate bg-violet-100 outline-none"
                  {...register(`techs.${index}.name`)}
                  required
                  readOnly
                />
                <button type="button" onClick={() => remove(index)}>
                  <X width={16} height={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}
