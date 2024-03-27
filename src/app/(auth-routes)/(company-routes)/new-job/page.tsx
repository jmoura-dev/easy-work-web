'use client'

import { createNewJob } from '@/data/jobs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import * as Input from '@/app/components/Input'
import { Textarea } from '@/app/components/Textarea'
import { Select } from '@/app/components/Select'
import { SelectItem } from '@/app/components/Select/SelectItem'
import { Banknote, Clock3 } from 'lucide-react'
import Link from 'next/link'

const createNewJobSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Digite o título da vaga. (mínimo 5 caracteres)' }),
  description: z.string().min(20, {
    message: 'Digite um pouco sobre a vaga. (mínimo 20 caracteres)',
  }),
  workMode: z.string(),
  workSchedule: z.string(),
  remuneration: z.coerce.number().min(500, {
    message: 'Digite a remuneração mensal para a vaga. (mínimo R$: 500/mês)',
  }),
  hoursPerWeek: z.coerce
    .number()
    .min(1, { message: 'Digite a carga horária semanal' })
    .max(50, { message: 'No máximo 50 horas semanais' }),
})

type CreateNewJobSchema = z.infer<typeof createNewJobSchema>

export default function NewJob() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<CreateNewJobSchema>({
    resolver: zodResolver(createNewJobSchema),
  })

  const { mutateAsync: createNewJobFn } = useMutation({
    mutationFn: createNewJob,
  })

  async function handleCreateNewJob({
    title,
    description,
    workMode,
    workSchedule,
    remuneration,
    hoursPerWeek,
  }: CreateNewJobSchema) {
    console.log(title)

    await createNewJobFn({
      title,
      description,
      workMode,
      workSchedule,
      remuneration,
      hoursPerWeek,
    })

    try {
      alert('Vaga criada com sucesso!')
      router.replace('/dashboard')
    } catch (err) {
      alert('Erro ao criar vaga')
      router.replace('/dashboard')
    }
  }

  return (
    <div>
      <h1 className="mb-10 mt-5 text-center font-mirza text-2xl font-semibold text-zinc-800 lg:text-3xl 2xl:text-4xl">
        Contribua para a comunidade e impulsione seu negócio criando uma nova
        vaga!
      </h1>

      <form
        onSubmit={handleSubmit(handleCreateNewJob)}
        className="flex flex-col gap-5 divide-y divide-zinc-200"
      >
        <div className="flex flex-col items-center gap-5 pt-5 lg:grid lg:grid-cols-2">
          <div className="flex w-full flex-col gap-2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="title"
            >
              Título da vaga
            </label>
            <Input.Root>
              <Input.Control
                placeholder="Ex: Desenvolvedor Backend"
                id="title"
                {...register('title')}
              />
            </Input.Root>
            {errors.title && (
              <span className="text-sm font-semibold text-red-800">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col items-center gap-5">
            <div className="flex w-full flex-col gap-2">
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="remuneration"
              >
                Remuneração/mês
              </label>
              <Input.Root>
                <Input.Prefix>
                  <Banknote className="h-5 w-5 text-zinc-500" />
                </Input.Prefix>
                <Input.Control
                  type="number"
                  placeholder="Mensalidade oferecida pela vaga"
                  id="remuneration"
                  {...register('remuneration')}
                />
              </Input.Root>
              {errors.remuneration && (
                <span className="text-sm font-semibold text-red-800">
                  {errors.remuneration.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-5 lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="workMode"
            >
              Tipo de trabalho
            </label>

            <Controller
              name="workMode"
              control={control}
              render={({ field: { onChange, ref, value } }) => (
                <Select
                  ref={ref}
                  onValueChange={onChange}
                  value={value}
                  placeholder="Selecione..."
                >
                  <SelectItem text="Remoto" value="remoto" />
                  <SelectItem text="Presencial" value="presencial" />
                  <SelectItem text="Híbrido" value="híbrido" />
                </Select>
              )}
            />
            {errors.workMode && (
              <span className="text-sm font-semibold text-red-800">
                {errors.workMode.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="workSchedule"
            >
              Horário de trabalho
            </label>

            <Controller
              name="workSchedule"
              control={control}
              render={({ field: { onChange, ref, value } }) => (
                <Select
                  ref={ref}
                  onValueChange={onChange}
                  value={value}
                  placeholder="Selecione..."
                >
                  <SelectItem text="Tempo integral" value="tempo integral" />
                  <SelectItem text="Meio período" value="meio período" />
                </Select>
              )}
            />
            {errors.workSchedule && (
              <span className="text-sm font-semibold text-red-800">
                {errors.workSchedule.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="flex flex-col gap-2 pt-5">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="hoursPerWeek"
            >
              Horas de trabalho/semana
            </label>
            <Input.Root>
              <Input.Prefix className="text-sm font-semibold text-zinc-500">
                <Clock3 width={18} />
              </Input.Prefix>
              <Input.Control
                type="number"
                placeholder="Ex: 25 "
                id="price_per_hour"
                {...register('hoursPerWeek')}
              />
            </Input.Root>
            {errors.hoursPerWeek && (
              <span className="text-sm font-semibold text-red-800">
                {errors.hoursPerWeek.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5">
          <label
            htmlFor="description"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Sobre a vaga
            <span className="block text-sm font-normal text-zinc-500">
              Digite alguns requisitos necessários e habilidades desejadas
            </span>
          </label>
          <Textarea
            id="description"
            maxLength={150}
            {...register('description')}
          />
          {errors.description && (
            <span className="text-sm font-semibold text-red-800">
              {errors.description.message}
            </span>
          )}
        </div>

        <footer className="flex items-center justify-end gap-12 pt-5">
          <Link
            href="/dashboard"
            className="text-base font-semibold text-red-800"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="w-32 rounded-md bg-green-400 py-2 font-semibold text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-950/40"
            disabled={isSubmitting}
          >
            Criar
          </button>
        </footer>
      </form>
    </div>
  )
}
