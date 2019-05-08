console.clear()
console.log('content.js')
var arr = [['Wolf']]
var body = $('#js-article-column')
var innerHTML = body.html()

highlightWords()

chrome.runtime.onMessage.addListener(messageReceived)

function messageReceived(message, sender, sendResponse) {
  console.log(message)
  arr.push(message.txt)
  highlightWords()
}

function highlightWords() {
  arr.forEach(function(num) {
    innerHTML = innerHTML.replace(
      new RegExp(num, 'g'),
      '<span style="background-color: red">' + num + '</span>'
    )
  })
  body.html(innerHTML)
  console.log('updated highlights')
}
