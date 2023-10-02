import {
  COLOR_TYPE,
  COMPONENT_POSITION,
  ComponentType,
  PrismaClient,
  ROUTE_TYPE,
  SubUrlPost,
} from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const routeTitles = [
    {
      title: "home",
      priority: 1,
      url: "",
      type: ROUTE_TYPE.CUSTOM,
      components: [],
    },
    {
      title: "blog",
      priority: 1,
      url: "blog",
      type: ROUTE_TYPE.BESPOKE,
      open: false,
      components: [
        {
          type: ComponentType.SUB_URL,
          name: "CategorySelector",
          props: {
            post: SubUrlPost.CARD,
          },
          position: COMPONENT_POSITION.ROUTE,
        },
        {
          type: ComponentType.COMPONENT,
          name: "Comment",
          props: {},
          position: COMPONENT_POSITION.POST,
        },
        {
          type: ComponentType.COMPONENT,
          name: "TOC",
          props: {},
          position: COMPONENT_POSITION.POST,
        },
      ],
    },
    {
      title: "snippet",
      priority: 2,
      url: "snippet",
      type: ROUTE_TYPE.BESPOKE,
      components: [
        {
          type: ComponentType.SUB_URL,
          name: "CategorySelector",
          props: {
            post: SubUrlPost.TABLE,
          },
          position: COMPONENT_POSITION.ROUTE,
        },
        {
          type: ComponentType.COMPONENT,
          name: "Comment",
          props: {},
          position: COMPONENT_POSITION.POST,
        },
      ],
    },
    {
      title: "archives",
      priority: 3,
      url: "archives",
      type: ROUTE_TYPE.BESPOKE,
      components: [
        {
          type: ComponentType.COMPONENT,
          name: "SimplePostList",
          position: COMPONENT_POSITION.ROUTE,
        },
        {
          type: ComponentType.SUB_URL,
          name: "TagSelector",
          props: {
            post: SubUrlPost.CARD,
          },
          position: COMPONENT_POSITION.ROUTE,
        },
      ],
    },
    {
      title: "mdx",
      priority: 4,
      url: "mdx",
      components: [],
      type: ROUTE_TYPE.CUSTOM,
    },
  ]

  await Promise.all(
    routeTitles.map(route => {
      return prisma.route.create({
        data: {
          open: true,
          title: route.title,
          url: route.url,
          description: route.title,
          type: route.type,
          priority: route.priority,
          components: {
            create: route.components,
          },
        },
      })
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
