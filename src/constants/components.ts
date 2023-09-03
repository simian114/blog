import {
  PostComponentNameType,
  RouteComponentNameType,
} from "@/types/bespoke-components"

import { PostComponents, RouteComponents } from "./bespoke-components"

export const ROUTE_COMPONENT_LIST = Object.keys(
  RouteComponents
) as RouteComponentNameType[]

export const POST_COMPONENT_LIST = Object.keys(
  PostComponents
) as PostComponentNameType[]
