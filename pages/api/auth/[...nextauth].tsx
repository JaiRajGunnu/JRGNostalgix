// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text', placeholder: 'test@example.com' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         return null; // Disable default login
//       },
//     }),
//   ],
//   callbacks: {
//     session: async () => {
//       return null; // Prevent NextAuth from managing sessions
//     },
//   },
//   pages: {
//     signIn: '/auth/login', // Redirect login to your custom page
//   },
// });
