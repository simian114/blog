import { ReactElement, useEffect } from "react"

type DisableScrollProps = {
  enable: boolean
}

const DisableScroll = (props: DisableScrollProps): ReactElement => {
  useEffect(() => {
    if (props.enable) {
      document.documentElement.style.overflow = "hidden"
    }
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [props.enable])
  return <></>
}

export default DisableScroll
