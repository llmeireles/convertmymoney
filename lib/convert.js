const convert = (cotacao, quantidade) =>{
    return parseFloat(String(cotacao).replace(',','.')) * parseFloat(String(quantidade).replace(',','.'))
}

const toMoney = valor => {
    return parseFloat(String(valor).replace(',','.')).toFixed(2)
}

module.exports = {
    convert,
    toMoney
}