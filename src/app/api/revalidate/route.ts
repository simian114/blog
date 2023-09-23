import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

type RevalidatePathType = "layout" | "page"

function isRevalidatePathType(
  pathType: unknown
): pathType is RevalidatePathType {
  if (pathType === "layout" || pathType === "page") {
    return true
  }
  return false
}
//  if (path) {
//    revalidatePath(path)
//    return NextResponse.json({ revalidated: true, now: Date.now() })
//  }
//
//  return NextResponse.json({
//    revalidated: false,
//    now: Date.now(),
//    message: 'Missing path to revalidate',
//  })

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")
  const type = (request.nextUrl.searchParams.get("type") || "layout") as
    | "layout"
    | "page"

  const tag = request.nextUrl.searchParams.get("tag")

  if (path) {
    revalidatePath(path, isRevalidatePathType(type) ? type : "layout")
    return NextResponse.json({ revalidated: true, now: Date.now() })
  }

  if (tag) {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, now: Date.now() })
  }

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path or tag to revalidate",
  })
}
