import { PrismaAdapter } from '@/lib/adapters/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";

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
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile: (profile: GithubProfile) => {
        return {
          id: profile.id.toString(),
          name: profile.name ?? '',
          email: profile.email,
          avatar_url: profile.avatar_url,
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
