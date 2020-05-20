
$(document).ready(function() {

    const getDados = (dados) =>{
           const url  = `http://localhost:3535/cotacao?cotacao=${dados.cotacao}&quantidade=${dados.quantidade}`
        let settings = {
            "async": true,
            "crossDomain": true,
             url,
            "method": "GET",
            "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "7cc8eb4d-74fe-454e-9524-e0b3beca3146"
            }
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            setDadosCalculo(response.conversao)
        });
    }
    
    const setDadosCalculo = (value) =>{
        $("#conversao").text(value)
        
    }

    $("#converter").click((event)=>{
        const cotacao = $("#cotacao").val()
        const quantidade = $("#quantidade").val()
        const dados = {cotacao, quantidade}
        console.log("submeteu form", dados)
        getDados(dados);
    
        
    })
    
    
})


