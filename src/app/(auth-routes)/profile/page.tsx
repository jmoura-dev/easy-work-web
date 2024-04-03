import { nextAuthOptions } from '@/app/api/auth/'
import { CompanyProfile } from '@/app/components/CompanyProfile'
import { DeveloperProfile } from '@/app/components/DeveloperProfile'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Profile() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/signIn')
  }

  const userRole = session.user.role

  return (
    <>{userRole === 'developer' ? <DeveloperProfile /> : <CompanyProfile />}</>
  )
}
