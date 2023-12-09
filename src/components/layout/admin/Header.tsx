import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { HomeIcon } from "lucide-react"

import RevalidateButton from "@/components/admin/RevalidateButton"
import SignoutButton from "@/components/admin/SignoutButton"
import IconButtonLink from "@/components/button/IconButtonLink"

export default function AdminHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <IconButtonLink href="/admin">
            <HomeIcon width={20} height={20} />
          </IconButtonLink>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex flex-items-center">
            <RevalidateButton />
            <SignoutButton />
            <IconButtonLink
              href="https://github.com/simian114/blog"
              target="_blank"
            >
              <GitHubLogoIcon width={20} height={20} />
            </IconButtonLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
