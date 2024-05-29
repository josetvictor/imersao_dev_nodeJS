/**
 * docker ps -> pegar ID do container mongodb
 * -> executa commandos no container via terminal
 * docker exec -it 309cb0a68528 mongo -u josetvictor -p senha --authenticationDatabase herois
 */

/**
 * show dbs -> visualizar os databases
 * 
 * use herois -> mudar o contexto para uma database
 * 
 * show collections -> mostra as tables (collections)
 * 
 * inserindo um heroi no banco herois
 */

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1999-01-01'
})

db.herois.find()
db.herois.find().pretty()

db.herois.count()
db.herois.findeOne()
db.herois.finde().limite(1000).sort({nome: -1})
db.herois.finde({}, {poder: 1, _id:0})

// create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1999-01-01'
})

// read
db.herois.find()

// update
// dessa forma vc pode perder informações, ou seja,caso vc não especifique o que 
//quer fazer, ele vai mudar o nome e vc perderá o poder desse herois
db.herois.update({ _id: ObjectId("6655d980f27abd33af47534a")},
                {nome: 'Novo Nome'})


db.herois.update({ _id: ObjectId("6655d980f27abd33af47534a")},
                {$set: {nome: 'Novo Nome'}})
// se vc esquecer o nome da propriedade, ou passar um nome que não existe no objeto salvo, ele vai adicionar uma propriedade com o nome novo que vc colocou

// delete
db.herois.remove({}) // -> se vc passar assim,ele apagará toda a base de da dos
db.herois.remove({nome: 'Novo nome'}) // -> precisa especificar o where para apagar um especifico