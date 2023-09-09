import { RouteComponents } from "@/constants/bespoke-components";
import { PostComponents } from "@/constants/bespoke-components";
import { MarkdownComponents } from "@/constants/bespoke-components";

type RouteComponentNameType = keyof typeof RouteComponents;
type PostComponentNameType = keyof typeof PostComponents;
type MarkdownComponentNameType = keyof typeof MarkdownComponents;

type RouteComonentProps<T extends RouteComponentNameType> =
  typeof RouteComponents[T];

type PostComponentProps<T extends PostComponentNameType> =
  typeof PostComponents[T];

type MarddownComponentProps<T extends MarkdownComponentNameType> =
  typeof MarkdownComponents[T];

export type {
  PostComponentNameType,
  PostComponentProps,
  RouteComonentProps,
  RouteComponentNameType,
  MarkdownComponentNameType,
  MarddownComponentProps
};
