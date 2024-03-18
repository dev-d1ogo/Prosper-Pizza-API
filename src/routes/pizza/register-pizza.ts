import { prisma } from '../../database'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import * as zod from 'zod'

export const pizzaInfo = async (server: FastifyInstance) => {

    server.get('/', async(request:FastifyRequest,response: FastifyReply) =>{
        const allPizzas = await prisma.pizza.findMany()
        return allPizzas
    })

    server.get('/:id', async(request:FastifyRequest,response: FastifyReply) =>{
        const getPizzaSchema = zod.object({
            id: zod.string(),
        })

        const body = getPizzaSchema.parse(request.params)

        const {id} = body

        const pizza = await prisma.pizza.findUnique({
            where:{
                id: Number(id)
            }
        })

        if(!pizza){
            response.status(404).send('Not found')
        }

        response.status(200).send(pizza)
    })
}