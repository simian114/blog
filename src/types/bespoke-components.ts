import { RouteComponents } from "@/constants/bespoke-components";

type ComponentNameType = keyof typeof RouteComponents;

type PropsTypeByComponent<T extends ComponentNameType> =
  typeof RouteComponents[T];

// NOTE: usage
// type Temp = PropsTypeByComponent<"SimplePostList">;

export type {
  PropsTypeByComponent,
  ComponentNameType
}
