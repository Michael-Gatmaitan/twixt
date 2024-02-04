import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "lucide-react";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username: ",
          type: "text",
          placeholder: "Ypur username hehe",
        },
        password: {
          label: "Password: ",
          type: "password",
          placeholder: "Input password here hehe",
        },
      },

      async authorize(credentials) {
        // Retrieve user data

        const user = {
          id: "42",
          name: "MichaelGatmaitan",
          password: "michealzamora",
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        }

        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: '/signin'
  // }
};
