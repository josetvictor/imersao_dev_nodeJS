const mongoose = require('mongoose')

mongoose.connect('mongodb://josetvictor:senha@localhost:27017/herois',
        { useNewUrlParser: true}, function (error){
            if(!error) return;

            console.log('Falha na conexão!', error)
        })

const connection = mongoose.connection

connection.once('open',() => console.log('Database rodando!'))