const BaseRoute = require("./base/baseRoutes")
const Joi = require('@hapi/joi')

const failAction = (request, headers, erro) => {
    throw erro
}

class HeroRoutes extends BaseRoute {
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path:'/herois',
            method: 'GET',
            options: {
                validate: {
                    failAction,
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    })
                }
            },
            handler: (request, headers)=> {
                try {
                    const {
                        skip,
                        limit,
                        nome
                    } = request.query

                    const query = {
                        nome: {
                            $regex: `.*${nome}*.`
                        }
                    }

                    return this.db.read(nome ? query : {}, skip, limit)
                } catch (error) {
                    console.log('Deu ruim!!', error)
                    return "Error interno no servidor"
                }
            }
        }
    }

    cadastrar() {
        return {
            path: '/herois',
            method: 'POST',
            options: {
                validate: {
                    failAction,
                    payload: Joi.object({
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    })
                }
            },
            handler: async (request) => {
                try {
                    const {nome, poder} = request.payload
                    const result = await this.db.create({nome, poder})

                    return {
                        message: 'Heroi cadastrado com sucesso',
                        _id: result._id
                    }
                } catch (error) {
                    console.log("Deu ruim!!", error)
                    return 'Internal Error!'
                }
            }
        }
    }

    update() {
        return {
            path:'/herois/{id}',
            method: 'PATCH',
            options: {
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }),
                },
                handler: async (request) => {
                    try {
                        const {
                            id,
                        } = request.params
    
                        const {
                            payload
                        } = request

                        const dadosString = JSON.stringify(payload)
                        const dados = JSON.parse(dadosString)
    
                        const result = await this.db.update(id, dados)

                        if(result.modifiedCount !== 1) return {
                            message: "Não foi possivel atualizar"
                        }

                        return {
                            message: 'Heroi atualizado com sucesso',
                        }
                    } catch (error) {
                        console.log('Deu ruim!!', error)
                        return "Error interno no servidor"
                    }
                }
            },
        }
    }

    remove() {
        return {
            path:'/herois/{id}',
            method: 'DELETE',
            options: {
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                },
                handler: async (request) => {
                    try {
                        const {
                            id,
                        } = request.params
    
                        const result = await this.db.delete(id)

                        if(result.deletedCount !== 1) return {
                            message: "Não foi possivel atualizar"
                        }

                        return {
                            message: `Heroi do id: ${id} removido com sucesso`,
                        }
                    } catch (error) {
                        console.log('Deu ruim!!', error)
                        return "Error interno no servidor"
                    }
                }
            },
        }
    }
}

module.exports = HeroRoutes