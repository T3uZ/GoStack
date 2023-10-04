import express, { request, response } from "express";
import { v4 } from "uuid";

const app = express();

app.use(express.json());

const uuidv4 = v4();

const customers = [];

const key = "123456";

// Middleware

function verifyIfExistsAcconuntCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }

  return next();
}

//Criando conta
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customers) => customers.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer Already Exists!" });
  }
  customers.push({
    cpf,
    name,
    id: uuidv4,
    statement: [],
  });

  return response
    .status(201)
    .send({ message: "Usuario Cadastrado", cpf, name });
});

//Buscar extrato da conta bancaria

app.use(verifyIfExistsAcconuntCPF);

app.get("/statement", (request, response) => {
  return response.status(200).json(customer.statement);
});

app.listen(3000, () => {
  console.log("🔮  Server started sucess");
});
