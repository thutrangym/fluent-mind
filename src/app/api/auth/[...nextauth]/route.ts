// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/src/lib/prisma";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("Login attempt:", credentials);

//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email.trim().toLowerCase(),
//           },
//         });

//         if (!user) {
//           console.log("User not found");
//           return null;
//         }

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           console.log("Invalid password");
//           return null;
//         }

//         console.log("Login success");

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user = {
//   ...session.user,
//   role: token.role,
// };
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };
import NextAuth from "next-auth"
import { authOptions } from "@/src/lib/auth-options"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }