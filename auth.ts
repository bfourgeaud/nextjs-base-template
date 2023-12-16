import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: { password: { label: "Password", type: "password" } },
      authorize(c) {
        if (c.password !== "1") return null;
        return {
          name: "Fill Murray",
          email: "bill@fillmurray.com",
          image: "https://api.dicebear.com/7.x/adventurer/png?backgroundType=gradientLinear&backgroundColor=c0aede,b6e3f4&size=64",
          id: "1",
        };
      },
    })
  ],
  callbacks: {
    authorized(params) {
      return !!params.auth?.user;
    },
  }
})