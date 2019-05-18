console.log('background started')

chrome.runtime.onInstalled.addListener(function() {
  var context = 'selection'
  var title = 'Ich mag dieses Wort nicht'
  var id = chrome.contextMenus.create({
    title: title,
    contexts: [context],
    id: 'context' + context
  })
})

chrome.contextMenus.onClicked.addListener(onClickHandler)

function onClickHandler(info, tab) {
  var sText = info.selectionText
  console.log("You don't like the word ", sText)
  let msg = {
    txt: sText
  }
  chrome.tabs.sendMessage(tab.id, msg)
}
