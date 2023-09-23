export const RouteComponents = {
  RouteDescriptor: {},
  SimplePostList: {
    title: {
      tag: "param",
      type: "string",
      optional: true,
      description: "this is a description",
      default: "helloworld",
    },
  },
  Temp: {
    temp: {
      tag: "param",
      type: "string",
      optional: true,
      description: "this is a description",
      default: "helloworld",
    },
    temp2: {
      tag: "param",
      type: "string",
      optional: true,
      description: "this is a description2",
    },
    temp3: {
      tag: "param",
      type: "string",
      optional: false,
      description: "this is a\nwith new line",
    },
  },
}
export const PostComponents = { Comment: {}, TOC: {} }
export const MarkdownComponents = {
  Br: {
    kind: {
      tag: "param",
      type: "string",
      optional: true,
      description: "",
      default: "flow",
    },
    hasChildren: {
      tag: "param",
      type: "boolean",
      optional: true,
      description: "",
      default: "true",
    },
    title: { tag: "param", type: "string", optional: false, description: "" },
  },
}
