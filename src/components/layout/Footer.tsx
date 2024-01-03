import { GitHubLogoIcon, RocketIcon } from "@radix-ui/react-icons"

import { fetchRouteList } from "@/helpers/data/route"

import IconButtonLink from "../button/IconButtonLink"
import Typography from "../typography/Typography"

const LINKS = [
  {
    href: "https://github.com/simian114",
    children: <GitHubLogoIcon width={20} height={20} color="gray" />,
    target: "_blank",
  },
  {
    href: "https://recketman.vercel.app",
    children: <RocketIcon width={20} height={20} color="gray" />,
    target: "_blank",
  },
]
async function getData() {
  const routes = await fetchRouteList({
    include: { categories: true },
    where: {
      deletedAt: null,
      open: true,
      NOT: { url: "" },
    },
    orderBy: { priority: "asc" },
  })
  return { routes }
}

export default async function Footer() {
  const { routes } = await getData()
  return (
    <footer className="footer inner">
      <div className="footer__spacer" />
      <ul className="footer__contents">
        {routes.map(route => {
          if (!route.categories.length) {
            return
          }
          return (
            <li key={route.id} className="footer__bespoke-router">
              <Typography
                as={"a"}
                href={`/${route.url}`}
                variants="body1"
                weight="bold"
                colorType="GRAY"
              >
                {route.title}
              </Typography>
              <ul className="footer__bespoke-category-container">
                {route.categories.map((category, index) => (
                  <li
                    key={category.id}
                    className={`footer__bespoke-category ${
                      index !== route.categories.length - 1
                        ? "footer__bespoke-category--bar"
                        : ""
                    } `}
                  >
                    <Typography
                      as={"a"}
                      href={`/${route.url}/${category.url}`}
                      variants="body2"
                      weight="medium"
                    >
                      {category.title}
                    </Typography>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
      <div className="footer__developer">
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
          Developed By&nbsp;
          <Typography as="strong" variants="body1" weight="bold">
            Rocketman
          </Typography>
        </Typography>
      </div>
    </footer>
  )
}
