import { Fragment } from "react"
import { Component, Post, Prisma } from "@prisma/client"

import * as ComponentList from "@/components/bespoke/post"
import { isPostComponentName } from "@/helpers/components"

interface BespokeComponentMapperProps {
  component: Component
  post: Post
}

export default function DeatilBespokeComponentMapper(
  props: BespokeComponentMapperProps
) {
  const componentProps = props.component.props as Prisma.JsonObject
  const name = props.component.name

  if (!isPostComponentName(name)) {
    return <Fragment {...componentProps} />
  }

  const Component = ComponentList[name] || Fragment
  const post = props.post

  return <Component {...componentProps} post={post} />
}
