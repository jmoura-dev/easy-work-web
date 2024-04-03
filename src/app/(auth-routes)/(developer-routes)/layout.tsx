import { nextAuthOptions } from '@/app/api/auth/'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function DeveloperLayoutProps({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  if (session && !session.user.developerId) {
    redirect('/dashboard')
  }

  return <>{children}</>
}
