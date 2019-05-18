const refreshHighlightedKeywords = () => {
  strippedElements.forEach(function(element) {
    element.innerHTML = highlightKeywords(element.innerHTML, arrKeywords)
  })
}

const stripBlacklistedItems = () => {
  let arrRet = []
  let allNodes = document.getElementsByTagName('*')
  for (let i = 0; i < allNodes.length; i++) {
    let cn = allNodes[i]
    if (!elementIsBlacklisted(cn)) {
      arrRet.push(allNodes[i])
    }
  }
  return arrRet
}

const elementIsBlacklisted = element => {
  ret = false
  for (let i = 0; i < arrBlacklistElements.length; i++) {
    if (element.tagName.toLowerCase() === arrBlacklistElements[i]) {
      ret = true
    }
  }

  return ret
}

const highlightKeywords = (inText, keywords) => {
  for (let i = 0; i < keywords.length; i++) {
    inText = inText.replace(
      new RegExp(keywords[i][0], 'g'),
      '<span style="background-color: red; color: #333">' +
        keywords[i][1] +
        '</span>'
    )
  }
  return inText
}

const messageReceived = (message, sender, sendResponse) => {
  setMenuVisible(true)
  currentFilter[0] = message.txt
}

const setMenuVisible = isVisable => {
  let menugBackground = document.getElementById('de-markierung-menu')
  menugBackground.style.display = isVisable ? 'block' : 'none'
}

const createMenu = () => {
  let html =
    '<h2 id="de-markierung-text"> \
      Womit soll das Wort ersetzt werden? \
    </h2> \
    <div class="de-markierung-inputs"> \
      <input class="input" id="wordInput" type="input"/> \
      <input class="input" type="submit" value="Ersetzen"/> \
    </div>'
  let menu = document.createElement('div')
  menu.id = 'de-markierung-menu'
  menu.style =
    'background-color: #000;background-color: rgb(0, 0, 0, 0.5); position: absolute; top: 0; left: 0;width: 100vw; height: 100vh; border-radius: 5px;'

  let menuForm = document.createElement('form')
  menuForm.id = 'menuForm'
  menuForm.style =
    'width: 400px; height: auto; ackground-color: #555;margin: auto;margin-top: 20%; padding: 20px;'

  menuForm.addEventListener('submit', handleSubmit)

  menuForm.innerHTML = html
  menu.appendChild(menuForm)
  document.body.appendChild(menu)
}

const handleSubmit = e => {
  e.preventDefault()
  setMenuVisible(false)
  currentFilter[1] = e.target.wordInput.value
  arrKeywords.push(currentFilter)
  currentFilter = []
  refreshHighlightedKeywords()
}

const init = () => {
  chrome.runtime.onMessage.addListener(messageReceived)

  refreshHighlightedKeywords()
  createMenu()
  setMenuVisible(false)

  debug()
}

let arrKeywords = []
let currentFilter = []
let arrBlacklistElements = ['head', 'meta', 'title', 'link', 'style', 'script']
let strippedElements = stripBlacklistedItems()

init()
