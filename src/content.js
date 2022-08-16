const messageReceived = (message, sender, sendResponse) => {
  console.log("you don't like", message.txt)
  currentKeyword = message.txt
  createMenu(message.txt)
}

const getAlternatives = currentKeyword => {
  let ret = []
  arrKeywords.forEach(wordEntry => {
    if (currentKeyword === wordEntry.key) {
      ret = wordEntry.alternatives
    }
  })
  return ret
}

const createMenu = currentKeyword => {
  altWords = getAlternatives(currentKeyword)
  altWordsHTML = ''

  if (altWords.length > 0) {
    for (let i = 0; i < altWords.length; i++) {
      altWordsHTML += `<li><a style='color: #ff0429; font-size: 15px' id="dem-alternative-${
        altWords[i].word
      }">${altWords[i].word}</a></li>`
    }
  } else {
    altWordsHTML = 'keine Vorschläge vorhanden'
  }

  let arrUserKeywordsHTML = ''

  for (let i = 0; i < arrUserKeywords.length; i++) {
    arrUserKeywordsHTML += `<li>${arrUserKeywords[i][0]} -> ${
      arrUserKeywords[i][1]
    }</li>`
  }

  let html = `
  <div class="container" style="display: flex; font-family: arial;width: fit-content">
    <div class="usedWords" style="min-width: 300px">
      <h2 style='margin-bottom: 20px; font-size: 20px;'>Deine ersetzten Worte</h2>
      <div>
        <ul>
          ${arrUserKeywordsHTML}
        </ul>
      </div>
    </div>
    <div class="addWords" style="min-width: 300px">
      <h2 id="de-markierung-text" style='margin-bottom: 20px; font-size: 20px;'> \
        Was würdest du statt '${currentKeyword}' sagen? \
      </h2> \
      <div class="de-markierung-inputs"> \
        <input class="input" id="demWordInput" style='border: 1px solid black' type="input"/> \
        <input class="input" type="submit" value="Ersetzen"/> \
       </div>
      <div>
      <span style="font-size: 15px;">Vielleicht eines dieser Worte?</span>
        <ul style='margin-top: 10px'>
          ${altWordsHTML}
        </ul>
      </span>
    </div>
    <a href='mailto:demarkierung@gmail.de?subject=de-markierung&body=${arrUserKeywordsHTML}' id="dem-send" style='position: relative; display: block; margin-top: 20px; top: 0; left: 0;'>Sende uns deine Liste</a>
    `
  menu = document.createElement('div')
  menu.id = 'de-markierung-menu'
  menu.style =
    'background-color: rgba(0, 0, 0, 0.8); position: fixed; top: 0px; left: 0px; width: 100vw; height: 100vh; color: #ff0429; z-index: 1000;'

  let menuForm = document.createElement('form')
  menuForm.id = 'menuForm'
  menuForm.style =
    'color: #ff0429 !important;width: fit-content; height: auto;margin: auto;margin-top: 20%; padding: 20px;border: 6px solid #ff0429; background-color: white'

  menuForm.innerHTML = html
  menuForm.addEventListener('submit', handleSubmit)

  menu.appendChild(menuForm)
  document.body.insertBefore(menu, document.body.firstChild)

  altWords.forEach(wordObj => {
    document
      .getElementById('dem-alternative-' + wordObj.word)
      .addEventListener('click', handleAltClick)
  })
}

const removeMenu = () => {
  menu = document.getElementById('de-markierung-menu')
  document.body.removeChild(menu)
}

const handleAltClick = e => {
  console.log('alt click', e.target.innerHTML)
  document.getElementById('demWordInput').value = e.target.innerHTML
  let currentFilter = [currentKeyword, e.target.innerHTML]
}

const handleSubmit = e => {
  e.preventDefault()
  let currentFilter = [currentKeyword, e.target.demWordInput.value]
  removeMenu()
  console.log(currentFilter)

  arrUserKeywords.push(currentFilter)
  currentFilter = []
  replaceUserKeywords()
}

const setMenuVisible = isVisable => {
  console.log('toggeling visability')

  let menugBackground = document.getElementById('de-markierung-menu')
  menugBackground.style.display = isVisable ? 'block' : 'none'
}

const init = () => {
  chrome.runtime.onMessage.addListener(messageReceived)

  updateKnownKeywords()
}

let arrBlacklistWords = [
  'Neger',
  'Hitler',
  'Kanake',
  'Schlitzauge',
  'Negerlein',
  'Arschloch',
  'Nigger',
  'Ficker',
  'Muselmann',
  'Penis',
  'Vagina',
  'Muschi',
  'Pimmel',
  'Arsch',
  'Wixer',
  'Hurensohn',
  'Spasti',
  'Spast',
  'Fotze',
  'Rapefugee',
  'Asylinvasor',
  'Penner',
  'Pussy',
  'Fickilant',
  'Flüchtilant',
  'Scheiße',
  'scheiss',
  'Blödmann',
  'Pollacke',
  'Itaker',
  'Hottentotte',
  'Mulatte',
  'Maximalpigmentierter',
  'Maximalpigmentierte',
  'Mokkanase',
  'Asylant',
  'Musel',
  'Burkaschlampe',
  'Burkafotze',
  'Schwuchtel',
  'Tunte',
  'Schwanz',
  'Schwänze',
  'Schwanzlutscher',
  'Zigeuner',
  'Arier',
  'Bastard',
  'Schwarzafrikaner',
  'Tucke',
  'Sack',
  'Säcke'
]

const arrKeywords = []

const arrBlacklistedReplElements = ['span', 'a']
const arrBlacklistedHighLightElements = []
let article
let whitelist = ['p', 'span', 'h3', 'em', 'h2']

let arrUserKeywords = [] // [['Migranten', 'Menschen'], ['Koalition', 'Blaiotion']]
let arr
let currentKeyword = ''

const highlightWordsInText = (inputText, replacementWords) => {
  replacementWords.forEach(keyword => {
    if (arrBlacklistedHighLightElements.indexOf(keyword.key) === -1) {
      inputText = inputText.replace(
        ' ' + keyword.key + ' ',
        '<em style="border-bottom: 2px dotted red">' +
          ' ' +
          keyword.key +
          ' ' +
          '</em>'
      )
      inputText = inputText.replace(
        ' ' + keyword.key.charAt(0).toUpperCase() + keyword.key.slice(1) + ' ',
        '<em style="border-bottom: 2px dotted red">' +
          ' ' +
          keyword.key +
          ' ' +
          '</em>'
      )
    }
  })
  return inputText
}

const replaceWordsInText = (inputText, replacementWords) => {
  replacementWords.forEach(keyword => {
    if (arrBlacklistedReplElements.indexOf(keyword[0]) === -1) {
      inputText = inputText.replace(
        keyword[0],
        '<em style="color:green">' + keyword[1] + '</em>'
      )
    }
  })
  return inputText
}

const updateKnownKeywords = () => {
  whitelist.forEach(element => {
    targetElements = article.querySelectorAll(element)
    targetElements.forEach(element => {
      element.innerHTML = highlightWordsInText(element.innerHTML, arrKeywords)
    })
  })
}

const replaceUserKeywords = () => {
  whitelist.forEach(element => {
    targetElements = article.querySelectorAll(element)
    targetElements.forEach(element => {
      element.innerHTML = replaceWordsInText(element.innerHTML, arrUserKeywords)
    })
  })
}

init()
