/* eslint-disable */
const fs = require("fs").promises
const path = require("path")
const { parse } = require("comment-parser")

// NOTE: eslint 로 파일 바로formating 할 수 있지 않을까?
const { ESLint } = require("eslint")

const ROOT = path.resolve()
const TARGET = ROOT + "/src/constants/bespoke-components.ts"
const ROUTE_COMPONENTS_PATH = ROOT + "/src/components/bespoke/route"
// const POST_COMPONENTS_PATH = ROOT + "/src/components/bespoke/post"

const eslint = new ESLint({ fix: true, useEslintrc: true })

async function createComponents() {
  const filesWithExt = await fs.readdir(ROUTE_COMPONENTS_PATH)
  const routeComponents = {}

  // TODO: console.log 로 어떤 컴포넌트가 만들어지는지 표현해주기
  for await (const fileWithExt of filesWithExt) {
    if (fileWithExt === "index.ts") {
      continue
    }
    const fileAsString = await fs.readFile(
      `${ROUTE_COMPONENTS_PATH}/${fileWithExt}`,
      { encoding: "utf-8" }
    )
    const parsedJSDoc = parse(fileAsString, { spacing: "preserve" })

    const props = parsedJSDoc[0]?.tags.reduce((prev, tag) => {
      if (tag.tag !== "param" || !tag.name || !tag.type) {
        return prev
      }
      const { name, source, problems, param, ...rest } = tag
      prev[name] = { ...rest }
      return prev
    }, {})

    const fileName = fileWithExt.split(".")[0]
    routeComponents[fileName] = props
  }
  const beforeFormat = `export const RouteComponents = ${JSON.stringify(
    routeComponents
  )}`
  const afterFormat = (await eslint.lintText(beforeFormat))?.[0]?.output || ""
  await fs.writeFile(TARGET, afterFormat)
}

module.exports = createComponents
