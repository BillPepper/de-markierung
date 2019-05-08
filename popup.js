var keywordArray = [
  ['Flüchtlings', 'Jungen', 30],
  ['Türken', 'Männer', 60],
  ['Deutsch-Armenier', 'Junge', 10]
]

$(function() {
  var body = $('#swear')
  var innerHTML = body.text()
  console.log(innerHTML)

  keywordArray.forEach(function(num) {
    innerHTML = innerHTML.replace(
      new RegExp(num[0], 'g'),
      "<span class='mark " + percentToColor(num[2]) + "'>" + num[1] + '</span>'
    )
  })

  body.html(innerHTML)
})

function getIndicesOf(searchStr, str) {
  var searchStrLen = searchStr.length
  if (searchStrLen == 0) {
    return []
  }
  var startIndex = 0,
    index,
    indices = []

  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index)
    startIndex = index + searchStrLen
  }
  return indices
}

function percentToColor(number) {
  if (number > 80) {
    return 'eighty'
  }
  if (number > 60) {
    return 'sixty'
  }
  if (number > 40) {
    return 'fourty'
  }
  if (number > 20) {
    return 'twenty'
  }
  if (number > 0) {
    return 'zero'
  }
}
