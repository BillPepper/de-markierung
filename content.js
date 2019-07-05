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

const debug = () => {
  console.log('hello')
}

const createMenu = currentKeyword => {
  debugger
  altWords = getAlternatives(currentKeyword)
  altWordsHTML = ''

  for (let i = 0; i < altWords.length; i++) {
    altWordsHTML +=
      '<li><a onClick="' +
      console.log(altWords[i].word) +
      '">' +
      altWords[i].word +
      '</a></li>'
  }

  let html = `<h2 id="de-markierung-text"> \
      Womit soll das Wort '${currentKeyword}' werden? \
    </h2> \
    <div class="de-markierung-inputs"> \
      <input class="input" id="wordInput" type="input"/> \
      <input class="input" type="submit" value="Ersetzen"/> \
    </div>
    <div>
      <span>Vielleicht eines dieser hier:</span>
    ${altWordsHTML}
    </span>
    `
  menu = document.createElement('div')
  menu.id = 'de-markierung-menu'
  menu.style =
    'background-color: #000;background-color: rgb(0, 0, 0, 0.8); position: fixed; top: 0; left: 0;width: 100vw; height: 100vh; border-radius: 5px;color: #fff;z-index: 1000'

  let menuForm = document.createElement('form')
  menuForm.id = 'menuForm'
  menuForm.style =
    'width: 400px; height: auto; ackground-color: #555;margin: auto;margin-top: 20%; padding: 20px;'

  menuForm.innerHTML = html
  menuForm.addEventListener('submit', handleSubmit)

  menu.appendChild(menuForm)
  document.body.insertBefore(menu, document.body.firstChild)
}

const removeMenu = () => {
  menu = document.getElementById('de-markierung-menu')
  document.body.removeChild(menu)
}

const handleSubmit = e => {
  e.preventDefault()
  removeMenu()
  // currentFilter[1] = e.target.wordInput.value
  // arrKeywords.push(currentFilter)
  // currentFilter = []
  // refreshHighlightedKeywords()
}

const setMenuVisible = isVisable => {
  debugger
  console.log('toggeling visability')

  let menugBackground = document.getElementById('de-markierung-menu')
  menugBackground.style.display = isVisable ? 'block' : 'none'
}

const highlightKeywords = (inText, keywords) => {
  for (let i = 0; i < keywords.length; i++) {
    try {
      inText = inText.replace(
        new RegExp(keywords[i].key, 'g'),
        '<span style="border-bottom: 2px dotted red">' +
          keywords[i].key +
          '</span>'
      )
    } catch (e) {
      console.log(e, keywords[i])
    }
  }
  return inText
}

const init = () => {
  chrome.runtime.onMessage.addListener(messageReceived)

  refreshHighlightedKeywords()
}

