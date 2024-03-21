'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import * as Input from '@/app/components/Input'
import * as FileInput from '@/app/components/FileInput'
import { Textarea } from '../Textarea'
import { Link, LockKeyhole, MapPin } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { updateCompany } from '@/data/companies'
import { useRouter } from 'next/navigation'

export interface FormChangeProfileProps {
  userName: string
  avatarUrl: string | null
  about: string
  state?: string
  city?: string
  site_url?: string
}

const updateCompanySchema = z.object({
  name: z.string().optional(),
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
  avatar: z.custom((value) => value instanceof FileList),
  about: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  site_url: z.string().optional(),
})

type UpdateCompanySchema = z.infer<typeof updateCompanySchema>

export function FormChangeCompanyProfile({
  userName,
  avatarUrl,
  about,
  state,
  city,
  site_url,
}: FormChangeProfileProps) {
  const router = useRouter()
  const { mutateAsync: updateCompanyFn } = useMutation({
    mutationFn: updateCompany,
  })

  async function handleUpdateCompany(data: UpdateCompanySchema) {
    try {
      await updateCompanyFn(data)
      alert('Sucesso ao atualizar o perfil')
      router.replace('/dashboard')
    } catch (err) {
      alert('Erro ao atualizar o perfil')
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCompanySchema>({
    resolver: zodResolver(updateCompanySchema),
  })

  return (
    <form onSubmit={handleSubmit(handleUpdateCompany)}>
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
      </div>

      <div className="flex flex-col gap-5 pt-5 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700" htmlFor="state">
            Estado
          </label>
          <Input.Root>
            <Input.Prefix className="text-sm font-semibold text-zinc-500">
              <MapPin width={18} />
            </Input.Prefix>
            <Input.Control
              type="text"
              id="state"
              defaultValue={state}
              {...register('state')}
            />
          </Input.Root>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700" htmlFor="city">
            Cidade
          </label>
          <Input.Root>
            <Input.Prefix className="text-sm font-semibold text-zinc-500">
              <MapPin width={18} />
            </Input.Prefix>
            <Input.Control
              type="text"
              id="city"
              defaultValue={city}
              {...register('city')}
            />
          </Input.Root>
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

      <div className="mt-4 flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700" htmlFor="site_url">
          Site (URL)
        </label>
        <Input.Root>
          <Input.Prefix className="text-sm font-semibold text-zinc-500">
            <Link width={18} />
          </Input.Prefix>
          <Input.Control
            type="text"
            id="site_url"
            defaultValue={site_url}
            {...register('site_url')}
          />
        </Input.Root>
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
