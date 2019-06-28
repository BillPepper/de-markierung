const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/' // FIXME: This is not meant for Productoin!
const API_URL = 'http://de-markierung.herokuapp.com'

const httpGet = theUrl => {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', theUrl, false)
  xmlHttp.send(null)
  return xmlHttp.responseText
}

const arrKeywords = JSON.parse(httpGet(CORS_PROXY + API_URL + '/maps'))
const arrBlacklistWords = JSON.parse(
  httpGet(CORS_PROXY + API_URL + '/blacklist')
)

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == 'get_keywords') sendResponse({ keywords: arrKeywords })
  if (request.message == 'get_blacklist')
    sendResponse({ blacklist: arrBlacklistWords })
})
