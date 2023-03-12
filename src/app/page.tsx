import styles from "./page.module.scss"

export default function Home() {
  return (
    <main className={styles.main}>
      <div
        style={{
          fontSize: "40px",
          lineHeight: "56px",
          letterSpacing: "-0.5px",
          fontWeight: "700",
        }}
      >
        헬로우 월드입니다!
      </div>
    </main>
  )
}
