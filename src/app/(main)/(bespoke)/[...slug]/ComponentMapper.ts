import { ReactElement } from "react"

import SimplePostList from "@/components/layout/components/SimplePostList"

const ComponentMapper: {
  // NOTE: server component 의 타입
  [key: string]: () => Promise<ReactElement> | ReactElement
} = {
  SimplePostList,
}

export const LayoutComponentList = Object.keys(ComponentMapper)

export default ComponentMapper
