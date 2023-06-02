import { cookies, headers } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"

import AccountForm from "@/components/account"

export default async function Account() {
  const supabase = createServerComponentSupabaseClient({ cookies, headers })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user.id
  const {
    data: userData,
    error,
    status,
  } = await supabase.from("profiles").select("*").eq("id", user).single()
  const name = userData?.full_name
  const email = userData?.email

  return (
    <div className="flex min-h-screen flex-col items-center py-2 pt-20">
      <h1 className="mb-4 text-4xl font-bold">Your Account</h1>
      <AccountForm user={user!} name={name!} email={email!} />
    </div>
  )
}
