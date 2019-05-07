console.log('hello content.js')

const searchMe = 'Wolf'

const content = document.getElementById('js-article-column')
if (content) {
  const article = content.children[0]
  console.log(article.innerHTML)
  searchMe.search(article.innerHTML)
  debugger
}
