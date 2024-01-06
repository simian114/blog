import { ReactElement, useEffect } from "react"

type DisableScrollProps = {
  enable: boolean
}

/**
 * TODO: 모달 나올 때 마다 스크롤바가 사라지면서 보기 안좋아짐. 스크롤바는 그대로 냅두면서 ..
 */
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
