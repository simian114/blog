import Link from "next/link"
import { GitHubLogoIcon, RocketIcon } from "@radix-ui/react-icons"

const LINKS = [
  {
    href: "https://github.com/simian114",
    children: <GitHubLogoIcon width={20} height={20} />,
    target: "_blank",
  },
  {
    href: "https://recketman.vercel.app",
    children: <RocketIcon width={20} height={20} />,
    target: "_blank",
  },
]

export default function Footer() {
  return (
    <footer className="footer inner">
      <div className="footer__spacer" />
      <div className="footer__contents">
        <div className="footer__contents__links">
          {LINKS.map(link => (
            <Link key={link.href} {...link} />
          ))}
        </div>
        <div className="footer__contents__text">
          <span>
            Developed By <strong>Rocketman</strong>
          </span>
        </div>
      </div>
    </footer>
  )
}
