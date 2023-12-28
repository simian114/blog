import { Fragment } from "react"
import { Component } from "@prisma/client"

import * as ComponentList from "@/components/bespoke/route"
import { AllIncludeRoute } from "@/types/bespoke-components"

interface RouteComponentMapperProps {
  component: Component
  route: AllIncludeRoute
}

type ComponentName = keyof typeof ComponentList

export default function RouteComponentMapper(props: RouteComponentMapperProps) {
  const componentProps = props.component.props as any
  // const componentProps = props.component.props as Prisma.JsonObject
  const Component =
    ComponentList[props.component.name as ComponentName] || Fragment
  return <Component route={props.route} {...componentProps} />
}
