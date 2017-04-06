const express = require('express')
const app = express()

const PORT = process.env.PORT || 3002

app.use(express.static('client'))

app.listen(PORT, () => {
  console.log('App listening on port ' + PORT)
})
