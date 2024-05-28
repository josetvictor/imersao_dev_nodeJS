const ICrud = require('./interfaces/ICrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._sequelize = null
    }

    async isConnected() {
        try {
            await this._sequelize.authenticate()
            return true
        } catch (error) {
            console.error('fail!', error)
            return false
        }
    }

    async connect() {
        this._sequelize = new Sequelize(
            'db_herois', // database
            'josetvictor', // user
            'senha', // senha
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false, // case sensitive
                operatorAliases: false // depracation warning
            }
        )

        await this.defineModel()
    }

    async defineModel() {
        this._herois = this._sequelize.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'tb_herois',
            freezeTabName: false,
            timestamps: false
        })

        await this._herois.sync()
    }

    async create(item) {
        const { dataValues } = await this._herois.create(item)
        return dataValues
    }

    async read(item = {}){
        return await this._herois.findOne({where: item, raw:true})
    }

    async update(id, item) {
        const r = await this._herois.update(item, {where: {id:id}})
        console.log('result: ', r)
        return r
    }

    async delete(id){
        return await this._herois.destroy({where: id})
    }
}

module.exports = Postgres