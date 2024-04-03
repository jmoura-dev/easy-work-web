import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { SidebarDeveloper } from '@/app/components/SidebarDeveloper'
import { SidebarCompany } from '../components/SidebarCompany'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth/]/route'

export default async function DashboardLayoutProps({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  const role = session.user.role

  return (
    <div className="grid min-h-screen grid-rows-body bg-violet-50 lg:grid-cols-body">
      {role === 'developer' ? <SidebarDeveloper /> : <SidebarCompany />}
      <main className="row-start-2 min-h-screen overflow-x-hidden bg-violet-50 px-4 pb-12 pt-6 lg:col-start-2 lg:row-start-1">
        {children}
      </main>
    </div>
  )
}
