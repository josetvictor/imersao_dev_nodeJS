// npm i @hapi/hapi

const Hapi = require('@hapi/hapi')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const Context = require('./db/strategies/base/contextStrategy')
const HeroiSchema = require('./db/strategies/mongodb/schemas/herois.schemas')
const HeroRoutes = require('./routes/heroRoutes')

const app = Hapi.Server({
    port: 3000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    app.route([
        ...mapRoutes(new HeroRoutes(context),HeroRoutes.methods())
    ])

    await app.start()
    console.log('Servidor está rodando na porta: ', app.info.port)

    return app
}

module.exports = main()