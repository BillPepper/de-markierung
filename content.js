console.clear()
console.log('content.js')
var arr = [['Wolf']]
var body = $('#js-article-column')
var innerHTML = body.html()

arr.forEach(function(num) {
  innerHTML = innerHTML.replace(
    new RegExp(num, 'g'),
    '<span style="background-color: red">' + num + '</span>'
  )
  debugger
})

body.html(innerHTML)
