const express = require ('express')
const { request } = require('http')

const app = express()

app.use(express.json())


const projects = []

app.get('/projects', (request, response) => {

  const {title, owner} = request.query
  console.log(title)
  console.log(owner)

  


  //retornando variaveis que vei no query
  return response.json({title, owner})
})


app.post('/projects', (request, response) =>{

  const {title, owner} = request.body

  console.log(title, "\n", owner)

  return response.json([
    'projeto 1',
    'projeto 2',
    'projeto 3',
  ])
})

app.put('/projects/:id', (request, response) =>{
  
  const params = request.params;
  
  console.log(params)
  return response.json([
    'projeto 4',
    'projeto 2',
    'projeto 3',
  ])
})


app.delete('/projects/:id', (request, response) =>{
  return response.json([
    'projeto 2',
    'projeto 3',
  ])
})
app.listen (3000, () => {
  console.log("🔮  Server started sucess")
})