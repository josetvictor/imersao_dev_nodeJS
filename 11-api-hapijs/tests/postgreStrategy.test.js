const assert = require('assert')
const Postgres = require('../src/db/strategies/postgres/postgres')
const Context = require('../src/db/strategies/base/contextStrategy')
const HeroiSchema = require('../src/db/strategies/postgres/schemas/herois.schema')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Frieren',
    poder: 'velha'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Homem aranha',
    poder: 'aranha'
}

let context = {}

describe('Postgres strategy', function() {
    this.beforeAll(async function() {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroiSchema)
        context = new Context(new Postgres(connection, model))

        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('Postegres Connection', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Deve criar um heroi no banco de dados postgres', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Deve ler um heroi pelo nome', async () => {
        const result = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Deve atualizar um heroi pelo id', async () => {
        const itemAtualizar = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            poder: 'velha'
        }

        const [result] = await context.update(itemAtualizar.id, novoItem)

        assert.deepEqual(result, 1)
    })
})