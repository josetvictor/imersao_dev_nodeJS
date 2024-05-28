// npm install sequelize pg-hstore pg

const Sequelize = require('sequelize')
const driver = new Sequelize(
    'db_herois',
    'josetvictor',
    'senha',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false
    }
)

async function main() {
    const Herois = driver.define('herois', {
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

    await Herois.sync()

    const result = await Herois.findAll({ raw: true})
    console.log(result)
}

main()