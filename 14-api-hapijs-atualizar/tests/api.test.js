const assert = require('assert')
const api = require('../src/api')

let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Jesus',
    poder: 'Milagres'
}

describe.only('Suite de teste da API de Herois', function() {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('listar herois com paginação de 3 informações por pagina', async () => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
        
    })

    it('retornar um erro com o tamanho limite errado', async () => {
        const TAMANHO_LIMITE = 'AEE'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        assert.deepEqual(result.statusCode, 400)
    })

    it('listar herois com um nome Especifico', async () => {
        const NAME = 'Flash'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=10&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        
        assert.deepEqual(dados[0].nome, NAME)
    })

    it('cadastrar POST - Herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: MOCK_HEROI_CADASTRAR
        })

        const statusCode = result.statusCode
        const {message} =  JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(message, "Heroi cadastrado com sucesso")
    })
})