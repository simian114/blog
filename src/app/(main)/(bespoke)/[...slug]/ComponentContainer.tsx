import { Fragment, ReactElement } from "react"
import { Component, Prisma } from "@prisma/client"

import SimplePostList from "@/components/layout/components/SimplePostList"

// TODO: build 타임 때 먼저 불러올 수는 없나?
const ComponentMapper: {
  // NOTE: server component 의 타입
  [key: string]: (
    props: Record<string, unknown>
  ) => Promise<ReactElement> | ReactElement
} = {
  SimplePostList,
}

interface ComponentContainerProps {
  component: Component
}

export default function ComponentContainer(props: ComponentContainerProps) {
  const componentProps = props.component.props as Prisma.JsonObject
  const Component = ComponentMapper[props.component.name] || Fragment
  return <Component {...componentProps} />
}
