var arrKeywords = [['Tempora', 'COOL'], ['Nulla', 'GREAT']]
var arrBlacklistElements = ['head', 'meta', 'title', 'link', 'style', 'script']

var article = $('#body')
var innerHTML = article.html()

let strippedElements = stripBlacklistedItems()
refreshHighlightedKeywords()

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
  arrKeywords.push([message.txt, 'test'])
  refreshHighlightedKeywords()
}

}
