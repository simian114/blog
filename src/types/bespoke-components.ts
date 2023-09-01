import { ComponentProps } from "@/constants/bespoke-components";

type ComponentNameType = keyof typeof ComponentProps;

type PropsTypeByComponent<T extends ComponentNameType> =
  typeof ComponentProps[T];

// NOTE: usage
// type Temp = PropsTypeByComponent<"SimplePostList">;

export type {
  PropsTypeByComponent,
  ComponentNameType
}
