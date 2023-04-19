const cards = document.querySelectorAll(".post-card")
Array.prototype.forEach.call(cards, card => {
  let down,
    up,
    link = card.querySelector("h3 a")
  card.onmousedown = () => (down = +new Date())
  card.onmouseup = () => {
    up = +new Date()
    if (up - down < 200) {
      link.click()
    }
  }
})
