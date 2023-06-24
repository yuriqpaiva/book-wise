import { PrismaAdapter } from '@/lib/adapters/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

const handler = NextAuth({
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile: (profile: GoogleProfile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    })
  ],
  callbacks: {
    async redirect({baseUrl}) {
      return baseUrl;
    }
  }
});

export { handler as GET, handler as POST };
