const Mongoose = require('mongoose')

Mongoose.connect('mongodb://josetvictor:senha@localhost:27017/herois')
    // .then(() => {
    //     console.log('Connected Mongodb')
    // })
    // .catch( error => {
    //     console.log('Fail connection!', error.message)
    // })

// const state = connection.readyState
// console.log('state', state)
/**
 * state:
 * 0: Disconectado
 * 1: Conecatado
 * 2: Conectando
 * 3: Disconectando
 */

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })

    console.log('result cadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('toda a base', listItens)
}

main()