import { HTMLAttributes, ReactNode } from "react"
import { LinkProps } from "next/link"

export interface ButtonLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {
  children: ReactNode
  design?: DesignProps
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  design?: DesignProps
}

export interface DesignProps {
  color?: "primary" | "secondary" | "tertiary"
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge"
  style?: "default" | "secondary" | "tertiary"
  weight?: "regular" | "medium" | "bold"
}
