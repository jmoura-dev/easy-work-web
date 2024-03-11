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
import { useQuery } from '@tanstack/react-query'
import { getDeveloperDetails } from '@/data/developers'
import { redirect } from 'next/navigation'
import { SkeletonJobs } from '../SkeletonJobs'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const {
    data: developer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getDeveloper'],
    queryFn: getDeveloperDetails,
  })

  if (isLoading) {
    return <SkeletonJobs />
  }

  if (isError) {
    alert('Erro ao carregar perfil')
    return redirect('/signIn')
  }

  if (!developer) {
    return null
  }

  const { developerWithDetails } = developer

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
          <h2 className="mb-6 ml-3 mt-5 w-14 border-b border-zinc-500 text-lg font-bold text-zinc-600">
            Menu
          </h2>
          <NavItem href="/" icon={Home} title="Início" />
          <NavItem href="/jobs" icon={Briefcase} title="Vagas" />
          <NavItem
            href="/candidatures"
            icon={WalletCards}
            title="Minhas candidaturas"
          />
          <NavItem href="/notifications" icon={Bell} title="Notificações" />
          <NavItem href="/profile" icon={User} title="Perfil" />
        </nav>

        <div className="mt-auto flex flex-col">
          <NavItem href="/" icon={Settings} title="Configurações" />
          <Profile
            name={
              developerWithDetails.userName.charAt(0).toUpperCase() +
              developerWithDetails.userName.slice(1)
            }
            occupation_area={
              developerWithDetails.occupation_area.charAt(0).toUpperCase() +
              developerWithDetails.occupation_area.slice(1)
            }
            avatarUrl={
              developerWithDetails.avatarUrl
                ? `${process.env.URL_DOMAIN}/${developerWithDetails.avatarUrl}`
                : undefined
            }
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
