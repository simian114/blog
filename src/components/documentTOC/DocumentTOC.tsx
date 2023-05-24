"use client"

import { useEffect, useRef } from "react"
import { Heading } from "contentlayer/generated"

import { useDevice } from "@/store/deviceWidthProvider"

interface DocumentTOCProps {
  headings?: Heading[]
}

/**
 * intersectionObserver 로 변경할것
 */
export default function DocumentTOC(props: DocumentTOCProps) {
  const tocRef = useRef<HTMLUListElement>(null)
  const { isMobile } = useDevice()

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!props.headings?.length) return
    const mdxHeaders = document.querySelectorAll(".mdx-h2, .mdx-h3")
    const tocLinks = tocRef.current?.querySelectorAll("a")
    function onScroll() {
      const scrollTop = window.scrollY
      if (!tocLinks || !mdxHeaders) return

      // NOTE: forEach 보다 for문이 성능 더 좋음..
      for (let i = 0; i < tocLinks.length; i++) {
        tocLinks[i]?.classList?.remove("active")
      }

      for (let i = mdxHeaders.length - 1; i >= 0; i--) {
        const offset = isMobile ? 16 : 48
        if (scrollTop > (mdxHeaders[i] as HTMLElement).offsetTop - offset) {
          tocLinks[i]?.classList.add("active")
          break
        }
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll)
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [props.headings, isMobile])

  return (
    <div className="document-toc-container">
      <section className="document-toc">
        <header className="document-toc__header">
          <h2>In this post</h2>
        </header>
        <ul className="document-toc__list" ref={tocRef}>
          {props.headings?.map(heading => {
            return (
              <li key={heading.title} className="document-toc__item">
                <a
                  href={`#${heading.title.replaceAll(" ", "-")}`}
                  className="document-toc__link"
                >
                  {heading.title}
                </a>
                {(heading.children?.length || 0) > 0 && (
                  <ul className="document-toc__nested-list">
                    {heading.children?.map(heading => {
                      return (
                        <li key={heading} className="document-toc__nested-item">
                          <a
                            href={`#${heading.replaceAll(" ", "-")}`}
                            className="document-toc__nested-link"
                          >
                            {heading}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
