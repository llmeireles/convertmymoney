const bcbAPI = require('./api.bcb')
const axios = require('axios')

jest.mock('axios') //configura o jest para não usar o axios "verdadeiro", isolando para fazer o correto teste de unidade

test('getCotacaoAPI', ()=>{
    const res = {
        data:{
            value:[
                {cotacaoVenda: 3.90}
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    bcbAPI.getCotacaoAPI('url').then(resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

test('getExtractCotacao', ()=>{
    const cotacao = bcbAPI.extractCotacao({
                                            data:{
                                                value:[
                                                    {cotacaoVenda: 3.90}
                                                ]
                                            }
                                        })

    expect(cotacao).toBe(3.90)
})