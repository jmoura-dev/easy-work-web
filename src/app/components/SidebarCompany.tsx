'use client'

import {
  AlignJustify,
  Computer,
  Home,
  Plus,
  Search,
  User,
  WalletCards,
  X,
} from 'lucide-react'
import { NavItem } from './SidebarDeveloper/NavItem'
import { Profile } from './SidebarDeveloper/Profile'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/app/components/ui/collapsible'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { getCompanyDetails } from '@/data/companies'

export function SidebarCompany() {
  const [isOpen, setIsOpen] = useState(true)

  const { data: company, isError } = useQuery({
    queryKey: ['getCompany'],
    queryFn: getCompanyDetails,
  })

  if (isError) {
    alert('Erro ao carregar perfil')
    return redirect('/signIn')
  }

  if (!company) {
    return null
  }

  const { companyWithDetails } = company

  function toggle() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <Collapsible className="fixed left-0 right-0 top-0 z-20 flex flex-col bg-violet-50 p-4 data-[state=open]:bottom-0 lg:bottom-0 lg:right-auto lg:h-auto lg:w-80 lg:border-r">
      <div className="flex items-center justify-between border-b border-zinc-400 pb-6 lg:mb-8">
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
          className="rounded-md p-1 text-zinc-700 hover:bg-zinc-300 lg:hidden"
          onClick={toggle}
        >
          {isOpen ? (
            <AlignJustify className="h-6 w-6 animate-slideDownAndFade font-semibold text-zinc-600" />
          ) : (
            <X className="h-6 w-6 animate-slideDownAndFade font-semibold text-zinc-600" />
          )}
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent
        forceMount
        className="flex flex-1 animate-slideDownAndFade flex-col data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <nav className="flex flex-col">
          <div className="mb-6 ml-3 mt-5 w-14 text-lg font-bold text-zinc-600 lg:mb-2" />
          <NavItem href="/" icon={Home} title="Início" />
          <NavItem
            href="/find-developer"
            icon={Search}
            title="Buscar talento"
          />
          <NavItem href="/my-jobs" icon={WalletCards} title="Minhas vagas" />
          <NavItem href="/profile" icon={User} title="Perfil" />
        </nav>

        <div className="mt-auto flex flex-col">
          <NavItem href="/newJob" icon={Plus} title="Criar nova vaga" />
          <Profile
            name={
              companyWithDetails.userName.charAt(0).toUpperCase() +
              companyWithDetails.userName.slice(1)
            }
            role="Empresa"
            avatarUrl={
              companyWithDetails.avatarUrl
                ? `${process.env.URL_DOMAIN}/${companyWithDetails.avatarUrl}`
                : undefined
            }
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
