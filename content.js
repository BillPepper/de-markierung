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
      new RegExp(keywords[i].key, 'g'),
      '<span style="border-bottom: 2px dotted yellow">' +
        keywords[i].alternatives[0].word +
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

  chrome.runtime.sendMessage({ message: 'get_keywords' }, function(response) {
    arrKeywords = response.keywords
  })

  chrome.runtime.sendMessage({ message: 'get_blacklist' }, function(response) {
    arrBlacklistWords = response.blacklist
  })

  refreshHighlightedKeywords()
}

let arrKeywords
let arrBlacklistWords

const arrBlacklistElements = [
  'head',
  'meta',
  'title',
  'link',
  'style',
  'script'
]
const strippedElements = stripBlacklistedItems()

init()
