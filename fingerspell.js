import wordList from './wordlist'

const Game = (doc) => {
  const seed = Date.now()
  const nextButton = '[data-next]'
  const newButton = '[data-new]'
  const scoreDisplay = '[data-score]'
  const wordDisplay = '[data-word]'
  const timeDisplay = '[data-time]'

  let score, timer, timeLeft

  const disable = (selector) => {
    const elements = doc.querySelectorAll(selector)
    elements.forEach((el) => el.setAttribute("data-disabled", true))
  }

  const enable = (selector) => {
    const elements = doc.querySelectorAll(selector)
    elements.forEach((el) => el.removeAttribute("data-disabled"))
  }

  const gameOver = () => {
    clearTimeout(timer)
    disable(nextButton)
  }

  const setTimer = () => {
    timer = setTimeout(() => { tick() }, 1000)
  }

  const tick = () => {
    timeLeft = timeLeft -1;
    if (timeLeft < 1) {
      gameOver()
      return
    }
    displayTime()
    setTimer()
  }

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timeLeft = 120
    setTimer()
    displayTime()
  }

  const getRandomIndex = () => {
    return Math.floor(Math.random() * wordList.length)
  }

  const getNextWord = () => {
    score = score + 1
    word = wordList[getRandomIndex()]
    displayWord()
    displayScore()
  }

  const display = (selector, text) => {
    const elements = doc.querySelectorAll(selector)
    elements.forEach(el => el.innerText = `${text}`)
  }

  const displayScore = () => display(scoreDisplay, score)

  const displayWord = () => display(wordDisplay, word)

  const displayTime = () => {
    const humanTime = `${Math.floor(timeLeft/60)}:${timeLeft % 60}`
    display(timeDisplay, humanTime)
  }

  const newGame = () => {
    enable(nextButton)
    score = -1
    getNextWord()
    resetTimer()
  }

  const guardedEvent = (e, block) => {
    e.preventDefault()
    if (e.target.getAttribute('data-disabled')) {
      return
    }
    block()
  }

  doc.querySelectorAll(nextButton).forEach(nb => nb.addEventListener('click', (e) => guardedEvent(e, getNextWord)))
  doc.querySelectorAll(newButton).forEach(nb => nb.addEventListener('click', (e) => guardedEvent(e, newGame)))

}

Game(document)

