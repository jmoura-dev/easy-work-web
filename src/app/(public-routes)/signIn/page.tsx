'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import * as Input from '@/app/components/Input'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const registerDeveloperSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Digite no mínimo 6 caracteres para senha.' }),
})

type RegisterDeveloperSchema = z.infer<typeof registerDeveloperSchema>

export default function SignIn() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDeveloperSchema>({
    resolver: zodResolver(registerDeveloperSchema),
  })

  async function handleSignIn(data: RegisterDeveloperSchema) {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      console.error(result.error)
      return
    }
    router.replace('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <h1>Faça login no Easy Work</h1>
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

      <button type="submit" disabled={isSubmitting}>
        Entrar
      </button>
    </form>
  )
}
