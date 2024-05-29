const assert = require('assert')
const Postgres = require('../src/db/strategies/postgres.stategy')
const ContextStrategy = require('../src/db/strategies/base/contextStrategy')

const context = new ContextStrategy(new Postgres())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Frieren',
    poder: 'elfa'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Frieren',
    poder: 'Velha'
}

describe('Postgres strategy', function() {
    this.timeout(Infinity)
    this.beforeAll(async function() {
        await context.connect()
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