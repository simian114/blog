/* eslint-disable @typescript-eslint/no-explicit-any */

import { RouteComponents } from "@/constants/bespoke-components"
import { ROUTE_COMPONENT_LIST } from "@/constants/components"
import { ComponentNameType } from "@/types/bespoke-components"

interface BaseParam {
  componentName: any
  propKey: string
}

interface PropParam extends BaseParam {
  target: "param" | "description" | "default" | "optional"
}

function isComponentName(v: any): v is ComponentNameType {
  return ROUTE_COMPONENT_LIST.indexOf(v) !== -1
}

function getComponentPropByName(v: any) {
  if (!isComponentName(v)) {
    return null
  }
  return (RouteComponents as any)[v]
}

function isComponentPropsKey({ componentName, propKey }: BaseParam) {
  if (!isComponentName(componentName)) {
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
  isComponentName,
  isComponentPropsKey,
  getComponentPropByName,
  getComponentPropTarget,
  makeComponentProps,
}
