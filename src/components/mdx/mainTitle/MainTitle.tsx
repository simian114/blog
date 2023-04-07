import AnchorText from "../AnchorText"
import styles from "./MainTitleStyles.module.scss"

interface MainTitleProps {
  title: string
}

export default function MainTitle(props: MainTitleProps) {
  return (
    <div className={styles["main-title-wrapper"]}>
      <AnchorText as="h1" className="">
        {props.title}
        {/*  */}
      </AnchorText>
    </div>
  )
}
