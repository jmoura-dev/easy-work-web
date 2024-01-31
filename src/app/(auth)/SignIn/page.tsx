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

export default function SignIn() {
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
    <div className="flex flex-col gap-5 px-8 py-8">
      <div className="flex flex-col font-mirza text-2xl font-semibold text-violet-500">
        <span>Easy</span>
        <span className="-mt-4 ml-3">Work</span>
      </div>

      <h1 className="mt-8 font-mirza text-3xl font-semibold text-zinc-800">
        Registre-se como cliente ou desenvolvedor
      </h1>

      <ToggleGroup type="single" className="flex flex-col gap-5">
        <motion.div
          className="w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <ToggleGroupItem
            value="client"
            className="flex min-h-24 w-full flex-1 flex-col gap-2 border border-zinc-600/30 px-2 py-2 hover:bg-violet-50 data-[state=on]:border-violet-900 data-[state=on]:bg-violet-100"
            onClick={handleSelectClient}
          >
            <div className="flex w-full justify-between ">
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
          className="w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <ToggleGroupItem
            value="developer"
            className="flex min-h-24 w-full flex-1 flex-col gap-2 border border-zinc-600/30 px-2 py-2 hover:bg-violet-50 data-[state=on]:border-violet-900 data-[state=on]:bg-violet-100"
            onClick={handleSelectDeveloper}
          >
            <div className="flex w-full justify-between ">
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

      <button
        type="button"
        className="mt-5 rounded-lg bg-green-500 p-2 font-semibold text-zinc-100 hover:bg-green-400"
      >
        Criar uma conta
      </button>
      <div className="flex justify-center gap-2">
        <span className="text-zinc-700">já possui uma conta?</span>
        <a
          href=""
          className="font-semibold text-green-800 hover:text-green-700"
        >
          Conecte-se
        </a>
      </div>
    </div>
  )
}
