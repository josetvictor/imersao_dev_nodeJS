const ICrud = require('./interfaces/ICrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor(){
        super()
        this._herois = null
        this._drive = null
    }
    //connections
    async isConnected(){
        const state = STATUS[this._drive.readyState]
        if(state === 'Conectado') return state

        if(state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._drive.readyState]
    }

    connect() {
        Mongoose.connect('mongodb://josetvictor:senha@localhost:27017/herois')

        const connection = Mongoose.connection
        this._drive = connection
        connection.once('open', () => console.log('database rodando!'))
        this.defineModel()
    }

    defineModel() {
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

        this._herois = Mongoose.model('herois', heroiSchema)
    }

    // CRUD 
    async create(item){
        return await this._herois.create(item)
    }

    read(item, skip = 0, limit=10){
        return this._herois.find(item).skip(skip).limit(limit)
    }

    update(id, item){
        return this._herois.updateOne({_id: id}, {$set: item})
    }

    delete(id){
        return this._herois.deleteOne({_id: id})
    }
}

module.exports = MongoDB