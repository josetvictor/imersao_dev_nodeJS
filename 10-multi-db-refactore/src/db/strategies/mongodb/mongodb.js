const ICrud = require('../interfaces/ICrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class MongoDb extends ICrud {
    constructor(connection, schema){
        super()
        this._schema = schema
        this._connection = connection
    }
    //connections
    static connect() {
        Mongoose.connect('mongodb://josetvictor:senha@localhost:27017/herois')

        const connection = Mongoose.connection
        connection.once('open', () => console.log('database rodando!'))
        return connection
    }

    async isConnected(){
        const state = STATUS[this._connection.readyState]
        if(state === 'Conectado') return state

        if(state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]
    }

    // CRUD 
    async create(item){
        return await this._schema.create(item)
    }

    read(item, skip = 0, limit=10){
        return this._schema.find(item).skip(skip).limit(limit)
    }

    update(id, item){
        return this._schema.updateOne({_id: id}, {$set: item})
    }

    delete(id){
        return this._schema.deleteOne({_id: id})
    }
}

module.exports = MongoDb