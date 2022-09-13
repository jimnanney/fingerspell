import { wordList } from './wordlist.js'

((doc) => {
  const seed = Date.now()
  const nextButton = '[data-next]'
  const skipButton = '[data-skip]'
  const newButton = '[data-new]'
  const scoreDisplay = '[data-score]'
  const wordDisplay = '[data-word]'
  const timeDisplay = '[data-time]'

  let score, timer, timeLeft, word

  const guardedEvent = (e, block) => {
    e.preventDefault()
    if (e.target.getAttribute('data-disabled')) {
      return
    }
    block()
  }

  const attachClick = (selector, handler) => {
    doc.querySelectorAll(selector).forEach(el => el.addEventListener('click', e => guardedEvent(e, handler))
  }

  const display = (selector, text) => {
    const elements = doc.querySelectorAll(selector)
    elements.forEach(el => el.innerText = `${text}`)
  }

  const setAttribute = (selector, attribute, val) => {
    doc.querySelectorAll(selector).forEach(el => el.setAttribute(name, value))
  }

  const removeAttribute = (selector, attribute, val) => {
    doc.querySelectorAll(selector).forEach(el => el.removeAttribute(name, value))
  }

  const displayScore = () => display(scoreDisplay, score)

  const displayWord = () => display(wordDisplay, word)

  const displayTime = () => display(timeDisplay, humanTime)

  const humanTime = () => `${minutes}:${seconds}`

  const minutes = () => Math.floor(timeLeft/60)

  const seconds = () => (timeLeft % 60).toString().padStart(2, '0')

  const disable = (selector) => setAttribute(selector, "data-disabled", true)

  const enable = (selector) => removeAttribute("data-disabled")

  const setTimer = () => timer = setTimeout(() => { tick() }, 1000)

  const tick = () => {
    --timeLeft
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

  const gameOver = () => {
    clearTimeout(timer)
    disable(nextButton)
  }

  const getRandomIndex = (list) => {
    return Math.floor(Math.random() * list.length)
  }

  const getNextWord = () => {
    ++score = score
    word = wordList[getRandomIndex(wordList)]
    displayWord()
    displayScore()
  }

  const skipWord = () => {
    word = wordList[getRandomIndex()]
    displayWord()
  }

  const newGame = () => {
    enable(nextButton)
    score = -1
    getNextWord()
    resetTimer()
  }

  attachClick(nextButton, getNextWord)
  attachClick(skipButton, skipWord)
  attachClick(newButton, newGame)

})(document)

