import { useEffect, useState } from "react"
import { cookies, headers } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Activity, Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Viewers } from "@/components/viewers"
import { useSupabase } from "@/app/supabase-provider"

export default async function Analytics({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id

  const supabase = createServerComponentSupabaseClient({ cookies, headers })

  const { data: viewers } = await supabase
    .from("viewers")
    .select("*")
    .eq("link_id", id)

  const allViewers = viewers?.length

  const { data: uniqueEmails } = await supabase
    .from("viewers")
    .select("email", { count: "exact" })
    .eq("link_id", id)

  const uniqueViewers = uniqueEmails?.length

  const { data: allViews } = await supabase
    .from("viewers")
    .select("email, viewed_at")
    .eq("link_id", id)

  return (
    <div className="flex min-h-screen flex-col items-center py-2 pt-20">
      <h1 className="mb-4 text-4xl font-bold">Your Views</h1>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="pr-4 text-sm font-medium">
                    Total Views
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{allViewers}</div>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="pr-4 text-sm font-medium">
                    Unique Views
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{uniqueViewers}</div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Recent Views</CardTitle>
                <CardDescription>
                  More information about your {allViewers} views
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Viewers allViews={allViews} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
