'use client'

import * as Input from '@/app/components/Input'
import * as FileInput from '@/app/components/FileInput'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole, Mail } from 'lucide-react'
import { Select } from '@/app/components/Select'
import { SelectItem } from '@/app/components/Select/SelectItem'
import { Textarea } from '@/app/components/Textarea'
import Link from 'next/link'
import { api } from '@/app/api/axios'
import { ButtonLogo } from '@/app/components/ButtonLogo'
import { useRouter } from 'next/navigation'

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
  available_for_contract: z.string().optional().default('false'),
})

type RegisterDeveloperSchema = z.infer<typeof registerDeveloperSchema>

export default function RegisterDeveloper() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDeveloperSchema>({
    resolver: zodResolver(registerDeveloperSchema),
  })

  async function registerNewDeveloper(data: RegisterDeveloperSchema) {
    const dataUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      about: data.about,
    }

    const response = await api.post('/users', dataUser)
    const userId = response.data.userId

    const isAvailableForContract = data.available_for_contract === 'true'

    const dataDeveloper = {
      userId,
      available_for_contract: isAvailableForContract,
      occupation_area: data.occupation_area,
      price_per_hour: data.price_per_hour,
    }
    await api.post('/developers', dataDeveloper)
    router.replace('/signIn')
  }

  return (
    <div className="m-auto flex h-full max-w-5xl flex-col gap-5 px-8 py-8 md:gap-10">
      <ButtonLogo />
      <h1 className="mt-4 font-mirza text-3xl font-semibold text-zinc-800">
        Encontre as melhores oportunidades como desenvolvedor
      </h1>
      <form
        onSubmit={handleSubmit(registerNewDeveloper)}
        className="flex flex-col gap-5 divide-y divide-zinc-200"
      >
        <div className="flex flex-col gap-2 ">
          <label className="text-sm font-medium text-zinc-700" htmlFor="name">
            Nome
          </label>
          <Input.Root>
            <Input.Control
              placeholder="Ex: Jackson Moura"
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
            <label className="text-sm font-medium text-zinc-700" htmlFor="name">
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
            <FileInput.Control />
          </FileInput.Root>
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
