import { DefaultSession, DefaultUser } from "next-auth";

// Extend the NextAuth `User` type
declare module "next-auth" {
  interface User {
    token: string; // Add token to the user object
  }

  // Extend the NextAuth `Session` type
  interface Session {
    accessToken: string; // Add accessToken to the session
  }
}
