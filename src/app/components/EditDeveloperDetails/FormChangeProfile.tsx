'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import * as Input from '@/app/components/Input'
import * as FileInput from '@/app/components/FileInput'
import { Select } from '@/app/components/Select'
import { SelectItem } from '@/app/components/Select/SelectItem'
import { Textarea } from '../Textarea'
import { Github, Link2, Linkedin, LockKeyhole, Trash2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { updateDeveloper } from '@/data/developers'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { TechnologiesContext } from '@/providers/technologiesProvider'

import { toast } from 'react-toastify'

export interface FormChangeProfileProps {
  userName: string
  avatarUrl: string | null
  about: string
  available_for_contract: boolean
  occupation_area: string
  price_per_hour?: number
  linkedin: string | null
  github: string | null
  portfolio: string | null
  techs: {
    name: string
    id: string
  }[]
}

const updateDeveloperSchema = z.object({
  name: z.string().optional(),
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
  avatar: z.custom((value) => value instanceof FileList),
  about: z.string().optional(),
  price_per_hour: z.coerce
    .number()
    .max(100, { message: 'Valor máximo de R$ 100,00' })
    .optional(),
  occupation_area: z.string().optional(),
  available_for_contract: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
  techs: z.array(
    z.object({
      name: z.string(),
    }),
  ),
})

type UpdateDeveloperSchema = z.infer<typeof updateDeveloperSchema>

export function FormChangeProfile({
  userName,
  avatarUrl,
  about,
  occupation_area,
  available_for_contract,
  price_per_hour,
  linkedin,
  github,
  portfolio,
  techs,
}: FormChangeProfileProps) {
  const [techInputValue, setTechInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { allTechnologies } = useContext(TechnologiesContext)

  const router = useRouter()

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 100)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<UpdateDeveloperSchema>({
    resolver: zodResolver(updateDeveloperSchema),
    defaultValues: {
      techs,
    },
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

  const filteredTechnologies = allTechnologies.filter((item) =>
    item.name.toLowerCase().includes(techInputValue.toLowerCase()),
  )

  function handleTechClick(techName: string) {
    const doesTechnologyAlreadyAdded = technologiesAlreadyAdded.find(
      (tech) => tech.name === techName,
    )

    if (doesTechnologyAlreadyAdded) {
      return toast.warn('Tecnologia já foi adicionada', {
        position: 'top-center',
      })
    }
    append({ name: techName })
    setTechInputValue('')
  }

  const { mutateAsync: updateDeveloperFn } = useMutation({
    mutationFn: updateDeveloper,
  })

  async function handleUpdateDeveloper(data: UpdateDeveloperSchema) {
    let isAvailable: boolean

    if (data.available_for_contract === 'true') {
      isAvailable = true
    } else {
      isAvailable = false
    }

    const dataToUpdate = {
      ...data,
      available_for_contract: isAvailable,
    }

    try {
      await updateDeveloperFn(dataToUpdate)
      toast.success('Sucesso ao atualizar o perfil', {
        position: 'top-center',
      })
      router.replace('/dashboard')
    } catch (err) {
      return toast.warn('Erro ao atualizar o perfil', {
        position: 'top-center',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpdateDeveloper)}>
      <div className="lg:grid-cols-form mb-4 flex flex-col gap-3 pt-5 lg:grid">
        <label
          htmlFor="photo"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Sua foto
        </label>
        <FileInput.Root className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <FileInput.ImagePreview
            initialImageUrl={
              avatarUrl ? `${process.env.URL_DOMAIN}/${avatarUrl}` : undefined
            }
          />
          <FileInput.Trigger />
          <FileInput.Control {...register('avatar')} />
        </FileInput.Root>
      </div>

      <div className="flex flex-col gap-2 ">
        <label className="text-sm font-medium text-zinc-700" htmlFor="name">
          Nome
        </label>
        <Input.Root>
          <Input.Control
            autoComplete="off"
            defaultValue={userName}
            {...register('name')}
          />
        </Input.Root>
        {errors.name && (
          <span className="text-sm font-semibold text-red-800">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-2 pt-5">
          <label
            className="text-sm font-medium text-zinc-700"
            htmlFor="oldPassword"
          >
            Alterar Senha
          </label>
          <Input.Root>
            <Input.Prefix>
              <LockKeyhole className="h-5 w-5 text-zinc-500" />
            </Input.Prefix>
            <Input.Control
              type="password"
              placeholder="Digite sua senha atual"
              id="oldPassword"
              {...register('oldPassword')}
            />
          </Input.Root>
          <Input.Root>
            <Input.Prefix>
              <LockKeyhole className="h-5 w-5 text-zinc-500" />
            </Input.Prefix>
            <Input.Control
              type="password"
              placeholder="Digite sua nova senha"
              {...register('newPassword')}
            />
          </Input.Root>
        </div>

        <div className="flex flex-col gap-2 border-t pt-5 lg:border-none">
          <label
            className="text-sm font-medium text-zinc-700"
            htmlFor="available_for_contract"
          >
            Disponível para contrato(CLT/PJ)?
          </label>
          <Controller
            name="available_for_contract"
            control={control}
            render={({ field: { ref, onChange, value } }) => (
              <Select
                ref={ref}
                placeholder={
                  available_for_contract
                    ? 'Sim, estou disponível!'
                    : 'Não, apenas freelancer!'
                }
                onValueChange={onChange}
                value={value}
              >
                <SelectItem text="Sim, estou disponível!" value="true" />
                <SelectItem text="Não, apenas freelancer!" value="false" />
              </Select>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 pt-5 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-zinc-700"
            htmlFor="occupation_area"
          >
            Área de atuação
          </label>

          <Controller
            name="occupation_area"
            control={control}
            render={({ field: { onChange, ref, value } }) => (
              <Select
                ref={ref}
                onValueChange={onChange}
                placeholder={occupation_area}
                value={value}
              >
                <SelectItem text="FullStack" value="fullstack" />
                <SelectItem text="Front-end" value="frontend" />
                <SelectItem text="Back-end" value="backend" />
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-zinc-700"
            htmlFor="price_per_hour"
          >
            Valor do freelancer por hora
          </label>
          <Input.Root>
            <Input.Prefix className="text-sm font-semibold text-zinc-500">
              R$:
            </Input.Prefix>
            <Input.Control
              type="number"
              id="price_per_hour"
              defaultValue={price_per_hour}
              {...register('price_per_hour')}
            />
          </Input.Root>
          {errors.price_per_hour && (
            <span className="text-sm font-semibold text-red-800">
              {errors.price_per_hour.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-5">
        <label
          htmlFor="bio"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Sobre
        </label>
        <Textarea
          id="bio"
          maxLength={500}
          defaultValue={about}
          {...register('about')}
        />
      </div>

      <div className="flex flex-col gap-3 pt-5">
        <div>
          <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Habilidades
          </h2>
          <span className="block text-sm font-normal text-zinc-500">
            Selecione habilidades que deseja adicionar.
          </span>
        </div>

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
              className="flex items-center rounded-md bg-transparent px-1 text-sm font-semibold text-zinc-800"
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

      <div className="flex flex-col gap-2 pt-5">
        <div className="flex w-full flex-col gap-2">
          <label
            className="text-sm font-medium text-zinc-700"
            htmlFor="linkedin"
          >
            Redes sociais
          </label>
          <Input.Root>
            <Input.Prefix className="text-sm font-semibold text-zinc-500">
              <Linkedin width={18} />
            </Input.Prefix>
            <Input.Control
              type="url"
              defaultValue={linkedin ?? undefined}
              placeholder="Digite seu linkedIn(URL)"
              id="linkedin"
              {...register('linkedin')}
            />
          </Input.Root>
        </div>

        <div className="flex w-full gap-2">
          <Input.Root>
            <Input.Prefix className="text-sm font-semibold text-zinc-500">
              <Github width={18} />
            </Input.Prefix>
            <Input.Control
              type="url"
              defaultValue={github ?? undefined}
              placeholder="Digite seu Github(URL)"
              {...register('github')}
            />
          </Input.Root>
        </div>

        <div className="flex w-full gap-2">
          <Input.Root>
            <Input.Prefix className="text-sm font-semibold text-zinc-500">
              <Link2 />
            </Input.Prefix>
            <Input.Control
              type="url"
              defaultValue={portfolio ?? undefined}
              placeholder="Digite seu portfólio(URL)"
              {...register('portfolio')}
            />
          </Input.Root>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full justify-center rounded-md bg-green-400 py-2 font-semibold text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-950/40 lg:ml-auto lg:w-36"
        disabled={isSubmitting}
      >
        Salvar
      </button>
    </form>
  )
}
