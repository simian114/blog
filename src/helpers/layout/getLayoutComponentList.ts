import * as fs from "fs/promises"

import { LAYOUT_COMPONENTS_PATH } from "@/constants/path"

export default async function getLayoutComponentList() {
  return await fs.readdir(LAYOUT_COMPONENTS_PATH)
}
