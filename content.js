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
      altWordsHTML += `<li><a style='color: #ff0429' id="dem-alternative-${
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
      <h2 style='margin-bottom: 20px'>Deine ersetzten Worte</h2>
      <div>
        <ul>
          ${arrUserKeywordsHTML}
        </ul>
      </div>
    </div>
    <div class="addWords" style="min-width: 300px">
      <h2 id="de-markierung-text" style='margin-bottom: 20px'> \
        Was würdest du statt '${currentKeyword}' sagen? \
      </h2> \
      <div class="de-markierung-inputs"> \
        <input class="input" id="demWordInput" style='border: 1px solid black' type="input"/> \
        <input class="input" type="submit" value="Ersetzen"/> \
       </div>
      <div>
      <span >Vielleicht eines dieser Worte?</span>
        <ul style='margin-top: 10px'>
          ${altWordsHTML}
        </ul>
      </span>
    </div>
    <a href='mailto:demarkierung@gmail.de?subject=de-markierung&body=${arrUserKeywordsHTML}' id="dem-send" style='position: absolute; top: 0; left: 0;'>Sende Mail</a>
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
  },
  {
    ranking: ['Afrikaner'],
    _id: '5d023a89ee9aab00174321a4',
    key: 'Afrikaner',
    alternatives: [
      {
        selected: 1,
        word: 'Mensch'
      }
    ],
    __v: 0
  }
]

const arrBlacklistedReplElements = ['span', 'a']
const arrBlacklistedHighLightElements = []
let article
let whitelist = ['p', 'span', 'h3', 'em']

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
  'https://www.mopo.de/news/politik-wirtschaft/schockierende-fotos-polizei-kontrolliert-auto-und-findet-fluechtling-im-handschuhfach-32610226' || 'https://www.mopo.de/sport/hsv/hsv-sakai-offen-wie-nie---ich-habe-mich-dafuer-geschaemt--dass-ich-halber-auslaender-war--32338050'
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

if (
  window.location.href ===
  'https://www.bild.de/politik/ausland/politik-ausland/alan-kurdi-deutsches-rettungsschiff-von-malta-abgewiesen-63138842.bild.html'
) {
  article = document.querySelector(
    '#innerWrapper > main > div:nth-child(1) > div > article > div.txt'
  )
}

if (
  window.location.href ===
  'https://www.spiegel.de/politik/ausland/clint-in-texas-hunderte-migrantenkinder-aus-umstrittenem-us-grenzlager-gebracht-a-1274130.html'
) {
  article = document.querySelector(
    '#content-main > div.spArticleContent'
  )
}

if (
  window.location.href ===
  'https://www.stern.de/politik/deutschland/neuregelungen-bei-migration-und-abschiebung--was-bringt-das-gesetzespaket--8745258.html'
) {
  article = document.querySelector(
    '#main-wrapper > main > article > div.article-content > div.rtf-content-wrapper'
  )
}

init()
