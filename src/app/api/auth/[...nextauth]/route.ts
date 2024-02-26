import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { api } from '../../axios'
import { getToken } from 'next-auth/jwt'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'exemplo@email.com',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'Mínimo 6 caracteres',
        },
      },
      async authorize(credentials) {
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        }

        const response = await api.post('/sessions', data, {
          headers: { 'Content-Type': 'application/json' },
        })
        const user = {
          ...response.data.user,
          access_token: response.data.access_token,
        }

        if (user) {
          return user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 2, // 2 days
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
