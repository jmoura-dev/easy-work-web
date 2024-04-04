'use client'

import * as Input from '@/app/components/Input'
import * as FileInput from '@/app/components/FileInput'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link2, LockKeyhole, Mail, MapPin } from 'lucide-react'
import { Textarea } from '@/app/components/Textarea'
import Link from 'next/link'
import { ButtonLogo } from '@/app/components/ButtonLogo'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { registerNewCompany } from '@/data/companies'
import { useMutation } from '@tanstack/react-query'

const registerCompanySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: 'Digite no mínimo 6 caracteres' }),
  about: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  site_url: z.string().optional(),
})

type RegisterCompanySchema = z.infer<typeof registerCompanySchema>

export default function RegisterCompany() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterCompanySchema>({
    resolver: zodResolver(registerCompanySchema),
  })

  const { mutateAsync: registerNewCompanyFn } = useMutation({
    mutationFn: registerNewCompany,
  })

  async function handleRegisterNewCompany(data: RegisterCompanySchema) {
    try {
      await registerNewCompanyFn(data)
      toast.success('Empresa criada com sucesso', {
        position: 'top-center',
      })
      return router.replace('/signIn')
    } catch (err) {
      const axiosError = err as AxiosError<any>
      if (axiosError.response) {
        const status = axiosError.response.status
        console.error(axiosError.response)

        switch (status) {
          case 409:
            toast.error('Este e-mail já está em uso.', {
              position: 'top-center',
            })
            break
          default:
            toast.error('Internal server error', {
              position: 'top-center',
            })
        }
      }
    }
  }

  return (
    <div className="m-auto flex h-full max-w-5xl flex-col gap-5 px-8 py-8 md:gap-10">
      <ButtonLogo />
      <h1 className="mt-4 font-mirza text-3xl font-semibold text-zinc-800">
        Encontre o desenvolvedor ideal para seu projeto ou empresa
      </h1>
      <form
        onSubmit={handleSubmit(handleRegisterNewCompany)}
        className="flex flex-col gap-5 divide-y divide-zinc-200"
      >
        <div className="flex flex-col gap-2 ">
          <label className="text-sm font-medium text-zinc-700" htmlFor="name">
            Nome da empresa
          </label>
          <Input.Root>
            <Input.Control
              placeholder="Ex: company_jobs LTDA"
              id="name"
              {...register('name')}
            />
          </Input.Root>
        </div>

        <div className="flex flex-col items-center gap-5 lg:grid lg:grid-cols-2">
          <div className="flex w-full flex-col gap-2 pt-5">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="email"
            >
              Email
            </label>
            <Input.Root>
              <Input.Prefix>
                <Mail className="h-5 w-5 text-zinc-500" />
              </Input.Prefix>
              <Input.Control
                type="email"
                placeholder="Ex: company@email.com"
                id="email"
                {...register('email')}
              />
            </Input.Root>
          </div>

          <div className="flex w-full flex-col gap-2 lg:pt-5">
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
          </div>
        </div>

        <div className="lg:grid-cols-form flex flex-col gap-3 pt-5 lg:grid">
          <label
            htmlFor="photo"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Foto ou logo da empresa
            <span className="block text-sm font-normal text-zinc-500">
              Isso será exibido no perfil.
            </span>
          </label>
          <FileInput.Root className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <FileInput.ImagePreview />
            <FileInput.Trigger />
            <FileInput.Control />
          </FileInput.Root>
        </div>

        <div className="flex flex-col items-center gap-5 lg:grid lg:grid-cols-2">
          <div className="flex w-full flex-col gap-2 pt-5">
            <label className="text-sm font-medium text-zinc-700" htmlFor="city">
              Cidade
            </label>
            <Input.Root>
              <Input.Prefix>
                <MapPin className="h-5 w-5 text-zinc-500" />
              </Input.Prefix>
              <Input.Control
                type="city"
                placeholder="(Opcional)"
                id="city"
                {...register('city')}
              />
            </Input.Root>
          </div>

          <div className="flex w-full flex-col gap-2 lg:pt-5">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="state"
            >
              Estado
            </label>
            <Input.Root>
              <Input.Prefix>
                <MapPin className="h-5 w-5 text-zinc-500" />
              </Input.Prefix>
              <Input.Control
                type="state"
                placeholder="(Opcional)"
                id="state"
                {...register('state')}
              />
            </Input.Root>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5">
          <label className="text-sm font-medium text-zinc-700" htmlFor="name">
            Site (URL)
          </label>
          <Input.Root>
            <Input.Prefix>
              <Link2 className="h-5 w-5 text-zinc-500" />
            </Input.Prefix>
            <Input.Control
              type="url"
              placeholder="(Opcional)"
              {...register('site_url')}
            />
          </Input.Root>
        </div>

        <div className="flex flex-col gap-2 pt-5">
          <label
            htmlFor="bio"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Sobre
            <span className="block text-sm font-normal text-zinc-500">
              Fale um pouco sobre a empresa
            </span>
          </label>
          <Textarea id="bio" maxLength={150} {...register('about')} />
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
            {!isSubmitting ? 'Registrar' : 'Carregando...'}
          </button>
        </footer>
      </form>
    </div>
  )
}
