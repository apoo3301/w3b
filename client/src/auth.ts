import { getTwoFactorConfirmationByUserId } from "~/data/two-factor-confirmation";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getAccountByUserId } from "~/data/account";
import { getUserById } from "~/data/user";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { db } from "~/data/db";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // async authorized({ auth, request }) {
    //   console.log("callback: authorized");
    //   console.log("auth", auth);
    //   console.log("request", request);
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   console.log("callback: redirect");
    //   console.log("url", url);
    //   console.log("baseUrl", baseUrl);
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
    async signIn({ user, account }) {
      console.log("callback: signIn");
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async jwt({ token, user, profile, trigger }) {
      console.log("callback: jwt");
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.isOAuth = !!existingAccount;

      // console.log({ "jwt token": token });
      return token;
    },
    async session({ token, session }) {
      console.log("callback: session");
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.role) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth;
      }

      return session;
    },
  },
});

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
