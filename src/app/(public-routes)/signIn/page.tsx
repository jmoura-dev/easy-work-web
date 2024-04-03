'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import * as Input from '@/app/components/Input'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DeveloperLogo from '@/assets/developers.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'

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
      toast.warn('Email e/ou senha invalido(s)', {
        position: 'top-right',
      })
      console.error(result.error)
      return
    }
    router.replace('/dashboard')
  }

  return (
    <div className="grid lg:grid-cols-signIn">
      <Image
        src={DeveloperLogo}
        alt=""
        className="hidden h-screen object-cover lg:flex"
        priority
      />
      <div className="h-screen px-12 py-16">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex h-full flex-1 flex-col items-center px-6 py-6 lg:pt-24"
        >
          <div className="mb-5 flex w-full flex-col items-center justify-center rounded-md font-mirza text-3xl font-bold text-violet-500">
            <span className="-ml-4">
              E<span className="text-xl font-normal">asy</span>
            </span>
            <span className="-mr-2 -mt-4">
              W<span className="text-xl font-normal">ork</span>
            </span>
          </div>
          <>
            <div className="flex w-full max-w-2xl flex-col gap-1 pt-5">
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
                  placeholder="Ex: moura@email.com"
                  id="email"
                  {...register('email')}
                />
              </Input.Root>
            </div>

            <div className="flex w-full max-w-2xl flex-col gap-1 pt-5">
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="name"
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
          </>

          <button
            type="submit"
            disabled={isSubmitting}
            className="m-auto my-5 flex w-full max-w-52 justify-center rounded-md bg-green-400 py-1.5 font-semibold text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-950/40"
          >
            Entrar
          </button>
          <div className="mt-10 flex flex-col items-center justify-center gap-2 minimum:flex-row">
            <span className="text-zinc-700">Não possui uma conta?</span>
            <Link
              href="/signUp"
              className="font-semibold text-green-800 hover:text-green-700"
            >
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
