"use client"

import { Heading } from "contentlayer/generated"
import { useEffect, useRef } from "react"

interface DocumentTOCProps {
  headings?: Heading[]
}

export default function DocumentTOC(props: DocumentTOCProps) {
  const tocRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!props.headings?.length) return
    const mdxHeaders = document.querySelectorAll(".mdx-h2, .mdx-h3")
    const tocLinks = tocRef.current?.querySelectorAll("a")
    function onScroll() {
      const scrollTop = window.scrollY
      if (!tocLinks || !mdxHeaders) return
      tocLinks.forEach(link => {
        link.classList.remove("active")
      })
      for (let i = mdxHeaders.length - 1; i >= 0; i--) {
        if (scrollTop > (mdxHeaders[i] as HTMLElement).offsetTop - 75) {
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
  }, [props.headings])

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
                <a href={`#${heading.title}`} className="document-toc__link">
                  {heading.title}
                </a>
                {(heading.children?.length || 0) > 1 && (
                  <ul className="document-toc__nested-list">
                    {heading.children?.map(heading => {
                      return (
                        <li key={heading} className="document-toc__nested-item">
                          <a
                            href={`#${heading}`}
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
