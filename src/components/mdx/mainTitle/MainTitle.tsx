import AnchorText from "../AnchorText"

interface MainTitleProps {
  title: string
}

export default function MainTitle(props: MainTitleProps) {
  return (
    <div>
      <AnchorText as="h1" className="">
        {props.title}
      </AnchorText>
    </div>
  )
}
