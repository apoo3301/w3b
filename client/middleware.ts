import NextAuth from "next-auth";
import {authConfig } from "./auth.config";
// import { NextRequest } from "next/server";

 export default NextAuth(authConfig).auth

export const config = {
  matcher: [
    /*
      * Match all request paths except for the ones starting with:
      * - api (API routes)
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico (favicon file)
      */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

// type NextAuthRequest = NextRequest & { auth: Session | null }

// const auth = NextAuth(authConfig).auth;

// export default auth((request: NextAuthRequest) => {
//   const { auth, nextUrl } = request;
//   const isLoggedIn = !!auth?.user;
//   const isOnProfile = nextUrl.pathname.startsWith("/agency/profile");
//   const isOnAuth = nextUrl.pathname.startsWith("/agency/auth");

//   if (isOnProfile) {
//       if (isLoggedIn) return;
//       return Response.redirect(new URL("/agency/auth/sign-in", nextUrl));
//   }
//   if (isOnAuth) {
//       if (!isLoggedIn) return;
//       return Response.redirect(new URL("/agency/profile", nextUrl));
//   }

//   return;
// });

