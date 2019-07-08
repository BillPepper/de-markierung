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

  for (let i = 0; i < altWords.length; i++) {
    altWordsHTML += `<li><a id="dem-alternative-${altWords[i].word}">${
      altWords[i].word
    }</a></li>`
  }

  let html = `
  <div class="container" style="display: flex">
    <div class="usedWords" style="min-width: 300px">
      <h2>Deine ersetzten Worte</h2>
      <div>
        <ul>
          <li>lorem   ->    ipsum</li>
          <li>dolor   ->    sit</li>
          <li>amet    ->    contum</li>
        </ul>
      </div>
    </div>
    <div class="addWords" style="min-width: 300px">
      <h2 id="de-markierung-text"> \
        Womit soll das Wort '${currentKeyword}' werden? \
      </h2> \
      <div class="de-markierung-inputs"> \
        <input class="input" id="demWordInput" type="input"/> \
        <input class="input" type="submit" value="Ersetzen"/> \
       </div>
      <div>
      <span>Vielleicht eines dieser hier:</span>
        <ul style="color: white !important">
          ${altWordsHTML}
        </ul>
      </span>
    </div>
    `
  menu = document.createElement('div')
  menu.id = 'de-markierung-menu'
  menu.style =
    'background-color: rgb(0, 0, 0, 0.8); position: fixed; top: 0; left: 0;width: 100vw; height: 100vh; border-radius: 5px;color: #fff;z-index: 1000'

  let menuForm = document.createElement('form')
  menuForm.id = 'menuForm'
  menuForm.style =
    'color: white !important;width: fit-content; height: auto; background-color: #333;margin: auto;margin-top: 20%; padding: 20px;border: 6px solid red;border-radius: 5px;'

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

// const arrKeywords = [
//   ['Afrikaner', 'Mensch'],
//   ['Melilla', 'Ort'],
//   ['span', 'null']
// ]

const arrKeywords = [
  {
    ranking: ['Koalition'],
    _id: '5d023a89ee9aab00174321a4',
    key: 'Koalition',
    alternatives: [
      {
        selected: 1,
        word: 'blablation'
      }
    ],
    __v: 0
  }
]

const arrBlacklistedReplElements = ['span', 'a']
const arrBlacklistedHighLightElements = []
let article
let whitelist = ['p', 'span', 'h3', 'em']

let arrUserKeywords = [['Migranten', 'Menschen'], ['Koalition', 'Blaiotion']]
let arr
let currentKeyword = ''

const highlightWordsInText = (inputText, replacementWords) => {
  replacementWords.forEach(keyword => {
    if (arrBlacklistedHighLightElements.indexOf(keyword.key) === -1) {
      inputText = inputText.replace(
        keyword.key,
        '<em style="color:blue">' + keyword.key + '</em>'
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

if (
  window.location.href ===
  'https://www.mopo.de/news/politik-wirtschaft/schockierende-fotos-polizei-kontrolliert-auto-und-findet-fluechtling-im-handschuhfach-32610226'
) {
  article = document.querySelector(
    '#dm_main_content_container > div.dm_content_block > article > div.dm_article_outer_wrapper'
  )
}

if (
  window.location.href ===
  'https://www.faz.net/aktuell/wirtschaft/fachkraefte-einwanderung-ein-gesetz-fuer-das-sozialsystem-16227043.html'
) {
  article = document.querySelector(
    '#TOP > div.Artikel > article > div.o-ModuleWrapper.o-ModuleWrapper-is-first.o-ModuleWrapper-has-no-bottom-gap > div.o-Grid > div.o-Grid_Col.o-Grid_Col-10.o-Grid_Col-has-offset-of-2'
  )
}

if (
  window.location.href ===
  'https://www.abendblatt.de/hamburg/von-mensch-zu-mensch/article226072947/Ein-Ort-der-Begegnung-fuer-Blankeneser-und-Gefluechtete.html'
) {
  article = document.querySelector(
    'body > div.page-wrapper > div.page.theme-default > main > article'
  )
}

// replaceUserKeywords()
debugger

init()
