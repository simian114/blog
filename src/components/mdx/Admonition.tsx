import {
  AlertTriangleIcon,
  InfoIcon,
  RocketIcon,
  SkullIcon,
} from "lucide-react"

import Typography from "../typography/Typography"

type AdmonitionType = "tip" | "info" | "danger" | "caution" | "note"

type AdmonitionProps = React.HTMLProps<HTMLDivElement> & {
  type: AdmonitionType
}

export default function Admonition(props: AdmonitionProps) {
  const { children, type, ...rest } = props
  const Icon =
    type === "caution"
      ? AlertTriangleIcon
      : type === "info"
      ? InfoIcon
      : type === "tip"
      ? RocketIcon
      : SkullIcon

  return (
    <div className={`mdx-admonition mdx-admonition--${type}`} {...rest}>
      <div className="mdx-admonition__icon">
        <Icon />
        <Typography weight="bold" as="span" colorType="GRAY" colorLevel={12}>
          {type.toUpperCase()}
        </Typography>
      </div>
      <div className="mdx-admonition__content">{children}</div>
    </div>
  )
}
