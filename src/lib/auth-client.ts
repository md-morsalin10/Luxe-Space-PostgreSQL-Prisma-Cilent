import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:5000"
})

export const { signIn, signUp, useSession, signOut } = authClient

// Example of how to use these in your components:
// const handleLogin = async (email, password) => {
//   await signIn.email({ email, password })
// }
//
// const handleRegister = async (name, email, password) => {
//   await signUp.email({ name, email, password })
// }