"use client"

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import Image, { ImageProps } from "next/image"
import { ReactNode } from "react"
import AnchorText from "../components/mdx/AnchorText"

type MdxContentProps = {
  source: MDXRemoteSerializeResult
}
// NOTE: mdx 스타일링하기

/** Place your custom MDX components here */
const MdxComponents = {
  /** h1 colored in yellow */
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="mdx-h1" {...props} />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="mdx-h2" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="mdx-h3" {...props} />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="mdx-h4" {...props} />
  ),
  h5: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h5 className="mdx-h5" {...props} />
  ),
  h6: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h6 className="mdx-h6" {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="mdx-ul" {...props} />
  ),
  ol: (props: React.HTMLProps<HTMLOListElement>) => (
    <ol className="mdx-ol" {...props} type="1" />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="mdx-li" {...props} />
  ),
  em: (props: React.HTMLProps<HTMLElement>) => (
    <em className="mdx-em" {...props} />
  ),
  strong: (props: React.HTMLProps<HTMLSpanElement>) => (
    <strong className="mdx-strong" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="mdx-p" {...props} />
  ),
  // NOTE:  스타일링 다시 해야함
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a className="mdx-a" {...props} target="_blank" />
  ),
  // NOTE: 참고 https://jonathanmh.com/p/syntax-highlighting-with-mdx-in-next-js/
  // NOTE: code / pre
  code: (props: React.HTMLProps<HTMLElement>) => (
    <code className="mdx-code" {...props} />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre className="mdx-pre" {...props} />
  ),
  img: (props: React.HTMLProps<HTMLImageElement>) => (
    <img className="mdx-img" {...props} />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="mdx-blockquote" {...props} />
  ),
  hr: (props: React.HTMLProps<HTMLHRElement>) => (
    <hr className="mdx-hr" {...props} />
  ),
  /** Custom component */
  AnchorH1: ({ children, href }: { children: ReactNode; href: string }) => {
    return (
      <AnchorText as="h1" className="mdx-h1" href={href}>
        {children}
      </AnchorText>
    )
  },
  AnchorH2: ({ children, href }: { children: ReactNode; href: string }) => {
    return (
      <AnchorText as="h2" className="mdx-h2" href={href}>
        {children}
      </AnchorText>
    )
  },

  Image: (props: ImageProps) => {
    return (
      <div style={{ position: "relative" }}>
        <Image {...props} fill style={{ objectFit: "cover" }} alt="" />
      </div>
    )
  },
  Card: (props: React.HTMLProps<HTMLDivElement>) => (
    <div
      style={{
        background: "#333",
        borderRadius: "0.25rem",
        padding: "0.5rem 1rem",
      }}
      {...props}
    />
  ),
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="">
      <MDXRemote {...source} components={MdxComponents} />
    </div>
  )
}
