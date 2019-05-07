var keywordArray = [
  ['Flüchtlings', 'Jungen', 1],
  ['Türken', 'Männer', 1],
  ['Deutsch-Armenier', 'Junge', 2]
]

$(function() {
  var body = $('#swear')
  var innerHTML = body.text()
  console.log(innerHTML)

  keywordArray.forEach(function(num) {
    innerHTML = innerHTML.replace(
      new RegExp(num[0], 'g'),
      "<span class='mark'>" + num[1] + '</span>'
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

var ctx = document.getElementById('myChart').getContext('2d')
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jungen', 'Männer', 'Junge'],
    datasets: [
      {
        label: 'occurrences',
        data: [keywordArray[0][2], keywordArray[1][2], keywordArray[2][2]],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
})
