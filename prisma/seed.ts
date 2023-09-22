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
    {
      title: "guestbook",
      priority: 5,
      url: "guestbook",
      components: [],
      type: ROUTE_TYPE.CUSTOM,
    },
  ]

  const routes = await Promise.all(
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

  const categoryTitles = [
    { title: "React", route: "blog" },
    { title: "Next.js", route: "blog" },
    { title: "scss", route: "blog" },
    { title: "css", route: "blog" },
    { title: "React", route: "snippet" },
    { title: "Next.js", route: "snippet" },
    { title: "scss", route: "snippet" },
    { title: "css", route: "snippet" },
  ]

  await Promise.all(
    categoryTitles.map(category =>
      prisma.category.create({
        data: {
          title: category.title,
          url: `${category.title}`,
          routeId:
            routes.find(route => route.title === category.route)?.id || 1,
          description: `${category.title} 입니다.`,
        },
      })
    )
  )

  const cateogiresWithRoute = await prisma.category.findMany({
    include: {
      route: true,
    },
  })

  const cate = [...cateogiresWithRoute, ...cateogiresWithRoute]

  const posts = await Promise.all(
    cate.map((category, index) =>
      prisma.post.create({
        data: {
          title: `post-${index} category-${category.title}`,
          url: `post-${index}--category-${category.title}`,
          description: `post-${index}--category-${category.title}`,
          content: `# Hello world ${index} \n## This is h2 \n### h3h3\n ### h3h3 \n## h2h2 \n### h3h3h3`,
          published: true,
          readingTime: getRandomInt(1, 100),
          category: {
            connect: {
              id: category.id,
            },
          },
          route: {
            connect: {
              id: category.route?.id,
            },
          },
        },
      })
    )
  )

  const TagInfos = [
    { title: "React", color: COLOR_TYPE.PRIMARY, url: "React" },
    { title: "Javascript", color: COLOR_TYPE.SECONDARY, url: "Javascript" },
    { title: "Next.js", color: COLOR_TYPE.TERTIARY, url: "Next.js" },
    { title: "CSS", color: COLOR_TYPE.SECONDARY, url: "CSS" },
    { title: "SCSS", color: COLOR_TYPE.PRIMARY, url: "SCSS" },
    { title: "Tailwind", color: COLOR_TYPE.TERTIARY, url: "Tailwind" },
  ]

  const tags = await Promise.all(
    TagInfos.map(info =>
      prisma.tag.create({
        data: {
          title: info.title,
          color: info.color,
          url: info.url,
        },
      })
    )
  )

  await Promise.all(
    posts.map(post =>
      prisma.tagsOnPosts.create({
        data: {
          postId: post.id,
          tagId: getRandomInt(1, tags.length),
          assignedBy: "",
        },
      })
    )
  )
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
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
