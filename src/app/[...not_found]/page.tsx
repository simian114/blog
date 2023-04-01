import Image from "next/image"

export default function NotFouncCatchAll() {
  return (
    <div className="not-found-page">
      <div className="not-found-page__img-container">
        <Image
          fill
          src="/images/not-found.gif"
          alt="not-found-image"
          quality={50}
        />
      </div>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
    </div>
  )
}
