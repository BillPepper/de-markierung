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

const arrKeywords = [
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
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f053' },
    key: 'französinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'franzosas', selected: { $numberInt: '1' } },
      { word: 'terranautinnen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuen', 'franzosas']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f054' },
    key: 'schweizerin',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bioschweizerin', selected: { $numberInt: '1' } }],
    ranking: ['bioschweizerin']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc2e' },
    key: 'fachkräfte-einwanderung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schubladen-zweiwanderung', selected: { $numberInt: '1' } }
    ],
    ranking: ['schubladen-zweiwanderung']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc31' },
    key: 'drittstaaten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'dreiviertelstaaten', selected: { $numberInt: '1' } }
    ],
    ranking: ['dreiviertelstaaten']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bce' },
    key: 'flüchtlingsstatus',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'staatslosigkeitsstatus', selected: { $numberInt: '1' } },
      { word: 'ablehnungszustand', selected: { $numberInt: '1' } },
      { word: 'gaststatus', selected: { $numberInt: '1' } }
    ],
    ranking: ['staatslosigkeitsstatus', 'ablehnungszustand', 'gaststatus']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bcf' },
    key: 'flüchtlingsrouten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terranautenrouten', selected: { $numberInt: '1' } },
      { word: 'menschenstrecken', selected: { $numberInt: '1' } }
    ],
    ranking: ['terranautenrouten', 'menschenstrecken']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8232' },
    key: 'rasse',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'kurzhaar', selected: { $numberInt: '1' } },
      { word: 'langhaar', selected: { $numberInt: '1' } },
      { word: 'golden retriever', selected: { $numberInt: '1' } },
      { word: 'dackel', selected: { $numberInt: '1' } },
      { word: 'deutscher schäferhund', selected: { $numberInt: '1' } },
      { word: 'bernhadiner ', selected: { $numberInt: '1' } }
    ],
    ranking: ['kurzhaar', 'langhaar', 'golden retriever']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8233' },
    key: 'dunkelhäutige',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'hautfarbene', selected: { $numberInt: '1' } },
      { word: 'gelbfleischige', selected: { $numberInt: '1' } },
      { word: 'grünstichige', selected: { $numberInt: '1' } },
      { word: 'hellhäutige', selected: { $numberInt: '1' } },
      { word: 'nachtleuchtende', selected: { $numberInt: '1' } },
      { word: 'gräuliche', selected: { $numberInt: '1' } }
    ],
    ranking: ['hautfarbene', 'gelbfleischige', 'grünstichige']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8234' },
    key: 'dschungel',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wald', selected: { $numberInt: '1' } },
      { word: 'baumdickicht', selected: { $numberInt: '1' } },
      { word: 'bäume', selected: { $numberInt: '1' } },
      { word: 'urwald', selected: { $numberInt: '1' } },
      { word: 'undurchdringlichkeit', selected: { $numberInt: '1' } }
    ],
    ranking: ['wald', 'baumdickicht', 'bäume']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8236' },
    key: 'schwarz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gelbfleischig', selected: { $numberInt: '1' } },
      { word: 'grünstichig', selected: { $numberInt: '1' } },
      { word: 'rotpunktiert', selected: { $numberInt: '1' } },
      { word: 'pink', selected: { $numberInt: '1' } },
      { word: 'hautfarbend', selected: { $numberInt: '1' } },
      { word: 'beige', selected: { $numberInt: '1' } },
      { word: 'transparent', selected: { $numberInt: '1' } },
      { word: 'bunt', selected: { $numberInt: '1' } },
      { word: 'nachtleuchtend', selected: { $numberInt: '1' } },
      { word: 'gräulich', selected: { $numberInt: '1' } }
    ],
    ranking: ['gelbfleischig', 'grünstichig', 'rotpunktiert']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8237' },
    key: 'dunkelhäutig',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'hautfarben', selected: { $numberInt: '1' } },
      { word: 'gelbfleischige', selected: { $numberInt: '1' } },
      { word: 'grünstichig', selected: { $numberInt: '1' } },
      { word: 'hellhäutig', selected: { $numberInt: '1' } },
      { word: 'nachleuchtend', selected: { $numberInt: '1' } },
      { word: 'gräulich', selected: { $numberInt: '1' } }
    ],
    ranking: ['hautfarben', 'gelbfleischige', 'grünstichig']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8238' },
    key: 'flüchtlingsbetreuer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootsmenschenaufpasser', selected: { $numberInt: '1' } }
    ],
    ranking: ['bootsmenschenaufpasser']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8239' },
    key: 'migrationshintergrund',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'kulturvordergrund', selected: { $numberInt: '1' } },
      { word: 'menschenhintergrund', selected: { $numberInt: '1' } },
      {
        word: 'außerlandesgrenzliche abstammungsgechichte',
        selected: { $numberInt: '1' }
      },
      { word: 'kultureller vorteil', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'kulturvordergrund',
      'menschenhintergrund',
      'außerlandesgrenzliche abstammungsgechichte'
    ]
  },
  {
    _id: { $oid: '5d054a52188801102cfa823a' },
    key: 'weiß',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'c=0, m=0, y=0, k=0', selected: { $numberInt: '1' } },
      { word: 'papierfarbend', selected: { $numberInt: '1' } },
      { word: 'durchscheinend', selected: { $numberInt: '1' } },
      { word: 'nichtfarbend', selected: { $numberInt: '1' } },
      { word: 'mondfarbend', selected: { $numberInt: '1' } }
    ],
    ranking: ['c=0, m=0, y=0, k=0', 'papierfarbend', 'durchscheinend']
  },
  {
    _id: { $oid: '5d054a52188801102cfa823b' },
    key: 'mischling',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terrier-chihuahua-mix', selected: { $numberInt: '1' } },
      { word: 'sächsischbayer', selected: { $numberInt: '1' } },
      { word: 'schlammblut', selected: { $numberInt: '1' } },
      { word: 'muggel', selected: { $numberInt: '1' } },
      { word: 'südnorde', selected: { $numberInt: '1' } },
      { word: 'cocktail', selected: { $numberInt: '1' } }
    ],
    ranking: ['terrier-chihuahua-mix', 'sächsischbayer', 'schlammblut']
  },
  {
    _id: { $oid: '5d054a52188801102cfa823d' },
    key: 'flüchtlingsboot',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenboot', selected: { $numberInt: '1' } },
      { word: 'fluchtjolle', selected: { $numberInt: '1' } },
      { word: 'menschenschute', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenboot', 'fluchtjolle', 'menschenschute']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0165' },
    key: 'ausland',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'exland', selected: { $numberInt: '1' } },
      { word: 'artverwandtenland', selected: { $numberInt: '1' } },
      { word: 'terra', selected: { $numberInt: '1' } },
      { word: 'astroland', selected: { $numberInt: '1' } },
      { word: 'inland', selected: { $numberInt: '1' } },
      { word: 'nachbarplanet', selected: { $numberInt: '1' } }
    ],
    ranking: ['inland', 'artverwandtenland', 'terra']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0168' },
    key: 'deutscher',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutscher', selected: { $numberInt: '1' } },
      { word: 'kartoffelpuffer', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenländer', selected: { $numberInt: '1' } },
      { word: 'zentralmensch', selected: { $numberInt: '1' } },
      { word: 'germane', selected: { $numberInt: '1' } }
    ],
    ranking: ['biodeutscher', 'kartoffelpuffer', 'qualitätswarenländer']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0169' },
    key: 'deutsche',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutsche', selected: { $numberInt: '1' } },
      { word: 'kartoffelpuffer', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenländer', selected: { $numberInt: '1' } },
      { word: 'zentralmenschen', selected: { $numberInt: '1' } },
      { word: 'germanen', selected: { $numberInt: '1' } }
    ],
    ranking: ['biodeutsche', 'kartoffelpuffer', 'qualitätswarenländer']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016a' },
    key: 'gastarbeiterin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'stammgastarbeiterin', selected: { $numberInt: '1' } },
      { word: 'springerin', selected: { $numberInt: '1' } },
      {
        word: 'auslandsbenachteiligungsarbeiterin',
        selected: { $numberInt: '1' }
      },
      { word: 'besuchsarbeiterin', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'stammgastarbeiterin',
      'springerin',
      'auslandsbenachteiligungsarbeiterin'
    ]
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016b' },
    key: 'kopftuchträger',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'kleidungsträger', selected: { $numberInt: '1' } },
      { word: 'kopftuchträger', selected: { $numberInt: '1' } }
    ],
    ranking: ['kleidungsträger', 'kopftuchträger']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016c' },
    key: 'ausländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'exländer', selected: { $numberInt: '1' } },
      { word: 'artverwandter', selected: { $numberInt: '1' } },
      { word: 'inweltler', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'astronauten', selected: { $numberInt: '1' } },
      { word: 'alien', selected: { $numberInt: '1' } },
      { word: 'reproduzenten', selected: { $numberInt: '1' } },
      { word: 'menschen', selected: { $numberInt: '1' } }
    ],
    ranking: ['inländer', 'artverwandter', 'terranaut']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016d' },
    key: 'gastarbeiterinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'stammgastarbeiterinnen', selected: { $numberInt: '1' } },
      { word: 'springerinnen', selected: { $numberInt: '1' } },
      {
        word: 'auslandsbenachteiligungsarbeiterinnen',
        selected: { $numberInt: '1' }
      },
      { word: 'besuchsarbeiterinnen', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'stammgastarbeiterinnen',
      'springerinnen',
      'auslandsbenachteiligungsarbeiterinnen'
    ]
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016e' },
    key: 'gastarbeiter',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'stammgastarbeiter', selected: { $numberInt: '1' } },
      { word: 'springer', selected: { $numberInt: '1' } },
      {
        word: 'auslandsbenachteiligungsarbeiter',
        selected: { $numberInt: '1' }
      },
      { word: 'besuchsarbeiter', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'stammgastarbeiter',
      'springer',
      'auslandsbenachteiligungsarbeiter'
    ]
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016f' },
    key: 'integrationskrise',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anpassungsschwierigkeit', selected: { $numberInt: '1' } },
      { word: 'europakrise', selected: { $numberInt: '1' } },
      { word: 'gruppeneinteilung', selected: { $numberInt: '1' } }
    ],
    ranking: ['anpassungsschwierigkeit', 'europakrise', 'gruppeneinteilung']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0170' },
    key: 'gastarbeit',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'benachteiligungsarbeit', selected: { $numberInt: '1' } }
    ],
    ranking: ['benachteiligungsarbeit']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0171' },
    key: 'ausländisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inländisch', selected: { $numberInt: '1' } },
      { word: 'artverwandt', selected: { $numberInt: '1' } },
      { word: 'terranautisch', selected: { $numberInt: '1' } },
      { word: 'astronautisch', selected: { $numberInt: '1' } },
      { word: 'außerirdisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['inländisch', 'artverwandt', 'terranautisch']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0172' },
    key: 'deutsch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutsch', selected: { $numberInt: '1' } },
      { word: 'kartoffelpuffer', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenländisch', selected: { $numberInt: '1' } },
      { word: 'zentralmenschig', selected: { $numberInt: '1' } },
      { word: 'germanisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['biodeutsch', 'kartoffelpuffer', 'qualitätswarenländisch']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0174' },
    key: 'kopftuchträgerin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'kleidungsträgerin', selected: { $numberInt: '1' } },
      { word: 'kopfträgerin', selected: { $numberInt: '1' } },
      { word: 'hautträgerin', selected: { $numberInt: '1' } }
    ],
    ranking: ['kleidungsträgerin', 'kopftuchträgerin']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0175' },
    key: 'schwarzafrika',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gelbafrika', selected: { $numberInt: '1' } },
      { word: 'rotafrika', selected: { $numberInt: '1' } },
      { word: 'grünpaprika', selected: { $numberInt: '1' } }
    ],
    ranking: ['gelbafrika', 'rotafrika', 'grünpaprika']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0176' },
    key: 'kopftuchmädchen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'haarmädchen', selected: { $numberInt: '1' } },
      { word: 'kleidungsträgerin', selected: { $numberInt: '1' } },
      { word: 'kopfträgerin', selected: { $numberInt: '1' } }
    ],
    ranking: ['haarmädchen', 'kleidungsträgerin', 'kopfträgerin']
  },
  {
    _id: { $oid: '5d0627ef188801018a7a0178' },
    key: 'juden',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'kinder israels', selected: { $numberInt: '1' } },
      { word: 'menschen mit glaube', selected: { $numberInt: '1' } },
      { word: 'gläubige', selected: { $numberInt: '1' } }
    ],
    ranking: ['terranauten', 'kinder israels', 'menschen mit glaube']
  },
  {
    _id: { $oid: '5d0627ef188801018a7a0179' },
    key: 'jude',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'kind israels', selected: { $numberInt: '1' } },
      { word: 'mensch mit glaube', selected: { $numberInt: '1' } },
      { word: 'gläubiger', selected: { $numberInt: '1' } }
    ],
    ranking: ['terranaut', 'kind israels', 'mensch mit glaube']
  },
  {
    _id: { $oid: '5d0627ef188801018a7a017a' },
    key: 'jüdin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terranautin', selected: { $numberInt: '1' } },
      { word: 'kind israels', selected: { $numberInt: '1' } },
      { word: 'mensch mit glaube', selected: { $numberInt: '1' } },
      { word: 'gläubige', selected: { $numberInt: '1' } }
    ],
    ranking: ['terranautin', 'kind israels', 'mensch mit glaube']
  },
  {
    _id: { $oid: '5d062f63188801018a7a017c' },
    key: 'migrantensprache',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mehrsprachlichkeit', selected: { $numberInt: '1' } },
      { word: 'sprachliche vielfalt', selected: { $numberInt: '1' } },
      { word: 'migrantenlingsprache', selected: { $numberInt: '1' } }
    ],
    ranking: ['mehrsprachlichkeit', 'sprachliche vielfalt']
  },
  {
    _id: { $oid: '5d062f63188801018a7a017e' },
    key: 'mörder',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'keine vorschläge', selected: { $numberInt: '1' } },
      { word: 'alternativloser', selected: { $numberInt: '1' } }
    ],
    ranking: ['keine vorschläge', 'alternativloser']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0182' },
    key: 'mörderin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'keine vorschläge', selected: { $numberInt: '1' } },
      { word: 'alternativlose', selected: { $numberInt: '1' } }
    ],
    ranking: ['keine vorschläge', 'alternativlose']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0183' },
    key: 'migrantisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschlich', selected: { $numberInt: '1' } },
      { word: 'multiländisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschlich', 'multiländisch']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0184' },
    key: 'integrationspolitiker',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'politiker mit erhöhter toleranzschwäche',
        selected: { $numberInt: '1' }
      }
    ],
    ranking: ['politiker mit erhöhter toleranzschwäche']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0188' },
    key: 'europäisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'politisch zusammengeschlossen', selected: { $numberInt: '1' } },
      { word: 'einheitlich', selected: { $numberInt: '1' } },
      { word: 'zentralweltisch', selected: { $numberInt: '1' } },
      { word: 'ausschließend', selected: { $numberInt: '1' } }
    ],
    ranking: ['politisch zusammengeschlossen', 'einheitlich', 'ausschließend']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018a' },
    key: 'flüchtlingszahlen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenaufzählung', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenaufzählung']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018b' },
    key: 'franzose',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018c' },
    key: 'spanierinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'menschen aus spanien', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'terranautinnen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'menschen aus spanien', 'individuen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018e' },
    key: 'türke',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus der türkei', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'nachbar', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus der türkei', 'person']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018f' },
    key: 'integrationsprojekt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'eingemeindungsprojekt', selected: { $numberInt: '1' } }
    ],
    ranking: ['eingemeindungsprojekt']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0190' },
    key: 'spanier',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus spanien', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus spanien', 'individuum']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0191' },
    key: 'land',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gebiet mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['gebiet mit grenzen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0192' },
    key: 'europäische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'politisch zusammengeschlossene', selected: { $numberInt: '1' } },
      { word: 'einheitliche', selected: { $numberInt: '1' } },
      { word: 'ausschließende', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'politisch zusammengeschlossene',
      'einheitliche',
      'ausschließende'
    ]
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0193' },
    key: 'spanierin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus spanien', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranautin', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus spanien', 'individuum']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0194' },
    key: 'flüchtlingsschutz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schutzanspruch', selected: { $numberInt: '1' } },
      { word: 'welpenschutz', selected: { $numberInt: '1' } }
    ],
    ranking: ['schutzanspruch', 'welpenschutz']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0195' },
    key: 'spanien',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: ' zweithäufigsten besuchte land der welt',
        selected: { $numberInt: '1' }
      },
      { word: 'gebiet mit grenze', selected: { $numberInt: '1' } }
    ],
    ranking: [' zweithäufigsten besuchte land der welt', 'gebiet mit grenze']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0196' },
    key: 'russe',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus russland', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus russland', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0197' },
    key: 'asiatin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch ', selected: { $numberInt: '1' } },
      { word: 'mensch aus dem kontinent asien', selected: { $numberInt: '1' } },
      { word: 'terranautin', selected: { $numberInt: '1' } },
      { word: 'schwarzhaarige', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch ', 'mensch aus dem kontinent asien', 'terranautin']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0198' },
    key: 'türkin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch aus der türkei', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'nachbarin', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch aus der türkei', 'person', 'bürger']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0199' },
    key: 'frankreich',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'häufigst besuchte land der welt', selected: { $numberInt: '1' } }
    ],
    ranking: ['häufigst besuchte land der welt']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019a' },
    key: 'europa',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'politischer zusammenschluss', selected: { $numberInt: '1' } },
      { word: 'einheit', selected: { $numberInt: '1' } },
      { word: 'gebiet mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['politischer zusammenschluss', 'einheit', 'gebiet mit grenzen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019b' },
    key: 'nationalität',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zugehörigkeitsbegrenzung', selected: { $numberInt: '1' } }
    ],
    ranking: ['zugehörigkeitsbegrenzung']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019c' },
    key: 'türkei',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'siedlungsgebiet', selected: { $numberInt: '1' } },
      { word: 'deutsche urlaubsland', selected: { $numberInt: '1' } },
      { word: 'gebiet mit grenze', selected: { $numberInt: '1' } }
    ],
    ranking: ['siedlungsgebiet', 'deutsche urlaubsland', 'gebiet mit grenze']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019d' },
    key: 'russen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'menschen aus russland', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'menschen aus russland', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019e' },
    key: 'französisch',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschlich', selected: { $numberInt: '1' } }],
    ranking: ['menschlich']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019f' },
    key: 'asiatisch',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschlich', selected: { $numberInt: '1' } }],
    ranking: ['menschlich']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a0' },
    key: 'europäischen',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'politisch zusammengeschlossenen',
        selected: { $numberInt: '1' }
      },
      { word: 'einheitlichen', selected: { $numberInt: '1' } },
      { word: 'zentralweltischen', selected: { $numberInt: '1' } },
      { word: 'ausschließenden', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'politisch zusammengeschlossenen',
      'einheitlichen',
      'ausschließenden'
    ]
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a1' },
    key: 'russin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus russland', selected: { $numberInt: '1' } },
      { word: 'terranautin', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'person ', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus russland', 'terranautin']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a2' },
    key: 'französin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a3' },
    key: 'asien',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gebiet mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['gebiet mit grenzen']
  },

  {
    _id: { $oid: '5d0cac92188801033ce5f04f' },
    key: 'asylbewerberleistungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsleistungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsleistungen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f050' },
    key: 'franzosen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'franzosos', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuen', 'franzosos']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f071' },
    key: 'zuwanderung',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zubewegung', selected: { $numberInt: '1' } }],
    ranking: ['zubewegung']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f073' },
    key: 'zuwanderungssystem',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zubewegungssystem', selected: { $numberInt: '1' } }
    ],
    ranking: ['zubewegungssystem']
  },
  {
    _id: { $oid: '5d062f63188801018a7a017d' },
    key: 'asylunterkunt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'dauernotschlafstelle', selected: { $numberInt: '1' } },
      { word: 'unterbringung', selected: { $numberInt: '1' } },
      { word: 'notfallzuhause', selected: { $numberInt: '1' } },
      { word: 'rettungsort', selected: { $numberInt: '1' } }
    ],
    ranking: ['sozialwohnung', 'unterbringung']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d24' },
    key: 'mehrheiten',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'hoheiten', selected: { $numberInt: '1' } }],
    ranking: ['hoheiten']
  },

  {
    _id: { $oid: '5d17375b188801020270dc0e' },
    key: 'armutsmigration',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'reichtumsstillstand', selected: { $numberInt: '1' } }
    ],
    ranking: ['reichtumsstillstand']
  },
  {
    _id: { $oid: '5d17375b188801020270dc0f' },
    key: 'eu-asylbehörde',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'eu-obdachbehörde', selected: { $numberInt: '1' } },
      { word: 'eu-freistättebehörde', selected: { $numberInt: '1' } },
      { word: 'eu-refugiumsbehörde', selected: { $numberInt: '1' } },
      { word: 'eu-schutzdachbehörde', selected: { $numberInt: '1' } }
    ],
    ranking: ['eu-obdachbehörde', 'eu-freistättebehörde', 'eu-refugiumsbehörde']
  },
  {
    _id: { $oid: '5d17375b188801020270dc18' },
    key: 'europaweit',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zentralweltweit', selected: { $numberInt: '1' } }],
    ranking: ['zentralweltweit']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1a' },
    key: 'un-migrationspakt',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'un-menschenlebenentscheidungspakt',
        selected: { $numberInt: '1' }
      }
    ],
    ranking: ['un-menschenlebenentscheidungspakt']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc2f' },
    key: 'asylrechtsfragen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdachlinksfragen', selected: { $numberInt: '1' } },
      { word: 'freistätterechtsfragen', selected: { $numberInt: '1' } },
      { word: 'schutzdachlinksfragen', selected: { $numberInt: '1' } },
      { word: 'refugiumrechtsfragen', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'obdachlinksfragen',
      'freistätterechtsfragen',
      'schutzdachlinksfragen'
    ]
  },
  {
    _id: { $oid: '5d10f60b188801301ee030aa' },
    key: 'illegale',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'gesetzeswidriges menschendasein',
        selected: { $numberInt: '1' }
      },
      { word: 'verbotene', selected: { $numberInt: '1' } },
      { word: 'unrechtmäßige', selected: { $numberInt: '1' } }
    ],
    ranking: ['gesetzeswidriges menschendasein']
  },
  {
    _id: { $oid: '5d174b40188801020270dc3f' },
    key: 'grenzlager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'einreisestopplager', selected: { $numberInt: '1' } },
      { word: 'gewaltkontrolllager', selected: { $numberInt: '1' } },
      { word: 'machtkontrolllager', selected: { $numberInt: '1' } },
      { word: 'ausnahmelager', selected: { $numberInt: '1' } }
    ],
    ranking: ['einreisestopplager', 'gewaltkontrolllager', 'machtkontrolllager']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a4' },
    key: 'türken',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'menschen aus der türkei', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'nachbarn', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'menschen aus der türkei', 'personen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a5' },
    key: 'asiate',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus dem kontinent asien', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'schwarzhaariger', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus dem kontinent asien', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a6' },
    key: 'flüchtlingspakt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fluchtabkommen', selected: { $numberInt: '1' } },
      { word: 'menschenlebenentscheidungspakt', selected: { $numberInt: '1' } },
      { word: 'ogranisationsbeschluss', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'fluchtabkommen',
      'menschenlebenentscheidungspakt',
      'ogranisationsbeschluss'
    ]
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a7' },
    key: 'französischen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschlichen', selected: { $numberInt: '1' } }],
    ranking: ['menschlichen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a8' },
    key: 'französische',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschliche', selected: { $numberInt: '1' } }],
    ranking: ['menschliche']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a9' },
    key: 'asiaten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      {
        word: 'menschen aus dem kontinent asien',
        selected: { $numberInt: '1' }
      },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'schwarzhaarige', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'menschen aus dem kontinent asien', 'personen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01aa' },
    key: 'migrationspakt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungsabkommen', selected: { $numberInt: '1' } },
      { word: 'menschenlebenentscheidungspakt', selected: { $numberInt: '1' } },
      { word: 'ogranisationsbeschluss', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bewegungsabkommen',
      'menschenlebenentscheidungspakt',
      'ogranisationsbeschluss'
    ]
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01ab' },
    key: 'spanisch',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschlich', selected: { $numberInt: '1' } }],
    ranking: ['menschlich']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01ad' },
    key: 'syrier',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01ae' },
    key: 'südländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'himmelsrichtungsländer', selected: { $numberInt: '1' } }
    ],
    ranking: ['himmelsrichtungsländer']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01af' },
    key: 'national',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'staatlich begrenzt', selected: { $numberInt: '1' } }
    ],
    ranking: ['staatlich begrenzt']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b0' },
    key: 'staat',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'politische kraft', selected: { $numberInt: '1' } },
      { word: 'größenordnung', selected: { $numberInt: '1' } },
      { word: 'machtarm', selected: { $numberInt: '1' } }
    ],
    ranking: ['politische kraft', 'größenordnung', 'machtarm']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b1' },
    key: 'international',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zwischenstaatlich', selected: { $numberInt: '1' } },
      { word: 'zwischenmenschlich', selected: { $numberInt: '1' } }
    ],
    ranking: ['zwischenstaatlich']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b2' },
    key: 'iraker',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b3' },
    key: 'rumänen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuen', 'terranauten']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b4' },
    key: 'internationale',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zwischenstaatliche', selected: { $numberInt: '1' } }
    ],
    ranking: ['zwischenstaatliche']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b5' },
    key: 'bulgare',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b6' },
    key: 'migrationsrecht',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungsrecht', selected: { $numberInt: '1' } },
      { word: 'anspruch auf leben', selected: { $numberInt: '1' } }
    ],
    ranking: ['bewegungsrecht', 'anspruch auf leben']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b7' },
    key: 'bulgaren',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuen', 'terranauten']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b8' },
    key: 'nationale',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'staatlich begrenzte', selected: { $numberInt: '1' } },
      { word: 'zuordnungsgebietliche', selected: { $numberInt: '1' } }
    ],
    ranking: ['staatlich begrenzte']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b9' },
    key: 'rumäne',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01bb' },
    key: 'vietnamesische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschliche', selected: { $numberInt: '1' } },
      { word: 'individuelle', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschliche', 'individuelle']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01bc' },
    key: 'vietnamesisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschlich', selected: { $numberInt: '1' } },
      { word: 'individuell', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschlich', 'individuell']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01bd' },
    key: 'aufenthaltungsgestattung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsgestattung', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsgestattung']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01be' },
    key: 'staatsangehörigkeit',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'machtangehörigkeit', selected: { $numberInt: '1' } },
      { word: 'berechtigungsdasein', selected: { $numberInt: '1' } },
      { word: 'gebietsangehörigkeit', selected: { $numberInt: '1' } }
    ],
    ranking: ['machtangehörigkeit', 'berechtigungsdasein']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01bf' },
    key: 'vietnam',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gebiet mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['gebiet mit grenzen']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01c0' },
    key: 'vietnamesinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'terranautinnen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'terranautinnen', 'personen']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01c1' },
    key: 'vietnamesen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'terranauten', 'personen']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235f8' },
    key: 'einwanderin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'immigrantin', selected: { $numberInt: '1' } },
      { word: 'ins-land-stürmende', selected: { $numberInt: '1' } },
      { word: 'einschleicherin', selected: { $numberInt: '1' } },
      { word: 'zweiwanderin', selected: { $numberInt: '1' } }
    ],
    ranking: ['immigrantin', 'ins-land-stürmende', 'einschleicherin']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235f9' },
    key: 'grenzwertig',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'hochwertig', selected: { $numberInt: '1' } }],
    ranking: ['hochwertig']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fa' },
    key: 'migrationsdebatte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenverhandlung', selected: { $numberInt: '1' } },
      { word: 'menschendebatte', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenverhandlung', 'menschendebatte']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fb' },
    key: 'einwanderer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'immigrant', selected: { $numberInt: '1' } },
      { word: 'zweiwanderer', selected: { $numberInt: '1' } },
      { word: 'einzeller', selected: { $numberInt: '1' } },
      { word: 'ins-land-stürmende', selected: { $numberInt: '1' } },
      { word: 'einschleicher', selected: { $numberInt: '1' } },
      { word: 'vielwanderer', selected: { $numberInt: '1' } }
    ],
    ranking: ['immigrant', 'ins-land-stürmende', 'einschleicher']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fc' },
    key: 'asylbewerberin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'antragsschreiberin', selected: { $numberInt: '1' } },
      { word: 'zwangsbürokratin', selected: { $numberInt: '1' } },
      { word: 'schreiberling', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'hoffnungsträgerin', selected: { $numberInt: '1' } },
      { word: 'zufluchtsuchende', selected: { $numberInt: '1' } },
      { word: 'daseinsbewerber', selected: { $numberInt: '1' } }
    ],
    ranking: ['antragsschreiberin', 'zwangsbürokratin', 'schreiberling']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fd' },
    key: 'asylbewerber',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsbewerber', selected: { $numberInt: '1' } },
      { word: 'antragsschreibender', selected: { $numberInt: '1' } },
      { word: 'zwangsbürokrat', selected: { $numberInt: '1' } },
      { word: 'schreiberling', selected: { $numberInt: '1' } },
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'hoffnungsträger', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsbewerber', 'antragsschreibender', 'zwangsbürokrat']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fe' },
    key: 'einwanderung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bakterielles wachstum', selected: { $numberInt: '1' } },
      { word: 'zweiwanderung', selected: { $numberInt: '1' } },
      { word: 'einbleibung', selected: { $numberInt: '1' } },
      { word: 'vielwanderung', selected: { $numberInt: '1' } },
      { word: 'doppelwanderung', selected: { $numberInt: '1' } },
      { word: 'milchsäurebakterienvermehrung', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bakterielles wachstum',
      'zweiwanderung',
      'milchsäurebakterienvermehrung'
    ]
  },
  {
    _id: { $oid: '5d0b815618880101cd2235ff' },
    key: 'bleiberecht',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bleibelinks', selected: { $numberInt: '1' } }],
    ranking: ['bleibelinks']
  },
  {
    _id: { $oid: '5d0b816818880101cd223601' },
    key: 'migrantische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschliche', selected: { $numberInt: '1' } },
      { word: 'multiländische', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschliche', 'multiländische']
  },
  {
    _id: { $oid: '5d0b817818880101cd223602' },
    key: 'migrantischen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschlichen', selected: { $numberInt: '1' } },
      { word: 'multiländischen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschlichen', 'multiländischen']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8231' },
    key: 'flüchtlingsbetreuerin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingspasserin', selected: { $numberInt: '1' } },
      { word: 'lieblingsbetreuerin', selected: { $numberInt: '1' } },
      { word: 'menschlingaufpasserin', selected: { $numberInt: '1' } }
    ],
    ranking: ['bootsmenschenaufpasserin']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f055' },
    key: 'flüchtling',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schreiberling', selected: { $numberInt: '1' } },
      { word: 'bootling', selected: { $numberInt: '1' } },
      { word: 'liebling', selected: { $numberInt: '1' } },
      { word: 'menschling', selected: { $numberInt: '1' } },
      { word: 'schützling', selected: { $numberInt: '1' } },
      { word: 'prüfling', selected: { $numberInt: '1' } },
      { word: 'brückenling', selected: { $numberInt: '1' } },
      { word: 'schlauchbootling', selected: { $numberInt: '1' } }
    ],
    ranking: ['schreiberling', 'bootling', 'liebling']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f056' },
    key: 'schweizer',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bioschweizer', selected: { $numberInt: '1' } }],
    ranking: ['bioschweizer']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f057' },
    key: 'zugehörigkeit',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'landgehörigkeit ', selected: { $numberInt: '1' } }],
    ranking: ['landgehörigkeit ']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f058' },
    key: 'migrantinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'subjekte', selected: { $numberInt: '1' } },
      { word: 'multiländerinnen', selected: { $numberInt: '1' } },
      { word: 'terranautinnen', selected: { $numberInt: '1' } },
      { word: 'kämpferinnen', selected: { $numberInt: '1' } },
      { word: 'zugereiste', selected: { $numberInt: '1' } },
      { word: 'charakterinnen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'subjekte', 'multiländerinnen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f059' },
    key: 'deutschstämmigen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'germanostämmigen', selected: { $numberInt: '1' } }],
    ranking: ['germanostämmigen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05a' },
    key: 'aufenthaltsgenehmigung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsgenehmigung', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsgenehmigung']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05b' },
    key: 'schweizerinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bioschweizerinnen', selected: { $numberInt: '1' } }
    ],
    ranking: ['bioschweizerinnen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05c' },
    key: 'registrierungslager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'massenhaltungseinweisungslager', selected: { $numberInt: '1' } },
      { word: 'importannahmungslager', selected: { $numberInt: '1' } },
      { word: 'empfangslager', selected: { $numberInt: '1' } },
      { word: 'einweisungslager', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'massenhaltungseinweisungslager',
      'importannahmungslager',
      'empfangslager'
    ]
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05d' },
    key: 'deutschstämmige',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'germanostämmige', selected: { $numberInt: '1' } }],
    ranking: ['germanostämmige']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05e' },
    key: 'deutschstämmig',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'germanostämmig', selected: { $numberInt: '1' } }],
    ranking: ['germanostämmig']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05f' },
    key: 'flüchtlinge',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schreiberlinge', selected: { $numberInt: '1' } },
      { word: 'bootlinge', selected: { $numberInt: '1' } },
      { word: 'lieblinge', selected: { $numberInt: '1' } },
      { word: 'menschlinge', selected: { $numberInt: '1' } },
      { word: 'schützlinge', selected: { $numberInt: '1' } },
      { word: 'prüflinge', selected: { $numberInt: '1' } },
      { word: 'brückenlinge', selected: { $numberInt: '1' } }
    ],
    ranking: ['schreiberlinge', 'bootlinge', 'lieblinge']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f060' },
    key: 'integrationsleistungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zusammenführungsleistungen', selected: { $numberInt: '1' } },
      { word: 'vereinheitlichungsleistungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['zusammenführungsleistungen', 'vereinheitlichungsleistungen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f061' },
    key: 'integrationsleistung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zusammenführungsleistung', selected: { $numberInt: '1' } },
      { word: 'vereinheitlichungsleistung', selected: { $numberInt: '1' } }
    ],
    ranking: ['zusammenführungsleistung', 'vereinheitlichungsleistung']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f063' },
    key: 'ausweispapiere',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anreisepapiere', selected: { $numberInt: '1' } },
      { word: 'bleibeweispapiere', selected: { $numberInt: '1' } },
      { word: 'daseinspapiere', selected: { $numberInt: '1' } }
    ],
    ranking: ['anreisepapiere', 'bleibeweispapiere', 'daseinspapiere']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f064' },
    key: 'überwachungskontrolle',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'unterwachungskontrolle', selected: { $numberInt: '1' } }
    ],
    ranking: ['unterwachungskontrolle']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f065' },
    key: 'ausweispapier',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anweispapier', selected: { $numberInt: '1' } },
      { word: 'bleibeweispapier', selected: { $numberInt: '1' } },
      { word: 'daseinspapier', selected: { $numberInt: '1' } }
    ],
    ranking: ['anweispapier', 'bleibeweispapier', 'daseinspapier']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f066' },
    key: 'ausweise',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anweise', selected: { $numberInt: '1' } },
      { word: 'bleibeweise', selected: { $numberInt: '1' } }
    ],
    ranking: ['anweise', 'bleibeweise']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f067' },
    key: 'grenzkontrollen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'einreisestopps', selected: { $numberInt: '1' } },
      { word: 'gewaltkontrollen', selected: { $numberInt: '1' } },
      { word: 'machtkontrollen', selected: { $numberInt: '1' } }
    ],
    ranking: ['einreisestopps', 'gewaltkontrollen', 'machtkontrollen']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f068' },
    key: 'ausländerfeindlich',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenfeindlich', selected: { $numberInt: '1' } },
      { word: 'inländerfeindlich', selected: { $numberInt: '1' } },
      { word: 'artfeindlich', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenfeindlich', 'inländerfeindlich', 'artfeindlich']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f069' },
    key: 'migrationsbewegungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenbewegung', selected: { $numberInt: '1' } },
      { word: 'menschenverschiebung', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenbewegung', 'menschenverschiebung']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f06a' },
    key: 'ausweis',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anweis', selected: { $numberInt: '1' } },
      { word: 'bleibeweis', selected: { $numberInt: '1' } }
    ],
    ranking: ['anweis', 'bleibeweis']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f06b' },
    key: 'auswanderer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inwanderer', selected: { $numberInt: '1' } },
      { word: 'ausreißer', selected: { $numberInt: '1' } },
      { word: 'exwanderer', selected: { $numberInt: '1' } },
      { word: 'überwanderer', selected: { $numberInt: '1' } }
    ],
    ranking: ['inwanderer', 'ausreißer', 'exwanderer']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f06c' },
    key: 'grenzkontrolle',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'einreisestopp', selected: { $numberInt: '1' } },
      { word: 'gewaltkontrolle', selected: { $numberInt: '1' } },
      { word: 'machtkontrolle', selected: { $numberInt: '1' } }
    ],
    ranking: ['einreisestopp', 'gewaltkontrolle', 'machtkontrolle']
  },
  {
    _id: { $oid: '5d0cb1fa188801033ce5f06e' },
    key: 'abschiebungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ausschiebungen', selected: { $numberInt: '1' } },
      { word: 'schiebdenwal', selected: { $numberInt: '1' } },
      { word: 'menschenablehnung', selected: { $numberInt: '1' } }
    ],
    ranking: ['ausschiebungen', 'schiebdenwal', 'menschenablehnung']
  },
  {
    _id: { $oid: '5d0cb1fa188801033ce5f06f' },
    key: 'abschiebung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ausschiebung', selected: { $numberInt: '1' } },
      { word: 'schiebdenwal', selected: { $numberInt: '1' } },
      { word: 'menschenablehnung', selected: { $numberInt: '1' } }
    ],
    ranking: ['ausschiebung', 'schiebdenwal', 'menschenablehnung']
  },
  {
    _id: { $oid: '5d054a52188801102cfa823c' },
    key: 'flüchtlingshelfer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingshelfer', selected: { $numberInt: '1' } },
      { word: 'lieblingshelfer', selected: { $numberInt: '1' } },
      { word: 'menschlingshelfer', selected: { $numberInt: '1' } }
    ],
    ranking: ['überseehelfer']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8235' },
    key: 'flüchtlingshelferin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingshelferin', selected: { $numberInt: '1' } },
      { word: 'lieblingshelferin', selected: { $numberInt: '1' } },
      { word: 'menschlingshelferin', selected: { $numberInt: '1' } }
    ],
    ranking: ['überseehelferin']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f072' },
    key: 'flüchtlingspolitik',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'lieblingspolitik', selected: { $numberInt: '1' } },
      { word: 'bootlingspolitik', selected: { $numberInt: '1' } },
      { word: 'menschlingspolitik', selected: { $numberInt: '1' } }
    ],
    ranking: ['lieblingspolitik', 'bootlingspolitik', 'menschlingspolitik']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f074' },
    key: 'migrationspolitik',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bewegungspolitik', selected: { $numberInt: '1' } }],
    ranking: ['bewegungspolitik']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f075' },
    key: 'ankommende',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'einfindende', selected: { $numberInt: '1' } }],
    ranking: ['einfindende']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f076' },
    key: 'islamisierung',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'religionsgemeinschaftsausbreitung',
        selected: { $numberInt: '1' }
      }
    ],
    ranking: ['religionsgemeinschaftsausbreitung']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f077' },
    key: 'aufenthaltsbewilligung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsbewilligung', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsbewilligung']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f078' },
    key: 'abschiebewilligen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'rausschiebewilligen', selected: { $numberInt: '1' } }
    ],
    ranking: ['rausschiebewilligen']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f079' },
    key: 'migrationspolitisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungspolitisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['bewegungspolitisch']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07a' },
    key: 'abgelehnte',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'angelehnte', selected: { $numberInt: '1' } }],
    ranking: ['angelehnte']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07b' },
    key: 'abschiebewillig',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'rausschiebewillig', selected: { $numberInt: '1' } }
    ],
    ranking: ['rausschiebewillig']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07c' },
    key: 'entwicklungshilfe',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'entfaltungshilfe', selected: { $numberInt: '1' } }],
    ranking: ['entfaltungshilfe']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07d' },
    key: 'italianisierung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'landesgemeinschaftsverbreitung', selected: { $numberInt: '1' } }
    ],
    ranking: ['landesgemeinschaftsverbreitung']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07e' },
    key: 'angekommen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'eingefunden', selected: { $numberInt: '1' } }],
    ranking: ['eingefunden']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07f' },
    key: 'abschiebewillige',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'rausschiebewillige', selected: { $numberInt: '1' } }
    ],
    ranking: ['rausschiebewillige']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f080' },
    key: 'migrationsgeschichte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'vergangenheit', selected: { $numberInt: '1' } },
      { word: 'bewegungsgeschichte', selected: { $numberInt: '1' } }
    ],
    ranking: ['vergangenheit', 'bewegungsgeschichte']
  },
  {
    _id: { $oid: '5d062f63188801018a7a017f' },
    key: 'migrant',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'migrantenling', selected: { $numberInt: '1' } },
      { word: 'multiländer', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'subjekt', selected: { $numberInt: '1' } },
      { word: 'kämpfer', selected: { $numberInt: '1' } },
      { word: 'zugereister', selected: { $numberInt: '1' } },
      { word: 'charakter', selected: { $numberInt: '1' } },
      { word: 'bewegter', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'subjekt', 'multiländer']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d21' },
    key: 'minderheiten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minoritäten', selected: { $numberInt: '1' } },
      { word: 'wenigkeiten', selected: { $numberInt: '1' } },
      { word: 'tiefheiten', selected: { $numberInt: '1' } }
    ],
    ranking: ['minoritäten', 'wenigkeiten', 'tiefheiten']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d22' },
    key: 'ausländische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inländische', selected: { $numberInt: '1' } },
      { word: 'menschliche', selected: { $numberInt: '1' } },
      { word: 'artverwandte', selected: { $numberInt: '1' } },
      { word: 'terranautische', selected: { $numberInt: '1' } },
      { word: 'astronautische', selected: { $numberInt: '1' } },
      { word: 'außerirdische', selected: { $numberInt: '1' } }
    ],
    ranking: ['inländische', 'menschliche', 'artverwandte']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d23' },
    key: 'asylsuchende',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'notfallzuhaussuchende', selected: { $numberInt: '1' } },
      { word: 'daseinssuchende', selected: { $numberInt: '1' } },
      { word: 'rettungssuchende', selected: { $numberInt: '1' } }
    ],
    ranking: ['notfallzuhaussuchende', 'daseinssuchende', 'rettungssuchende']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d25' },
    key: 'mehrheit',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'hoheit', selected: { $numberInt: '1' } }],
    ranking: ['hoheit']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d26' },
    key: 'minderheit',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minorität', selected: { $numberInt: '1' } },
      { word: 'wenigkeit', selected: { $numberInt: '1' } },
      { word: 'tiefheit', selected: { $numberInt: '1' } }
    ],
    ranking: ['minorität', 'wenigkeit', 'tiefheit']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d27' },
    key: 'moslem',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gläubiger', selected: { $numberInt: '1' } }],
    ranking: ['gläubiger']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d28' },
    key: 'zigeuner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'sinti und roma', selected: { $numberInt: '1' } }],
    ranking: ['sinti und roma']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d29' },
    key: 'entwicklungsminister',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'entfaltungsminister', selected: { $numberInt: '1' } }
    ],
    ranking: ['entfaltungsminister']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d2a' },
    key: 'asylrecht',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsrecht', selected: { $numberInt: '1' } },
      { word: 'schutzdachrecht', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsrecht']
  },
  {
    _id: { $oid: '5d0f4ecc18880102de809d2c' },
    key: 'flüchtlingspolitiker',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingspolitiker', selected: { $numberInt: '1' } },
      { word: 'lieblingspolitiker', selected: { $numberInt: '1' } },
      { word: 'menschlingspolitiker', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bootlingspolitiker',
      'lieblingspolitiker',
      'menschlingspolitiker'
    ]
  },
  {
    _id: { $oid: '5d0f4ecc18880102de809d2d' },
    key: 'muslime',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gläubige', selected: { $numberInt: '1' } }],
    ranking: ['gläubige']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d30' },
    key: 'christ',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gläubiger', selected: { $numberInt: '1' } }],
    ranking: ['gläubiger']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d31' },
    key: 'christen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gläubige', selected: { $numberInt: '1' } }],
    ranking: ['gläubige']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d32' },
    key: 'asyl',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdach', selected: { $numberInt: '1' } },
      { word: 'freistätte', selected: { $numberInt: '1' } },
      { word: 'refugium', selected: { $numberInt: '1' } },
      { word: 'schutzdach', selected: { $numberInt: '1' } }
    ],
    ranking: ['obdach', 'freistätte', 'refugium']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d33' },
    key: 'asylverfahren',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdachverfahren', selected: { $numberInt: '1' } },
      { word: 'schutzdachverfahren', selected: { $numberInt: '1' } }
    ],
    ranking: ['obdachverfahren', 'schutzdachverfahren']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d34' },
    key: 'fluchtplan',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'abschiedsplan', selected: { $numberInt: '1' } },
      { word: 'entkommensplan', selected: { $numberInt: '1' } }
    ],
    ranking: ['abschiedsplan', 'entkommensplan']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d35' },
    key: 'fluchtpläne',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'abschiedspläne', selected: { $numberInt: '1' } },
      { word: 'entkommenspläne', selected: { $numberInt: '1' } }
    ],
    ranking: ['abschiedspläne', 'entkommenspläne']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d36' },
    key: 'asylrechtliche',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schutzdachrechtliche', selected: { $numberInt: '1' } }
    ],
    ranking: ['schutzdachrechtliche']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d37' },
    key: 'asylrechtlich',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schutzdachrechtlich', selected: { $numberInt: '1' } }
    ],
    ranking: ['schutzdachrechtlich']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d38' },
    key: 'migrationspolitische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungspolitische', selected: { $numberInt: '1' } }
    ],
    ranking: ['bewegungspolitische']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d39' },
    key: 'asylant',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zuflüchtler', selected: { $numberInt: '1' } },
      { word: 'freistätter', selected: { $numberInt: '1' } },
      { word: 'artverwandter', selected: { $numberInt: '1' } },
      { word: 'weltbewohner', selected: { $numberInt: '1' } },
      { word: 'obdächler', selected: { $numberInt: '1' } }
    ],
    ranking: ['zuflüchtler', 'freistätter', 'artverwandter']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3a' },
    key: 'asylpolitisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdachpolitisch', selected: { $numberInt: '1' } },
      { word: 'schutzdachpolitisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['obdachpolitisch', 'schutzdachpolitisch']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3b' },
    key: 'asylsysytem',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'schutzdachsystem', selected: { $numberInt: '1' } }],
    ranking: ['schutzdachsystem']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3c' },
    key: 'asylanträge',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schutzdachanträge', selected: { $numberInt: '1' } }
    ],
    ranking: ['schutzdachanträge']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3d' },
    key: 'asylante',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdächler', selected: { $numberInt: '1' } },
      { word: 'freidächler', selected: { $numberInt: '1' } },
      { word: 'schutzdächler', selected: { $numberInt: '1' } },
      { word: 'artverwandte', selected: { $numberInt: '1' } }
    ],
    ranking: ['obdächler', 'freidächler', 'schutzdächler']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3e' },
    key: 'asylantrag',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'schutzdachantrag', selected: { $numberInt: '1' } }],
    ranking: ['schutzdachantrag']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3f' },
    key: 'migrationsbewegung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenverschiebung', selected: { $numberInt: '1' } },
      { word: 'wanderungsbewegung', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenverschiebung', 'wanderungsbewegung']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d40' },
    key: 'arbeitsmigration',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'arbeitsbewegung', selected: { $numberInt: '1' } },
      { word: 'arbeitswanderung', selected: { $numberInt: '1' } }
    ],
    ranking: ['arbeitsbewegung', 'arbeitswanderung']
  },
  {
    _id: { $oid: '5d0f614418880102de809d42' },
    key: 'arbeitslager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schöpfungslager', selected: { $numberInt: '1' } },
      { word: 'bemühungslager', selected: { $numberInt: '1' } }
    ],
    ranking: ['schöpfungslager', 'bemühungslager']
  },
  {
    _id: { $oid: '5d0f614418880102de809d44' },
    key: 'grenze',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schranke', selected: { $numberInt: '1' } },
      { word: 'raumrand', selected: { $numberInt: '1' } },
      { word: 'trennfläche', selected: { $numberInt: '1' } }
    ],
    ranking: ['schranke']
  },
  {
    _id: { $oid: '5d0f614418880102de809d46' },
    key: 'grenzschutzpolizei',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertrittpolizei', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankuntertrittpolizei']
  },
  {
    _id: { $oid: '5d0f614418880102de809d47' },
    key: 'grenzschließung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertrittschließung', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankuntertrittschließung']
  },
  {
    _id: { $oid: '5d0f614418880102de809d48' },
    key: 'entwicklungsprogramm',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'entfaltungsprogramm', selected: { $numberInt: '1' } },
      { word: 'abwicklungsprogramme', selected: { $numberInt: '1' } },
      { word: 'anschwellungsprogramm', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'entfaltungsprogramm',
      'abwicklungsprogramme',
      'anschwellungsprogramm'
    ]
  },
  {
    _id: { $oid: '5d0f614418880102de809d49' },
    key: 'einheitsdenken',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zweiheitsdenken', selected: { $numberInt: '1' } }],
    ranking: ['zweiheitsdenken']
  },
  {
    _id: { $oid: '5d0f614418880102de809d4b' },
    key: 'entwicklungsprogramme',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'entfaltungsprogramme', selected: { $numberInt: '1' } },
      { word: 'anschwellungsprogramme', selected: { $numberInt: '1' } },
      { word: 'abwicklungsprogramme', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'entfaltungsprogramme',
      'anschwellungsprogramme',
      'abwicklungsprogramme'
    ]
  },
  {
    _id: { $oid: '5d0f614418880102de809d4c' },
    key: 'einwanderungsbehörde',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweiwanderungsbehörde', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweiwanderungsbehörde']
  },
  {
    _id: { $oid: '5d0f614418880102de809d4d' },
    key: 'grenzmauer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertrittsmauer', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankuntertrittsmauer']
  },
  {
    _id: { $oid: '5d0f614418880102de809d4e' },
    key: 'eu-migrationspolitik',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'eu-bewegungspolitik', selected: { $numberInt: '1' } }
    ],
    ranking: ['eu-bewegungspolitik']
  },
  {
    _id: { $oid: '5d0f614418880102de809d4f' },
    key: 'eindämmung',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zweidämmung', selected: { $numberInt: '1' } }],
    ranking: ['zweidämmung']
  },
  {
    _id: { $oid: '5d0f614418880102de809d50' },
    key: 'migrationsroute',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bewegungsroute', selected: { $numberInt: '1' } }],
    ranking: ['bewegungsroute']
  },
  {
    _id: { $oid: '5d0f614418880102de809d51' },
    key: 'migrationsrouten',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bewegungsrouten', selected: { $numberInt: '1' } }],
    ranking: ['bewegungsrouten']
  },
  {
    _id: { $oid: '5d0f62a818880102de809d53' },
    key: 'sozialleistungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'höchstleistungen', selected: { $numberInt: '1' } },
      { word: 'gültigkeitsleistungen', selected: { $numberInt: '1' } },
      { word: 'wohltätigkeitsleistungen', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'höchstleistungen',
      'gültigkeitsleistungen',
      'wohltätigkeitsleistungen'
    ]
  },
  {
    _id: { $oid: '5d0f62a818880102de809d54' },
    key: 'eu-ausländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'europafremdlinge', selected: { $numberInt: '1' } },
      { word: 'europalinge', selected: { $numberInt: '1' } }
    ],
    ranking: ['europafremdlinge', 'europalinge']
  },
  {
    _id: { $oid: '5d0f62a818880102de809d55' },
    key: 'sozialleistung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'höchstleistung', selected: { $numberInt: '1' } },
      { word: 'gültigkeitsleistung', selected: { $numberInt: '1' } },
      { word: 'wohltätigkeitsleistung', selected: { $numberInt: '1' } }
    ],
    ranking: ['höchstleistung', 'gültigkeitsleistung', 'wohltätigkeitsleistung']
  },
  {
    _id: { $oid: '5d0f62a818880102de809d56' },
    key: 'abschiebehaft',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'anschiebehaft', selected: { $numberInt: '1' } }],
    ranking: ['anschiebehaft']
  },
  {
    _id: { $oid: '5d0f651018880102de809d57' },
    key: 'vaterland',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mutterland', selected: { $numberInt: '1' } }],
    ranking: ['mutterland']
  },
  {
    _id: { $oid: '5d0f651018880102de809d58' },
    key: 'wutbürger',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grollbürger', selected: { $numberInt: '1' } }],
    ranking: ['grollbürger']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308b' },
    key: 'ausländerfeindlichkeit',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inländerfeindlichkeit', selected: { $numberInt: '1' } }
    ],
    ranking: ['inländerfeindlichkeit']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308c' },
    key: 'migrationsgesetze',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungsgesetze ', selected: { $numberInt: '1' } }
    ],
    ranking: ['bewegungsgesetze ']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308d' },
    key: 'rechtspopulisten',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelpopulisten', selected: { $numberInt: '1' } }],
    ranking: ['mittelpopulisten']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308e' },
    key: 'rechtspopulismus',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelpopulismus', selected: { $numberInt: '1' } }],
    ranking: ['mittelpopulismus']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308f' },
    key: 'rechtsextremismus',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mittelextremismus', selected: { $numberInt: '1' } }
    ],
    ranking: ['mittelextremismus']
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
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f053' },
    key: 'französinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'franzosas', selected: { $numberInt: '1' } },
      { word: 'terranautinnen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuen', 'franzosas']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f054' },
    key: 'schweizerin',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bioschweizerin', selected: { $numberInt: '1' } }],
    ranking: ['bioschweizerin']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc2e' },
    key: 'fachkräfte-einwanderung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schubladen-zweiwanderung', selected: { $numberInt: '1' } }
    ],
    ranking: ['schubladen-zweiwanderung']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc31' },
    key: 'drittstaaten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'dreiviertelstaaten', selected: { $numberInt: '1' } }
    ],
    ranking: ['dreiviertelstaaten']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bce' },
    key: 'flüchtlingsstatus',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'staatslosigkeitsstatus', selected: { $numberInt: '1' } },
      { word: 'ablehnungszustand', selected: { $numberInt: '1' } },
      { word: 'gaststatus', selected: { $numberInt: '1' } }
    ],
    ranking: ['staatslosigkeitsstatus', 'ablehnungszustand', 'gaststatus']
  },
  {
    _id: { $oid: '5d03ad2b1888011447fb3bcf' },
    key: 'flüchtlingsrouten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terranautenrouten', selected: { $numberInt: '1' } },
      { word: 'menschenstrecken', selected: { $numberInt: '1' } }
    ],
    ranking: ['terranautenrouten', 'menschenstrecken']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8232' },
    key: 'rasse',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'kurzhaar', selected: { $numberInt: '1' } },
      { word: 'langhaar', selected: { $numberInt: '1' } },
      { word: 'golden retriever', selected: { $numberInt: '1' } },
      { word: 'dackel', selected: { $numberInt: '1' } },
      { word: 'deutscher schäferhund', selected: { $numberInt: '1' } },
      { word: 'bernhadiner ', selected: { $numberInt: '1' } }
    ],
    ranking: ['kurzhaar', 'langhaar', 'golden retriever']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8233' },
    key: 'dunkelhäutige',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'hautfarbene', selected: { $numberInt: '1' } },
      { word: 'gelbfleischige', selected: { $numberInt: '1' } },
      { word: 'grünstichige', selected: { $numberInt: '1' } },
      { word: 'hellhäutige', selected: { $numberInt: '1' } },
      { word: 'nachtleuchtende', selected: { $numberInt: '1' } },
      { word: 'gräuliche', selected: { $numberInt: '1' } }
    ],
    ranking: ['hautfarbene', 'gelbfleischige', 'grünstichige']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8234' },
    key: 'dschungel',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wald', selected: { $numberInt: '1' } },
      { word: 'baumdickicht', selected: { $numberInt: '1' } },
      { word: 'bäume', selected: { $numberInt: '1' } },
      { word: 'urwald', selected: { $numberInt: '1' } },
      { word: 'undurchdringlichkeit', selected: { $numberInt: '1' } }
    ],
    ranking: ['wald', 'baumdickicht', 'bäume']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8236' },
    key: 'schwarz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gelbfleischig', selected: { $numberInt: '1' } },
      { word: 'grünstichig', selected: { $numberInt: '1' } },
      { word: 'rotpunktiert', selected: { $numberInt: '1' } },
      { word: 'pink', selected: { $numberInt: '1' } },
      { word: 'hautfarbend', selected: { $numberInt: '1' } },
      { word: 'beige', selected: { $numberInt: '1' } },
      { word: 'transparent', selected: { $numberInt: '1' } },
      { word: 'bunt', selected: { $numberInt: '1' } },
      { word: 'nachtleuchtend', selected: { $numberInt: '1' } },
      { word: 'gräulich', selected: { $numberInt: '1' } }
    ],
    ranking: ['gelbfleischig', 'grünstichig', 'rotpunktiert']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8237' },
    key: 'dunkelhäutig',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'hautfarben', selected: { $numberInt: '1' } },
      { word: 'gelbfleischige', selected: { $numberInt: '1' } },
      { word: 'grünstichig', selected: { $numberInt: '1' } },
      { word: 'hellhäutig', selected: { $numberInt: '1' } },
      { word: 'nachleuchtend', selected: { $numberInt: '1' } },
      { word: 'gräulich', selected: { $numberInt: '1' } }
    ],
    ranking: ['hautfarben', 'gelbfleischige', 'grünstichig']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8238' },
    key: 'flüchtlingsbetreuer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootsmenschenaufpasser', selected: { $numberInt: '1' } }
    ],
    ranking: ['bootsmenschenaufpasser']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8239' },
    key: 'migrationshintergrund',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'kulturvordergrund', selected: { $numberInt: '1' } },
      { word: 'menschenhintergrund', selected: { $numberInt: '1' } },
      {
        word: 'außerlandesgrenzliche abstammungsgechichte',
        selected: { $numberInt: '1' }
      },
      { word: 'kultureller vorteil', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'kulturvordergrund',
      'menschenhintergrund',
      'außerlandesgrenzliche abstammungsgechichte'
    ]
  },
  {
    _id: { $oid: '5d054a52188801102cfa823a' },
    key: 'weiß',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'c=0, m=0, y=0, k=0', selected: { $numberInt: '1' } },
      { word: 'papierfarbend', selected: { $numberInt: '1' } },
      { word: 'durchscheinend', selected: { $numberInt: '1' } },
      { word: 'nichtfarbend', selected: { $numberInt: '1' } },
      { word: 'mondfarbend', selected: { $numberInt: '1' } }
    ],
    ranking: ['c=0, m=0, y=0, k=0', 'papierfarbend', 'durchscheinend']
  },
  {
    _id: { $oid: '5d054a52188801102cfa823b' },
    key: 'mischling',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terrier-chihuahua-mix', selected: { $numberInt: '1' } },
      { word: 'sächsischbayer', selected: { $numberInt: '1' } },
      { word: 'schlammblut', selected: { $numberInt: '1' } },
      { word: 'muggel', selected: { $numberInt: '1' } },
      { word: 'südnorde', selected: { $numberInt: '1' } },
      { word: 'cocktail', selected: { $numberInt: '1' } }
    ],
    ranking: ['terrier-chihuahua-mix', 'sächsischbayer', 'schlammblut']
  },
  {
    _id: { $oid: '5d054a52188801102cfa823d' },
    key: 'flüchtlingsboot',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenboot', selected: { $numberInt: '1' } },
      { word: 'fluchtjolle', selected: { $numberInt: '1' } },
      { word: 'menschenschute', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenboot', 'fluchtjolle', 'menschenschute']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0165' },
    key: 'ausland',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'exland', selected: { $numberInt: '1' } },
      { word: 'artverwandtenland', selected: { $numberInt: '1' } },
      { word: 'terra', selected: { $numberInt: '1' } },
      { word: 'astroland', selected: { $numberInt: '1' } },
      { word: 'inland', selected: { $numberInt: '1' } },
      { word: 'nachbarplanet', selected: { $numberInt: '1' } }
    ],
    ranking: ['inland', 'artverwandtenland', 'terra']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0168' },
    key: 'deutscher',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutscher', selected: { $numberInt: '1' } },
      { word: 'kartoffelpuffer', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenländer', selected: { $numberInt: '1' } },
      { word: 'zentralmensch', selected: { $numberInt: '1' } },
      { word: 'germane', selected: { $numberInt: '1' } }
    ],
    ranking: ['biodeutscher', 'kartoffelpuffer', 'qualitätswarenländer']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0169' },
    key: 'deutsche',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutsche', selected: { $numberInt: '1' } },
      { word: 'kartoffelpuffer', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenländer', selected: { $numberInt: '1' } },
      { word: 'zentralmenschen', selected: { $numberInt: '1' } },
      { word: 'germanen', selected: { $numberInt: '1' } }
    ],
    ranking: ['biodeutsche', 'kartoffelpuffer', 'qualitätswarenländer']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016a' },
    key: 'gastarbeiterin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'stammgastarbeiterin', selected: { $numberInt: '1' } },
      { word: 'springerin', selected: { $numberInt: '1' } },
      {
        word: 'auslandsbenachteiligungsarbeiterin',
        selected: { $numberInt: '1' }
      },
      { word: 'besuchsarbeiterin', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'stammgastarbeiterin',
      'springerin',
      'auslandsbenachteiligungsarbeiterin'
    ]
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016b' },
    key: 'kopftuchträger',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'kleidungsträger', selected: { $numberInt: '1' } },
      { word: 'kopftuchträger', selected: { $numberInt: '1' } }
    ],
    ranking: ['kleidungsträger', 'kopftuchträger']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016c' },
    key: 'ausländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'exländer', selected: { $numberInt: '1' } },
      { word: 'artverwandter', selected: { $numberInt: '1' } },
      { word: 'inweltler', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'astronauten', selected: { $numberInt: '1' } },
      { word: 'alien', selected: { $numberInt: '1' } },
      { word: 'reproduzenten', selected: { $numberInt: '1' } },
      { word: 'menschen', selected: { $numberInt: '1' } }
    ],
    ranking: ['inländer', 'artverwandter', 'terranaut']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016d' },
    key: 'gastarbeiterinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'stammgastarbeiterinnen', selected: { $numberInt: '1' } },
      { word: 'springerinnen', selected: { $numberInt: '1' } },
      {
        word: 'auslandsbenachteiligungsarbeiterinnen',
        selected: { $numberInt: '1' }
      },
      { word: 'besuchsarbeiterinnen', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'stammgastarbeiterinnen',
      'springerinnen',
      'auslandsbenachteiligungsarbeiterinnen'
    ]
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016e' },
    key: 'gastarbeiter',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'stammgastarbeiter', selected: { $numberInt: '1' } },
      { word: 'springer', selected: { $numberInt: '1' } },
      {
        word: 'auslandsbenachteiligungsarbeiter',
        selected: { $numberInt: '1' }
      },
      { word: 'besuchsarbeiter', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'stammgastarbeiter',
      'springer',
      'auslandsbenachteiligungsarbeiter'
    ]
  },
  {
    _id: { $oid: '5d0626d3188801018a7a016f' },
    key: 'integrationskrise',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anpassungsschwierigkeit', selected: { $numberInt: '1' } },
      { word: 'europakrise', selected: { $numberInt: '1' } },
      { word: 'gruppeneinteilung', selected: { $numberInt: '1' } }
    ],
    ranking: ['anpassungsschwierigkeit', 'europakrise', 'gruppeneinteilung']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0170' },
    key: 'gastarbeit',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'benachteiligungsarbeit', selected: { $numberInt: '1' } }
    ],
    ranking: ['benachteiligungsarbeit']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0171' },
    key: 'ausländisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inländisch', selected: { $numberInt: '1' } },
      { word: 'artverwandt', selected: { $numberInt: '1' } },
      { word: 'terranautisch', selected: { $numberInt: '1' } },
      { word: 'astronautisch', selected: { $numberInt: '1' } },
      { word: 'außerirdisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['inländisch', 'artverwandt', 'terranautisch']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0172' },
    key: 'deutsch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutsch', selected: { $numberInt: '1' } },
      { word: 'kartoffelpuffer', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenländisch', selected: { $numberInt: '1' } },
      { word: 'zentralmenschig', selected: { $numberInt: '1' } },
      { word: 'germanisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['biodeutsch', 'kartoffelpuffer', 'qualitätswarenländisch']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0174' },
    key: 'kopftuchträgerin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'kleidungsträgerin', selected: { $numberInt: '1' } },
      { word: 'kopfträgerin', selected: { $numberInt: '1' } },
      { word: 'hautträgerin', selected: { $numberInt: '1' } }
    ],
    ranking: ['kleidungsträgerin', 'kopftuchträgerin']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0175' },
    key: 'schwarzafrika',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gelbafrika', selected: { $numberInt: '1' } },
      { word: 'rotafrika', selected: { $numberInt: '1' } },
      { word: 'grünpaprika', selected: { $numberInt: '1' } }
    ],
    ranking: ['gelbafrika', 'rotafrika', 'grünpaprika']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0176' },
    key: 'kopftuchmädchen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'haarmädchen', selected: { $numberInt: '1' } },
      { word: 'kleidungsträgerin', selected: { $numberInt: '1' } },
      { word: 'kopfträgerin', selected: { $numberInt: '1' } }
    ],
    ranking: ['haarmädchen', 'kleidungsträgerin', 'kopfträgerin']
  },
  {
    _id: { $oid: '5d0627ef188801018a7a0178' },
    key: 'juden',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'kinder israels', selected: { $numberInt: '1' } },
      { word: 'menschen mit glaube', selected: { $numberInt: '1' } },
      { word: 'gläubige', selected: { $numberInt: '1' } }
    ],
    ranking: ['terranauten', 'kinder israels', 'menschen mit glaube']
  },
  {
    _id: { $oid: '5d0627ef188801018a7a0179' },
    key: 'jude',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'kind israels', selected: { $numberInt: '1' } },
      { word: 'mensch mit glaube', selected: { $numberInt: '1' } },
      { word: 'gläubiger', selected: { $numberInt: '1' } }
    ],
    ranking: ['terranaut', 'kind israels', 'mensch mit glaube']
  },
  {
    _id: { $oid: '5d0627ef188801018a7a017a' },
    key: 'jüdin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'terranautin', selected: { $numberInt: '1' } },
      { word: 'kind israels', selected: { $numberInt: '1' } },
      { word: 'mensch mit glaube', selected: { $numberInt: '1' } },
      { word: 'gläubige', selected: { $numberInt: '1' } }
    ],
    ranking: ['terranautin', 'kind israels', 'mensch mit glaube']
  },
  {
    _id: { $oid: '5d062f63188801018a7a017c' },
    key: 'migrantensprache',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mehrsprachlichkeit', selected: { $numberInt: '1' } },
      { word: 'sprachliche vielfalt', selected: { $numberInt: '1' } },
      { word: 'migrantenlingsprache', selected: { $numberInt: '1' } }
    ],
    ranking: ['mehrsprachlichkeit', 'sprachliche vielfalt']
  },
  {
    _id: { $oid: '5d062f63188801018a7a017e' },
    key: 'mörder',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'keine vorschläge', selected: { $numberInt: '1' } },
      { word: 'alternativloser', selected: { $numberInt: '1' } }
    ],
    ranking: ['keine vorschläge', 'alternativloser']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0182' },
    key: 'mörderin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'keine vorschläge', selected: { $numberInt: '1' } },
      { word: 'alternativlose', selected: { $numberInt: '1' } }
    ],
    ranking: ['keine vorschläge', 'alternativlose']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0183' },
    key: 'migrantisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschlich', selected: { $numberInt: '1' } },
      { word: 'multiländisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschlich', 'multiländisch']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0184' },
    key: 'integrationspolitiker',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'politiker mit erhöhter toleranzschwäche',
        selected: { $numberInt: '1' }
      }
    ],
    ranking: ['politiker mit erhöhter toleranzschwäche']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0188' },
    key: 'europäisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'politisch zusammengeschlossen', selected: { $numberInt: '1' } },
      { word: 'einheitlich', selected: { $numberInt: '1' } },
      { word: 'zentralweltisch', selected: { $numberInt: '1' } },
      { word: 'ausschließend', selected: { $numberInt: '1' } }
    ],
    ranking: ['politisch zusammengeschlossen', 'einheitlich', 'ausschließend']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018a' },
    key: 'flüchtlingszahlen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenaufzählung', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenaufzählung']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018b' },
    key: 'franzose',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018c' },
    key: 'spanierinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'menschen aus spanien', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'terranautinnen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'menschen aus spanien', 'individuen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018e' },
    key: 'türke',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus der türkei', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'nachbar', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus der türkei', 'person']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a018f' },
    key: 'integrationsprojekt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'eingemeindungsprojekt', selected: { $numberInt: '1' } }
    ],
    ranking: ['eingemeindungsprojekt']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0190' },
    key: 'spanier',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus spanien', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus spanien', 'individuum']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0191' },
    key: 'land',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gebiet mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['gebiet mit grenzen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0192' },
    key: 'europäische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'politisch zusammengeschlossene', selected: { $numberInt: '1' } },
      { word: 'einheitliche', selected: { $numberInt: '1' } },
      { word: 'ausschließende', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'politisch zusammengeschlossene',
      'einheitliche',
      'ausschließende'
    ]
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0193' },
    key: 'spanierin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus spanien', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranautin', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus spanien', 'individuum']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0194' },
    key: 'flüchtlingsschutz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schutzanspruch', selected: { $numberInt: '1' } },
      { word: 'welpenschutz', selected: { $numberInt: '1' } }
    ],
    ranking: ['schutzanspruch', 'welpenschutz']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0195' },
    key: 'spanien',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: ' zweithäufigsten besuchte land der welt',
        selected: { $numberInt: '1' }
      },
      { word: 'gebiet mit grenze', selected: { $numberInt: '1' } }
    ],
    ranking: [' zweithäufigsten besuchte land der welt', 'gebiet mit grenze']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0196' },
    key: 'russe',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus russland', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus russland', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0197' },
    key: 'asiatin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch ', selected: { $numberInt: '1' } },
      { word: 'mensch aus dem kontinent asien', selected: { $numberInt: '1' } },
      { word: 'terranautin', selected: { $numberInt: '1' } },
      { word: 'schwarzhaarige', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch ', 'mensch aus dem kontinent asien', 'terranautin']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0198' },
    key: 'türkin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch aus der türkei', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'nachbarin', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch aus der türkei', 'person', 'bürger']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a0199' },
    key: 'frankreich',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'häufigst besuchte land der welt', selected: { $numberInt: '1' } }
    ],
    ranking: ['häufigst besuchte land der welt']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019a' },
    key: 'europa',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'politischer zusammenschluss', selected: { $numberInt: '1' } },
      { word: 'einheit', selected: { $numberInt: '1' } },
      { word: 'gebiet mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['politischer zusammenschluss', 'einheit', 'gebiet mit grenzen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019b' },
    key: 'nationalität',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zugehörigkeitsbegrenzung', selected: { $numberInt: '1' } }
    ],
    ranking: ['zugehörigkeitsbegrenzung']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019c' },
    key: 'türkei',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'siedlungsgebiet', selected: { $numberInt: '1' } },
      { word: 'deutsche urlaubsland', selected: { $numberInt: '1' } },
      { word: 'gebiet mit grenze', selected: { $numberInt: '1' } }
    ],
    ranking: ['siedlungsgebiet', 'deutsche urlaubsland', 'gebiet mit grenze']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019d' },
    key: 'russen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'menschen aus russland', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'menschen aus russland', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019e' },
    key: 'französisch',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschlich', selected: { $numberInt: '1' } }],
    ranking: ['menschlich']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a019f' },
    key: 'asiatisch',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschlich', selected: { $numberInt: '1' } }],
    ranking: ['menschlich']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a0' },
    key: 'europäischen',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'politisch zusammengeschlossenen',
        selected: { $numberInt: '1' }
      },
      { word: 'einheitlichen', selected: { $numberInt: '1' } },
      { word: 'zentralweltischen', selected: { $numberInt: '1' } },
      { word: 'ausschließenden', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'politisch zusammengeschlossenen',
      'einheitlichen',
      'ausschließenden'
    ]
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a1' },
    key: 'russin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus russland', selected: { $numberInt: '1' } },
      { word: 'terranautin', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'person ', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus russland', 'terranautin']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a2' },
    key: 'französin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a3' },
    key: 'asien',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gebiet mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['gebiet mit grenzen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f04e' },
    key: 'italos',
    __v: { $numberInt: '0' },
    alternatives: [],
    ranking: []
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f04f' },
    key: 'asylbewerberleistungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsleistungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsleistungen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f050' },
    key: 'franzosen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'franzosos', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuen', 'franzosos']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f071' },
    key: 'zuwanderung',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zubewegung', selected: { $numberInt: '1' } }],
    ranking: ['zubewegung']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f073' },
    key: 'zuwanderungssystem',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zubewegungssystem', selected: { $numberInt: '1' } }
    ],
    ranking: ['zubewegungssystem']
  },
  {
    _id: { $oid: '5d062f63188801018a7a017d' },
    key: 'asylunterkunt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'dauernotschlafstelle', selected: { $numberInt: '1' } },
      { word: 'unterbringung', selected: { $numberInt: '1' } },
      { word: 'notfallzuhause', selected: { $numberInt: '1' } },
      { word: 'rettungsort', selected: { $numberInt: '1' } }
    ],
    ranking: ['sozialwohnung', 'unterbringung']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d24' },
    key: 'mehrheiten',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'hoheiten', selected: { $numberInt: '1' } }],
    ranking: ['hoheiten']
  },
  {
    _id: { $oid: '5d0f614418880102de809d4a' },
    key: 'menschenhandel',
    __v: { $numberInt: '0' },
    alternatives: [],
    ranking: []
  },
  {
    _id: { $oid: '5d17375b188801020270dc0e' },
    key: 'armutsmigration',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'reichtumsstillstand', selected: { $numberInt: '1' } }
    ],
    ranking: ['reichtumsstillstand']
  },
  {
    _id: { $oid: '5d17375b188801020270dc0f' },
    key: 'eu-asylbehörde',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'eu-obdachbehörde', selected: { $numberInt: '1' } },
      { word: 'eu-freistättebehörde', selected: { $numberInt: '1' } },
      { word: 'eu-refugiumsbehörde', selected: { $numberInt: '1' } },
      { word: 'eu-schutzdachbehörde', selected: { $numberInt: '1' } }
    ],
    ranking: ['eu-obdachbehörde', 'eu-freistättebehörde', 'eu-refugiumsbehörde']
  },
  {
    _id: { $oid: '5d17375b188801020270dc18' },
    key: 'europaweit',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zentralweltweit', selected: { $numberInt: '1' } }],
    ranking: ['zentralweltweit']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1a' },
    key: 'un-migrationspakt',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'un-menschenlebenentscheidungspakt',
        selected: { $numberInt: '1' }
      }
    ],
    ranking: ['un-menschenlebenentscheidungspakt']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc2f' },
    key: 'asylrechtsfragen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdachlinksfragen', selected: { $numberInt: '1' } },
      { word: 'freistätterechtsfragen', selected: { $numberInt: '1' } },
      { word: 'schutzdachlinksfragen', selected: { $numberInt: '1' } },
      { word: 'refugiumrechtsfragen', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'obdachlinksfragen',
      'freistätterechtsfragen',
      'schutzdachlinksfragen'
    ]
  },
  {
    _id: { $oid: '5d10f60b188801301ee030aa' },
    key: 'illegale',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'gesetzeswidriges menschendasein',
        selected: { $numberInt: '1' }
      },
      { word: 'verbotene', selected: { $numberInt: '1' } },
      { word: 'unrechtmäßige', selected: { $numberInt: '1' } }
    ],
    ranking: ['gesetzeswidriges menschendasein']
  },
  {
    _id: { $oid: '5d174b40188801020270dc3f' },
    key: 'grenzlager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'einreisestopplager', selected: { $numberInt: '1' } },
      { word: 'gewaltkontrolllager', selected: { $numberInt: '1' } },
      { word: 'machtkontrolllager', selected: { $numberInt: '1' } },
      { word: 'ausnahmelager', selected: { $numberInt: '1' } }
    ],
    ranking: ['einreisestopplager', 'gewaltkontrolllager', 'machtkontrolllager']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a4' },
    key: 'türken',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'menschen aus der türkei', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'bürger', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'nachbarn', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'menschen aus der türkei', 'personen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a5' },
    key: 'asiate',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'mensch aus dem kontinent asien', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'schwarzhaariger', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'mensch aus dem kontinent asien', 'terranaut']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a6' },
    key: 'flüchtlingspakt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fluchtabkommen', selected: { $numberInt: '1' } },
      { word: 'menschenlebenentscheidungspakt', selected: { $numberInt: '1' } },
      { word: 'ogranisationsbeschluss', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'fluchtabkommen',
      'menschenlebenentscheidungspakt',
      'ogranisationsbeschluss'
    ]
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a7' },
    key: 'französischen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschlichen', selected: { $numberInt: '1' } }],
    ranking: ['menschlichen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a8' },
    key: 'französische',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschliche', selected: { $numberInt: '1' } }],
    ranking: ['menschliche']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01a9' },
    key: 'asiaten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      {
        word: 'menschen aus dem kontinent asien',
        selected: { $numberInt: '1' }
      },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'schwarzhaarige', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'menschen aus dem kontinent asien', 'personen']
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01aa' },
    key: 'migrationspakt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungsabkommen', selected: { $numberInt: '1' } },
      { word: 'menschenlebenentscheidungspakt', selected: { $numberInt: '1' } },
      { word: 'ogranisationsbeschluss', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bewegungsabkommen',
      'menschenlebenentscheidungspakt',
      'ogranisationsbeschluss'
    ]
  },
  {
    _id: { $oid: '5d0641b6188801018a7a01ab' },
    key: 'spanisch',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'menschlich', selected: { $numberInt: '1' } }],
    ranking: ['menschlich']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01ad' },
    key: 'syrier',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01ae' },
    key: 'südländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'himmelsrichtungsländer', selected: { $numberInt: '1' } }
    ],
    ranking: ['himmelsrichtungsländer']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01af' },
    key: 'national',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'staatlich begrenzt', selected: { $numberInt: '1' } }
    ],
    ranking: ['staatlich begrenzt']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b0' },
    key: 'staat',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'politische kraft', selected: { $numberInt: '1' } },
      { word: 'größenordnung', selected: { $numberInt: '1' } },
      { word: 'machtarm', selected: { $numberInt: '1' } }
    ],
    ranking: ['politische kraft', 'größenordnung', 'machtarm']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b1' },
    key: 'international',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zwischenstaatlich', selected: { $numberInt: '1' } },
      { word: 'zwischenmenschlich', selected: { $numberInt: '1' } }
    ],
    ranking: ['zwischenstaatlich']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b2' },
    key: 'iraker',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b3' },
    key: 'rumänen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuen', 'terranauten']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b4' },
    key: 'internationale',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zwischenstaatliche', selected: { $numberInt: '1' } }
    ],
    ranking: ['zwischenstaatliche']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b5' },
    key: 'bulgare',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b6' },
    key: 'migrationsrecht',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungsrecht', selected: { $numberInt: '1' } },
      { word: 'anspruch auf leben', selected: { $numberInt: '1' } }
    ],
    ranking: ['bewegungsrecht', 'anspruch auf leben']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b7' },
    key: 'bulgaren',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'individuen', 'terranauten']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b8' },
    key: 'nationale',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'staatlich begrenzte', selected: { $numberInt: '1' } },
      { word: 'zuordnungsgebietliche', selected: { $numberInt: '1' } }
    ],
    ranking: ['staatlich begrenzte']
  },
  {
    _id: { $oid: '5d06448c188801018a7a01b9' },
    key: 'rumäne',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'individuum', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'individuum', 'terranaut']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01bb' },
    key: 'vietnamesische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschliche', selected: { $numberInt: '1' } },
      { word: 'individuelle', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschliche', 'individuelle']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01bc' },
    key: 'vietnamesisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschlich', selected: { $numberInt: '1' } },
      { word: 'individuell', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschlich', 'individuell']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01bd' },
    key: 'aufenthaltungsgestattung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsgestattung', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsgestattung']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01be' },
    key: 'staatsangehörigkeit',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'machtangehörigkeit', selected: { $numberInt: '1' } },
      { word: 'berechtigungsdasein', selected: { $numberInt: '1' } },
      { word: 'gebietsangehörigkeit', selected: { $numberInt: '1' } }
    ],
    ranking: ['machtangehörigkeit', 'berechtigungsdasein']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01bf' },
    key: 'vietnam',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gebiet mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['gebiet mit grenzen']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01c0' },
    key: 'vietnamesinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'terranautinnen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'terranautinnen', 'personen']
  },
  {
    _id: { $oid: '5d0645ae188801018a7a01c1' },
    key: 'vietnamesen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'individuen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'terranauten', 'personen']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235f8' },
    key: 'einwanderin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'immigrantin', selected: { $numberInt: '1' } },
      { word: 'ins-land-stürmende', selected: { $numberInt: '1' } },
      { word: 'einschleicherin', selected: { $numberInt: '1' } },
      { word: 'zweiwanderin', selected: { $numberInt: '1' } }
    ],
    ranking: ['immigrantin', 'ins-land-stürmende', 'einschleicherin']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235f9' },
    key: 'grenzwertig',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'hochwertig', selected: { $numberInt: '1' } }],
    ranking: ['hochwertig']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fa' },
    key: 'migrationsdebatte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenverhandlung', selected: { $numberInt: '1' } },
      { word: 'menschendebatte', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenverhandlung', 'menschendebatte']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fb' },
    key: 'einwanderer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'immigrant', selected: { $numberInt: '1' } },
      { word: 'zweiwanderer', selected: { $numberInt: '1' } },
      { word: 'einzeller', selected: { $numberInt: '1' } },
      { word: 'ins-land-stürmende', selected: { $numberInt: '1' } },
      { word: 'einschleicher', selected: { $numberInt: '1' } },
      { word: 'vielwanderer', selected: { $numberInt: '1' } }
    ],
    ranking: ['immigrant', 'ins-land-stürmende', 'einschleicher']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fc' },
    key: 'asylbewerberin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'antragsschreiberin', selected: { $numberInt: '1' } },
      { word: 'zwangsbürokratin', selected: { $numberInt: '1' } },
      { word: 'schreiberling', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'hoffnungsträgerin', selected: { $numberInt: '1' } },
      { word: 'zufluchtsuchende', selected: { $numberInt: '1' } },
      { word: 'daseinsbewerber', selected: { $numberInt: '1' } }
    ],
    ranking: ['antragsschreiberin', 'zwangsbürokratin', 'schreiberling']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fd' },
    key: 'asylbewerber',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsbewerber', selected: { $numberInt: '1' } },
      { word: 'antragsschreibender', selected: { $numberInt: '1' } },
      { word: 'zwangsbürokrat', selected: { $numberInt: '1' } },
      { word: 'schreiberling', selected: { $numberInt: '1' } },
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'person', selected: { $numberInt: '1' } },
      { word: 'hoffnungsträger', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsbewerber', 'antragsschreibender', 'zwangsbürokrat']
  },
  {
    _id: { $oid: '5d0b815618880101cd2235fe' },
    key: 'einwanderung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bakterielles wachstum', selected: { $numberInt: '1' } },
      { word: 'zweiwanderung', selected: { $numberInt: '1' } },
      { word: 'einbleibung', selected: { $numberInt: '1' } },
      { word: 'vielwanderung', selected: { $numberInt: '1' } },
      { word: 'doppelwanderung', selected: { $numberInt: '1' } },
      { word: 'milchsäurebakterienvermehrung', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bakterielles wachstum',
      'zweiwanderung',
      'milchsäurebakterienvermehrung'
    ]
  },
  {
    _id: { $oid: '5d0b815618880101cd2235ff' },
    key: 'bleiberecht',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bleibelinks', selected: { $numberInt: '1' } }],
    ranking: ['bleibelinks']
  },
  {
    _id: { $oid: '5d0b816818880101cd223601' },
    key: 'migrantische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschliche', selected: { $numberInt: '1' } },
      { word: 'multiländische', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschliche', 'multiländische']
  },
  {
    _id: { $oid: '5d0b817818880101cd223602' },
    key: 'migrantischen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschlichen', selected: { $numberInt: '1' } },
      { word: 'multiländischen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschlichen', 'multiländischen']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8231' },
    key: 'flüchtlingsbetreuerin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingspasserin', selected: { $numberInt: '1' } },
      { word: 'lieblingsbetreuerin', selected: { $numberInt: '1' } },
      { word: 'menschlingaufpasserin', selected: { $numberInt: '1' } }
    ],
    ranking: ['bootsmenschenaufpasserin']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f055' },
    key: 'flüchtling',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schreiberling', selected: { $numberInt: '1' } },
      { word: 'bootling', selected: { $numberInt: '1' } },
      { word: 'liebling', selected: { $numberInt: '1' } },
      { word: 'menschling', selected: { $numberInt: '1' } },
      { word: 'schützling', selected: { $numberInt: '1' } },
      { word: 'prüfling', selected: { $numberInt: '1' } },
      { word: 'brückenling', selected: { $numberInt: '1' } },
      { word: 'schlauchbootling', selected: { $numberInt: '1' } }
    ],
    ranking: ['schreiberling', 'bootling', 'liebling']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f056' },
    key: 'schweizer',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bioschweizer', selected: { $numberInt: '1' } }],
    ranking: ['bioschweizer']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f057' },
    key: 'zugehörigkeit',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'landgehörigkeit ', selected: { $numberInt: '1' } }],
    ranking: ['landgehörigkeit ']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f058' },
    key: 'migrantinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'subjekte', selected: { $numberInt: '1' } },
      { word: 'multiländerinnen', selected: { $numberInt: '1' } },
      { word: 'terranautinnen', selected: { $numberInt: '1' } },
      { word: 'kämpferinnen', selected: { $numberInt: '1' } },
      { word: 'zugereiste', selected: { $numberInt: '1' } },
      { word: 'charakterinnen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'subjekte', 'multiländerinnen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f059' },
    key: 'deutschstämmigen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'germanostämmigen', selected: { $numberInt: '1' } }],
    ranking: ['germanostämmigen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05a' },
    key: 'aufenthaltsgenehmigung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsgenehmigung', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsgenehmigung']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05b' },
    key: 'schweizerinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bioschweizerinnen', selected: { $numberInt: '1' } }
    ],
    ranking: ['bioschweizerinnen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05c' },
    key: 'registrierungslager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'massenhaltungseinweisungslager', selected: { $numberInt: '1' } },
      { word: 'importannahmungslager', selected: { $numberInt: '1' } },
      { word: 'empfangslager', selected: { $numberInt: '1' } },
      { word: 'einweisungslager', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'massenhaltungseinweisungslager',
      'importannahmungslager',
      'empfangslager'
    ]
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05d' },
    key: 'deutschstämmige',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'germanostämmige', selected: { $numberInt: '1' } }],
    ranking: ['germanostämmige']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05e' },
    key: 'deutschstämmig',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'germanostämmig', selected: { $numberInt: '1' } }],
    ranking: ['germanostämmig']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f05f' },
    key: 'flüchtlinge',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schreiberlinge', selected: { $numberInt: '1' } },
      { word: 'bootlinge', selected: { $numberInt: '1' } },
      { word: 'lieblinge', selected: { $numberInt: '1' } },
      { word: 'menschlinge', selected: { $numberInt: '1' } },
      { word: 'schützlinge', selected: { $numberInt: '1' } },
      { word: 'prüflinge', selected: { $numberInt: '1' } },
      { word: 'brückenlinge', selected: { $numberInt: '1' } }
    ],
    ranking: ['schreiberlinge', 'bootlinge', 'lieblinge']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f060' },
    key: 'integrationsleistungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zusammenführungsleistungen', selected: { $numberInt: '1' } },
      { word: 'vereinheitlichungsleistungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['zusammenführungsleistungen', 'vereinheitlichungsleistungen']
  },
  {
    _id: { $oid: '5d0cac92188801033ce5f061' },
    key: 'integrationsleistung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zusammenführungsleistung', selected: { $numberInt: '1' } },
      { word: 'vereinheitlichungsleistung', selected: { $numberInt: '1' } }
    ],
    ranking: ['zusammenführungsleistung', 'vereinheitlichungsleistung']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f063' },
    key: 'ausweispapiere',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anreisepapiere', selected: { $numberInt: '1' } },
      { word: 'bleibeweispapiere', selected: { $numberInt: '1' } },
      { word: 'daseinspapiere', selected: { $numberInt: '1' } }
    ],
    ranking: ['anreisepapiere', 'bleibeweispapiere', 'daseinspapiere']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f064' },
    key: 'überwachungskontrolle',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'unterwachungskontrolle', selected: { $numberInt: '1' } }
    ],
    ranking: ['unterwachungskontrolle']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f065' },
    key: 'ausweispapier',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anweispapier', selected: { $numberInt: '1' } },
      { word: 'bleibeweispapier', selected: { $numberInt: '1' } },
      { word: 'daseinspapier', selected: { $numberInt: '1' } }
    ],
    ranking: ['anweispapier', 'bleibeweispapier', 'daseinspapier']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f066' },
    key: 'ausweise',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anweise', selected: { $numberInt: '1' } },
      { word: 'bleibeweise', selected: { $numberInt: '1' } }
    ],
    ranking: ['anweise', 'bleibeweise']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f067' },
    key: 'grenzkontrollen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'einreisestopps', selected: { $numberInt: '1' } },
      { word: 'gewaltkontrollen', selected: { $numberInt: '1' } },
      { word: 'machtkontrollen', selected: { $numberInt: '1' } }
    ],
    ranking: ['einreisestopps', 'gewaltkontrollen', 'machtkontrollen']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f068' },
    key: 'ausländerfeindlich',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenfeindlich', selected: { $numberInt: '1' } },
      { word: 'inländerfeindlich', selected: { $numberInt: '1' } },
      { word: 'artfeindlich', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenfeindlich', 'inländerfeindlich', 'artfeindlich']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f069' },
    key: 'migrationsbewegungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenbewegung', selected: { $numberInt: '1' } },
      { word: 'menschenverschiebung', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenbewegung', 'menschenverschiebung']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f06a' },
    key: 'ausweis',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anweis', selected: { $numberInt: '1' } },
      { word: 'bleibeweis', selected: { $numberInt: '1' } }
    ],
    ranking: ['anweis', 'bleibeweis']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f06b' },
    key: 'auswanderer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inwanderer', selected: { $numberInt: '1' } },
      { word: 'ausreißer', selected: { $numberInt: '1' } },
      { word: 'exwanderer', selected: { $numberInt: '1' } },
      { word: 'überwanderer', selected: { $numberInt: '1' } }
    ],
    ranking: ['inwanderer', 'ausreißer', 'exwanderer']
  },
  {
    _id: { $oid: '5d0cb10a188801033ce5f06c' },
    key: 'grenzkontrolle',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'einreisestopp', selected: { $numberInt: '1' } },
      { word: 'gewaltkontrolle', selected: { $numberInt: '1' } },
      { word: 'machtkontrolle', selected: { $numberInt: '1' } }
    ],
    ranking: ['einreisestopp', 'gewaltkontrolle', 'machtkontrolle']
  },
  {
    _id: { $oid: '5d0cb1fa188801033ce5f06e' },
    key: 'abschiebungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ausschiebungen', selected: { $numberInt: '1' } },
      { word: 'schiebdenwal', selected: { $numberInt: '1' } },
      { word: 'menschenablehnung', selected: { $numberInt: '1' } }
    ],
    ranking: ['ausschiebungen', 'schiebdenwal', 'menschenablehnung']
  },
  {
    _id: { $oid: '5d0cb1fa188801033ce5f06f' },
    key: 'abschiebung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ausschiebung', selected: { $numberInt: '1' } },
      { word: 'schiebdenwal', selected: { $numberInt: '1' } },
      { word: 'menschenablehnung', selected: { $numberInt: '1' } }
    ],
    ranking: ['ausschiebung', 'schiebdenwal', 'menschenablehnung']
  },
  {
    _id: { $oid: '5d054a52188801102cfa823c' },
    key: 'flüchtlingshelfer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingshelfer', selected: { $numberInt: '1' } },
      { word: 'lieblingshelfer', selected: { $numberInt: '1' } },
      { word: 'menschlingshelfer', selected: { $numberInt: '1' } }
    ],
    ranking: ['überseehelfer']
  },
  {
    _id: { $oid: '5d054a52188801102cfa8235' },
    key: 'flüchtlingshelferin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingshelferin', selected: { $numberInt: '1' } },
      { word: 'lieblingshelferin', selected: { $numberInt: '1' } },
      { word: 'menschlingshelferin', selected: { $numberInt: '1' } }
    ],
    ranking: ['überseehelferin']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f072' },
    key: 'flüchtlingspolitik',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'lieblingspolitik', selected: { $numberInt: '1' } },
      { word: 'bootlingspolitik', selected: { $numberInt: '1' } },
      { word: 'menschlingspolitik', selected: { $numberInt: '1' } }
    ],
    ranking: ['lieblingspolitik', 'bootlingspolitik', 'menschlingspolitik']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f074' },
    key: 'migrationspolitik',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bewegungspolitik', selected: { $numberInt: '1' } }],
    ranking: ['bewegungspolitik']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f075' },
    key: 'ankommende',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'einfindende', selected: { $numberInt: '1' } }],
    ranking: ['einfindende']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f076' },
    key: 'islamisierung',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'religionsgemeinschaftsausbreitung',
        selected: { $numberInt: '1' }
      }
    ],
    ranking: ['religionsgemeinschaftsausbreitung']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f077' },
    key: 'aufenthaltsbewilligung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsbewilligung', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsbewilligung']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f078' },
    key: 'abschiebewilligen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'rausschiebewilligen', selected: { $numberInt: '1' } }
    ],
    ranking: ['rausschiebewilligen']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f079' },
    key: 'migrationspolitisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungspolitisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['bewegungspolitisch']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07a' },
    key: 'abgelehnte',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'angelehnte', selected: { $numberInt: '1' } }],
    ranking: ['angelehnte']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07b' },
    key: 'abschiebewillig',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'rausschiebewillig', selected: { $numberInt: '1' } }
    ],
    ranking: ['rausschiebewillig']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07c' },
    key: 'entwicklungshilfe',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'entfaltungshilfe', selected: { $numberInt: '1' } }],
    ranking: ['entfaltungshilfe']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07d' },
    key: 'italianisierung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'landesgemeinschaftsverbreitung', selected: { $numberInt: '1' } }
    ],
    ranking: ['landesgemeinschaftsverbreitung']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07e' },
    key: 'angekommen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'eingefunden', selected: { $numberInt: '1' } }],
    ranking: ['eingefunden']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f07f' },
    key: 'abschiebewillige',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'rausschiebewillige', selected: { $numberInt: '1' } }
    ],
    ranking: ['rausschiebewillige']
  },
  {
    _id: { $oid: '5d0cbc65188801033ce5f080' },
    key: 'migrationsgeschichte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'vergangenheit', selected: { $numberInt: '1' } },
      { word: 'bewegungsgeschichte', selected: { $numberInt: '1' } }
    ],
    ranking: ['vergangenheit', 'bewegungsgeschichte']
  },
  {
    _id: { $oid: '5d062f63188801018a7a017f' },
    key: 'migrant',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mensch', selected: { $numberInt: '1' } },
      { word: 'migrantenling', selected: { $numberInt: '1' } },
      { word: 'multiländer', selected: { $numberInt: '1' } },
      { word: 'terranaut', selected: { $numberInt: '1' } },
      { word: 'subjekt', selected: { $numberInt: '1' } },
      { word: 'kämpfer', selected: { $numberInt: '1' } },
      { word: 'zugereister', selected: { $numberInt: '1' } },
      { word: 'charakter', selected: { $numberInt: '1' } },
      { word: 'bewegter', selected: { $numberInt: '1' } }
    ],
    ranking: ['mensch', 'subjekt', 'multiländer']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d21' },
    key: 'minderheiten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minoritäten', selected: { $numberInt: '1' } },
      { word: 'wenigkeiten', selected: { $numberInt: '1' } },
      { word: 'tiefheiten', selected: { $numberInt: '1' } }
    ],
    ranking: ['minoritäten', 'wenigkeiten', 'tiefheiten']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d22' },
    key: 'ausländische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inländische', selected: { $numberInt: '1' } },
      { word: 'menschliche', selected: { $numberInt: '1' } },
      { word: 'artverwandte', selected: { $numberInt: '1' } },
      { word: 'terranautische', selected: { $numberInt: '1' } },
      { word: 'astronautische', selected: { $numberInt: '1' } },
      { word: 'außerirdische', selected: { $numberInt: '1' } }
    ],
    ranking: ['inländische', 'menschliche', 'artverwandte']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d23' },
    key: 'asylsuchende',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'notfallzuhaussuchende', selected: { $numberInt: '1' } },
      { word: 'daseinssuchende', selected: { $numberInt: '1' } },
      { word: 'rettungssuchende', selected: { $numberInt: '1' } }
    ],
    ranking: ['notfallzuhaussuchende', 'daseinssuchende', 'rettungssuchende']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d25' },
    key: 'mehrheit',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'hoheit', selected: { $numberInt: '1' } }],
    ranking: ['hoheit']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d26' },
    key: 'minderheit',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minorität', selected: { $numberInt: '1' } },
      { word: 'wenigkeit', selected: { $numberInt: '1' } },
      { word: 'tiefheit', selected: { $numberInt: '1' } }
    ],
    ranking: ['minorität', 'wenigkeit', 'tiefheit']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d27' },
    key: 'moslem',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gläubiger', selected: { $numberInt: '1' } }],
    ranking: ['gläubiger']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d28' },
    key: 'zigeuner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'sinti und roma', selected: { $numberInt: '1' } }],
    ranking: ['sinti und roma']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d29' },
    key: 'entwicklungsminister',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'entfaltungsminister', selected: { $numberInt: '1' } }
    ],
    ranking: ['entfaltungsminister']
  },
  {
    _id: { $oid: '5d0f4e1618880102de809d2a' },
    key: 'asylrecht',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsrecht', selected: { $numberInt: '1' } },
      { word: 'schutzdachrecht', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsrecht']
  },
  {
    _id: { $oid: '5d0f4ecc18880102de809d2c' },
    key: 'flüchtlingspolitiker',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingspolitiker', selected: { $numberInt: '1' } },
      { word: 'lieblingspolitiker', selected: { $numberInt: '1' } },
      { word: 'menschlingspolitiker', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bootlingspolitiker',
      'lieblingspolitiker',
      'menschlingspolitiker'
    ]
  },
  {
    _id: { $oid: '5d0f4ecc18880102de809d2d' },
    key: 'muslime',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gläubige', selected: { $numberInt: '1' } }],
    ranking: ['gläubige']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d30' },
    key: 'christ',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gläubiger', selected: { $numberInt: '1' } }],
    ranking: ['gläubiger']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d31' },
    key: 'christen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gläubige', selected: { $numberInt: '1' } }],
    ranking: ['gläubige']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d32' },
    key: 'asyl',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdach', selected: { $numberInt: '1' } },
      { word: 'freistätte', selected: { $numberInt: '1' } },
      { word: 'refugium', selected: { $numberInt: '1' } },
      { word: 'schutzdach', selected: { $numberInt: '1' } }
    ],
    ranking: ['obdach', 'freistätte', 'refugium']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d33' },
    key: 'asylverfahren',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdachverfahren', selected: { $numberInt: '1' } },
      { word: 'schutzdachverfahren', selected: { $numberInt: '1' } }
    ],
    ranking: ['obdachverfahren', 'schutzdachverfahren']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d34' },
    key: 'fluchtplan',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'abschiedsplan', selected: { $numberInt: '1' } },
      { word: 'entkommensplan', selected: { $numberInt: '1' } }
    ],
    ranking: ['abschiedsplan', 'entkommensplan']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d35' },
    key: 'fluchtpläne',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'abschiedspläne', selected: { $numberInt: '1' } },
      { word: 'entkommenspläne', selected: { $numberInt: '1' } }
    ],
    ranking: ['abschiedspläne', 'entkommenspläne']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d36' },
    key: 'asylrechtliche',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schutzdachrechtliche', selected: { $numberInt: '1' } }
    ],
    ranking: ['schutzdachrechtliche']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d37' },
    key: 'asylrechtlich',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schutzdachrechtlich', selected: { $numberInt: '1' } }
    ],
    ranking: ['schutzdachrechtlich']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d38' },
    key: 'migrationspolitische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungspolitische', selected: { $numberInt: '1' } }
    ],
    ranking: ['bewegungspolitische']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d39' },
    key: 'asylant',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zuflüchtler', selected: { $numberInt: '1' } },
      { word: 'freistätter', selected: { $numberInt: '1' } },
      { word: 'artverwandter', selected: { $numberInt: '1' } },
      { word: 'weltbewohner', selected: { $numberInt: '1' } },
      { word: 'obdächler', selected: { $numberInt: '1' } }
    ],
    ranking: ['zuflüchtler', 'freistätter', 'artverwandter']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3a' },
    key: 'asylpolitisch',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdachpolitisch', selected: { $numberInt: '1' } },
      { word: 'schutzdachpolitisch', selected: { $numberInt: '1' } }
    ],
    ranking: ['obdachpolitisch', 'schutzdachpolitisch']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3b' },
    key: 'asylsysytem',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'schutzdachsystem', selected: { $numberInt: '1' } }],
    ranking: ['schutzdachsystem']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3c' },
    key: 'asylanträge',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schutzdachanträge', selected: { $numberInt: '1' } }
    ],
    ranking: ['schutzdachanträge']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3d' },
    key: 'asylante',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'obdächler', selected: { $numberInt: '1' } },
      { word: 'freidächler', selected: { $numberInt: '1' } },
      { word: 'schutzdächler', selected: { $numberInt: '1' } },
      { word: 'artverwandte', selected: { $numberInt: '1' } }
    ],
    ranking: ['obdächler', 'freidächler', 'schutzdächler']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3e' },
    key: 'asylantrag',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'schutzdachantrag', selected: { $numberInt: '1' } }],
    ranking: ['schutzdachantrag']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d3f' },
    key: 'migrationsbewegung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenverschiebung', selected: { $numberInt: '1' } },
      { word: 'wanderungsbewegung', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenverschiebung', 'wanderungsbewegung']
  },
  {
    _id: { $oid: '5d0f5c6818880102de809d40' },
    key: 'arbeitsmigration',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'arbeitsbewegung', selected: { $numberInt: '1' } },
      { word: 'arbeitswanderung', selected: { $numberInt: '1' } }
    ],
    ranking: ['arbeitsbewegung', 'arbeitswanderung']
  },
  {
    _id: { $oid: '5d0f614418880102de809d42' },
    key: 'arbeitslager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schöpfungslager', selected: { $numberInt: '1' } },
      { word: 'bemühungslager', selected: { $numberInt: '1' } }
    ],
    ranking: ['schöpfungslager', 'bemühungslager']
  },
  {
    _id: { $oid: '5d0f614418880102de809d44' },
    key: 'grenze',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schranke', selected: { $numberInt: '1' } },
      { word: 'raumrand', selected: { $numberInt: '1' } },
      { word: 'trennfläche', selected: { $numberInt: '1' } }
    ],
    ranking: ['schranke']
  },
  {
    _id: { $oid: '5d0f614418880102de809d46' },
    key: 'grenzschutzpolizei',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertrittpolizei', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankuntertrittpolizei']
  },
  {
    _id: { $oid: '5d0f614418880102de809d47' },
    key: 'grenzschließung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertrittschließung', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankuntertrittschließung']
  },
  {
    _id: { $oid: '5d0f614418880102de809d48' },
    key: 'entwicklungsprogramm',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'entfaltungsprogramm', selected: { $numberInt: '1' } },
      { word: 'abwicklungsprogramme', selected: { $numberInt: '1' } },
      { word: 'anschwellungsprogramm', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'entfaltungsprogramm',
      'abwicklungsprogramme',
      'anschwellungsprogramm'
    ]
  },
  {
    _id: { $oid: '5d0f614418880102de809d49' },
    key: 'einheitsdenken',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zweiheitsdenken', selected: { $numberInt: '1' } }],
    ranking: ['zweiheitsdenken']
  },
  {
    _id: { $oid: '5d0f614418880102de809d4b' },
    key: 'entwicklungsprogramme',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'entfaltungsprogramme', selected: { $numberInt: '1' } },
      { word: 'anschwellungsprogramme', selected: { $numberInt: '1' } },
      { word: 'abwicklungsprogramme', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'entfaltungsprogramme',
      'anschwellungsprogramme',
      'abwicklungsprogramme'
    ]
  },
  {
    _id: { $oid: '5d0f614418880102de809d4c' },
    key: 'einwanderungsbehörde',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweiwanderungsbehörde', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweiwanderungsbehörde']
  },
  {
    _id: { $oid: '5d0f614418880102de809d4d' },
    key: 'grenzmauer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertrittsmauer', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankuntertrittsmauer']
  },
  {
    _id: { $oid: '5d0f614418880102de809d4e' },
    key: 'eu-migrationspolitik',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'eu-bewegungspolitik', selected: { $numberInt: '1' } }
    ],
    ranking: ['eu-bewegungspolitik']
  },
  {
    _id: { $oid: '5d0f614418880102de809d4f' },
    key: 'eindämmung',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zweidämmung', selected: { $numberInt: '1' } }],
    ranking: ['zweidämmung']
  },
  {
    _id: { $oid: '5d0f614418880102de809d50' },
    key: 'migrationsroute',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bewegungsroute', selected: { $numberInt: '1' } }],
    ranking: ['bewegungsroute']
  },
  {
    _id: { $oid: '5d0f614418880102de809d51' },
    key: 'migrationsrouten',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bewegungsrouten', selected: { $numberInt: '1' } }],
    ranking: ['bewegungsrouten']
  },
  {
    _id: { $oid: '5d0f62a818880102de809d53' },
    key: 'sozialleistungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'höchstleistungen', selected: { $numberInt: '1' } },
      { word: 'gültigkeitsleistungen', selected: { $numberInt: '1' } },
      { word: 'wohltätigkeitsleistungen', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'höchstleistungen',
      'gültigkeitsleistungen',
      'wohltätigkeitsleistungen'
    ]
  },
  {
    _id: { $oid: '5d0f62a818880102de809d54' },
    key: 'eu-ausländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'europafremdlinge', selected: { $numberInt: '1' } },
      { word: 'europalinge', selected: { $numberInt: '1' } }
    ],
    ranking: ['europafremdlinge', 'europalinge']
  },
  {
    _id: { $oid: '5d0f62a818880102de809d55' },
    key: 'sozialleistung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'höchstleistung', selected: { $numberInt: '1' } },
      { word: 'gültigkeitsleistung', selected: { $numberInt: '1' } },
      { word: 'wohltätigkeitsleistung', selected: { $numberInt: '1' } }
    ],
    ranking: ['höchstleistung', 'gültigkeitsleistung', 'wohltätigkeitsleistung']
  },
  {
    _id: { $oid: '5d0f62a818880102de809d56' },
    key: 'abschiebehaft',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'anschiebehaft', selected: { $numberInt: '1' } }],
    ranking: ['anschiebehaft']
  },
  {
    _id: { $oid: '5d0f651018880102de809d57' },
    key: 'vaterland',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mutterland', selected: { $numberInt: '1' } }],
    ranking: ['mutterland']
  },
  {
    _id: { $oid: '5d0f651018880102de809d58' },
    key: 'wutbürger',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grollbürger', selected: { $numberInt: '1' } }],
    ranking: ['grollbürger']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308b' },
    key: 'ausländerfeindlichkeit',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inländerfeindlichkeit', selected: { $numberInt: '1' } }
    ],
    ranking: ['inländerfeindlichkeit']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308c' },
    key: 'migrationsgesetze',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bewegungsgesetze ', selected: { $numberInt: '1' } }
    ],
    ranking: ['bewegungsgesetze ']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308d' },
    key: 'rechtspopulisten',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelpopulisten', selected: { $numberInt: '1' } }],
    ranking: ['mittelpopulisten']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308e' },
    key: 'rechtspopulismus',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelpopulismus', selected: { $numberInt: '1' } }],
    ranking: ['mittelpopulismus']
  },
  {
    _id: { $oid: '5d10ee53188801301ee0308f' },
    key: 'rechtsextremismus',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mittelextremismus', selected: { $numberInt: '1' } }
    ],
    ranking: ['mittelextremismus']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03090' },
    key: 'rechtspopulist',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelpopulist', selected: { $numberInt: '1' } }],
    ranking: ['mittelpopulist']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03091' },
    key: 'rechtsextreme',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelextreme', selected: { $numberInt: '1' } }],
    ranking: ['mittelextreme']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03092' },
    key: 'rechtsextremisten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mittelextremisten', selected: { $numberInt: '1' } }
    ],
    ranking: ['mittelextremisten']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03093' },
    key: 'einwanderungsreform',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweiwanderungsreform', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweiwanderungsreform']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03094' },
    key: 'rechtsextrem',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelextrem', selected: { $numberInt: '1' } }],
    ranking: ['mittelextrem']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03095' },
    key: 'migrationsgesetz',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bewegungsgesetz', selected: { $numberInt: '1' } }],
    ranking: ['bewegungsgesetz']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03096' },
    key: 'rechtsextremist',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelextremist', selected: { $numberInt: '1' } }],
    ranking: ['mittelextremist']
  },
  {
    _id: { $oid: '5d10f60b188801301ee03098' },
    key: 'halbschwarz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'halbweiß', selected: { $numberInt: '1' } },
      { word: 'halbtransparent', selected: { $numberInt: '1' } }
    ],
    ranking: ['halbweiß', 'halbtransparent']
  },
  {
    _id: { $oid: '5d10f60b188801301ee03099' },
    key: 'migrationsforscher',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenbewegungsforscher', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenbewegungsforscher']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309a' },
    key: 'migrationsforscherin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenbewegungsforscherin', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenbewegungsforscherin']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309b' },
    key: 'schwarzfahren',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'graufahren', selected: { $numberInt: '1' } }],
    ranking: ['graufahren']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309c' },
    key: 'schwarzarbeiter',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grauarbeiter', selected: { $numberInt: '1' } }],
    ranking: ['grauarbeiter']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309d' },
    key: 'schwarzarbeit',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grauarbeit', selected: { $numberInt: '1' } }],
    ranking: ['grauarbeit']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309e' },
    key: 'ureinwohnerin',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'auswohnerin', selected: { $numberInt: '1' } }],
    ranking: ['auswohnerin']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309f' },
    key: 'schwarzafrikaner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grünpaprikaner', selected: { $numberInt: '1' } }],
    ranking: ['grünpaprikaner']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a0' },
    key: 'buschmänner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'buschlinge', selected: { $numberInt: '1' } }],
    ranking: ['buschlinge']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a1' },
    key: 'migrationsforscherinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenbewegungsforscherinnen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenbewegungsforscherinnen']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a2' },
    key: 'schwarzarbeiterin',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grauarbeiterin', selected: { $numberInt: '1' } }],
    ranking: ['grauarbeiterin']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a3' },
    key: 'mandelauge',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'erdnussauge', selected: { $numberInt: '1' } }],
    ranking: ['erdnussauge']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a4' },
    key: 'aufenthaltsgestattung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsgestattung', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsgestattung']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a5' },
    key: 'eingeborene',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'ausgeborene', selected: { $numberInt: '1' } }],
    ranking: ['ausgeborene']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a6' },
    key: 'maximalpigmentiert',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minimalpigmentiert', selected: { $numberInt: '1' } },
      { word: 'minimalfrequentiert', selected: { $numberInt: '1' } }
    ],
    ranking: ['minimalpigmentiert', 'minimalfrequentiert']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a7' },
    key: 'eingeborener',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'ausgeborener', selected: { $numberInt: '1' } }],
    ranking: ['ausgeborener']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a8' },
    key: 'hellbraun',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'hellweiß', selected: { $numberInt: '1' } }],
    ranking: ['hellweiß']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a9' },
    key: 'uhreinwohnerinnen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'auswohnerinnen', selected: { $numberInt: '1' } }],
    ranking: ['auswohnerinnen']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030ab' },
    key: 'maximalpigmentierte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minimalpigmentierte', selected: { $numberInt: '1' } },
      { word: 'minimalfrequentierte', selected: { $numberInt: '1' } }
    ],
    ranking: ['minimalpigmentierte', 'minimalfrequentierte']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030ac' },
    key: 'illegal',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gesetzeswidrig', selected: { $numberInt: '1' } }],
    ranking: ['gesetzeswidrig']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030ad' },
    key: 'halb-schwarz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'halb-weiß', selected: { $numberInt: '1' } },
      { word: 'halb-transparent', selected: { $numberInt: '1' } }
    ],
    ranking: ['halb-weiß', 'halb-transparent']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030ae' },
    key: 'mandelaugen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'erdnussaugen', selected: { $numberInt: '1' } }],
    ranking: ['erdnussaugen']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030af' },
    key: 'maximalpigmentierter',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minimalfrequentierter', selected: { $numberInt: '1' } }
    ],
    ranking: ['minimalfrequentierter']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030b0' },
    key: 'ureinwohner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'auswohner', selected: { $numberInt: '1' } }],
    ranking: ['auswohner']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0180' },
    key: 'migration',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wanderung', selected: { $numberInt: '1' } },
      { word: 'bewegung bestimmter gruppen', selected: { $numberInt: '1' } },
      { word: 'herkunftsmythisierung', selected: { $numberInt: '1' } },
      { word: 'normalität', selected: { $numberInt: '1' } },
      { word: 'imagination', selected: { $numberInt: '1' } },
      { word: 'menschennormalität', selected: { $numberInt: '1' } }
    ],
    ranking: ['wanderung', 'bewegung bestimmter gruppen']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0185' },
    key: 'asylunterkünfte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'notfallüberkünfte', selected: { $numberInt: '1' } },
      { word: 'unterbringungen', selected: { $numberInt: '1' } },
      { word: 'dauernotschlafstelle', selected: { $numberInt: '1' } }
    ],
    ranking: ['sozialwohnungen', 'unterbringungen']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0167' },
    key: 'deutschland',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutschland', selected: { $numberInt: '1' } },
      { word: 'musterdeutschland', selected: { $numberInt: '1' } },
      { word: 'antivirensoftwareland', selected: { $numberInt: '1' } },
      { word: 'zentrum der erde', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenland', selected: { $numberInt: '1' } },
      { word: 'sehnsuchtsland', selected: { $numberInt: '1' } },
      { word: 'wer oder was ist deutschland?', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'biodeutschland',
      'wer oder was ist deutschland?',
      'antivirensoftwareland'
    ]
  },
  {
    _id: { $oid: '5d17375b188801020270dc10' },
    key: 'anerkennungsquote',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'auserkennungsquote', selected: { $numberInt: '1' } },
      { word: 'akzeptanzquote', selected: { $numberInt: '1' } }
    ],
    ranking: ['auserkennungsquote', 'akzeptanzquote']
  },
  {
    _id: { $oid: '5d17375b188801020270dc11' },
    key: 'flüchtlingsbewegungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlongsbewegungen', selected: { $numberInt: '1' } },
      { word: 'lieblingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'menschlingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'brückenlingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'schützlingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'prüflingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'schreiberlingsbewegungen', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bootlongsbewegungen',
      'lieblingsbewegungen',
      'menschlingsbewegungen'
    ]
  },
  {
    _id: { $oid: '5d17375b188801020270dc12' },
    key: 'nation',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenschlag', selected: { $numberInt: '1' } },
      { word: 'staatsinländer', selected: { $numberInt: '1' } },
      { word: 'gleichherkunftsgemeinschaft', selected: { $numberInt: '1' } },
      { word: 'menschengebiet', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenschlag', 'staatsinländer', 'gleichherkunftsgemeinschaft']
  },
  {
    _id: { $oid: '5d17375b188801020270dc13' },
    key: 'internationalen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zwischennationalen', selected: { $numberInt: '1' } },
      { word: 'zwischenmenschlichen', selected: { $numberInt: '1' } }
    ],
    ranking: ['zwischennationalen', 'zwischenmenschlichen']
  },
  {
    _id: { $oid: '5d17375b188801020270dc14' },
    key: 'grenzübertritte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertritte', selected: { $numberInt: '1' } },
      { word: 'trennflächenübertritte', selected: { $numberInt: '1' } },
      { word: 'raumrandübertritte', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'schrankuntertritte',
      'trennflächenübertritte',
      'raumrandübertritte'
    ]
  },
  {
    _id: { $oid: '5d17375b188801020270dc15' },
    key: 'hellhäutig',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'transparenthäutig', selected: { $numberInt: '1' } }
    ],
    ranking: ['transparenthäutig']
  },
  {
    _id: { $oid: '5d17375b188801020270dc16' },
    key: 'eskimo',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fremdbezeichnungsmensch', selected: { $numberInt: '1' } },
      { word: 'kalaallit', selected: { $numberInt: '1' } },
      { word: 'grönländer', selected: { $numberInt: '1' } }
    ],
    ranking: ['fremdbezeichnungsmensch', 'kalaallit', 'grönländer']
  },
  {
    _id: { $oid: '5d17375b188801020270dc17' },
    key: 'eurpäische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zentralweltische', selected: { $numberInt: '1' } },
      { word: 'einheitliche', selected: { $numberInt: '1' } },
      { word: 'ausschließende', selected: { $numberInt: '1' } }
    ],
    ranking: ['zentralweltische', 'einheitliche', 'ausschließende']
  },
  {
    _id: { $oid: '5d17375b188801020270dc19' },
    key: 'abschiebebedingung',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'in-die-wüste-schicken-bedingung',
        selected: { $numberInt: '1' }
      },
      { word: 'loswerdebedingung', selected: { $numberInt: '1' } }
    ],
    ranking: ['in-die-wüste-schicken-bedingung', 'loswerdebedingung']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1b' },
    key: 'herkunftsstaat',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'heimatstaat', selected: { $numberInt: '1' } },
      { word: 'abstammungsstaat', selected: { $numberInt: '1' } },
      { word: 'fabrikationsnamenskraft', selected: { $numberInt: '1' } }
    ],
    ranking: ['heimatstaat', 'abstammungsstaat', 'fabrikationsnamenskraft']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1c' },
    key: 'hautfarbe',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'körperfarbe', selected: { $numberInt: '1' } },
      { word: 'hautpigmente', selected: { $numberInt: '1' } },
      { word: 'hautzelle', selected: { $numberInt: '1' } },
      { word: 'blutfarbe', selected: { $numberInt: '1' } },
      { word: 'fußfarbe', selected: { $numberInt: '1' } }
    ],
    ranking: ['körperfarbe', 'hautpigmente', 'hautzelle']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1d' },
    key: 'herkunftsstaaten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'heimatstaaten', selected: { $numberInt: '1' } },
      { word: 'abstammungsstaaten', selected: { $numberInt: '1' } },
      { word: 'fabrikationsnamenskräfte', selected: { $numberInt: '1' } }
    ],
    ranking: ['heimatstaaten', 'abstammungsstaaten', 'fabrikationsnamenskräfte']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1e' },
    key: 'europäischen union',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zentralweltischen einheit', selected: { $numberInt: '1' } }
    ],
    ranking: ['zentralweltischen einheit']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1f' },
    key: 'abschieben',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wegschieben', selected: { $numberInt: '1' } },
      { word: 'den-wal-schieben', selected: { $numberInt: '1' } }
    ],
    ranking: ['wegschieben', 'den-wal-schieben']
  },
  {
    _id: { $oid: '5d17375b188801020270dc20' },
    key: 'flüchtlingsbewegung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingsbewegung', selected: { $numberInt: '1' } },
      { word: 'lieblingsbewegung', selected: { $numberInt: '1' } },
      { word: 'menschlingsbewegung', selected: { $numberInt: '1' } },
      { word: 'brückenlingsbewegung', selected: { $numberInt: '1' } },
      { word: 'schützlingsbewegung', selected: { $numberInt: '1' } },
      { word: 'prüflingsbewegung', selected: { $numberInt: '1' } },
      { word: 'schreiberlingsbewegung', selected: { $numberInt: '1' } }
    ],
    ranking: ['bootlingsbewegung', 'lieblingsbewegung', 'menschlingsbewegung']
  },
  {
    _id: { $oid: '5d17375b188801020270dc21' },
    key: 'grenzen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schranken', selected: { $numberInt: '1' } },
      { word: 'raumränder', selected: { $numberInt: '1' } },
      { word: 'trennflächen', selected: { $numberInt: '1' } }
    ],
    ranking: ['schranken', 'raumränder', 'trennflächen']
  },
  {
    _id: { $oid: '5d17375b188801020270dc22' },
    key: 'eskimos',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fremdbezeichnungsmenschen', selected: { $numberInt: '1' } },
      { word: 'kaaalliten', selected: { $numberInt: '1' } },
      { word: 'grönländer', selected: { $numberInt: '1' } },
      { word: 'menschen', selected: { $numberInt: '1' } }
    ],
    ranking: ['fremdbezeichnungsmenschen', 'kaaalliten', 'grönländer']
  },
  {
    _id: { $oid: '5d17375b188801020270dc23' },
    key: 'europarecht',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zentralweltrecht', selected: { $numberInt: '1' } }],
    ranking: ['zentralweltrecht']
  },
  {
    _id: { $oid: '5d17375b188801020270dc24' },
    key: 'grenzübertritt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertritt', selected: { $numberInt: '1' } },
      { word: 'raumrandübertritt', selected: { $numberInt: '1' } },
      { word: 'trennflächeübertritt', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankuntertritt', 'raumrandübertritt', 'trennflächeübertritt']
  },
  {
    _id: { $oid: '5d17375b188801020270dc25' },
    key: 'anerkennung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'auserkennung', selected: { $numberInt: '1' } },
      { word: 'akzeptanz', selected: { $numberInt: '1' } }
    ],
    ranking: ['auserkennung', 'akzeptanz']
  },
  {
    _id: { $oid: '5d17375b188801020270dc26' },
    key: 'flüchtlingscamp',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschencamp', selected: { $numberInt: '1' } },
      { word: 'massenhaltungscamp', selected: { $numberInt: '1' } },
      { word: 'sparcamp', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschencamp', 'massenhaltungscamp', 'sparcamp']
  },
  {
    _id: { $oid: '5d17375b188801020270dc27' },
    key: 'hellhäutige',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'transparenthäutige', selected: { $numberInt: '1' } }
    ],
    ranking: ['transparenthäutige']
  },
  {
    _id: { $oid: '5d17375b188801020270dc28' },
    key: 'sozialsystem',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenfreundsystem', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenfreundsystem']
  },
  {
    _id: { $oid: '5d17375b188801020270dc29' },
    key: 'abschiebebedingungen',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'in-die-wüste-schicken-bedingungen',
        selected: { $numberInt: '1' }
      },
      { word: 'loswerdebedinugngen', selected: { $numberInt: '1' } }
    ],
    ranking: ['in-die-wüste-schicken-bedingungen', 'loswerdebedinugngen']
  },
  {
    _id: { $oid: '5d17375b188801020270dc2a' },
    key: 'hautfarben',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'körperfarben', selected: { $numberInt: '1' } },
      { word: 'hautbigmente', selected: { $numberInt: '1' } },
      { word: 'hautzellen', selected: { $numberInt: '1' } },
      { word: 'blutfarben', selected: { $numberInt: '1' } },
      { word: 'fußfarben', selected: { $numberInt: '1' } }
    ],
    ranking: ['körperfarben', 'hautbigmente', 'hautzellen']
  },
  {
    _id: { $oid: '5d17375b188801020270dc2b' },
    key: 'einwanderungsland',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweiwanderungsland', selected: { $numberInt: '1' } },
      { word: 'vielwanderungsland', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweiwanderungsland', 'vielwanderungsland']
  },
  {
    _id: { $oid: '5d17375b188801020270dc2c' },
    key: 'zugewanderte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zugewanderhintergründler', selected: { $numberInt: '1' } },
      { word: 'hinzugewanderte', selected: { $numberInt: '1' } },
      { word: 'geschlossengewanderte', selected: { $numberInt: '1' } },
      { word: 'landgewanderte', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'zugewanderhintergründler',
      'hinzugewanderte',
      'geschlossengewanderte'
    ]
  },
  {
    _id: { $oid: '5d17375b188801020270dc2d' },
    key: 'sozialsysteme',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenfreundsysteme', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenfreundsysteme']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0173' },
    key: 'integration',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'eingemeindung', selected: { $numberInt: '1' } },
      { word: 'ungleichheit', selected: { $numberInt: '1' } },
      { word: 'individuenstopp', selected: { $numberInt: '1' } },
      { word: 'verbindung zu einer ganzheit', selected: { $numberInt: '1' } },
      { word: 'zusammenschluss', selected: { $numberInt: '1' } },
      { word: 'eingemeindung', selected: { $numberInt: '1' } },
      { word: 'gruppeneinteilung', selected: { $numberInt: '1' } },
      { word: 'einbeziehung', selected: { $numberInt: '1' } }
    ],
    ranking: ['eingemeindung', 'zusammenführung', 'individuenstopp']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc30' },
    key: 'visumsantrag',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'sichtvermerkantrag', selected: { $numberInt: '1' } },
      { word: 'einreiseerlaubnisantrag', selected: { $numberInt: '1' } },
      { word: 'herkunftsabhängigkeitsantrag', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'sichtvermerkantrag',
      'einreiseerlaubnisantrag',
      'herkunftsabhängigkeitsantrag'
    ]
  },
  {
    _id: { $oid: '5d1745d8188801020270dc32' },
    key: 'integrationswillen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anpassungswillen', selected: { $numberInt: '1' } },
      { word: 'exgrationswillen', selected: { $numberInt: '1' } },
      { word: 'eingemeindungswillen', selected: { $numberInt: '1' } },
      { word: 'ungleichheitsfragen', selected: { $numberInt: '1' } }
    ],
    ranking: ['anpassungswillen', 'exgrationswillen', 'eingemeindungswillen']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc33' },
    key: 'flüchtlingsberater',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schlauchbootlingsberater', selected: { $numberInt: '1' } },
      { word: 'schlauchbootlingsberaterin', selected: { $numberInt: '1' } }
    ],
    ranking: ['schlauchbootlingsberater', 'schlauchbootlingsberaterin']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc34' },
    key: 'integrationskinder',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'lieblingskinder', selected: { $numberInt: '1' } }],
    ranking: ['lieblingskinder']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc35' },
    key: 'integrationskind',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'lieblingskind', selected: { $numberInt: '1' } }],
    ranking: ['lieblingskind']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc36' },
    key: 'ausländerpolitik',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'exländerpolitik', selected: { $numberInt: '1' } }],
    ranking: ['exländerpolitik']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc37' },
    key: 'sozialausgabe',
    __v: { $numberInt: '0' },
    alternatives: [],
    ranking: []
  },
  {
    _id: { $oid: '5d1745d8188801020270dc38' },
    key: 'sozialausgaben',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenfreundausgaben', selected: { $numberInt: '1' } },
      { word: 'menschenfreundausgabe', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenfreundausgaben', 'menschenfreundausgabe']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc39' },
    key: 'integrationsdebatte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ungleichheitsdebatte', selected: { $numberInt: '1' } }
    ],
    ranking: ['ungleichheitsdebatte']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3a' },
    key: 'flüchtlingsunterkunft',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingsunterkunft', selected: { $numberInt: '1' } },
      { word: 'menschlingsunterkunft', selected: { $numberInt: '1' } },
      { word: 'lieblingsunterkunft', selected: { $numberInt: '1' } },
      { word: 'obdachsunterkunft', selected: { $numberInt: '1' } },
      { word: 'bretterverschlagsunterkunft', selected: { $numberInt: '1' } },
      { word: 'absteigehochkunft', selected: { $numberInt: '1' } },
      { word: 'obdach', selected: { $numberInt: '1' } },
      { word: 'bretterverschlag', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bootlingsunterkunft',
      'menschlingsunterkunft',
      'lieblingsunterkunft'
    ]
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3b' },
    key: 'flüchtlingshilfe',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingshilfe', selected: { $numberInt: '1' } },
      { word: 'lieblingshilfe', selected: { $numberInt: '1' } },
      { word: 'menschlingshilfe', selected: { $numberInt: '1' } }
    ],
    ranking: ['bootlingshilfe', 'lieblingshilfe', 'menschlingshilfe']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3c' },
    key: 'visumsanträge',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'sichtvermerkanträge', selected: { $numberInt: '1' } },
      { word: 'einreiseerlaubnisanträge', selected: { $numberInt: '1' } },
      { word: 'herkunftsabhängigkeitsantrag', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'sichtvermerkanträge',
      'einreiseerlaubnisanträge',
      'herkunftsabhängigkeitsantrag'
    ]
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3d' },
    key: 'fachkräfte-einwanderungsgesetz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schubladen-zweiwanderungsgesetz', selected: { $numberInt: '1' } }
    ],
    ranking: ['schubladen-zweiwanderungsgesetz']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3e' },
    key: 'flüchtlingshilfepreis',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schlauchbootlingshilfepreis', selected: { $numberInt: '1' } }
    ],
    ranking: ['schlauchbootlingshilfepreis']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0166' },
    key: 'deutschen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutschen', selected: { $numberInt: '1' } },
      { word: 'antivirensoftwareländischen', selected: { $numberInt: '1' } },
      { word: 'sehnsuchtsländischen', selected: { $numberInt: '1' } },
      { word: 'kartoffelpufferen', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenländern', selected: { $numberInt: '1' } },
      { word: 'zentralmenschigen', selected: { $numberInt: '1' } },
      { word: 'germanischen', selected: { $numberInt: '1' } },
      { word: 'deutschländischen', selected: { $numberInt: '1' } }
    ],
    ranking: ['biodeutschen', 'kartoffelpufferen', 'qualitätswarenländern']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0181' },
    key: 'migranten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'migrantenlinge', selected: { $numberInt: '1' } },
      { word: 'multiländer', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'subjekte', selected: { $numberInt: '1' } },
      { word: 'kämpfer', selected: { $numberInt: '1' } },
      { word: 'zugereiste', selected: { $numberInt: '1' } },
      { word: 'charaktere', selected: { $numberInt: '1' } },
      { word: 'mehrsprachler', selected: { $numberInt: '1' } },
      { word: 'ungleichberechtigte', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'subjekte', 'multiländer']
  },
  {
    _id: { $oid: '5d174b40188801020270dc40' },
    key: 'grenzzäune',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankübertrittzäune', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankübertrittzäune']
  },
  {
    _id: { $oid: '5d174b40188801020270dc41' },
    key: 'zeltlager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wigwamlager', selected: { $numberInt: '1' } },
      { word: 'campingplatz', selected: { $numberInt: '1' } }
    ],
    ranking: ['wigwamlager', 'campingplatz']
  },
  {
    _id: { $oid: '5d174b40188801020270dc42' },
    key: 'us-südgrenze',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'us-südbereich', selected: { $numberInt: '1' } },
      { word: 'us-südschranke', selected: { $numberInt: '1' } },
      { word: 'us-südgemarkung', selected: { $numberInt: '1' } }
    ],
    ranking: ['us-südbereich', 'us-südschranke', 'us-südgemarkung']
  },
  {
    _id: { $oid: '5d174b40188801020270dc43' },
    key: 'us-grenzlager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'us-einreisestopplager', selected: { $numberInt: '1' } },
      { word: 'us-gewaltkontrolllager', selected: { $numberInt: '1' } },
      { word: 'us-machtkontrolllager', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'us-einreisestopplager',
      'us-gewaltkontrolllager',
      'us-machtkontrolllager'
    ]
  },
  {
    _id: { $oid: '5d174b40188801020270dc44' },
    key: 'halbdeutsche',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'halbmenschen', selected: { $numberInt: '1' } }],
    ranking: ['halbmenschen']
  },
  {
    _id: { $oid: '5d174b40188801020270dc45' },
    key: 'menschenschmuggel',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenabtransport', selected: { $numberInt: '1' } },
      { word: 'menschenwarenschmuggel', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenabtransport', 'menschenwarenschmuggel']
  },
  {
    _id: { $oid: '5d174b40188801020270dc46' },
    key: 'us-präsident',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'us-machtdiktator', selected: { $numberInt: '1' } }],
    ranking: ['us-machtdiktator']
  },
  {
    _id: { $oid: '5d174b40188801020270dc47' },
    key: 'us-repräsentantenhaus',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'us-vorzeigehaus', selected: { $numberInt: '1' } }],
    ranking: ['us-vorzeigehaus']
  },
  {
    _id: { $oid: '5d174b40188801020270dc48' },
    key: 'halbjapaner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'halbemenschen', selected: { $numberInt: '1' } }],
    ranking: ['halbemenschen']
  },
  {
    _id: { $oid: '5d174b40188801020270dc49' },
    key: 'auffanglager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'auffangbecken', selected: { $numberInt: '1' } },
      { word: 'aufpäppelllager', selected: { $numberInt: '1' } },
      { word: 'wartelager', selected: { $numberInt: '1' } },
      { word: 'wartebereichslager', selected: { $numberInt: '1' } }
    ],
    ranking: ['auffangbecken', 'aufpäppelllager', 'wartelager']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4a' },
    key: 'auffanglagern',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'auffangbecken', selected: { $numberInt: '1' } },
      { word: 'aufpäppellager', selected: { $numberInt: '1' } },
      { word: 'wartelagern', selected: { $numberInt: '1' } },
      { word: 'wartenbereichslagern', selected: { $numberInt: '1' } }
    ],
    ranking: ['auffangbecken', 'aufpäppellager', 'wartelagern']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4b' },
    key: 'migrantenkinder',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'migrantlingskinder', selected: { $numberInt: '1' } },
      { word: 'menschenkinder', selected: { $numberInt: '1' } },
      { word: 'multilandskinder', selected: { $numberInt: '1' } }
    ],
    ranking: ['migrantlingskinder', 'menschenkinder', 'multilandskinder']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4c' },
    key: 'unterbringung',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'überbringung', selected: { $numberInt: '1' } }],
    ranking: ['überbringung']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4d' },
    key: 'asylbewerbern',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsbewerbern', selected: { $numberInt: '1' } },
      { word: 'antragsschreibenden', selected: { $numberInt: '1' } },
      { word: 'zwangsbürokraten', selected: { $numberInt: '1' } },
      { word: 'schreiberlingen', selected: { $numberInt: '1' } },
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'hoffnungsträgern', selected: { $numberInt: '1' } },
      { word: 'zufluchtssuchenden', selected: { $numberInt: '1' } },
      { word: 'ankommern', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsbewerbern', 'antragsschreibenden', 'zwangsbürokraten']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4e' },
    key: 'illegalen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gesetzeswidrigen', selected: { $numberInt: '1' } },
      { word: 'verbotenen', selected: { $numberInt: '1' } },
      { word: 'unrechtmäßigen', selected: { $numberInt: '1' } }
    ],
    ranking: ['gesetzeswidrigen', 'verbotenen', 'unrechtmäßigen']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4f' },
    key: 'staate',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'machtarm', selected: { $numberInt: '1' } }],
    ranking: ['machtarm']
  },
  {
    _id: { $oid: '5d17519c188801020270dc50' },
    key: 'einreisebestimmungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'arbeitsbestimmungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['arbeitsbestimmungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc51' },
    key: 'einreisen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'reinkommen', selected: { $numberInt: '1' } }],
    ranking: ['reinkommen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc52' },
    key: 'zuwanderer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zuwanderhintergründler', selected: { $numberInt: '1' } },
      { word: 'hinzuwanderer', selected: { $numberInt: '1' } },
      { word: 'geschlossenwanderer', selected: { $numberInt: '1' } },
      { word: 'landwanderer', selected: { $numberInt: '1' } }
    ],
    ranking: ['zuwanderhintergründler', 'hinzuwanderer', 'geschlossenwanderer']
  },
  {
    _id: { $oid: '5d17519c188801020270dc53' },
    key: 'einrichtungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweirichtungen', selected: { $numberInt: '1' } },
      { word: 'menschenablagen', selected: { $numberInt: '1' } },
      { word: 'menscheneinrichtungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweirichtungen', 'menschenablagen', 'menscheneinrichtungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc54' },
    key: 'erstaufnahmeeinrichtung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ausnahmeeinrichtung', selected: { $numberInt: '1' } }
    ],
    ranking: ['ausnahmeeinrichtung']
  },
  {
    _id: { $oid: '5d17519c188801020270dc55' },
    key: 'doppelstaatler',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'vielfachstaatler', selected: { $numberInt: '1' } },
      { word: 'vierfachstaatler', selected: { $numberInt: '1' } },
      { word: 'vierfüßlerstandler', selected: { $numberInt: '1' } }
    ],
    ranking: ['vielfachstaatler', 'vierfachstaatler', 'vierfüßlerstandler']
  },
  {
    _id: { $oid: '5d17519c188801020270dc56' },
    key: 'herkunftsländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'keimländer', selected: { $numberInt: '1' } },
      { word: 'quellenländer', selected: { $numberInt: '1' } }
    ],
    ranking: ['keimländer', 'quellenländer']
  },
  {
    _id: { $oid: '5d17519c188801020270dc57' },
    key: 'staatsbürger',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'machtbürger', selected: { $numberInt: '1' } },
      { word: 'kraftbürger', selected: { $numberInt: '1' } }
    ],
    ranking: ['machtbürger', 'kraftbürger']
  },
  {
    _id: { $oid: '5d17519c188801020270dc58' },
    key: 'eu-bürger',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'im-club-bürger', selected: { $numberInt: '1' } }],
    ranking: ['im-club-bürger']
  },
  {
    _id: { $oid: '5d17519c188801020270dc59' },
    key: 'doppelstaatlen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'vielfachstaatlern', selected: { $numberInt: '1' } },
      { word: 'vierfachstaatlern', selected: { $numberInt: '1' } },
      { word: 'vierfüßerstandlern', selected: { $numberInt: '1' } }
    ],
    ranking: ['vielfachstaatlern', 'vierfachstaatlern', 'vierfüßerstandlern']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5a' },
    key: 'eu-hoch',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'welttief', selected: { $numberInt: '1' } }],
    ranking: ['welttief']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5b' },
    key: 'migrationsbehörde',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wanderungsbehörde', selected: { $numberInt: '1' } },
      { word: 'migrantenlingsbehörde', selected: { $numberInt: '1' } },
      { word: 'menschenbehörde', selected: { $numberInt: '1' } }
    ],
    ranking: ['wanderungsbehörde', 'migrantenlingsbehörde', 'menschenbehörde']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5c' },
    key: 'sprachförderung',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mundartförderung', selected: { $numberInt: '1' } }],
    ranking: ['mundartförderung']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5d' },
    key: 'inländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'einländer', selected: { $numberInt: '1' } },
      { word: 'treuländer', selected: { $numberInt: '1' } },
      { word: 'deutschländer', selected: { $numberInt: '1' } }
    ],
    ranking: ['einländer', 'treuländer', 'deutschländer']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5e' },
    key: 'erstaufnahmeeinrichtungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ausnahmeeinrichtungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['ausnahmeeinrichtungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5f' },
    key: 'abgeschoben',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'weggeschoben', selected: { $numberInt: '1' } },
      { word: 'rausgeschoben', selected: { $numberInt: '1' } }
    ],
    ranking: ['weggeschoben', 'rausgeschoben']
  },
  {
    _id: { $oid: '5d17519c188801020270dc60' },
    key: 'sanktionsdrohungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bestrafungsdrohungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['bestrafungsdrohungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc61' },
    key: 'neubürger',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'neumensch', selected: { $numberInt: '1' } }],
    ranking: ['neumensch']
  },
  {
    _id: { $oid: '5d17519c188801020270dc62' },
    key: 'bleibeperspektive',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fortbestandsperspektive', selected: { $numberInt: '1' } },
      { word: 'daseinserlaubnis', selected: { $numberInt: '1' } }
    ],
    ranking: ['fortbestandsperspektive', 'daseinserlaubnis']
  },
  {
    _id: { $oid: '5d17519c188801020270dc63' },
    key: 'staaten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'orten', selected: { $numberInt: '1' } },
      { word: 'politische kräfte', selected: { $numberInt: '1' } },
      { word: 'größenordnungen', selected: { $numberInt: '1' } },
      { word: 'machtarmen', selected: { $numberInt: '1' } },
      { word: 'gebieten mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['orten', 'politische kräfte', 'größenordnungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc64' },
    key: 'sammelunterkünfte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschensammelsurium', selected: { $numberInt: '1' } },
      { word: 'sammelstätte', selected: { $numberInt: '1' } },
      { word: 'massenunterkünfte', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschensammelsurium', 'sammelstätte', 'massenunterkünfte']
  },
  {
    _id: { $oid: '5d17519c188801020270dc65' },
    key: 'unterbringungszeiten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'überbrückungszeiten', selected: { $numberInt: '1' } }
    ],
    ranking: ['überbrückungszeiten']
  },
  {
    _id: { $oid: '5d17519c188801020270dc66' },
    key: 'notunterkünften',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'notlageunterkünften', selected: { $numberInt: '1' } },
      { word: 'leidunterkünften', selected: { $numberInt: '1' } },
      { word: 'sos-unterkünften', selected: { $numberInt: '1' } }
    ],
    ranking: ['notlageunterkünften', 'leidunterkünften', 'sos-unterkünften']
  },
  {
    _id: { $oid: '5d17519c188801020270dc67' },
    key: 'einreise',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inslanderlaubnisreise', selected: { $numberInt: '1' } }
    ],
    ranking: ['inslanderlaubnisreise']
  },
  {
    _id: { $oid: '5d17519c188801020270dc68' },
    key: 'verwaltungsakt',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'dokumentenakt', selected: { $numberInt: '1' } }],
    ranking: ['dokumentenakt']
  },
  {
    _id: { $oid: '5d17519c188801020270dc69' },
    key: 'eingereist',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'reingekommen', selected: { $numberInt: '1' } }],
    ranking: ['reingekommen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6a' },
    key: 'haftlager',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'knast', selected: { $numberInt: '1' } }],
    ranking: ['knast']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6b' },
    key: 'einrichtung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweirichtung', selected: { $numberInt: '1' } },
      { word: 'menschenablage', selected: { $numberInt: '1' } },
      { word: 'menscheneinrichtung', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweirichtung', 'menschenablage', 'menscheneinrichtung']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6c' },
    key: 'herkunftsland',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'keimland', selected: { $numberInt: '1' } },
      { word: 'quellenland', selected: { $numberInt: '1' } }
    ],
    ranking: ['keimland', 'quellenland']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6d' },
    key: 'staatsangehörigkeitsrecht',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'machtangehörigkeitsrecht', selected: { $numberInt: '1' } },
      { word: 'berechtigungsdaseinsrecht', selected: { $numberInt: '1' } }
    ],
    ranking: ['machtangehörigkeitsrecht', 'berechtigungsdaseinsrecht']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6e' },
    key: 'notunterkünfte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'notlageunterkünfte', selected: { $numberInt: '1' } },
      { word: 'leidunterkünfte', selected: { $numberInt: '1' } },
      { word: 'sos-unterkünfte', selected: { $numberInt: '1' } }
    ],
    ranking: ['notlageunterkünfte', 'leidunterkünfte', 'sos-unterkünfte']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6f' },
    key: 'arbeitsmigranten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'arbeitsmigrantlinge', selected: { $numberInt: '1' } },
      { word: 'arbeitsvielländer', selected: { $numberInt: '1' } },
      { word: 'arbeitsbewegende', selected: { $numberInt: '1' } },
      { word: 'arbeiter', selected: { $numberInt: '1' } }
    ],
    ranking: ['arbeitsmigrantlinge', 'arbeitsvielländer', 'arbeitsbewegende']
  },
  {
    _id: { $oid: '5d17519c188801020270dc70' },
    key: 'aufenthaltserlaubnis',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschendaseinserlaubnis', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschendaseinserlaubnis']
  },
  {
    _id: { $oid: '5d17519c188801020270dc71' },
    key: 'ausländerzentralregister',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'vielländerzentralregister', selected: { $numberInt: '1' } }
    ],
    ranking: ['vielländerzentralregister']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03091' },
    key: 'rechtsextreme',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelextreme', selected: { $numberInt: '1' } }],
    ranking: ['mittelextreme']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03092' },
    key: 'rechtsextremisten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'mittelextremisten', selected: { $numberInt: '1' } }
    ],
    ranking: ['mittelextremisten']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03093' },
    key: 'einwanderungsreform',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweiwanderungsreform', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweiwanderungsreform']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03094' },
    key: 'rechtsextrem',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelextrem', selected: { $numberInt: '1' } }],
    ranking: ['mittelextrem']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03095' },
    key: 'migrationsgesetz',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'bewegungsgesetz', selected: { $numberInt: '1' } }],
    ranking: ['bewegungsgesetz']
  },
  {
    _id: { $oid: '5d10ee53188801301ee03096' },
    key: 'rechtsextremist',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mittelextremist', selected: { $numberInt: '1' } }],
    ranking: ['mittelextremist']
  },
  {
    _id: { $oid: '5d10f60b188801301ee03098' },
    key: 'halbschwarz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'halbweiß', selected: { $numberInt: '1' } },
      { word: 'halbtransparent', selected: { $numberInt: '1' } }
    ],
    ranking: ['halbweiß', 'halbtransparent']
  },
  {
    _id: { $oid: '5d10f60b188801301ee03099' },
    key: 'migrationsforscher',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenbewegungsforscher', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenbewegungsforscher']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309a' },
    key: 'migrationsforscherin',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenbewegungsforscherin', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenbewegungsforscherin']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309b' },
    key: 'schwarzfahren',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'graufahren', selected: { $numberInt: '1' } }],
    ranking: ['graufahren']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309c' },
    key: 'schwarzarbeiter',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grauarbeiter', selected: { $numberInt: '1' } }],
    ranking: ['grauarbeiter']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309d' },
    key: 'schwarzarbeit',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grauarbeit', selected: { $numberInt: '1' } }],
    ranking: ['grauarbeit']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309e' },
    key: 'ureinwohnerin',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'auswohnerin', selected: { $numberInt: '1' } }],
    ranking: ['auswohnerin']
  },
  {
    _id: { $oid: '5d10f60b188801301ee0309f' },
    key: 'schwarzafrikaner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grünpaprikaner', selected: { $numberInt: '1' } }],
    ranking: ['grünpaprikaner']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a0' },
    key: 'buschmänner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'buschlinge', selected: { $numberInt: '1' } }],
    ranking: ['buschlinge']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a1' },
    key: 'migrationsforscherinnen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenbewegungsforscherinnen', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenbewegungsforscherinnen']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a2' },
    key: 'schwarzarbeiterin',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'grauarbeiterin', selected: { $numberInt: '1' } }],
    ranking: ['grauarbeiterin']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a3' },
    key: 'mandelauge',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'erdnussauge', selected: { $numberInt: '1' } }],
    ranking: ['erdnussauge']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a4' },
    key: 'aufenthaltsgestattung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsgestattung', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsgestattung']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a5' },
    key: 'eingeborene',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'ausgeborene', selected: { $numberInt: '1' } }],
    ranking: ['ausgeborene']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a6' },
    key: 'maximalpigmentiert',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minimalpigmentiert', selected: { $numberInt: '1' } },
      { word: 'minimalfrequentiert', selected: { $numberInt: '1' } }
    ],
    ranking: ['minimalpigmentiert', 'minimalfrequentiert']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a7' },
    key: 'eingeborener',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'ausgeborener', selected: { $numberInt: '1' } }],
    ranking: ['ausgeborener']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a8' },
    key: 'hellbraun',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'hellweiß', selected: { $numberInt: '1' } }],
    ranking: ['hellweiß']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030a9' },
    key: 'uhreinwohnerinnen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'auswohnerinnen', selected: { $numberInt: '1' } }],
    ranking: ['auswohnerinnen']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030ab' },
    key: 'maximalpigmentierte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minimalpigmentierte', selected: { $numberInt: '1' } },
      { word: 'minimalfrequentierte', selected: { $numberInt: '1' } }
    ],
    ranking: ['minimalpigmentierte', 'minimalfrequentierte']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030ac' },
    key: 'illegal',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'gesetzeswidrig', selected: { $numberInt: '1' } }],
    ranking: ['gesetzeswidrig']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030ad' },
    key: 'halb-schwarz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'halb-weiß', selected: { $numberInt: '1' } },
      { word: 'halb-transparent', selected: { $numberInt: '1' } }
    ],
    ranking: ['halb-weiß', 'halb-transparent']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030ae' },
    key: 'mandelaugen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'erdnussaugen', selected: { $numberInt: '1' } }],
    ranking: ['erdnussaugen']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030af' },
    key: 'maximalpigmentierter',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'minimalfrequentierter', selected: { $numberInt: '1' } }
    ],
    ranking: ['minimalfrequentierter']
  },
  {
    _id: { $oid: '5d10f60b188801301ee030b0' },
    key: 'ureinwohner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'auswohner', selected: { $numberInt: '1' } }],
    ranking: ['auswohner']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0180' },
    key: 'migration',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wanderung', selected: { $numberInt: '1' } },
      { word: 'bewegung bestimmter gruppen', selected: { $numberInt: '1' } },
      { word: 'herkunftsmythisierung', selected: { $numberInt: '1' } },
      { word: 'normalität', selected: { $numberInt: '1' } },
      { word: 'imagination', selected: { $numberInt: '1' } },
      { word: 'menschennormalität', selected: { $numberInt: '1' } }
    ],
    ranking: ['wanderung', 'bewegung bestimmter gruppen']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0185' },
    key: 'asylunterkünfte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'notfallüberkünfte', selected: { $numberInt: '1' } },
      { word: 'unterbringungen', selected: { $numberInt: '1' } },
      { word: 'dauernotschlafstelle', selected: { $numberInt: '1' } }
    ],
    ranking: ['sozialwohnungen', 'unterbringungen']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0167' },
    key: 'deutschland',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutschland', selected: { $numberInt: '1' } },
      { word: 'musterdeutschland', selected: { $numberInt: '1' } },
      { word: 'antivirensoftwareland', selected: { $numberInt: '1' } },
      { word: 'zentrum der erde', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenland', selected: { $numberInt: '1' } },
      { word: 'sehnsuchtsland', selected: { $numberInt: '1' } },
      { word: 'wer oder was ist deutschland?', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'biodeutschland',
      'wer oder was ist deutschland?',
      'antivirensoftwareland'
    ]
  },
  {
    _id: { $oid: '5d17375b188801020270dc10' },
    key: 'anerkennungsquote',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'auserkennungsquote', selected: { $numberInt: '1' } },
      { word: 'akzeptanzquote', selected: { $numberInt: '1' } }
    ],
    ranking: ['auserkennungsquote', 'akzeptanzquote']
  },
  {
    _id: { $oid: '5d17375b188801020270dc11' },
    key: 'flüchtlingsbewegungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlongsbewegungen', selected: { $numberInt: '1' } },
      { word: 'lieblingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'menschlingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'brückenlingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'schützlingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'prüflingsbewegungen', selected: { $numberInt: '1' } },
      { word: 'schreiberlingsbewegungen', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bootlongsbewegungen',
      'lieblingsbewegungen',
      'menschlingsbewegungen'
    ]
  },
  {
    _id: { $oid: '5d17375b188801020270dc12' },
    key: 'nation',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenschlag', selected: { $numberInt: '1' } },
      { word: 'staatsinländer', selected: { $numberInt: '1' } },
      { word: 'gleichherkunftsgemeinschaft', selected: { $numberInt: '1' } },
      { word: 'menschengebiet', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenschlag', 'staatsinländer', 'gleichherkunftsgemeinschaft']
  },
  {
    _id: { $oid: '5d17375b188801020270dc13' },
    key: 'internationalen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zwischennationalen', selected: { $numberInt: '1' } },
      { word: 'zwischenmenschlichen', selected: { $numberInt: '1' } }
    ],
    ranking: ['zwischennationalen', 'zwischenmenschlichen']
  },
  {
    _id: { $oid: '5d17375b188801020270dc14' },
    key: 'grenzübertritte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertritte', selected: { $numberInt: '1' } },
      { word: 'trennflächenübertritte', selected: { $numberInt: '1' } },
      { word: 'raumrandübertritte', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'schrankuntertritte',
      'trennflächenübertritte',
      'raumrandübertritte'
    ]
  },
  {
    _id: { $oid: '5d17375b188801020270dc15' },
    key: 'hellhäutig',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'transparenthäutig', selected: { $numberInt: '1' } }
    ],
    ranking: ['transparenthäutig']
  },
  {
    _id: { $oid: '5d17375b188801020270dc16' },
    key: 'eskimo',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fremdbezeichnungsmensch', selected: { $numberInt: '1' } },
      { word: 'kalaallit', selected: { $numberInt: '1' } },
      { word: 'grönländer', selected: { $numberInt: '1' } }
    ],
    ranking: ['fremdbezeichnungsmensch', 'kalaallit', 'grönländer']
  },
  {
    _id: { $oid: '5d17375b188801020270dc17' },
    key: 'eurpäische',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zentralweltische', selected: { $numberInt: '1' } },
      { word: 'einheitliche', selected: { $numberInt: '1' } },
      { word: 'ausschließende', selected: { $numberInt: '1' } }
    ],
    ranking: ['zentralweltische', 'einheitliche', 'ausschließende']
  },
  {
    _id: { $oid: '5d17375b188801020270dc19' },
    key: 'abschiebebedingung',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'in-die-wüste-schicken-bedingung',
        selected: { $numberInt: '1' }
      },
      { word: 'loswerdebedingung', selected: { $numberInt: '1' } }
    ],
    ranking: ['in-die-wüste-schicken-bedingung', 'loswerdebedingung']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1b' },
    key: 'herkunftsstaat',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'heimatstaat', selected: { $numberInt: '1' } },
      { word: 'abstammungsstaat', selected: { $numberInt: '1' } },
      { word: 'fabrikationsnamenskraft', selected: { $numberInt: '1' } }
    ],
    ranking: ['heimatstaat', 'abstammungsstaat', 'fabrikationsnamenskraft']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1c' },
    key: 'hautfarbe',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'körperfarbe', selected: { $numberInt: '1' } },
      { word: 'hautpigmente', selected: { $numberInt: '1' } },
      { word: 'hautzelle', selected: { $numberInt: '1' } },
      { word: 'blutfarbe', selected: { $numberInt: '1' } },
      { word: 'fußfarbe', selected: { $numberInt: '1' } }
    ],
    ranking: ['körperfarbe', 'hautpigmente', 'hautzelle']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1d' },
    key: 'herkunftsstaaten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'heimatstaaten', selected: { $numberInt: '1' } },
      { word: 'abstammungsstaaten', selected: { $numberInt: '1' } },
      { word: 'fabrikationsnamenskräfte', selected: { $numberInt: '1' } }
    ],
    ranking: ['heimatstaaten', 'abstammungsstaaten', 'fabrikationsnamenskräfte']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1e' },
    key: 'europäischen union',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zentralweltischen einheit', selected: { $numberInt: '1' } }
    ],
    ranking: ['zentralweltischen einheit']
  },
  {
    _id: { $oid: '5d17375b188801020270dc1f' },
    key: 'abschieben',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wegschieben', selected: { $numberInt: '1' } },
      { word: 'den-wal-schieben', selected: { $numberInt: '1' } }
    ],
    ranking: ['wegschieben', 'den-wal-schieben']
  },
  {
    _id: { $oid: '5d17375b188801020270dc20' },
    key: 'flüchtlingsbewegung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingsbewegung', selected: { $numberInt: '1' } },
      { word: 'lieblingsbewegung', selected: { $numberInt: '1' } },
      { word: 'menschlingsbewegung', selected: { $numberInt: '1' } },
      { word: 'brückenlingsbewegung', selected: { $numberInt: '1' } },
      { word: 'schützlingsbewegung', selected: { $numberInt: '1' } },
      { word: 'prüflingsbewegung', selected: { $numberInt: '1' } },
      { word: 'schreiberlingsbewegung', selected: { $numberInt: '1' } }
    ],
    ranking: ['bootlingsbewegung', 'lieblingsbewegung', 'menschlingsbewegung']
  },
  {
    _id: { $oid: '5d17375b188801020270dc21' },
    key: 'grenzen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schranken', selected: { $numberInt: '1' } },
      { word: 'raumränder', selected: { $numberInt: '1' } },
      { word: 'trennflächen', selected: { $numberInt: '1' } }
    ],
    ranking: ['schranken', 'raumränder', 'trennflächen']
  },
  {
    _id: { $oid: '5d17375b188801020270dc22' },
    key: 'eskimos',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fremdbezeichnungsmenschen', selected: { $numberInt: '1' } },
      { word: 'kaaalliten', selected: { $numberInt: '1' } },
      { word: 'grönländer', selected: { $numberInt: '1' } },
      { word: 'menschen', selected: { $numberInt: '1' } }
    ],
    ranking: ['fremdbezeichnungsmenschen', 'kaaalliten', 'grönländer']
  },
  {
    _id: { $oid: '5d17375b188801020270dc23' },
    key: 'europarecht',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'zentralweltrecht', selected: { $numberInt: '1' } }],
    ranking: ['zentralweltrecht']
  },
  {
    _id: { $oid: '5d17375b188801020270dc24' },
    key: 'grenzübertritt',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankuntertritt', selected: { $numberInt: '1' } },
      { word: 'raumrandübertritt', selected: { $numberInt: '1' } },
      { word: 'trennflächeübertritt', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankuntertritt', 'raumrandübertritt', 'trennflächeübertritt']
  },
  {
    _id: { $oid: '5d17375b188801020270dc25' },
    key: 'anerkennung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'auserkennung', selected: { $numberInt: '1' } },
      { word: 'akzeptanz', selected: { $numberInt: '1' } }
    ],
    ranking: ['auserkennung', 'akzeptanz']
  },
  {
    _id: { $oid: '5d17375b188801020270dc26' },
    key: 'flüchtlingscamp',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschencamp', selected: { $numberInt: '1' } },
      { word: 'massenhaltungscamp', selected: { $numberInt: '1' } },
      { word: 'sparcamp', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschencamp', 'massenhaltungscamp', 'sparcamp']
  },
  {
    _id: { $oid: '5d17375b188801020270dc27' },
    key: 'hellhäutige',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'transparenthäutige', selected: { $numberInt: '1' } }
    ],
    ranking: ['transparenthäutige']
  },
  {
    _id: { $oid: '5d17375b188801020270dc28' },
    key: 'sozialsystem',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenfreundsystem', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenfreundsystem']
  },
  {
    _id: { $oid: '5d17375b188801020270dc29' },
    key: 'abschiebebedingungen',
    __v: { $numberInt: '0' },
    alternatives: [
      {
        word: 'in-die-wüste-schicken-bedingungen',
        selected: { $numberInt: '1' }
      },
      { word: 'loswerdebedinugngen', selected: { $numberInt: '1' } }
    ],
    ranking: ['in-die-wüste-schicken-bedingungen', 'loswerdebedinugngen']
  },
  {
    _id: { $oid: '5d17375b188801020270dc2a' },
    key: 'hautfarben',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'körperfarben', selected: { $numberInt: '1' } },
      { word: 'hautbigmente', selected: { $numberInt: '1' } },
      { word: 'hautzellen', selected: { $numberInt: '1' } },
      { word: 'blutfarben', selected: { $numberInt: '1' } },
      { word: 'fußfarben', selected: { $numberInt: '1' } }
    ],
    ranking: ['körperfarben', 'hautbigmente', 'hautzellen']
  },
  {
    _id: { $oid: '5d17375b188801020270dc2b' },
    key: 'einwanderungsland',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweiwanderungsland', selected: { $numberInt: '1' } },
      { word: 'vielwanderungsland', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweiwanderungsland', 'vielwanderungsland']
  },
  {
    _id: { $oid: '5d17375b188801020270dc2c' },
    key: 'zugewanderte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zugewanderhintergründler', selected: { $numberInt: '1' } },
      { word: 'hinzugewanderte', selected: { $numberInt: '1' } },
      { word: 'geschlossengewanderte', selected: { $numberInt: '1' } },
      { word: 'landgewanderte', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'zugewanderhintergründler',
      'hinzugewanderte',
      'geschlossengewanderte'
    ]
  },
  {
    _id: { $oid: '5d17375b188801020270dc2d' },
    key: 'sozialsysteme',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenfreundsysteme', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenfreundsysteme']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0173' },
    key: 'integration',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'eingemeindung', selected: { $numberInt: '1' } },
      { word: 'ungleichheit', selected: { $numberInt: '1' } },
      { word: 'individuenstopp', selected: { $numberInt: '1' } },
      { word: 'verbindung zu einer ganzheit', selected: { $numberInt: '1' } },
      { word: 'zusammenschluss', selected: { $numberInt: '1' } },
      { word: 'eingemeindung', selected: { $numberInt: '1' } },
      { word: 'gruppeneinteilung', selected: { $numberInt: '1' } },
      { word: 'einbeziehung', selected: { $numberInt: '1' } }
    ],
    ranking: ['eingemeindung', 'zusammenführung', 'individuenstopp']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc30' },
    key: 'visumsantrag',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'sichtvermerkantrag', selected: { $numberInt: '1' } },
      { word: 'einreiseerlaubnisantrag', selected: { $numberInt: '1' } },
      { word: 'herkunftsabhängigkeitsantrag', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'sichtvermerkantrag',
      'einreiseerlaubnisantrag',
      'herkunftsabhängigkeitsantrag'
    ]
  },
  {
    _id: { $oid: '5d1745d8188801020270dc32' },
    key: 'integrationswillen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'anpassungswillen', selected: { $numberInt: '1' } },
      { word: 'exgrationswillen', selected: { $numberInt: '1' } },
      { word: 'eingemeindungswillen', selected: { $numberInt: '1' } },
      { word: 'ungleichheitsfragen', selected: { $numberInt: '1' } }
    ],
    ranking: ['anpassungswillen', 'exgrationswillen', 'eingemeindungswillen']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc33' },
    key: 'flüchtlingsberater',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schlauchbootlingsberater', selected: { $numberInt: '1' } },
      { word: 'schlauchbootlingsberaterin', selected: { $numberInt: '1' } }
    ],
    ranking: ['schlauchbootlingsberater', 'schlauchbootlingsberaterin']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc34' },
    key: 'integrationskinder',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'lieblingskinder', selected: { $numberInt: '1' } }],
    ranking: ['lieblingskinder']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc35' },
    key: 'integrationskind',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'lieblingskind', selected: { $numberInt: '1' } }],
    ranking: ['lieblingskind']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc36' },
    key: 'ausländerpolitik',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'exländerpolitik', selected: { $numberInt: '1' } }],
    ranking: ['exländerpolitik']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc37' },
    key: 'sozialausgabe',
    __v: { $numberInt: '0' },
    alternatives: [],
    ranking: []
  },
  {
    _id: { $oid: '5d1745d8188801020270dc38' },
    key: 'sozialausgaben',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenfreundausgaben', selected: { $numberInt: '1' } },
      { word: 'menschenfreundausgabe', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenfreundausgaben', 'menschenfreundausgabe']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc39' },
    key: 'integrationsdebatte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ungleichheitsdebatte', selected: { $numberInt: '1' } }
    ],
    ranking: ['ungleichheitsdebatte']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3a' },
    key: 'flüchtlingsunterkunft',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingsunterkunft', selected: { $numberInt: '1' } },
      { word: 'menschlingsunterkunft', selected: { $numberInt: '1' } },
      { word: 'lieblingsunterkunft', selected: { $numberInt: '1' } },
      { word: 'obdachsunterkunft', selected: { $numberInt: '1' } },
      { word: 'bretterverschlagsunterkunft', selected: { $numberInt: '1' } },
      { word: 'absteigehochkunft', selected: { $numberInt: '1' } },
      { word: 'obdach', selected: { $numberInt: '1' } },
      { word: 'bretterverschlag', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'bootlingsunterkunft',
      'menschlingsunterkunft',
      'lieblingsunterkunft'
    ]
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3b' },
    key: 'flüchtlingshilfe',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bootlingshilfe', selected: { $numberInt: '1' } },
      { word: 'lieblingshilfe', selected: { $numberInt: '1' } },
      { word: 'menschlingshilfe', selected: { $numberInt: '1' } }
    ],
    ranking: ['bootlingshilfe', 'lieblingshilfe', 'menschlingshilfe']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3c' },
    key: 'visumsanträge',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'sichtvermerkanträge', selected: { $numberInt: '1' } },
      { word: 'einreiseerlaubnisanträge', selected: { $numberInt: '1' } },
      { word: 'herkunftsabhängigkeitsantrag', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'sichtvermerkanträge',
      'einreiseerlaubnisanträge',
      'herkunftsabhängigkeitsantrag'
    ]
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3d' },
    key: 'fachkräfte-einwanderungsgesetz',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schubladen-zweiwanderungsgesetz', selected: { $numberInt: '1' } }
    ],
    ranking: ['schubladen-zweiwanderungsgesetz']
  },
  {
    _id: { $oid: '5d1745d8188801020270dc3e' },
    key: 'flüchtlingshilfepreis',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schlauchbootlingshilfepreis', selected: { $numberInt: '1' } }
    ],
    ranking: ['schlauchbootlingshilfepreis']
  },
  {
    _id: { $oid: '5d0626d3188801018a7a0166' },
    key: 'deutschen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'biodeutschen', selected: { $numberInt: '1' } },
      { word: 'antivirensoftwareländischen', selected: { $numberInt: '1' } },
      { word: 'sehnsuchtsländischen', selected: { $numberInt: '1' } },
      { word: 'kartoffelpufferen', selected: { $numberInt: '1' } },
      { word: 'qualitätswarenländern', selected: { $numberInt: '1' } },
      { word: 'zentralmenschigen', selected: { $numberInt: '1' } },
      { word: 'germanischen', selected: { $numberInt: '1' } },
      { word: 'deutschländischen', selected: { $numberInt: '1' } }
    ],
    ranking: ['biodeutschen', 'kartoffelpufferen', 'qualitätswarenländern']
  },
  {
    _id: { $oid: '5d062f63188801018a7a0181' },
    key: 'migranten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'migrantenlinge', selected: { $numberInt: '1' } },
      { word: 'multiländer', selected: { $numberInt: '1' } },
      { word: 'terranauten', selected: { $numberInt: '1' } },
      { word: 'subjekte', selected: { $numberInt: '1' } },
      { word: 'kämpfer', selected: { $numberInt: '1' } },
      { word: 'zugereiste', selected: { $numberInt: '1' } },
      { word: 'charaktere', selected: { $numberInt: '1' } },
      { word: 'mehrsprachler', selected: { $numberInt: '1' } },
      { word: 'ungleichberechtigte', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschen', 'subjekte', 'multiländer']
  },
  {
    _id: { $oid: '5d174b40188801020270dc40' },
    key: 'grenzzäune',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'schrankübertrittzäune', selected: { $numberInt: '1' } }
    ],
    ranking: ['schrankübertrittzäune']
  },
  {
    _id: { $oid: '5d174b40188801020270dc41' },
    key: 'zeltlager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wigwamlager', selected: { $numberInt: '1' } },
      { word: 'campingplatz', selected: { $numberInt: '1' } }
    ],
    ranking: ['wigwamlager', 'campingplatz']
  },
  {
    _id: { $oid: '5d174b40188801020270dc42' },
    key: 'us-südgrenze',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'us-südbereich', selected: { $numberInt: '1' } },
      { word: 'us-südschranke', selected: { $numberInt: '1' } },
      { word: 'us-südgemarkung', selected: { $numberInt: '1' } }
    ],
    ranking: ['us-südbereich', 'us-südschranke', 'us-südgemarkung']
  },
  {
    _id: { $oid: '5d174b40188801020270dc43' },
    key: 'us-grenzlager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'us-einreisestopplager', selected: { $numberInt: '1' } },
      { word: 'us-gewaltkontrolllager', selected: { $numberInt: '1' } },
      { word: 'us-machtkontrolllager', selected: { $numberInt: '1' } }
    ],
    ranking: [
      'us-einreisestopplager',
      'us-gewaltkontrolllager',
      'us-machtkontrolllager'
    ]
  },
  {
    _id: { $oid: '5d174b40188801020270dc44' },
    key: 'halbdeutsche',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'halbmenschen', selected: { $numberInt: '1' } }],
    ranking: ['halbmenschen']
  },
  {
    _id: { $oid: '5d174b40188801020270dc45' },
    key: 'menschenschmuggel',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschenabtransport', selected: { $numberInt: '1' } },
      { word: 'menschenwarenschmuggel', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschenabtransport', 'menschenwarenschmuggel']
  },
  {
    _id: { $oid: '5d174b40188801020270dc46' },
    key: 'us-präsident',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'us-machtdiktator', selected: { $numberInt: '1' } }],
    ranking: ['us-machtdiktator']
  },
  {
    _id: { $oid: '5d174b40188801020270dc47' },
    key: 'us-repräsentantenhaus',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'us-vorzeigehaus', selected: { $numberInt: '1' } }],
    ranking: ['us-vorzeigehaus']
  },
  {
    _id: { $oid: '5d174b40188801020270dc48' },
    key: 'halbjapaner',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'halbemenschen', selected: { $numberInt: '1' } }],
    ranking: ['halbemenschen']
  },
  {
    _id: { $oid: '5d174b40188801020270dc49' },
    key: 'auffanglager',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'auffangbecken', selected: { $numberInt: '1' } },
      { word: 'aufpäppelllager', selected: { $numberInt: '1' } },
      { word: 'wartelager', selected: { $numberInt: '1' } },
      { word: 'wartebereichslager', selected: { $numberInt: '1' } }
    ],
    ranking: ['auffangbecken', 'aufpäppelllager', 'wartelager']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4a' },
    key: 'auffanglagern',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'auffangbecken', selected: { $numberInt: '1' } },
      { word: 'aufpäppellager', selected: { $numberInt: '1' } },
      { word: 'wartelagern', selected: { $numberInt: '1' } },
      { word: 'wartenbereichslagern', selected: { $numberInt: '1' } }
    ],
    ranking: ['auffangbecken', 'aufpäppellager', 'wartelagern']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4b' },
    key: 'migrantenkinder',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'migrantlingskinder', selected: { $numberInt: '1' } },
      { word: 'menschenkinder', selected: { $numberInt: '1' } },
      { word: 'multilandskinder', selected: { $numberInt: '1' } }
    ],
    ranking: ['migrantlingskinder', 'menschenkinder', 'multilandskinder']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4c' },
    key: 'unterbringung',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'überbringung', selected: { $numberInt: '1' } }],
    ranking: ['überbringung']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4d' },
    key: 'asylbewerbern',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'daseinsbewerbern', selected: { $numberInt: '1' } },
      { word: 'antragsschreibenden', selected: { $numberInt: '1' } },
      { word: 'zwangsbürokraten', selected: { $numberInt: '1' } },
      { word: 'schreiberlingen', selected: { $numberInt: '1' } },
      { word: 'menschen', selected: { $numberInt: '1' } },
      { word: 'personen', selected: { $numberInt: '1' } },
      { word: 'hoffnungsträgern', selected: { $numberInt: '1' } },
      { word: 'zufluchtssuchenden', selected: { $numberInt: '1' } },
      { word: 'ankommern', selected: { $numberInt: '1' } }
    ],
    ranking: ['daseinsbewerbern', 'antragsschreibenden', 'zwangsbürokraten']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4e' },
    key: 'illegalen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'gesetzeswidrigen', selected: { $numberInt: '1' } },
      { word: 'verbotenen', selected: { $numberInt: '1' } },
      { word: 'unrechtmäßigen', selected: { $numberInt: '1' } }
    ],
    ranking: ['gesetzeswidrigen', 'verbotenen', 'unrechtmäßigen']
  },
  {
    _id: { $oid: '5d174b40188801020270dc4f' },
    key: 'staate',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'machtarm', selected: { $numberInt: '1' } }],
    ranking: ['machtarm']
  },
  {
    _id: { $oid: '5d17519c188801020270dc50' },
    key: 'einreisebestimmungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'arbeitsbestimmungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['arbeitsbestimmungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc51' },
    key: 'einreisen',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'reinkommen', selected: { $numberInt: '1' } }],
    ranking: ['reinkommen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc52' },
    key: 'zuwanderer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zuwanderhintergründler', selected: { $numberInt: '1' } },
      { word: 'hinzuwanderer', selected: { $numberInt: '1' } },
      { word: 'geschlossenwanderer', selected: { $numberInt: '1' } },
      { word: 'landwanderer', selected: { $numberInt: '1' } }
    ],
    ranking: ['zuwanderhintergründler', 'hinzuwanderer', 'geschlossenwanderer']
  },
  {
    _id: { $oid: '5d17519c188801020270dc53' },
    key: 'einrichtungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweirichtungen', selected: { $numberInt: '1' } },
      { word: 'menschenablagen', selected: { $numberInt: '1' } },
      { word: 'menscheneinrichtungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweirichtungen', 'menschenablagen', 'menscheneinrichtungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc54' },
    key: 'erstaufnahmeeinrichtung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ausnahmeeinrichtung', selected: { $numberInt: '1' } }
    ],
    ranking: ['ausnahmeeinrichtung']
  },
  {
    _id: { $oid: '5d17519c188801020270dc55' },
    key: 'doppelstaatler',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'vielfachstaatler', selected: { $numberInt: '1' } },
      { word: 'vierfachstaatler', selected: { $numberInt: '1' } },
      { word: 'vierfüßlerstandler', selected: { $numberInt: '1' } }
    ],
    ranking: ['vielfachstaatler', 'vierfachstaatler', 'vierfüßlerstandler']
  },
  {
    _id: { $oid: '5d17519c188801020270dc56' },
    key: 'herkunftsländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'keimländer', selected: { $numberInt: '1' } },
      { word: 'quellenländer', selected: { $numberInt: '1' } }
    ],
    ranking: ['keimländer', 'quellenländer']
  },
  {
    _id: { $oid: '5d17519c188801020270dc57' },
    key: 'staatsbürger',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'machtbürger', selected: { $numberInt: '1' } },
      { word: 'kraftbürger', selected: { $numberInt: '1' } }
    ],
    ranking: ['machtbürger', 'kraftbürger']
  },
  {
    _id: { $oid: '5d17519c188801020270dc58' },
    key: 'eu-bürger',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'im-club-bürger', selected: { $numberInt: '1' } }],
    ranking: ['im-club-bürger']
  },
  {
    _id: { $oid: '5d17519c188801020270dc59' },
    key: 'doppelstaatlen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'vielfachstaatlern', selected: { $numberInt: '1' } },
      { word: 'vierfachstaatlern', selected: { $numberInt: '1' } },
      { word: 'vierfüßerstandlern', selected: { $numberInt: '1' } }
    ],
    ranking: ['vielfachstaatlern', 'vierfachstaatlern', 'vierfüßerstandlern']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5a' },
    key: 'eu-hoch',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'welttief', selected: { $numberInt: '1' } }],
    ranking: ['welttief']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5b' },
    key: 'migrationsbehörde',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wanderungsbehörde', selected: { $numberInt: '1' } },
      { word: 'migrantenlingsbehörde', selected: { $numberInt: '1' } },
      { word: 'menschenbehörde', selected: { $numberInt: '1' } }
    ],
    ranking: ['wanderungsbehörde', 'migrantenlingsbehörde', 'menschenbehörde']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5c' },
    key: 'sprachförderung',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'mundartförderung', selected: { $numberInt: '1' } }],
    ranking: ['mundartförderung']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5d' },
    key: 'inländer',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'einländer', selected: { $numberInt: '1' } },
      { word: 'treuländer', selected: { $numberInt: '1' } },
      { word: 'deutschländer', selected: { $numberInt: '1' } }
    ],
    ranking: ['einländer', 'treuländer', 'deutschländer']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5e' },
    key: 'erstaufnahmeeinrichtungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'ausnahmeeinrichtungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['ausnahmeeinrichtungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc5f' },
    key: 'abgeschoben',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'weggeschoben', selected: { $numberInt: '1' } },
      { word: 'rausgeschoben', selected: { $numberInt: '1' } }
    ],
    ranking: ['weggeschoben', 'rausgeschoben']
  },
  {
    _id: { $oid: '5d17519c188801020270dc60' },
    key: 'sanktionsdrohungen',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'bestrafungsdrohungen', selected: { $numberInt: '1' } }
    ],
    ranking: ['bestrafungsdrohungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc61' },
    key: 'neubürger',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'neumensch', selected: { $numberInt: '1' } }],
    ranking: ['neumensch']
  },
  {
    _id: { $oid: '5d17519c188801020270dc62' },
    key: 'bleibeperspektive',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'fortbestandsperspektive', selected: { $numberInt: '1' } },
      { word: 'daseinserlaubnis', selected: { $numberInt: '1' } }
    ],
    ranking: ['fortbestandsperspektive', 'daseinserlaubnis']
  },
  {
    _id: { $oid: '5d17519c188801020270dc63' },
    key: 'staaten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'orten', selected: { $numberInt: '1' } },
      { word: 'politische kräfte', selected: { $numberInt: '1' } },
      { word: 'größenordnungen', selected: { $numberInt: '1' } },
      { word: 'machtarmen', selected: { $numberInt: '1' } },
      { word: 'gebieten mit grenzen', selected: { $numberInt: '1' } }
    ],
    ranking: ['orten', 'politische kräfte', 'größenordnungen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc64' },
    key: 'sammelunterkünfte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschensammelsurium', selected: { $numberInt: '1' } },
      { word: 'sammelstätte', selected: { $numberInt: '1' } },
      { word: 'massenunterkünfte', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschensammelsurium', 'sammelstätte', 'massenunterkünfte']
  },
  {
    _id: { $oid: '5d17519c188801020270dc65' },
    key: 'unterbringungszeiten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'überbrückungszeiten', selected: { $numberInt: '1' } }
    ],
    ranking: ['überbrückungszeiten']
  },
  {
    _id: { $oid: '5d17519c188801020270dc66' },
    key: 'notunterkünften',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'notlageunterkünften', selected: { $numberInt: '1' } },
      { word: 'leidunterkünften', selected: { $numberInt: '1' } },
      { word: 'sos-unterkünften', selected: { $numberInt: '1' } }
    ],
    ranking: ['notlageunterkünften', 'leidunterkünften', 'sos-unterkünften']
  },
  {
    _id: { $oid: '5d17519c188801020270dc67' },
    key: 'einreise',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'inslanderlaubnisreise', selected: { $numberInt: '1' } }
    ],
    ranking: ['inslanderlaubnisreise']
  },
  {
    _id: { $oid: '5d17519c188801020270dc68' },
    key: 'verwaltungsakt',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'dokumentenakt', selected: { $numberInt: '1' } }],
    ranking: ['dokumentenakt']
  },
  {
    _id: { $oid: '5d17519c188801020270dc69' },
    key: 'eingereist',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'reingekommen', selected: { $numberInt: '1' } }],
    ranking: ['reingekommen']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6a' },
    key: 'haftlager',
    __v: { $numberInt: '0' },
    alternatives: [{ word: 'knast', selected: { $numberInt: '1' } }],
    ranking: ['knast']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6b' },
    key: 'einrichtung',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'zweirichtung', selected: { $numberInt: '1' } },
      { word: 'menschenablage', selected: { $numberInt: '1' } },
      { word: 'menscheneinrichtung', selected: { $numberInt: '1' } }
    ],
    ranking: ['zweirichtung', 'menschenablage', 'menscheneinrichtung']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6c' },
    key: 'herkunftsland',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'keimland', selected: { $numberInt: '1' } },
      { word: 'quellenland', selected: { $numberInt: '1' } }
    ],
    ranking: ['keimland', 'quellenland']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6d' },
    key: 'staatsangehörigkeitsrecht',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'machtangehörigkeitsrecht', selected: { $numberInt: '1' } },
      { word: 'berechtigungsdaseinsrecht', selected: { $numberInt: '1' } }
    ],
    ranking: ['machtangehörigkeitsrecht', 'berechtigungsdaseinsrecht']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6e' },
    key: 'notunterkünfte',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'notlageunterkünfte', selected: { $numberInt: '1' } },
      { word: 'leidunterkünfte', selected: { $numberInt: '1' } },
      { word: 'sos-unterkünfte', selected: { $numberInt: '1' } }
    ],
    ranking: ['notlageunterkünfte', 'leidunterkünfte', 'sos-unterkünfte']
  },
  {
    _id: { $oid: '5d17519c188801020270dc6f' },
    key: 'arbeitsmigranten',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'arbeitsmigrantlinge', selected: { $numberInt: '1' } },
      { word: 'arbeitsvielländer', selected: { $numberInt: '1' } },
      { word: 'arbeitsbewegende', selected: { $numberInt: '1' } },
      { word: 'arbeiter', selected: { $numberInt: '1' } }
    ],
    ranking: ['arbeitsmigrantlinge', 'arbeitsvielländer', 'arbeitsbewegende']
  },
  {
    _id: { $oid: '5d17519c188801020270dc70' },
    key: 'aufenthaltserlaubnis',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'menschendaseinserlaubnis', selected: { $numberInt: '1' } }
    ],
    ranking: ['menschendaseinserlaubnis']
  },
  {
    _id: { $oid: '5d17519c188801020270dc71' },
    key: 'ausländerzentralregister',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'vielländerzentralregister', selected: { $numberInt: '1' } }
    ],
    ranking: ['vielländerzentralregister']
  },
  {
    _id: { $oid: '5d17519c188801020270dc72' },
    key: 'identitätstäuscher',
    __v: { $numberInt: '0' },
    alternatives: [
      { word: 'wesenseinheitstäuscher', selected: { $numberInt: '1' } },
      { word: 'daseinstäuscher', selected: { $numberInt: '1' } }
    ],
    ranking: ['wesenseinheitstäuscher', 'daseinstäuscher']
  }
]

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
    }
  })
  return inputText
}