let arrKeywords = [
  // {
  //   ranking: ['cumque'],
  //   _id: '5d023a89ee9aab00174321a4',
  //   key: 'dignissimos',
  //   alternatives: [
  //     {
  //       selected: 1,
  //       word: 'cumque'
  //     }
  //   ],
  //   __v: 0
  // },
  {
    ranking: ['AfD'],
    _id: '5d023a89ee9aab00174321a4',
    key: 'AfD',
    alternatives: [
      {
        selected: 1,
        word: 'Schwachmatenpartei'
      },
      {
        selected: 1,
        word: 'Hetzpartei'
      }
    ],
    __v: 0
  },
  {
    ranking: ['provident'],
    _id: '5d023a89ee9aab00174321a4',
    key: 'provident',
    alternatives: [
      {
        selected: 1,
        word: 'xxx'
      },
      {
        selected: 1,
        word: 'yyy'
      }
    ],
    __v: 0
  },
  {
    ranking: ['blablatag'],
    _id: '5d023a89ee9aab00174321a4',
    key: 'Bundestag',
    alternatives: [
      {
        selected: 1,
        word: 'blablatag'
      }
    ],
    __v: 0
  },
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
    _id: { $oid: '5d03ad2b1888011447fb3bbf' },
    key: 'fluchtbewegung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fluchtbeförderung', selected: { $numberInt: '1' } },
      { word: 'menschenverschiebung', selected: { $numberInt: '1' } }
    ],
    ranking: ['fluchtbeförderung', 'menschenverschiebung']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bc0' },
    key: 'flüchtlingsroute',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terranautenroute', selected: { $numberInt: '1' } },
      { word: 'menschenstrecke', selected: { $numberInt: '1' } }
    ],
    ranking: ['terranautenroute', 'menschenstrecke']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bc1' },
    key: 'fluchtbewegungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fluchtbeförderungen', selected: { $numberInt: '1' } },
      { word: 'menschenverschiebungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['fluchtbeförderungen', 'menschenverschiebungen']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bc2' },
    key: 'flüchtlingsunterkünfte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdächer', selected: { $numberInt: '1' } },
      { word: 'bretterverschläge', selected: { $numberInt: '1' } },
      { word: 'absteigehochkünfte', selected: { $numberInt: '1' } }
    ],
    ranking: ['obdächer', 'bretterverschläge', 'absteigehochkünfte']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bc3' },
    key: 'flüchtlingskonventionen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'regelwerke', selected: { $numberInt: '1' } }],
    ranking: ['regelwerke']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bc5' },
    key: 'flüchtlingsheim',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zelle', selected: { $numberInt: '1' } },
      { word: 'fluchtcontainer', selected: { $numberInt: '1' } },
      { word: 'tierheim', selected: { $numberInt: '1' } },
      { word: 'wohnort', selected: { $numberInt: '1' } }
    ],
    ranking: ['zelle', 'fluchtcontainer', 'tierheim']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bc6' },
    key: 'flüchtlingskrise',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'entscheidungskrise', selected: { $numberInt: '1' } },
      { word: 'menschenkrise', selected: { $numberInt: '1' } },
      { word: 'flüchtlingsschnitzel', selected: { $numberInt: '1' } },
      { word: 'ratlosigkeit', selected: { $numberInt: '1' } },
      { word: 'freundesempfang', selected: { $numberInt: '1' } },
      { word: 'politikkrise', selected: { $numberInt: '1' } }
    ],
    ranking: ['entscheidungskrise', 'menschenkrise', 'flüchtlingsschnitzel']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bc7' },
    key: 'flüchtlingswelle',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenanstiegswelle', selected: { $numberInt: '1' } },
      { word: 'donauwelle', selected: { $numberInt: '1' } },
      { word: 'mischwelle', selected: { $numberInt: '1' } },
      { word: 'bewegung', selected: { $numberInt: '1' } },
      { word: 'zuwachs', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenanstiegswelle', 'donauwelle', 'mischwelle']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bc8' },
    key: 'flüchtlingsheime',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zellen', selected: { $numberInt: '1' } },
      { word: 'fluchtcontainer', selected: { $numberInt: '1' } },
      { word: 'tierheime', selected: { $numberInt: '1' } },
      { word: 'wohnorte', selected: { $numberInt: '1' } }
    ],
    ranking: ['zellen', 'fluchtcontainer', 'tierheime']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bca' },
    key: 'flüchtlingskosten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenhaltungskosten', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenhaltungskosten']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bcb' },
    key: 'flüchtlingszuzug',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenzuwachs', selected: { $numberInt: '1' } },
      { word: 'bevölkerungswachstum', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenzuwachs', 'bevölkerungswachstum']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bcd' },
    key: 'flüchtlingslager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschencampus', selected: { $numberInt: '1' } },
      { word: 'menschenspeicher', selected: { $numberInt: '1' } },
      { word: 'massenhaltungslager', selected: { $numberInt: '1' } },
      { word: 'menschenlager', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschencampus', 'menschenspeicher', 'massenhaltungslager']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018d' },
    key: 'flüchtlingsabkommen',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'menschenlebenentscheidungsabkommen',
        selected: { $numberInt: '1' }
      },
      { word: 'bootlingauskommen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenlebenentscheidungsabkommen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f051' },
    key: 'einreisepapiere',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zuzugpapiere', selected: { $numberInt: '1' } },
      { word: 'zweireisepapiere', selected: { $numberInt: '1' } }
    ],
    ranking: ['zuzugpapiere', 'zweireisepapiere']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f052' },
    key: 'einwanderungszahlen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'einschleicherzahlen', selected: { $numberInt: '1' } },
      { word: 'zweiwanderungsquote', selected: { $numberInt: '1' } }
    ],
    ranking: ['einschleicherzahlen', 'zweiwanderungsquote']
  }
]

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

const arrBlacklistElements = [
  'head',
  'meta',
  'title',
  'link',
  'style',
  'script',
  'ul',
  'html',
  'iframe',
  'img',
  'noscript',
  'br',
  'ul'
]
const strippedElements = stripBlacklistedItems()
let arrUsedKeyword = []
let currentKeyword = ''

init()
