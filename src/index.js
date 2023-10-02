const express = require ('express')
const { request } = require('http')

const app = express()

app.get('/', (request, response) => {
  return response.json({message: 'Hello GoStack'})
})

app.listen (3000, () => {
  console.log("🔮  Server started sucess")
})