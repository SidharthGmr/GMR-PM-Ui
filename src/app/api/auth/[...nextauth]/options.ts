import config from '@/config';
import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { UserDto } from '@/dtos/UserDto';
import { CreateUserModel } from '@/models/user.model';

const GOOGLE_ID = process.env.GOOGLE_ID || process.env.NEXT_PUBLIC_GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || process.env.NEXT_PUBLIC_GOOGLE_SECRET;

if (!GOOGLE_ID || !GOOGLE_SECRET) {
  throw new Error('Please define the GOOGLE_ID and GOOGLE_SECRET environment variables inside .env');
}


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: '',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const loginUrl: string = `${config.apiBaseUrl}/auth/login`;

        try {
          const response = await axios.post(
            loginUrl,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                'content-type': 'application/json',
                clientId: config.clientId,
              },
              withCredentials: false,
            }
          );

          return response.data.data.user;

        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Invalid username or password');
          }
          return null;
        }
      },
    }),
  ],
  secret: `${process.env.NEXTAUTH_SECRET}`,
  // callbacks: {
  //   async jwt({ token, user }) { 
  //     if (user) {
  //       (token as any).user = user; 
  //       if ((user as any).token) {
  //         (token as any).token = (user as any).token;
  //       }
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) { 
  //     (session as any).user = (token as any).user ?? session.user; 
  //     (session as any).token = (token as any).token ?? null;
  //     return session;
  //   },

  // },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const p = profile as any;
        try {
          const response = await axios.post(
            `${config.apiBaseUrl}/auth/signup`,
            {
              email: p.email,
              firstName: p.given_name,
              lastName: p.family_name,
              googleId: p.sub,
              profileImage: p.picture,
              password: '',
            } satisfies CreateUserModel,
            {
              headers: {
                'content-type': 'application/json',
                clientId: config.clientId,
              },
            }
          );

          if (response.data?.data?.user) {
            Object.assign(user, response.data.data.user);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            if (status === 409) {
              // User already exists — fetch their data via login with googleId
              try {
                const loginRes = await axios.post(
                  `${config.apiBaseUrl}/auth/google-login`,  // or /auth/login with googleId
                  { googleId: p.sub, email: p.email },
                  {
                    headers: {
                      'content-type': 'application/json',
                      clientId: config.clientId,
                    },
                  }
                );
                if (loginRes.data?.data?.user) {
                  Object.assign(user, loginRes.data.data.user);
                }
              } catch {
                // Fallback: still allow sign-in with Google profile data only
              }
              return true;
            }

            // Log the real error for debugging — don't silently block
            console.error('Google register error:', error.response?.data);
            // Still return true so user isn't blocked; they just won't have a backend token
            return true;
          }
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token = { ...token, ...user };
      }
      if (account?.provider === 'google' && profile) {
        token.picture = (profile as any).picture;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token as unknown as UserDto;
      session.user.profileImageUrl = token.picture as string; // expose to session
      return session;
    },
  },
  session: { strategy: 'jwt' },
  events: {
    async signOut() { },
  },
  // Enable debug messages in the console if you are having problems
  debug: config.enviroment !== 'production',
  pages: {
    signIn: '/',
  },
};
