/* eslint-disable */
const fs = require("fs").promises
const path = require("path")
const { parse } = require("comment-parser")

// NOTE: eslint 로 파일 바로formating 할 수 있지 않을까?
const { ESLint } = require("eslint")

const ROOT = path.resolve()

const TARGET = ROOT + "/src/constants/bespoke-components.ts"

const ROUTE_COMPONENTS_PATH = ROOT + "/src/components/bespoke/route"
const POST_COMPONENTS_PATH = ROOT + "/src/components/bespoke/post"
const MARKDOWN_COMPONENTS_PATH = ROOT + "/src/components/bespoke/markdown"

const eslint = new ESLint({ fix: true, useEslintrc: true })

const ComponentFolders = [
  { path: ROUTE_COMPONENTS_PATH, name: "RouteComponents" },
  { path: POST_COMPONENTS_PATH, name: "PostComponents" },
  { path: MARKDOWN_COMPONENTS_PATH, name: "MarkdownComponents" },
]

async function createComponents() {
  const data = {}

  for await (const folder of ComponentFolders) {
    const filesWithExt = await fs.readdir(folder.path)

    data[folder.name] = {}

    for await (const fileWithExt of filesWithExt) {
      if (fileWithExt === "index.ts") {
        continue
      }

      const fileAsString = await fs.readFile(`${folder.path}/${fileWithExt}`, {
        encoding: "utf-8",
      })

      const parsedJSDoc = parse(fileAsString, { spacing: "preserve" })

      const props = parsedJSDoc[0]?.tags.reduce((prev, tag) => {
        if (tag.tag !== "param" || !tag.name || !tag.type) {
          return prev
        }
        const { name, source, problems, param, ...rest } = tag
        prev[name] = { ...rest }
        return prev
      }, {})

      const componentName = fileWithExt.split(".")[0]
      data[folder.name][componentName] = props
    }
  }

  const beforeFormat = Object.entries(data)
    .map(([key, value]) => `export const ${key} = ${JSON.stringify(value)}`)
    .join("\n")
  const afterFormat = (await eslint.lintText(beforeFormat))?.[0]?.output || ""
  await fs.writeFile(TARGET, afterFormat)
}

module.exports = createComponents
