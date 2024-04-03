'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useMutation } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import {
  getCandidatureById,
  updateStatusCandidature,
} from '@/data/candidatures'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Textarea } from './Textarea'
import { toast } from 'react-toastify'

interface DialogUpdateStatusJobRequest {
  param: string
}

interface CandidatureProps {
  id: string
  status: string
  created_at: Date
  updated_at: Date
}

const updateStatusCandidatureSchema = z.object({
  status: z
    .string()
    .min(10, { message: 'Digite no mínimo 10 caracteres para o novo status' }),
})

type UpdateStatusCandidatureSchema = z.infer<
  typeof updateStatusCandidatureSchema
>

export function DialogUpdateStatusJob({ param }: DialogUpdateStatusJobRequest) {
  const [candidature, setCandidature] = useState<CandidatureProps>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateStatusCandidatureSchema>({
    resolver: zodResolver(updateStatusCandidatureSchema),
  })

  const {
    mutateAsync: getCandidatureByIdFn,
    isPending: isPendingGetCandidature,
    isError: isErrorGetCandidature,
  } = useMutation({
    mutationFn: getCandidatureById,
  })

  async function handleGetCandidature(candidatureId: string) {
    try {
      const response = await getCandidatureByIdFn(candidatureId)

      return setCandidature(response.candidature)
    } catch {
      return toast.error('Erro ao buscar candidatura.', {
        position: 'top-center',
      })
    }
  }

  const { mutateAsync: updateStatusCandidatureFn, isError } = useMutation({
    mutationFn: updateStatusCandidature,
  })

  if (isErrorGetCandidature) {
    toast.error('Erro ao buscar candidatura', {
      position: 'top-center',
    })
    return redirect('/dashboard')
  }

  async function handleUpdateStatusCandidature({
    status,
  }: UpdateStatusCandidatureSchema) {
    if (!candidature) {
      return toast.warn('Candidatura não existe.', {
        position: 'top-right',
      })
    }

    try {
      await updateStatusCandidatureFn({
        status,
        candidatureId: candidature.id,
      })
      return toast.success('Status alterado com sucesso.', {
        position: 'top-center',
      })
    } catch {
      return toast.error('Erro ao buscar candidatura.', {
        position: 'top-center',
      })
    }
  }

  if (isError) {
    toast.error('Erro ao atualizar status', {
      position: 'top-center',
    })
    return redirect('/dashboard')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="mt-4 flex h-7 border-b border-violet-700 text-violet-800 hover:bg-violet-500 hover:text-white"
          disabled={isPendingGetCandidature}
          onClick={() => handleGetCandidature(param)}
        >
          Atualizar status
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-screen animate-slideDownAndFade overflow-y-auto lg:max-w-2xl">
        <div className="mb-3 flex w-full flex-col items-center justify-center rounded-md font-mirza text-2xl font-bold text-violet-500">
          <span className="-ml-4">
            E<span className="text-base font-normal">asy</span>
          </span>
          <span className="-mr-2 -mt-4">
            W<span className="text-base font-normal">ork</span>
          </span>
        </div>
        <DialogHeader className="mb-1 divide-y divide-dashed divide-violet-500">
          <DialogTitle className="flex flex-col items-center justify-center divide-y divide-zinc-800 text-xl">
            {candidature && (
              <form
                onSubmit={handleSubmit(handleUpdateStatusCandidature)}
                className="w-[80%]"
              >
                <div className="flex w-full flex-col gap-2 pt-5 text-sm text-zinc-800">
                  <label
                    htmlFor="status"
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Novo status
                  </label>
                  <Textarea
                    id="status"
                    maxLength={500}
                    defaultValue={candidature.status}
                    {...register('status')}
                  />
                  {errors.status && (
                    <span className="text-sm font-semibold text-red-800">
                      {errors.status.message}
                    </span>
                  )}
                </div>

                <footer className="flex items-center justify-end gap-12 pt-5">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-green-400 py-1 text-sm font-semibold text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-950/40"
                    disabled={isSubmitting}
                  >
                    Salvar
                  </button>
                </footer>
              </form>
            )}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
