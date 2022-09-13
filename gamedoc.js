export default function(doc) {
  const guardedEvent = (e, block) => {
    e.preventDefault()
    if (e.target.getAttribute('data-disabled')) {
      return
    }
    block()
  }

  const attachClick = (selector, handler) => {
    doc.querySelectorAll(selector).forEach(el => el.addEventListener('click', e => guardedEvent(e, handler)))
  }

  const display = (selector, text) => {
    const elements = doc.querySelectorAll(selector)
    elements.forEach(el => el.innerText = `${text}`)
  }

  const setAttribute = (selector, attribute, value) => {
    doc.querySelectorAll(selector).forEach(el => el.setAttribute(attribute, value))
  }

  const removeAttribute = (selector, attribute) => {
    doc.querySelectorAll(selector).forEach(el => el.removeAttribute(attribute))
  }

  const displayTime = (selector, time) => display(selector, humanTime(time))

  const humanTime = (time) => `${minutes(time)}:${seconds(time)}`

  const minutes = (time) => Math.floor(time/60)

  const seconds = (time) => (time % 60).toString().padStart(2, '0')

  const disable = (selector) => setAttribute(selector, "data-disabled", true)

  const enable = (selector) => removeAttribute(selector, "data-disabled")

  return { attachClick, disable, display, displayTime, enable };
}
