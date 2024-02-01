'use client'

import {
  Briefcase,
  ChevronDownCircle,
  CircleDashed,
  Laptop,
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group'
import Link from 'next/link'

export default function SignUp() {
  const [buttonValue, setButtonValue] = useState('')

  console.log(buttonValue)

  function handleSelectClient() {
    if (buttonValue === 'client') {
      setButtonValue('')
    } else {
      setButtonValue('client')
    }
  }

  function handleSelectDeveloper() {
    if (buttonValue === 'developer') {
      setButtonValue('')
    } else {
      setButtonValue('developer')
    }
  }

  return (
    <div className="m-auto flex h-screen max-w-5xl flex-col gap-5 px-8 py-8 md:gap-10">
      <div className="flex flex-col font-mirza text-2xl font-semibold text-violet-500">
        <span>Easy</span>
        <span className="-mt-4 ml-3">Work</span>
      </div>

      <h1 className="mt-8 font-mirza text-3xl font-semibold text-zinc-800">
        Registre-se como cliente ou desenvolvedor
      </h1>

      <ToggleGroup type="single" className="flex flex-col gap-5 md:flex-row">
        <motion.div
          className="w-full md:mr-7 md:flex md:h-56 md:w-56"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <ToggleGroupItem
            value="client"
            className="flex min-h-24 w-full flex-1 flex-col gap-2 border border-zinc-600/30 px-2 py-2 hover:bg-violet-50 data-[state=on]:border-violet-900 data-[state=on]:bg-violet-100 md:h-full md:p-4"
            onClick={handleSelectClient}
          >
            <div className="flex h-screen w-full justify-between">
              <Briefcase className="h-6 w-6 text-zinc-700" />
              {buttonValue === 'client' ? (
                <ChevronDownCircle
                  className="h-6 w-6 rounded-full text-violet-900"
                  fill="rgb(139 92 246)"
                />
              ) : (
                <CircleDashed className="h-6 w-6 text-zinc-700" />
              )}
            </div>
            <p className="text-base font-semibold text-zinc-800">
              Sou cliente, buscando desenvolvedores.
            </p>
          </ToggleGroupItem>
        </motion.div>

        <motion.div
          className="w-full md:ml-7 md:flex md:h-56 md:w-56"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <ToggleGroupItem
            value="developer"
            className="flex min-h-24 w-full flex-1 flex-col gap-2 border border-zinc-600/30 px-2 py-2 hover:bg-violet-50 data-[state=on]:border-violet-900 data-[state=on]:bg-violet-100 md:m-auto md:flex md:h-56 md:w-56 md:p-4"
            onClick={handleSelectDeveloper}
          >
            <div className="flex h-screen w-full justify-between ">
              <Laptop className="h-6 w-6 text-zinc-700" />
              {buttonValue === 'developer' ? (
                <ChevronDownCircle
                  className="h-6 w-6 rounded-full text-violet-900"
                  fill="rgb(139 92 246)"
                />
              ) : (
                <CircleDashed className="h-6 w-6 text-zinc-700" />
              )}
            </div>
            <p className="text-base font-semibold text-zinc-800">
              Sou desenvolvedor, buscando trabalho.
            </p>
          </ToggleGroupItem>
        </motion.div>
      </ToggleGroup>

      <Link
        href={`/signUp/${buttonValue}`}
        className="mx-auto mt-5 w-full rounded-lg md:w-48 md:rounded-2xl"
      >
        <button
          type="button"
          className="mx-auto w-full rounded-lg bg-green-500 p-2 font-semibold text-zinc-100 hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-green-900/40 md:w-48 md:rounded-2xl"
          disabled={buttonValue === ''}
        >
          Criar uma conta
        </button>
      </Link>
      <div className="flex justify-center gap-2">
        <span className="text-zinc-700">já possui uma conta?</span>
        <Link
          href="/signIn"
          className="font-semibold text-green-800 hover:text-green-700"
        >
          Conecte-se
        </Link>
      </div>
    </div>
  )
}
