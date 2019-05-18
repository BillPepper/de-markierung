var keywordArray = [
  ['Flüchtlings', 'Jungen', 30],
  ['Türken', 'Männer', 60],
  ['Deutsch-Armenier', 'Junge', 10]
]

const getIndicesOf = (searchStr, str) => {
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

const percentToColor = number => {
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
