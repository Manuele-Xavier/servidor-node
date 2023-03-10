
// importando o express
import express from "express"
//acessar o body na requisição do POST e PUT
import bodyParser from "body-parser"
//import path
import path from "path"
//importando dotenv
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
app.use(cors({
    origin: '*'
}));
//utilizando para enviar arquivos na resposta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cadastro = []
//acesso ao body para utilização do POST
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//pegando pela variavel de ambiente
const port = process.env.PORT

//definindo um endpoint
app.get("/", (require, response)=>{
    response.send("Hello World")
})

app.post("/login", (require, response)=>{
    const {email, password} = require.body
    console.log(require.body)
    const user = cadastro.find(item => (item.email === email))
    if(user.password != password){
        response.sendFile(path.join(__dirname, 'index.html'))
    }
    response.status(200).sendFile(path.join(__dirname, 'home.html'))
    //response.status(400);
})
app.post("/cadastro", (require, response)=>{
    console.log(require.body)
    const {email, password} = require.body
    const user = cadastro.find(item => (item.email === email))
    if(user){
        response.status(403).send(`Ja existe um cadastro com o e-mail ${user.email}`)
    }
    cadastro.push(require.body)
    console.log(`array de cadastro ${cadastro.length}`)

    response.status(201).json({
        status: "created",
        ...require.body
    })

})
//servidor escutando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})