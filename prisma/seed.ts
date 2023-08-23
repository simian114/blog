import {
  ComponentType,
  PrismaClient,
  SubUrlPost,
  TagColor,
} from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const routeTitles = [
    {
      title: "home",
      priority: 1,
      url: "",
      components: [],
    },
    {
      title: "blog",
      priority: 1,
      url: "blog",
      components: [
        {
          type: ComponentType.SUB_URL,
          name: "CategorySelector",
          props: {
            post: SubUrlPost.CARD,
          },
        },
      ],
    },
    {
      title: "snippet",
      priority: 2,
      url: "snippet",
      components: [
        {
          type: ComponentType.SUB_URL,
          name: "CategorySelector",
          props: {
            post: SubUrlPost.TABLE,
          },
        },
      ],
    },
    {
      title: "archives",
      priority: 3,
      url: "archives",
      components: [
        {
          type: ComponentType.COMPONENT,
          name: "SimplePostList",
        },
        {
          type: ComponentType.SUB_URL,
          name: "TagSelector",
          props: {
            post: SubUrlPost.CARD,
          },
        },
      ],
    },
    { title: "mdx", priority: 4, url: "mdx", components: [] },
    {
      title: "guestbook",
      priority: 5,
      url: "guestbook",
      components: [],
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
    { title: "React", color: TagColor.PRIMARY, url: "React" },
    { title: "Javascript", color: TagColor.SECONDARY, url: "Javascript" },
    { title: "Next.js", color: TagColor.TERTIARY, url: "Next.js" },
    { title: "CSS", color: TagColor.SECONDARY, url: "CSS" },
    { title: "SCSS", color: TagColor.PRIMARY, url: "SCSS" },
    { title: "Tailwind", color: TagColor.TERTIARY, url: "Tailwind" },
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
