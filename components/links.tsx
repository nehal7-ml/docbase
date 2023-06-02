import Link from "next/link"
import { Activity, Copy, Eye, Trash } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { toast } from "./ui/use-toast"

export function Links({
  allLinks,
  onDeleteLink,
}: {
  allLinks: any
  onDeleteLink: (linkId: string) => void
}) {
  const handleCopyLink = (linkId: string) => {
    const link = `${process.env.NEXT_PUBLIC_SUPABASE_ROOT}/view/${linkId}`
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          description: "Your link has been copied",
        })
      })
      .catch((error) => {
        toast({
          description: "There was an error copying your link",
        })
      })
  }
  return (
    <div>
      {allLinks &&
        allLinks.map((link: any) => (
          <div className="flex items-center py-2" key={link.id}>
            <div className="ml-4 flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {link.filename}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(link.created_at).toLocaleString("en-US")}
              </p>
            </div>
            <div>
              <Link href={`/analytics/${link.id}`}>
                {" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Activity className="ml-4 h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>View Analytics</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </div>
            <div>
              {" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Copy
                      className="ml-4 h-4 w-4 text-muted-foreground"
                      onClick={() => handleCopyLink(link.id)}
                      style={{ cursor: "pointer" }}
                    />{" "}
                  </TooltipTrigger>
                  <TooltipContent>Copy Link</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Trash
                      className="ml-4 h-4 w-4 text-muted-foreground"
                      onClick={() => onDeleteLink(link.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>Delete Link</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
    </div>
  )
}
