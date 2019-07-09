const onClickHandler = (info, tab) => {
  var sText = info.selectionText
  console.log("You don't like the word ", sText)
  let msg = {
    txt: sText
  }
  chrome.tabs.sendMessage(tab.id, msg)
}
chrome.runtime.onInstalled.addListener(function() {
  var context = 'selection'
  var title = 'Wort ersetzen'
  var id = chrome.contextMenus.create({
    title: title,
    contexts: [context],
    id: 'context' + context
  })
})

chrome.contextMenus.onClicked.addListener(onClickHandler)
