## how to deploy
- Prerequisite
    - node.js
    - vercel storage
        - Kv
        - Postgres

## Posting

## BASIC

### URL
> URL 은 아래 3 타입을 가진다.

`/xxx/yyy/zzz`

- xxx: route 의 url 
- yyy: category 또는 Tag 의 url
- zzz: post 의 url


### admin
- Route
- Category
- Post
- Tag

## Entity
> schema.prisma 참고

### Route
- Route has many Categories
- Route has many Components

### Component
- Component belongs to Route
- Component has 3 types.
    - SUB_URL
    - COMPONENT
    - CURATION (not yet developed)

### Category
- Category belongs to Rotue
- Category has many Posts

### Post
- Post has many Tags

### Tag
- Tag belongs to Post



