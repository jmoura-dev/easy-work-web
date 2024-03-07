'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import * as Input from '@/app/components/Input'
import { Select } from '@/app/components/Select'
import { SelectItem } from '@/app/components/Select/SelectItem'
import { Textarea } from './Textarea'
import { Plus, X } from 'lucide-react'

export interface FormChangeProfileProps {
  userName: string
  about: string
  available_for_contract: boolean
  occupation_area: string
  price_per_hour?: number
  techs: {
    name: string
    id: string
  }[]
}

const registerDeveloperSchema = z.object({
  name: z.string().optional(),
  // password: z.string(),
  about: z.string().optional(),
  price_per_hour: z.coerce
    .number()
    .max(100, { message: 'Valor máximo de R$ 100,00' })
    .optional(),
  occupation_area: z.string().optional(),
  available_for_contract: z.string().optional(),
  techs: z.array(
    z.object({
      name: z.string(),
    }),
  ),
})

type RegisterDeveloperSchema = z.infer<typeof registerDeveloperSchema>

export function FormChangeProfile({
  userName,
  about,
  occupation_area,
  available_for_contract,
  price_per_hour,
  techs,
}: FormChangeProfileProps) {
  const arrayTechNames = techs.map((tech) => ({ name: tech.name }))
  if (arrayTechNames.length === 0) {
    arrayTechNames.push({ name: '' })
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<RegisterDeveloperSchema>({
    resolver: zodResolver(registerDeveloperSchema),
    defaultValues: {
      techs: arrayTechNames,
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  })

  const lastTechName = useWatch({
    control,
    name: `techs.${fields.length - 1}.name`,
  })

  async function handleChangeProfile(data: RegisterDeveloperSchema) {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleChangeProfile)}>
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
          <label className="text-sm font-medium text-zinc-700" htmlFor="name">
            Senha
          </label>
          {/* <Input.Root>
            <Input.Prefix>
              <LockKeyhole className="h-5 w-5 text-zinc-500" />
            </Input.Prefix>
            <Input.Control
              type="password"
              placeholder="Digite sua senha"
              id="password"
              {...register('password')}
            />
          </Input.Root>
          {errors.password && (
            <span className="text-sm font-semibold text-red-800">
              {errors.password.message}
            </span>
          )} */}
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

      {/* <div className="lg:grid-cols-form flex flex-col gap-3 pt-5 lg:grid">
        <label
          htmlFor="photo"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Sua foto
          <span className="block text-sm font-normal text-zinc-500">
            Isso será exibido no seu perfil.
          </span>
        </label>
        <FileInput.Root className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <FileInput.ImagePreview />
          <FileInput.Trigger />
          <FileInput.Control />
        </FileInput.Root>
      </div> */}

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

      <div className="mt-6 flex flex-col gap-3">
        <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Habilidades
        </h2>
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
                readOnly={index !== fields.length - 1}
              />
              <button type="button" onClick={() => remove(index)}>
                <X width={16} height={16} />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            console.log(lastTechName)
            if (lastTechName.trim() !== '') {
              append({ name: '' })
            }
          }}
          disabled={lastTechName.trim() === ''}
          className="m-auto mt-2 flex w-36 items-center gap-2 border-b border-violet-300 p-1 text-sm font-bold text-violet-600"
        >
          Nova habilidade
          <Plus width={18} height={18} />
        </button>
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
