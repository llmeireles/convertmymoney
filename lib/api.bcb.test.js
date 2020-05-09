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


describe('getToday', () =>{
    const RealDate = Date

    function mockDate(date){
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date)
            }
        }
    }
    afterEach(() =>{
        global.Date = RealDate
    })

    test('getToday', () =>{
        mockDate('2020-05-09T12:00:00Z')
        const today = bcbAPI.getToday()
        expect(today).toBe('5-9-2020')
    })
})

test('getUrl', ()=>{
    const url = bcbAPI.getUrl('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', () =>{
    const res = {
                    data:{
                        value:[
                            {cotacaoVenda: 3.90}
                        ]
                    }
    }

    const getToday =  jest.fn()
    getToday.mockReturnValue('5-9-2020')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoAPI = jest.fn() 
    getCotacaoAPI.mockResolvedValue(res)

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.90)
    
    bcbAPI.pure
            .getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao})()
            .then(res => {
                expect(res).toBe(3.90)
            })
})

test('getCotacao-exception', () =>{
    const res = {
                   
    }

    const getToday =  jest.fn()
    getToday.mockReturnValue('5-9-2020')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoAPI = jest.fn() 
    getCotacaoAPI.mockReturnValue(Promise.reject('err'))

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.90)
    
    bcbAPI.pure
            .getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao})()
            .then(res => {
                expect(res).toBe('')
            })
})