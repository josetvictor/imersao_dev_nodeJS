const assert = require('assert')
const MongoDB = require('../src/db/strategies/mongodb')
const ContextStrategy = require('../src/db/strategies/base/contextStrategy')

const context = new ContextStrategy(new MongoDB())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Flash',
    poder: 'Velocidade'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Pernalonga',
    poder: 'Velocidade'
}

let MOCK_HEROI_ID = ''

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        await context.connect()
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })
    it('verificar conexão', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })

    it('Criar um heroi no mongodb', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)

        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () => {
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})

        const result = {
            nome, poder
        }

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Patolino'
        })
        assert.deepEqual(result.modifiedCount, 1)
    })

    it('delete', async () => {
        await context.delete(MOCK_HEROI_ID)
        const result = await context.read({_id: MOCK_HEROI_ID})

        assert.deepEqual(result, [])

    })
})