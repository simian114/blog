import { PrismaClient, RouteLayoutType, TagColor } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const routeTitles = [
    { title: "blog", type: RouteLayoutType.CARD },
    { title: "snippet", type: RouteLayoutType.TABLE },
    { title: "mdx", type: RouteLayoutType.CUSTOM },
    { title: "guestbook", type: RouteLayoutType.CUSTOM },
  ]

  const routes = await Promise.all(
    routeTitles.map((route, index) =>
      prisma.route.create({
        data: {
          id: index + 1,
          open: true,
          title: route.title,
          url: route.title,
          description: route.title,
          layoutType: route.type,
        },
      })
    )
  )

  //
  const categoryTitles = [
    { title: "React", routeId: 1 },
    { title: "Next.js", routeId: 1 },
    { title: "scss", routeId: 1 },
    { title: "css", routeId: 1 },
    { title: "React", routeId: 2 },
    { title: "Next.js", routeId: 2 },
    { title: "scss", routeId: 2 },
    { title: "css", routeId: 2 },
  ]
  //

  await Promise.all(
    categoryTitles.map(category =>
      prisma.category.create({
        data: {
          title: category.title,
          url: category.title,
          routeId: category.routeId,
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
          title: `post-${index}--category-${category.title}`,
          description: `post-${index}--category-${category.title}`,
          content: `# Hello world ${index} \n## This is h2 \n### h3h3\n ### h3h3 \n## h2h2 \n### h3h3h3`,
          categoryId: category.id,
          published: true,
          info: {
            create: {
              readingTime: getRandomInt(1, 100),
              url: `/${category.route?.title}/${category.title}/post-${index}--category-${category.title}`,
              slug: [
                category.route?.title || "",
                category.title || "",
                `post-${index},category-${category.title}`,
              ],
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
