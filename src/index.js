import express, { request, response } from "express";
import { v4 } from "uuid";

const app = express();

app.use(express.json());

const uuidv4 = v4();

const customers = [];

// Middleware

function verifyIfExistsAcconuntCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }
  request.customer = customer;
  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    //console.log(balance)
    if(operation === "credit"){
      return acc + operation.amount;
    }else{
      return acc - operation.amount;
    }
  }, 0);
  return balance;
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

//app.use(verifyIfExistsAcconuntCPF);

app.get("/statement", verifyIfExistsAcconuntCPF, (request, response) => {
  const { customer } = request;
  return response.status(200).json(customer.statement);
});

app.post("/deposit", verifyIfExistsAcconuntCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };
  customer.statement.push(statementOperation);
  return response.status(201).send({ message: "Valor depositado ", amount });
});

app.post("/withdrow", verifyIfExistsAcconuntCPF, (request, response) => {
  const { customer } = request;

  const { amount } = request.body;

  console.log(amount)

  const balance = getBalance(customer.statement);
  console.log(balance)
  if(balance < amount){
    return response.status(400).json({error: "insufficient funds"})
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  }
  customer.statement.push (statementOperation);
  return response.status(201).send();
});

app.listen(3000, () => {
  console.log("🔮  Server started sucess");
});
