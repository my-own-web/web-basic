yarn add express

/server/server.js

- - -

const express = require('express')
const app = express()
const port = 3001

// 라우트에 대한 요청에 응답
// 다른 모든 경로: 404 Not Found로 응답
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

- - -

$cd server
$node server.js