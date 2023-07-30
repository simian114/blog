import { PrismaClient, RouteLayoutType, TagColor } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const routeTitles = [
    { title: "home", type: RouteLayoutType.CARD, priority: 1, url: "/" },
    { title: "blog", type: RouteLayoutType.CARD, priority: 1, url: "/blog" },
    {
      title: "snippet",
      type: RouteLayoutType.TABLE,
      priority: 2,
      url: "/snippet",
    },
    { title: "mdx", type: RouteLayoutType.CUSTOM, priority: 3, url: "/mdx" },
    {
      title: "guestbook",
      type: RouteLayoutType.CUSTOM,
      priority: 4,
      url: "/guestbook",
    },
  ]

  const routes = await Promise.all(
    routeTitles.map(route =>
      prisma.route.create({
        data: {
          open: true,
          title: route.title,
          url: route.url,
          description: route.title,
          layoutType: route.type,
          priority: route.priority,
        },
      })
    )
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
          url: `/${category.title}`,
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

  await prisma.post.create({
    data: {
      title: "main",
      description: "main home",
      content: `# Hello world Home \n## This is h2 \n### h3h3\n ### h3h3 \n## h2h2 \n### h3h3h3`,
      published: true,
      readingTime: getRandomInt(1, 100),
      route: { connect: { url: "/" } },
    },
  })

  const posts = await Promise.all(
    cate.map((category, index) =>
      prisma.post.create({
        data: {
          title: `post-${index} category ${category.title}`,
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
    { title: "React", color: TagColor.PRIMARY },
    { title: "Javascript", color: TagColor.SECONDARY },
    { title: "Nextjs", color: TagColor.TERTIARY },
    { title: "CSS", color: TagColor.GRAY },
    { title: "SCSS", color: TagColor.PRIMARY },
    { title: "Tailwind", color: TagColor.TERTIARY },
  ]

  const tags = await Promise.all(
    TagInfos.map(info =>
      prisma.tag.create({
        data: {
          title: info.title,
          color: info.color,
        },
      })
    )
  )

  const tagsOnPosts = await Promise.all(
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
