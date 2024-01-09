# Bespoke
> 어드민으로 모든걸 관리하는, no-code 블로그입니다.

## 기능

### 1. theme 컬러 변경
next.config.mjs에서 primary / secondary / tertiary를 아래 값으로 변경하면 됩니다.
  - cyan(default primary), crimson(default secondary), yellow(default tertiary), blue, brown, green, orange, pink, purple, red

### 2. 어드민을 통한 **페이지 조립**
어드민을 통해 각 페이지를 조립해서 만들 수 있습니다. 

#### 리스트 페이지 (/:route-url/:?cateogry-url)
- category selector
  - category selector
  - category book selector
- post list
  - card post list
  - table post list
  - simple post list
- tag selector

예시)
- [category book selector + card post list의 조합으로 만든 페이지입니다.](https://recketman.vercel.app/blog)
- [category selector + table post list의 조합으로 만든 페이지입니다.](https://recketman.vercel.app/snippet)
- [simple post list + tag selector의 조합으로 만든 페이지입니다.](https://recketman.vercel.app/archives)


#### 포스트 페이지 (/:rotue-url/:category-url/:post-url)
- TOC(table of contents)
- comment

  
예시)
- [디테일 페이지, TOC + comment의 조합으로 만든 페이지입니다.](https://recketman.vercel.app/blog/bespoke/tech-stack)

  
![리스트 페이지 컴포넌트 조립 모달](https://github.com/simian114/blog/assets/49119625/853c7dfc-bf78-43ab-ade7-f7de0691350d)



### 3. 글 작성
- markdown형식으로 작성 할 수 있습니다.
- preview 기능 제공합니다.
- post 작성 후에는 post의 route / category / tag를 선택할 수 있습니다.

  <figure class="half">
   <img src="https://github.com/simian114/blog/assets/49119625/7f55128e-75f5-4921-ad3d-7c96b3e8c560" align="center" width="69%">
  <img src="https://github.com/simian114/blog/assets/49119625/b2966b6e-17dd-4675-8ede-6aced7bef12b" align="center" width="30%">
  </figure>
  
  

### 4. bespoke 컴포넌트 구현
> no-code 블로그를 지향하지만, 개발자라면 누구나 확장할 수 있습니다.

(규칙은 나중에 작성..)
현재 bespokse 컴포넌트 시스템으로 만들 수 있는 컴포넌트는 3종류입니다.
- list page component
- detail page component
- mdx custom component


## how to deploy

1. fork
2. vercel에 생성한 프로젝트 연결

- 이 과정에서 한번 deploy가 되는데 storage가 세팅되어있지 않기 때문에 실패하게 됩니다. 아래 과정을 바로 진행해주세요.

3. setup vercel databases([vercel storage](https://vercel.com/docs/storage))

> 각 storage 생성 후 `Connect to project`를 해주면 env가 자동으로 세팅됩니다.

- [KV](https://vercel.com/docs/storage/vercel-kv)
- [Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [blob](https://vercel.com/docs/storage/vercel-blob)

4. vercel project settings

- env

  - ADMIN_ID
  - ADMIN_PASSWORD
  - JWT_SECRET
    - ex) asdfasdf
  - NEXT_PUBLIC_API_URL
    - 본인 domain 값 넣어주면 됩니다.
    - ex) https://blog-three-delta-68.vercel.app/

- Command
  - install command: `npm install --force`
  - build command: `prisma db push && prisma generate && prisma db seed && next build`

첫 deploy 이후에 build command를 `next build`로 반드시 변경해주세요!









