import db from "@/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import * as schema from "@/drizzle/schema";
import { oauthVerifyEmailAction } from "@/actions/oauth-verify-email-action";
import Google from "next-auth/providers/google";

export const authConfig = {
    adapter: DrizzleAdapter(db, {
        accountsTable: schema.accounts,
        usersTable: schema.users,
        authenticatorsTable: schema.authenticators,
        sessionsTable: schema.sessions,
        verificationTokensTable: schema.verificationTokens
    }),
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/agency/auth/sign-in" },
    callbacks: {
        authorized({ auth, request }) {
            const { nextUrl } = request;
            const isLoggedIn = !!auth?.user;
            const isOnProfile = nextUrl.pathname.startsWith("/agency/profile");
            const isOnAuth = nextUrl.pathname.startsWith("/agency/auth");

            if (isOnProfile) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL("/agency/auth/sign-in", nextUrl));
            }
            if (isOnAuth) {
                if (!isLoggedIn) return true;
                return Response.redirect(new URL("/agency/profile", nextUrl));
            }

            return true;
        },
        jwt({ token, user, trigger, session}) {
            if (trigger == "update") {
                return { ...token, ...session.user };
            }
            if (user?.id) token.id = user.id;
            if (user?.role) token.role = user.role;
            return token;
        },
        session({ session, token}) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
        signIn({user, account, profile}) {
            if (account?.provider == "google") {
                return !!profile?.email_verified
            }
            if (account?.provider == "credentials") {
                if (user.emailVerified) {

                }
                return true;
            }
            return false;
        },
    },
    events: {
        async linkAccount({ user, account }) {
            if (['google'].includes(account.provider)) {
                if (user.email) await oauthVerifyEmailAction(user.email);
            }
        },
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
    ]
} satisfies NextAuthConfig;