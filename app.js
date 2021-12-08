const startBtn = document.querySelector("#start")
const screens = document.querySelectorAll(".screen")
const timeList = document.querySelector("#time-list")
const timeEl = document.querySelector("#time")
const board = document.querySelector("#board")
let time = 0
let score = 0

startBtn.addEventListener("click", (e) => {
  e.preventDefault()
  screens[0].classList.add("up")
})

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"))
    startGame()
  }
})

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  screens[1].classList.add("up")
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let currentTime = --time
    if (currentTime < 10) {
      currentTime = `0${currentTime}`
    }
    setTime(currentTime)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add("hide")
  board.innerHTML = `<h1>Счет: <span class="primary"> ${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement("div")
  const { width, height } = board.getBoundingClientRect()

  const size = getRandomNumber(10, 60)
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add("circle")
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
