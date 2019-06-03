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
        ? '<span style="border-bottom: 2px dotted dodgerblue">' +
            keywords[i][1] +
            '</span>'
        : '<span style="border-bottom: 2px dotted green">' +
            keywords[i][0] +
            '</span>'
    )
  }
  return inText
}

const getKeywordsFromDB = () => {
  // this should be returned from the backend later on
  // the third value in the array tells if the word should be replaced
  // or just marked as know
  let tmpList = [['Lorem', 'test', true], ['autem', 'foo', false]]
  return tmpList
}

const messageReceived = (message, sender, sendResponse) => {
  arrKeywords.push([
    message.txt,
    window.prompt('Womit soll das Wort ersetzt werden?', '')
  ])

  refreshHighlightedKeywords()
}

const init = () => {
  chrome.runtime.onMessage.addListener(messageReceived)

  refreshHighlightedKeywords()
}

let arrKeywords = getKeywordsFromDB()
let arrBlacklistElements = ['head', 'meta', 'title', 'link', 'style', 'script']
let strippedElements = stripBlacklistedItems()

init()
