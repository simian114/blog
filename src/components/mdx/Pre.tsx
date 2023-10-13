import Typography from "../typography/Typography"

type PreProps = React.HTMLProps<HTMLPreElement>

interface ChildrenProps {
  props: {
    className: string
    ["data-language"]: string
  }
}

export default function Pre(props: PreProps) {
  const { children, ...rest } = props

  const lang = (children as ChildrenProps)?.props?.["data-language"]

  return (
    <pre className="mdx-pre" {...rest}>
      <div className="mdx-pre__container">
        <div className="mdx-pre__lang">
          <Typography
            weight="bold"
            variants="body2"
            colorType="SECONDARY"
            colorLevel={10}
          >
            {lang}
          </Typography>
        </div>
        {children}
      </div>
    </pre>
  )
}
