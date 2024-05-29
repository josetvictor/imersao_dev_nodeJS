const assert = require('assert')
const MongoDb = require('../src/db/strategies/mongodb/mongodb')
const Context = require('../src/db/strategies/base/contextStrategy')
const HeroiSchema = require('../src/db/strategies/mongodb/schemas/herois.schemas')


const MOCK_HEROI_CADASTRAR = {
    nome: 'Flash',
    poder: 'Velocidade'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Pernalonga',
    poder: 'Velocidade'
}

let MOCK_HEROI_ID = ''

let context = {}

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, HeroiSchema))

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