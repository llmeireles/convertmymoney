const express =  require('express')
const app = express();
const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')

const myLogger = (req,res,next) => {
    console.log('Logado', Date.now())
    next()
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))

//Middleware
app.use(myLogger)

app.get("/", async (req,res) =>{
    //res.send('testando')
    
    const cotacao = await apiBCB.getCotacao()
    const conversao = "";
    const quantidade= "";
    console.log('cotacao', cotacao)
    res.render('home', {
        cotacao,
        conversao,
        quantidade
    })
})

app.get("/cotacao", (req,res) =>{
    const {cotacao, quantidade} = req.query
    if(cotacao && quantidade){
        const conversao = convert.convert(cotacao, quantidade)
        res.send({
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao),
            error: false
        })
    }else{
        res.send('cotacao',{
            error:'Dados inválidos'
        })
    }
})

app.listen(3535,err =>{
    if(err){
        console.log("Servidor não iniciado...")
    }
    else{
        console.log("Servidor iniciado...")
    }
}) 