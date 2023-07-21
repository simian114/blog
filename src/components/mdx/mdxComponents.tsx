import AnchorText from "./AnchorText"

const MdxComponents = {
  /** h1 colored in yellow */
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <AnchorText as="h1" className="mdx-h1">
      {props.children as string}
    </AnchorText>
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <AnchorText as="h2" className="mdx-h2">
      {props.children as string}
    </AnchorText>
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <AnchorText as="h3" className="mdx-h3">
      {props.children as string}
    </AnchorText>
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <AnchorText as="h4" className="mdx-h4">
      {props.children as string}
    </AnchorText>
  ),
  h5: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <AnchorText as="h5" className="mdx-h5">
      {props.children as string}
    </AnchorText>
  ),
  h6: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <AnchorText as="h6" className="mdx-h6">
      {props.children as string}
    </AnchorText>
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
  // TODO: codesand 로 사용하기
  pre: (props: React.HTMLProps<HTMLPreElement>) => {
    return <pre className="mdx-pre" {...props} />
  },
  img: (props: React.HTMLProps<HTMLImageElement>) => (
    <img className="mdx-img" {...props} />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="mdx-blockquote" {...props} />
  ),
  hr: (props: React.HTMLProps<HTMLHRElement>) => (
    <hr className="mdx-hr" {...props} />
  ),
}

export { MdxComponents }