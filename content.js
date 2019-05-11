// var arrKeywords = [
//   // FIXME: fix case sensitivity
//   ['Tempora', 'COOL'],
//   ['Nulla', 'GREAT'],
//   ['Headlines', 'blabbelblubs']
// ]

var arrKeywords = []

var arrBlacklistElements = ['head', 'meta', 'title', 'link', 'style', 'script']

let strippedElements = stripBlacklistedItems()
refreshHighlightedKeywords()
createMenu()

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

  let text = document.getElementById('de-markierung-text')
  text.innerHTML = 'Womit soll das Wort "' + message.txt + '" ersetzt werden'
  // arrKeywords.push([message.txt, 'test'])
  // refreshHighlightedKeywords()

  let wButton = document.getElementById('de-markierung-menu-button')
  wButton.addEventListener('click', handleAccept)
}

function handleAccept() {
  let wInput = document.getElementById('de-markierung-input')
  console.log(wInput.innerHTML)
}

function setMenuVisible(isVisable) {
  let menugBackground = document.getElementById('de-markierung-menubg')
  menugBackground.style.display = isVisable ? 'block' : 'none'
}

function createMenu() {
  let menugBackground = document.createElement('div')
  menugBackground.id = 'de-markierung-menubg'
  menugBackground.style =
    'background-color: #000;background-color: rgb(0, 0, 0, 0.5); position: absolute; top: 0; left: 0;width: 100vw; height: 100vh; border-radius: 5px;'

  menugBackground.style.display = 'none'

  let menu = document.createElement('div')
  menu.id = 'de-markierung-menu'
  menu.style =
    'width: 300px; height: 100px; background-color: #555;margin: auto;margin-top: 20%; padding: 20px;'

  let text = document.createElement('h4')
  text.id = 'de-markierung-text'
  text.innerHTML = 'Womit soll das Wort XYZ ersetzt werden?'

  let wInput = document.createElement('input')
  wInput.id = 'de-markierung-input'

  let wButton = document.createElement('button')
  wButton.id = 'de-markierung-menu-button'
  wButton.innerHTML = 'Ersetzen'

  menugBackground.appendChild(menu)
  menu.appendChild(text)
  menu.appendChild(wInput)
  menu.appendChild(wButton)
  document.body.appendChild(menugBackground)
}
