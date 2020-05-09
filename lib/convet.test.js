const convert = require('./convert')

test('converto 4 to 4', () =>{
    expect(convert.convert(4,4)).toBe(16)
})

test('toMoney converts float, writen by , ', () =>{
    const valor = convert.convert('5,67',47)
    expect(convert.toMoney(valor)).toBe('266.49')
})

test('toMoney converts float, writen by . ', () =>{
    const valor = convert.convert('5.67',47)
    expect(convert.toMoney(valor)).toBe('266.49')
})