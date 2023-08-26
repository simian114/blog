import { GitHubLogoIcon, RocketIcon } from "@radix-ui/react-icons"

import IconButtonLink from "../button/IconButtonLink"
import Typography from "../typography/Typography"

const LINKS = [
  {
    href: "https://github.com/simian114",
    children: <GitHubLogoIcon width={20} height={20} color="white" />,
    target: "_blank",
  },
  {
    href: "https://recketman.vercel.app",
    children: <RocketIcon width={20} height={20} color="white" />,
    target: "_blank",
  },
]

export default function Footer() {
  return (
    <footer className="footer inner">
      <div className="footer__spacer" />
      <div className="footer__contents">
        <div className="footer__link-container">
          <>
            {LINKS.map(link => (
              <IconButtonLink
                design={{ size: "small" }}
                key={link.href}
                target={link.target}
                href={link.href}
                className="footer__link"
              >
                {link.children}
              </IconButtonLink>
            ))}
          </>
        </div>
        <Typography as="p" variants="body1">
          Developed By
          <Typography as="strong" variants="body1" weight="bold">
            {" "}
            Rocketman
          </Typography>
        </Typography>
      </div>
    </footer>
  )
}
