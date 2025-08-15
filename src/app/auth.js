import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../lib/prisma"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    adapter: PrismaAdapter(prisma),
    authorization:{
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    }
  })],
  callbacks: {
  async signIn({ account, profile }) {
    if (account.provider === "google") {
      return profile.email_verified; 
    }
    return true;
  },
  session:{
    strategy:"jwt",
    maxAge: 1 * 24 * 60 * 60
  }
}
})