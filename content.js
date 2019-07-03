const refreshHighlightedKeywords = () => {
  strippedElements.forEach(function(element) {
    countOccurences(element.innerHTML, arrKeywords)
  })

  strippedElements.forEach(function(element) {
    element.innerHTML = highlightKeywords(element.innerHTML, arrKeywords)
  })

  console.log(arrFoundKeywords)
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

const countOccurences = (inText, keywords) => {
  console.log('DeM: counting')
  debugger

  for (let i = 0; i < keywords.length; i++) {
    try {
      inText = inText.replace(keywords[i].key, count)
    } catch (e) {
      console.log(e, keywords[i])
      debugger
    }
  }
  return inText
}

const count = str => {
  if (arrFoundKeywords.indexOf(str) === -1) {
    arrFoundKeywords.push(str)
  }
}

const highlightKeywords = (inText, keywords) => {
  for (let i = 0; i < keywords.length; i++) {
    try {
      inText = inText.replace(
        new RegExp(keywords[i].key, 'g'),
        '<span style="border-bottom: 2px dotted red">' +
          keywords[i].alternatives[0].word +
          '</span>'
      )
    } catch (e) {
      console.log(e, keywords[i])
      debugger
    }
  }
  return inText
}

const percentToColor = number => {
  if (number > 80) {
    return '#d22027'
  }
  if (number > 60) {
    return '#db4d41'
  }
  if (number > 40) {
    return '#f140a9'
  }
  if (number > 20) {
    return '#f9a766'
  }
  if (number > 0) {
    return '#fff200'
  }
  if (number === 0) {
    return '#006600'
  }
}

const messageReceived = (message, sender, sendResponse) => {
  const usrInput = window.prompt('Womit soll das Wort ersetzt werden?', '')

  if (arrBlacklistWords.indexOf(usrInput) === -1) {
    arrKeywords.push([
      message.txt,
      usrInput,
      false,
      0 // FIXME: the true and 0 value are static and should use db data or a usr decision
    ])
  } else {
    alert('Dieses Wort steht auf der schwarzen Liste.')
  }

  refreshHighlightedKeywords()
}

const init = () => {
  chrome.runtime.onMessage.addListener(messageReceived)

  // chrome.runtime.sendMessage({ message: 'get_keywords' }, function(response) {
  //   arrKeywords = response.keywords
  // })

  // chrome.runtime.sendMessage({ message: 'get_blacklist' }, function(response) {
  //   arrBlacklistWords = response.blacklist
  // })

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
  'ul'
]
const strippedElements = stripBlacklistedItems()
let arrFoundKeywords = []

init()
