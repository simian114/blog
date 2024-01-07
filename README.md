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

## admin 페이지

> admin 페이지를 통해 모든 영역을 컨트롤 할 수 있습니다.
> 만약 admin페이지가 접속이 되지 않는다면 위 env가 잘 세팅되어있는지 다시 확인해주세요.

### 1. route관리

`route`는 pathname 가장 앞에 오게 되는 경로를 책임집니다. `blog` 라우트의 경로는 `https://xxxxxx.xxx.xxx/blog`입니다. 해당 라우트에 포함할 `category`를 선택할 수 있습니다.

1. Route type
   - bespoke
       - bespoke 컴포넌트를 이용해 라우트 페이지 페이지 & post 디테일 페이지의 레이아웃을 결정수 있습니다.
       - code 수정 필요없이 admin 수정만으로 페이지 이용이 가능합니다.
   - custom
       - bespoke 컴포넌트를 사용하지 않는 라우트입니다. code에 직접 경로를 추가해야지만 실제 페이지에 접속이 가능합니다.
2. 레이아웃 변경
   - 리스트 페이지의 레이아웃을 변경합니다.
   - category selector / tag selector / simple post list / post list 등 을 조합해서 페이지를 만들 수 있습니다. 아래는 예시 페이지입니다.
       - [category book selector + card type post list](https://recketman.vercel.app/blog)
       - [category selector + table type post list](https://recketman.vercel.app/snippet)
       - [simple post list + tag selector + card type post list](https://recketman.vercel.app/archives)
3. 상세 페이지 컴포넌트 변경
    - post 페이지의 구성을 변경합니다.
    - TOC / Comment의 사용 여부를 결정할 수 있습니다.
  

### 2. post관리
> Markdown으로 작성합니다
기본 마크다운과 동일합니다.

- code
    - [rehype pretty code](https://rehype-pretty-code.netlify.app/) 적용
- admonition
    - tip / note / danger / info / caution 이 구현되어있습니다. 아래처럼 사용하면 됩니다.
    - ```
          :::(tip | note | danger | info | caution)
              내용을 적습니다...
          :::
      ```
### 3. 기타
category / tag가 추가적으로 있습니다.
둘 모두 어드민을 통해 관리할 수 있습니다.








