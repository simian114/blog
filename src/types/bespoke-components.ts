import {
  Prisma,
} from "@prisma/client"

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

export type AllIncludeRoute = Prisma.RouteGetPayload<{
  include: {
    components: true
    categories: {
      include: { posts: { include: { tags: { include: { tag: true } } } } }
    }
  }
}>

export type AllIncludeCategory = Prisma.CategoryGetPayload<{
  include: {
    posts: {
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    }
  }
}>

export type AllIncludePost = Prisma.PostGetPayload<{
  include: { route: true; category: true; tags: { include: { tag: true } } }
}>
