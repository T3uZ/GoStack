import express, { response } from "express"
import { uuid } from "uuidv4"

const app = express()
const port = 3000


/*

Query params: Filtros e Paginação
Route Params: 
Request body:



*/


app.get("/projects", (request, response) => {
  return response.status(200).json([
    'Projeto 1',
    'Projeto 2'
  ]);
});

app.post("/projects", (request, response) => {

  const {title, owner} = request.body;



  return response.status(200),json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3'
  ])
});

app.put("/projects/:id", (request, response) => {
  return response.status(200),json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3' 
  ])
})

app.delete("/projects/:id", (request, response) => {
  return response.status(200),json([
    'Projeto 2',
    'Projeto 3' 
  ])
})

app.listen(port, () => {
  console.log(`🔮 Server Started port ${port}`);
});