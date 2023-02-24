const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require("cors");

//localhost ou 127.0.0.1
const DB_URL = "mongodb://127.0.0.1:27017";
//const DB_URL = "mongodb+srv://admin:QQfk25uEbY2ZB5LE@cluster0.bxvtydc.mongodb.net";


const DB_NAME = "ocean-bandodados-09-02-2023";

async function main(){
//Conexão com o banco de dados
console.log("Conectando com o banco de dados...")
const client = await MongoClient.connect(DB_URL);
const db = client.db(DB_NAME);
const collection = db.collection("itens");
console.log("Banco de dados conetado com sucesso")
const app = express();

// habilita o cors
app.use(cors());
// O que vier no body da requisição, está em JSON
app.use(express.json());

// Endpoint / -> Hello World
app.get('/', function (req, res) {
  res.send('hello, World');
});

// Endpoint /oi -> Olá mundo!
app.get('/oi', function (req, res) {
  res.send('Ola, mundo!');
});

// Lista de informações
const itens = ["Rick sanchez", "Morty Smith", "summer Smith"];
//                0                   1             2

// CRUD - > Lista de informações

//Endpoint Real All- [GET] /all
app.get("/item", async function (req,res){
  const documentos = await collection.find().toArray();

  res.send(documentos);
});

// Endpoint Read Single by ID -> [GET] /item/:id
app.get("/item/:id", async function(req,res){
  const id = req.params.id;
  const item = await collection.findOne({_id: new ObjectId(id)});
  res.send(item);

});

// Endpoint Create -> [POST] /item 
app.post("/item", async function(req,res){
  //console.log(req.body);
  const item = req.body;
  //itens.push(item.nome);
  await collection.insertOne(item);
  res.send(item);

});

//Endpoint Update - > [PUT] /item/:id

app.put("/item/:id",async function(req,res){
  const id = req.params.id;
  const body = req.body;

  //console.log(id,body);

  await collection.updateOne(
    {_id: new ObjectId(id)},
    { $set: body}
  );

  res.send("Deu Bom!")

});

// Endpoint Delete -> [DELETE] /item/:id
// app.delete("/item/:id",async function(req,res){
//   try{
//     const id = req.params.id;
  
//      const item = await collection.deleteOne({_id: new ObjectId(id)});
//      if (item !=1) {
//       res.send(" Mensagem removida com sucesso.");
  
//        return;
//    }
//    res.send("Error ao excluir")
    
  
//       console.log(resultado);

//   }catch (err){
//     return res.status(400).send({error: 'Errro deletar'+err});

//   }
 

// });
//Exercicio:
// - pesquisar sobre a operação de remover 
// - implementar o endpoint de delete
// - realizar a operação excluir item
app.delete("/item/:id",async function(req,res){
  const id = req.params.id;
  collection.deleteOne({ _id: new ObjectId(id)})

  res.send("Registro removido com sucesso!")

})
app.listen(3000);
}

main();