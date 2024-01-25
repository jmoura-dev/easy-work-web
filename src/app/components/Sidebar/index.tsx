'use client'

import {
  AlignJustify,
  Bell,
  Briefcase,
  Computer,
  Home,
  Settings,
  User,
  WalletCards,
  X,
} from 'lucide-react'
import { NavItem } from './NavItem'
import { Profile } from './Profile'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/app/components/ui/collapsible'
import { useState } from 'react'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  function toggle() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <Collapsible className="fixed left-0 right-0 top-0 z-20 flex flex-col p-4 bg-violet-50 data-[state=open]:bottom-0 lg:bottom-0 lg:right-auto lg:h-auto lg:w-80 lg:border-r">
      <div className="mb-8 flex items-center justify-between border-b border-zinc-400 pb-6">
        <div className="flex items-center gap-2">
          <Computer className="h-10 w-8 rounded bg-zinc-200 px-1 text-zinc-700" />
          <div>
            <h2 className="text-lg font-bold text-zinc-700 ">Easy-work</h2>
            <p className="text-sm font-semibold text-zinc-800">
              Encontre sua vaga
            </p>
          </div>
        </div>
        <CollapsibleTrigger
          asChild
          className="rounded-md p-1 text-zinc-700 hover:bg-zinc-300 lg:hidden"
          onClick={toggle}
        >
          {isOpen ? (
            <AlignJustify className="h-6 w-6 font-semibold text-zinc-600" />
          ) : (
            <X className="h-6 w-6 font-semibold text-zinc-600" />
          )}
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent
        forceMount
        className="flex flex-1 flex-col data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <nav className="flex flex-col">
          <h2 className="mb-6 ml-3 w-14 border-b border-zinc-500 text-lg font-bold text-zinc-600">
            Menu
          </h2>
          <NavItem icon={Home} title="Início" />
          <NavItem icon={Briefcase} title="Vagas" />
          <NavItem icon={WalletCards} title="Minhas candidaturas" />
          <NavItem icon={Bell} title="Notificações" />
          <NavItem icon={User} title="Perfil" />
        </nav>

        <div className="mt-auto flex flex-col">
          <NavItem icon={Settings} title="Configurações" />
          <Profile name="Jackson Moura" email="jackson@email.com" />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