const replaceWordsInText = (inputText, replacementWords) => {
  replacementWords.forEach(keyword => {
    if (arrBlacklistedReplElements.indexOf(keyword[0]) === -1) {
      inputText = inputText.replace(keyword[0], '<em>' + keyword[1] + '</em>')
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
    'https://www.mopo.de/news/politik-wirtschaft/schockierende-fotos-polizei-kontrolliert-auto-und-findet-fluechtling-im-handschuhfach-32610226' ||
  window.location.href ===
    'https://www.mopo.de/sport/hsv/hsv-sakai-offen-wie-nie---ich-habe-mich-dafuer-geschaemt--dass-ich-halber-auslaender-war--32338050'
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
  article = document.querySelector('#content-main > div.spArticleContent')
}

if (
  window.location.href ===
    'https://www.stern.de/politik/deutschland/neuregelungen-bei-migration-und-abschiebung--was-bringt-das-gesetzespaket--8745258.html' ||
  window.location.href ===
    'https://www.stern.de/gesundheit/karies--was-passierte--als-der-zucker-in-die-mongolei-kam-8780674.html'
) {
  article = document.querySelector(
    '#main-wrapper > main > article > div.article-content > div.rtf-content-wrapper'
  )
}

if (
  window.location.href ===
  'https://www.sueddeutsche.de/politik/trump-usa-grenze-lager-1.4498070'
) {
  article = document.querySelector('#sitecontent')
}

if (
  window.location.href ===
  'https://www.tagesschau.de/ausland/texas-migrantenkinder-101.html'
) {
  article = document.querySelector(
    '#content > div > div.storywrapper > div.section.sectionZ.sectionArticle'
  )
}

if (
  window.location.href ===
  'https://www.welt.de/politik/ausland/article195804563/Migration-in-die-EU-Deutschland-bleibt-Sehnsuchtsland-fuer-Asylsuchende.html'
) {
  article = document.querySelector(
    '#top > main > article > div.c-sticky-container'
  )
}

init()
