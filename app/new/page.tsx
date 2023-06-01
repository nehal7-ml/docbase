import { cookies, headers } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"

import LinkForm from "@/components/link-form"

export default async function Link({ params }: { params: { id: string } }) {
  const id = params.id
  const supabase = createServerComponentSupabaseClient({ cookies, headers })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user.id
  const {
    data: linkData,
    error: linkError,
    status: linkStatus,
  } = await supabase.from("links").select("*").eq("id", id).single()
  const {
    data: userData,
    error: userError,
    status: userStatus,
  } = await supabase.from("profiles").select("*").eq("id", user).single()

  return (
    <div className="flex min-h-screen flex-col items-center py-2 pt-20">
      <h1 className="mb-4 text-4xl font-bold">New Link</h1>
      <LinkForm link={linkData!} user={userData!} />
    </div>
  )
}
