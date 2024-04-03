'use client'

import * as Input from '@/app/components/Input'
import * as FileInput from '@/app/components/FileInput'
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Github,
  Link2,
  Linkedin,
  LockKeyhole,
  Mail,
  Trash2,
} from 'lucide-react'
import { Select } from '@/app/components/Select'
import { SelectItem } from '@/app/components/Select/SelectItem'
import { Textarea } from '@/app/components/Textarea'
import Link from 'next/link'
import { ButtonLogo } from '@/app/components/ButtonLogo'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { TechnologiesContext } from '@/providers/technologiesProvider'
import { useMutation } from '@tanstack/react-query'
import { registerNewDeveloper } from '@/data/developers'
import { toast } from 'react-toastify'

const registerDeveloperSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa ter ao menos 3 letras.' }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Digite no mínimo 6 caracteres para senha.' }),
  avatar: z.custom((value) => value instanceof FileList),
  about: z.string().optional(),
  price_per_hour: z.coerce
    .number()
    .max(100, { message: 'Valor máximo de R$ 100,00' })
    .optional(),
  occupation_area: z.string(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
  available_for_contract: z.string().optional().default('false'),
  techs: z.array(
    z.object({
      name: z.string(),
    }),
  ),
})

type RegisterDeveloperSchema = z.infer<typeof registerDeveloperSchema>

export default function RegisterDeveloper() {
  const [techInputValue, setTechInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const { allTechnologies } = useContext(TechnologiesContext)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDeveloperSchema>({
    resolver: zodResolver(registerDeveloperSchema),
    defaultValues: {
      techs: [],
    },
  })

  const router = useRouter()

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 100)
  }

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
        position: 'top-right',
      })
    }
    append({ name: techName })
    setTechInputValue('')
  }

  const { mutateAsync: registerNewDeveloperFn } = useMutation({
    mutationFn: registerNewDeveloper,
  })

  async function handleRegisterNewDeveloper(data: RegisterDeveloperSchema) {
    try {
      await registerNewDeveloperFn(data)
      toast.success('Desenvolvedor criado com sucesso', {
        position: 'top-center',
      })
      return router.replace('/signIn')
    } catch (err) {
      console.error(err)
      return toast.error('Erro ao se registrar', {
        position: 'top-center',
      })
    }
  }

  return (
    <div className="m-auto flex h-full max-w-5xl flex-col gap-5 px-8 py-8 md:gap-10">
      <ButtonLogo />
      <h1 className="mt-4 font-mirza text-3xl font-semibold text-zinc-800">
        Encontre as melhores oportunidades como desenvolvedor
      </h1>
      <form
        onSubmit={handleSubmit(handleRegisterNewDeveloper)}
        className="flex flex-col gap-5 divide-y divide-zinc-200"
      >
        <div className="flex flex-col gap-2 ">
          <label className="text-sm font-medium text-zinc-700" htmlFor="name">
            Nome
          </label>
          <Input.Root>
            <Input.Control
              placeholder="Ex: Jackson Moura"
              id="name"
              {...register('name')}
            />
          </Input.Root>
          {errors.name && (
            <span className="text-sm font-semibold text-red-800">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-5">
          <label className="text-sm font-medium text-zinc-700" htmlFor="email">
            Email
          </label>
          <Input.Root>
            <Input.Prefix>
              <Mail className="h-5 w-5 text-zinc-500" />
            </Input.Prefix>
            <Input.Control
              type="email"
              placeholder="Ex: moura@email.com"
              id="email"
              {...register('email')}
            />
          </Input.Root>
        </div>

        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-2 pt-5">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="password"
            >
              Senha
            </label>
            <Input.Root>
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
            )}
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
                  onValueChange={onChange}
                  value={value}
                  placeholder="Selecione..."
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
                  value={value}
                  placeholder="Selecione..."
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
                placeholder="Ex: 25.00 "
                id="price_per_hour"
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

        <div className="lg:grid-cols-form flex flex-col gap-3 pt-5 lg:grid">
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
            <FileInput.Control {...register('avatar')} />
          </FileInput.Root>
        </div>

        <div className="flex flex-col gap-5 pt-5 lg:flex-row lg:items-end lg:justify-between">
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
                placeholder="Digite seu portfólio(URL)"
                {...register('portfolio')}
              />
            </Input.Root>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5">
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

        <div className="flex flex-col gap-2 pt-5">
          <label
            htmlFor="bio"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Sobre
            <span className="block text-sm font-normal text-zinc-500">
              Fale um pouco sobre você
            </span>
          </label>
          <Textarea id="bio" maxLength={500} {...register('about')} />
        </div>

        <footer className="flex items-center justify-end gap-12 pt-5">
          <Link href="/signUp" className="text-base font-semibold text-red-800">
            Cancelar
          </Link>
          <button
            type="submit"
            className="w-32 rounded-md bg-green-400 py-2 font-semibold text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-950/40"
            disabled={isSubmitting}
          >
            Registrar
          </button>
        </footer>
      </form>
    </div>
  )
}
