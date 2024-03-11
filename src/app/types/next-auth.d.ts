import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string
      avatarId: string | null
      name: string
      email: string
      about?: string
      developerId: string | null
      companyId: string | null
      access_token: string
      role: string
    }
  }
}
