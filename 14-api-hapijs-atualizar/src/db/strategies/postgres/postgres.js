const ICrud = require('../interfaces/ICrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.error('fail!', error)
            return false
        }
    }

    static async connect() {
        const connection = new Sequelize(
            'db_herois', // database
            'josetvictor', // user
            'senha', // senha
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false, // case sensitive
                operatorAliases: false, // depracation warning
                logging: false
            }
        )

        return connection
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name,
            schema.schema,
            schema.options
        )
        await model.sync()
        return model
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item)
        return dataValues
    }

    async read(item = {}){
        return await this._schema.findOne({where: item, raw:true})
    }

    async update(id, item) {
        const r = await this._schema.update(item, {where: {id:id}})
        return r
    }

    async delete(id){
        return await this._schema.destroy({where: id})
    }
}

module.exports = Postgres