import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/app/components/Sidebar'

export default async function DashboardLayoutProps({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className="grid min-h-screen grid-rows-body justify-center bg-violet-50 lg:grid-cols-body">
      <Sidebar />
      <main className="row-start-2 min-h-screen overflow-x-hidden bg-violet-50 px-4 pb-12 pt-6 lg:col-start-2 lg:row-start-1">
        {children}
      </main>
    </div>
  )
}
