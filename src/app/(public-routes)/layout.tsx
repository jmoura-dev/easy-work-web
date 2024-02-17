import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function PublicLayoutProps({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)

  if (session) {
    if (session.user.developerId) {
      redirect('/developers')
    }

    if (session.user.companyId) {
      redirect('/companies')
    }
  }

  return <>{children}</>
}
