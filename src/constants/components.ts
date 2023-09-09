import {
  MarkdownComponentNameType,
  PostComponentNameType,
  RouteComponentNameType,
} from "@/types/bespoke-components"

import {
  MarkdownComponents,
  PostComponents,
  RouteComponents,
} from "./bespoke-components"

export const ROUTE_COMPONENT_LIST = Object.keys(
  RouteComponents
) as RouteComponentNameType[]

export const POST_COMPONENT_LIST = Object.keys(
  PostComponents
) as PostComponentNameType[]

export const MARKDOWN_COMPONENT_LIST = Object.keys(
  MarkdownComponents
) as MarkdownComponentNameType[]
