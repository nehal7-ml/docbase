"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Links } from "@/components/links"

import { useSupabase } from "../supabase-provider"

export default function LinksPage() {
  const { supabase } = useSupabase()
  const [allLinks, setAllLinks] = useState<any>(null)

  useEffect(() => {
    getLinks()
  }, [])

  async function deleteLink(linkId: string) {
    const { error } = await supabase.from("links").delete().eq("id", linkId)
    if (error) {
      console.log(error)
    }
    toast({
      description: "Your link has been deleted",
    })
    getLinks()
  }
  async function getLinks() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const { data: links, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", session?.user.id)
    setAllLinks(links)
  }
  return (
    <div className="flex flex-col items-center py-2 pt-20">
      <h1 className="mb-4 text-4xl font-bold">Your Links</h1>
      <div className="w-half">
        <Links allLinks={allLinks} onDeleteLink={deleteLink} />
      </div>
      <div className="mt-4">
        <Link href="/new">
          <Button
            className="w-full rounded bg-[#9FACE6] px-4 py-2 font-bold text-white"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Link
          </Button>
        </Link>
      </div>
    </div>
  )
}
