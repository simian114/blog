/* eslint-disable @typescript-eslint/no-explicit-any */

import { RouteComponents } from "@/constants/bespoke-components"
import {
  POST_COMPONENT_LIST,
  ROUTE_COMPONENT_LIST,
} from "@/constants/components"
import {
  PostComponentNameType,
  RouteComponentNameType,
} from "@/types/bespoke-components"

interface BaseParam {
  componentName: any
  propKey: string
}

interface PropParam extends BaseParam {
  target: "param" | "description" | "default" | "optional"
}

function isRouteComponentName(v: any): v is RouteComponentNameType {
  return ROUTE_COMPONENT_LIST.indexOf(v) !== -1
}

function isPostComponentName(v: any): v is PostComponentNameType {
  return POST_COMPONENT_LIST.indexOf(v) !== -1
}

function getComponentPropByName(v: any) {
  if (!isRouteComponentName(v)) {
    return null
  }
  return (RouteComponents as any)[v]
}

function isComponentPropsKey({ componentName, propKey }: BaseParam) {
  if (!isRouteComponentName(componentName)) {
    return false
  }
  const componentProps = getComponentPropByName(componentName)
  if (!componentProps) {
    return false
  }
  return !!(componentProps as any)[propKey]
}

function getComponentPropTarget(param: PropParam): string {
  const componentProp = getComponentPropByName(param.componentName) as any
  if (!componentProp) {
    return ""
  }
  const prop = componentProp?.[param.propKey]
  return prop?.[param.target] || ""
}

function makeComponentProps({ componentName }: { componentName: any }) {
  const props = getComponentPropByName(componentName)
  const parsedProps = props
    ? Object.entries(props).reduce((prev, cur) => {
        return { ...prev, [cur[0]]: (cur[1] as any)?.default || "" }
      }, {} as any)
    : {}
  return parsedProps
}

export {
  getComponentPropByName,
  getComponentPropTarget,
  isComponentPropsKey,
  isPostComponentName,
  isRouteComponentName,
  makeComponentProps,
}
