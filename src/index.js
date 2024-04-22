import express, { json, request, response } from "express";
import cors from "cors"
import { emit } from "nodemon";

const app = express()

app.use(cors())

app.use(express.json())

app.listen(3333, () => console.log("Servidor rodando na porta 3333"))


let carros = []

let proximoCarro = 1


app.post('/carros', (request, response) => {
    const modelo = request.body.modelo
    const marca = request.body.marca
    const ano = request.body.ano
    const cor = request.body.cor
    const preco = Number(request.body.preco)

    if(!modelo){
        response.status(400).send('Passe um modelo válido')
    }
    if(!marca){
        response.status(400).send('Passe uma marca válida')
    }
    if(!ano){
        response.status(400).send('Passe um ano válido')
    }
    if(!cor){
        response.status(400).send('Passe uma cor válida')
    }
    if(!preco){
        response.status(400).send('Passe um valor válido')
    }

    let novoCarro = {
        id : proximoCarro,
        modelo : modelo,
        marca : marca,
        ano : ano,
        cor : cor,
        preco : preco
    }

    carros.push(novoCarro)

    proximoCarro ++ 

    response.status(201).send(`
    O veículo ${modelo} foi criado com sucesso! 
    `)

})

app.get('/carros', (request, response) => {

    if(carros.length === 0){
        response.status(400).send(JSON.stringify("Mensagem: Não existem carros registrados."))
    }
    const dadosMapeados = carros.map((carro) => `| ID: ${carro.id} | Modelo: ${carro.modelo} | Marca: ${carro.marca} | Ano: ${carro.ano} | Cor: ${carro.cor} | Preço: ${carro.preco} |` )

    response.status(200).send(dadosMapeados)
})

app.get('/filtrocarros/:marcaBuscada', (request, response) => {

    const marca = request.params.marcaBuscada
   
    if(!marca){
        response.status(400).send(JSON.stringify("Mensagem: Informe uma marca válida."))
    }

    const marcaVerificada = carros.find((item) => item.marca === marca )

    if(!marcaVerificada){
        response.status(400).send(JSON.stringify("Mensagem: Não existem carros registrados."))
    }
    const marcaFiltrada = carros.filter((carro) => carro.marca === marca  )

    if (marcaFiltrada.length === 0) {
        response.status(400).send("Mensagem: Não existem carros registrados para essa marca.");
        return;
    }


    response.status(200).send(marcaFiltrada.map(carro => `| ID: ${carro.id} | Modelo: ${carro.modelo} | Marca: ${carro.marca} | Ano: ${carro.ano} | Cor: ${carro.cor} | Preço: ${carro.preco} |`))
})
