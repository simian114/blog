import Link from "next/link"

export default function AdminFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://github.com/simian114"
            target="_blank"
          >
            sanam
          </Link>
          . The source code is available on{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://github.com/simian114/blog"
            target="_blank"
          >
            Github
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
