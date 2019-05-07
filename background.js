// chrome.tabs.getSelected(null, function(tab) {
//   console.log(tab)
// })

console.log('background started')

chrome.runtime.onInstalled.addListener(function() {
  var context = 'selection'
  var title = "I don't like this word"
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
}
