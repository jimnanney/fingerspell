import { wordList } from './wordlist.js'
import getGameDoc from './gamedoc.js'

((doc) => {
  const gameDoc = getGameDoc(doc)
  const seed = Date.now()
  const nextButton = '[data-next]'
  const skipButton = '[data-skip]'
  const newButton = '[data-new]'
  const scoreDisplay = '[data-score]'
  const wordDisplay = '[data-word]'
  const timeDisplay = '[data-time]'

  let score, timer, timeLeft, word

  const displayScore = () => gameDoc.display(scoreDisplay, score)

  const displayWord = () => gameDoc.display(wordDisplay, word)

  const displayTime = () => gameDoc.displayTime(timeDisplay, timeLeft)

  const setTimer = () => timer = setTimeout(() => { tick() }, 1000)

  const tick = () => {
    --timeLeft
    displayTime()
    if (timeLeft < 1) {
      gameOver()
      return
    }
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
    gameDoc.disable(nextButton)
    gameDoc.disable(skipButton)
  }

  const getNextWord = () => {
    ++score
    word = wordList.getRandom()
    displayWord()
    displayScore()
  }

  const skipWord = () => {
    word = wordList.getRandom()
    displayWord()
  }

  const newGame = () => {
    gameDoc.enable(nextButton)
    gameDoc.enable(skipButton)
    score = -1
    getNextWord()
    resetTimer()
  }

  gameDoc.disable(skipButton)
  gameDoc.disable(nextButton)
  gameDoc.attachClick(nextButton, getNextWord)
  gameDoc.attachClick(skipButton, skipWord)
  gameDoc.attachClick(newButton, newGame)

})(document)

