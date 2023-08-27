import { Fragment } from "react"
import { Component, Prisma } from "@prisma/client"

import * as ComponentList from "@/components/layout/components"

// TODO: build 타임 때 먼저 불러올 수는 없나?

interface ComponentContainerProps {
  component: Component
}

type ComponentName = keyof typeof ComponentList

export default function ComponentContainer(props: ComponentContainerProps) {
  const componentProps = props.component.props as Prisma.JsonObject
  const Component =
    ComponentList[props.component.name as ComponentName] || Fragment
  return <Component {...componentProps} />
}
