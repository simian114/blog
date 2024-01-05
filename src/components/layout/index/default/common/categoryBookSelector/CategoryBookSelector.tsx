import Link from "next/link"

import Typography from "@/components/typography/Typography"
import { capitalizeFirstLetter } from "@/lib/utils"
import { AllIncludeCategory, AllIncludeRoute } from "@/types/bespoke-components"

interface CategoryBookSelectorProps {
  category?: AllIncludeCategory
  route: AllIncludeRoute
}

export default function CategoryBookSelector(props: CategoryBookSelectorProps) {
  const categoriesSortedByCreatedAt = [...(props.route.categories || [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  return (
    <section className="category-book-selector-list-wrapper">
      {props.route.title && (
        <div className="category-book-route__title">
          <Typography as={"h2"} variants="h1" colorLevel={12}>
            {capitalizeFirstLetter(props.route.title)}
          </Typography>
        </div>
      )}
      {props.route.description && (
        <div className="category-book-route__desc">
          <Typography as={"p"}>{props.route.description}</Typography>
        </div>
      )}
      <ul className="category-book-selector-list">
        {categoriesSortedByCreatedAt.map(category => {
          const selected = category.url === props.category?.url
          return (
            <li
              key={category.id}
              className={`category-book-selector-list__item`}
            >
              <Link scroll={false} href={`/${props.route.url}/${category.url}`}>
                <div
                  className={`category-book ${
                    selected ? "category-book--selected" : ""
                  }`}
                >
                  <div className="category-book__inner">
                    <div className="category-book__title-container">
                      <Typography as="span" weight="bold" variants="subtitle2">
                        {category.title.toUpperCase()}
                      </Typography>
                    </div>
                    <div className="category-book__desc-container">
                      <Typography as="span" variants="body2" colorLevel={11}>
                        {category.description?.toUpperCase()}
                      </Typography>
                    </div>
                    <div className="category-book__posts-count-container">
                      <Typography as="span">
                        {category.posts.length}개
                      </Typography>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
