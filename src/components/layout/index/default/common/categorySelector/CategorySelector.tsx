import Link from "next/link"

import Typography from "@/components/typography/Typography"
import { AllIncludeCategory, AllIncludeRoute } from "@/types/bespoke-components"

interface CategorySelectorProps {
  currentCategory?: AllIncludeCategory
  currentRoute: AllIncludeRoute
}

export default async function CategorySelector(props: CategorySelectorProps) {
  const categories = props.currentRoute.categories
  return (
    <section className="post-list__category-section">
      <ul className="post-list__category-list">
        <li
          className={`post-list__category-item ${
            !props.currentCategory ? "post-list__category-item--active" : ""
          }`}
        >
          <Link
            scroll={false}
            className={`post-list__link ${
              !props.currentCategory ? "active" : ""
            } ${!props.currentCategory ? "post-list__link--active" : ""}`}
            href={`/${props.currentRoute.url}`}
          >
            <Typography
              as="h3"
              variants="h3"
              colorType="GRAY"
              colorLevel={11}
              className="post-list__name"
            >
              전체
            </Typography>
          </Link>
        </li>
        {categories.map(category => (
          <li
            key={category.id}
            className={`post-list__category-item ${
              category.url === props.currentCategory?.url
                ? "post-list__category-item--active"
                : ""
            }`}
          >
            <Link
              scroll={false}
              className={`post-list__link ${
                category.url === props.currentCategory?.url ? "active" : ""
              } ${
                category.url === props.currentCategory?.url
                  ? "post-list__link--active"
                  : ""
              }`}
              href={`/${props.currentRoute.url}/${category.url}`}
            >
              <Typography
                as="h3"
                variants="h3"
                colorType="GRAY"
                colorLevel={11}
                className="post-list__name"
              >
                {category.title}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
