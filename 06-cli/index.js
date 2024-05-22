const { program } = require('commander');
const Database = require('./database')
const Heroi = require('./heroi')

async function main(){
    program
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Identificador do Heroi")

        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar todos os herois")
        .option('-r, --remover', "Remove um herois pelo id")
        .option('-a, --atualizar', "Atualizar um herois pelo id")
        .parse(process.argv)
        const options = program.opts();
        const heroi = new Heroi(options)
    try {
        if(options.cadastrar){
            const result = await Database.cadastrar(heroi)
            
            if(!result){
                console.error('Heroi não foi cadastrado')
                return;
            }
            console.log('Heroi Cadastrado com sucesso')
        }

        if(options.listar){
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }

        if(options.remover){
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.error('Não foi possivel remover o heroi')
                return;
            }
            console.log('Heroi removido com sucesso')
        }

        if(options.atualizar){
            const resultado = await Database.atualizar(heroi.id, {nome: heroi.nome, poder: heroi.poder})
            if(!resultado){
                console.error('não foi possivel atualizar o heroi')
                return;
            }
            console.log('Heroi atualizado com sucesso')
        }
        
    } catch (error) {
        console.error('DEU RUIM!')
    }
}

main()