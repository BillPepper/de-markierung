var arrKeywords = []

var arrBlacklistElements = ['head', 'meta', 'title', 'link', 'style', 'script']
console.log('hello content')

let strippedElements = stripBlacklistedItems()
refreshHighlightedKeywords()
createMenu()
setMenuVisible(false)

function refreshHighlightedKeywords() {
  strippedElements.forEach(function(element) {
    element.innerHTML = highlightKeywords(element.innerHTML, arrKeywords)
  })
}

function stripBlacklistedItems() {
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

function elementIsBlacklisted(element) {
  ret = false
  for (let i = 0; i < arrBlacklistElements.length; i++) {
    if (element.tagName.toLowerCase() === arrBlacklistElements[i]) {
      ret = true
    }
  }

  return ret
}

function highlightKeywords(inText, keywords) {
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

chrome.runtime.onMessage.addListener(messageReceived)

function messageReceived(message, sender, sendResponse) {
  console.log(message)

  setMenuVisible(true)

  arrKeywords.push([message.txt, 'test'])
  refreshHighlightedKeywords()
}

function setMenuVisible(isVisable) {
  let menugBackground = document.getElementById('de-markierung-menu')
  menugBackground.style.display = isVisable ? 'block' : 'none'
}

function createMenu() {
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

  menuForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e.target.wordInput.value)
  })

  menuForm.innerHTML = html
  menu.appendChild(menuForm)
  document.body.appendChild(menu)
}
