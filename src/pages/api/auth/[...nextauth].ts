import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { query } from "faunadb";

import { faunadb } from "../../../services/faunadb";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user'
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        await faunadb.query(
          query.Create(
            query.Collection('users'),
            { data: { email } }
          )
        )

        return true;
      } catch {
        return false;
      }
    }
  }
})