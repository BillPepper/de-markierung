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
    shouldBeReplaced = keywords[i][2]
    inText = inText.replace(
      new RegExp(keywords[i][0], 'g'),
      shouldBeReplaced
        ? '<span style="border-bottom: 2px dotted ' +
            percentToColor(keywords[i][3]) +
            '">' +
            keywords[i][1] +
            '</span>'
        : '<span style="border-bottom: 2px dotted ' +
            percentToColor(keywords[i][3]) +
            '">' +
            keywords[i][0] +
            '</span>'
    )
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

const getKeywordsFromDB = () => {
  // this should be returned from the backend later on
  // the third value in the array tells if the word should be replaced
  // or just marked, the fourth tells the amount of appearences
  let tmpList = [
    ['Lorem', 'replaced', true, 80],
    ['quidem', 'also replaced', true, 60],
    ['autem', 'foo', false, 40],
    ['perferendis', 'bar', false, 20]
  ]
  return tmpList
}

const httpGet = theUrl => {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', theUrl, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

const messageReceived = (message, sender, sendResponse) => {
  const usrInput = window.prompt('Womit soll das Wort ersetzt werden?', '')

  if (arrBlacklistWords.indexOf(usrInput) === -1) {
    arrKeywords.push([
      message.txt,
      usrInput,
      true,
      0 // FIXME: the true and 0 value are static and should use db data or a usr decision
    ])
  } else {
    alert('Dieses Wort steht auf der schwarzen Liste.')
  }

  refreshHighlightedKeywords()
}

const init = () => {
  chrome.runtime.onMessage.addListener(messageReceived)

  refreshHighlightedKeywords()
}

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/' // FIXME: This is not meant for Productoin!
const API_URL = 'http://de-markierung.herokuapp.com'

let arrKeywords = getKeywordsFromDB()
let arrBlacklistElements = ['head', 'meta', 'title', 'link', 'style', 'script']
let arrBlacklistWords = JSON.parse(httpGet(CORS_PROXY + API_URL + '/blacklist'))
let strippedElements = stripBlacklistedItems()

init()
