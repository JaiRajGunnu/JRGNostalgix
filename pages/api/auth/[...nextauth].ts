// import NextAuth, { SessionStrategy } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/mongodb";
// import User from "@/models/User";

// export const authOptions = {
//   session: {
//     strategy: "jwt" as SessionStrategy,
//   },
//   callbacks: {
//     async session({ session, token }: { session: any; token: any }) {
//       if (session.user) {
//         session.user.id = token.id as string; // Add `id` to session
//       }
//       return session;
//     },
//     async jwt({ token, user }: { token: any; user?: any }) {
//       if (user) {
//         token.id = user.id; // Store `id` inside token
//       }
//       return token;
//     },
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           throw new Error("No credentials provided");
//         }
//         await dbConnect();
//         const user = await User.findOne({ email: credentials.email });

//         if (user && credentials.password === user.password) {
//           return { id: user._id, name: user.name, email: user.email };
//         }
//         throw new Error("Invalid credentials");
//       },
//     }),
//   ],
// };

// export default NextAuth(authOptions);
