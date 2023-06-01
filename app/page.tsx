"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig, SiteConfig } from "@/config/site"

import { useSupabase } from "./supabase-provider"

export default async function IndexPage() {
  const { supabase } = useSupabase()

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_ROOT}/new`,
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto my-48 grow">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
              DocBase
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              The open-source alternative to DocSend
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              className="rounded-md px-8 py-4 text-base text-white"
              onClick={signInWithGoogle}
              style={{
                background: "linear-gradient(48deg, #74EBD5 0%, #9FACE6 100%)",
              }}
            >
              Get Started
            </Button>
            <Link href={siteConfig.links.github}
              className={buttonVariants({variant: "ghost"})}
            >
              View on Github
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center">
        {" "}
        <div className="mb-2 text-center">
          <p>
            Built with <span className="text-red-500">❤️</span> by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              Alana Goyal
            </a>{" "}
          </p>
        </div>
      </footer>
    </div>
  )
}
