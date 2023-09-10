import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "id", type: "text", placeholder: "admin id" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const id = req.body?.id
        const password = req.body?.password
        if (
          process.env.ADMIN_ID !== id ||
          process.env.ADMIN_PASSWORD !== password
        ) {
          return null
        }
        const user = {
          id,
          password,
          name: "admin",
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 14,
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    redirect(params) {
      return params.baseUrl + "/admin"
    },
    session(params) {
      const { session, token } = params
      session.user.id = token.id
      return session
    },
    jwt(params) {
      const { token, account, user } = params
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
