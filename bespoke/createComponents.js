/* eslint-disable */
const fs = require("fs").promises
const path = require("path")

const ROOT = path.resolve()
const TARGET = ROOT + "/src/constants/bespoke-components.ts"

const LAYOUT_COMPONENTS_PATH = ROOT + "/src/components/layout/components"

async function createComponents() {
  const filesWithExt = await fs.readdir(LAYOUT_COMPONENTS_PATH)
  const files = filesWithExt
    .map(file => file.split(".")[0])
    .filter(file => file !== "index")
  const template = getComponentTemplate(files)
  await fs.writeFile(TARGET, template)
}

module.exports = createComponents

function getComponentTemplate(components) {
  if (!Array.isArray(components)) {
    return `const ComponentList = ${JSON.stringify([])}

export default ComponentList
`
  }
  return `const ComponentList = ${JSON.stringify(components)}

export default ComponentList
`
}
