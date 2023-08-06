import { ReactElement } from "react"

import SimplePostList from "@/components/post/SimplePostList"

const ComponentMapper: {
  [key: string]: () => Promise<ReactElement> | ReactElement
} = {
  SimplePostList,
}

export default ComponentMapper
