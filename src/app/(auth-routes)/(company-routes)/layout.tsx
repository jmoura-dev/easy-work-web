import { nextAuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function CompanyLayoutProps({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  if (session && !session.user.companyId) {
    redirect('/dashboard')
  }

  return <>{children}</>
}
