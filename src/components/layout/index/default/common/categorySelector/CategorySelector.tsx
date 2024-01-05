import Link from "next/link"

import Typography from "@/components/typography/Typography"
import { AllIncludeCategory, AllIncludeRoute } from "@/types/bespoke-components"

interface CategorySelectorProps {
  category?: AllIncludeCategory
  route: AllIncludeRoute
}

// NOTE: category 까지는 useParams를 사용하면 될듯?
// NOTE: tag는 useSearchParams를 이용하자

// NOTE: category selector 의 생성순으로 정렬
export default function CategorySelector(props: CategorySelectorProps) {
  const categoriesSortedByCreatedAt = [...(props.route.categories || [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  return (
    <section className="post-list__category-section">
      <ul className="post-list__category-list">
        <li
          className={`post-list__category-item ${
            !props.category ? "post-list__category-item--active" : ""
          }`}
        >
          <Link
            scroll={false}
            className={`post-list__link ${!props.category ? "active" : ""} ${
              !props.category ? "post-list__link--active" : ""
            }`}
            href={`/${props.route.url}`}
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
        {categoriesSortedByCreatedAt.map(category => (
          <li
            key={category.id}
            className={`post-list__category-item ${
              category.url === props.category?.url
                ? "post-list__category-item--active"
                : ""
            }`}
          >
            <Link
              scroll={false}
              className={`post-list__link ${
                category.url === props.category?.url ? "active" : ""
              } ${
                category.url === props.category?.url
                  ? "post-list__link--active"
                  : ""
              }`}
              href={`/${props.route.url}/${category.url}`}
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
