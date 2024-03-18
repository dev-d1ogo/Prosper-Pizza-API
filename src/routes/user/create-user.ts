import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../database'
import * as zod from 'zod'
import { randomUUID } from 'crypto'
import jwt from "jsonwebtoken";

import { getAuthToken } from '../../middleware/getAuthToken';

interface UserProps{
    id: string,
    email: string,
    username: string
}

export const userControl = async (server: FastifyInstance) => {
    // Criando um novo usuario
    server.post(
        '/',
        async (request: FastifyRequest, response: FastifyReply) => {
            const userCreateSchema = zod.object({
                email: zod.string().email(),
                user: zod.string(),
                password: zod.string(),
            })

            const body = userCreateSchema.parse(request.body)

            const { email, user, password } = body

            const newUser = await prisma.user.create({
                data: {
                    id: randomUUID(),
                    username: user,
                    email,
                    password,
                },
            })

            return response.send({
                sucess: true,
                message: 'Usuario criado',
                newUser,
            })
        }
    )

    // Resgatando um novo usuario

    server.get(
        '/:id', {
            preHandler: [getAuthToken]
        },
        async (request: FastifyRequest, response: FastifyReply) => {
            console.log(request.params)
           
            const getTransactionParamsSchema = zod.object({
                id: zod.string().uuid(),
            })
            const { id } = getTransactionParamsSchema.parse(request.params)

            const userInfo = await prisma.user.findUnique({
                where: {
                    id:id
                },
            })

            if (!userInfo) {
                response.code(404).send({ error: 'Usuário não encontrado' })
            } else {
                response.send(userInfo)
            }
        }
    )

    server.post('/login', async (request: FastifyRequest, response: FastifyReply) => {
        const getAuthParamsSchema = zod.object({
            email: zod.string().optional(),
            user: zod.string().optional(),
            password: zod.string(),
        })

        const { password, user } = getAuthParamsSchema.parse(request.body)

        const userData: UserProps | null = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: user,
                    },
                    {
                        username: user,
                    },
                ],
                password: password,
            },
            select: {
                id: true,
                username: true,
                email: true,
            },
        })

        console.log(userData)

        if (!userData) {
            return response
                .status(404)
                .send({ sucess: false, message: 'Usuario não encotrado' })
        }

        // Criando um jwt para manter o usuario logado

        const tokenKey = 'prosper-key'

        const token = jwt.sign(
            { id: userData.id, email: userData.email },
            tokenKey,
            { expiresIn: '1d' }
        ) // 2 hours

        response.setCookie('authToken', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24, // 1 dia
        })

        response.send({
            status: 'sucess',
            message: 'authentication sucess',
            id: userData.id,
        })
    })

    server.post('/logout', async(request: FastifyRequest, response: FastifyReply) => {
        const {authToken} = request.cookies

        if(authToken){
            response.setCookie('authToken', '', {
                httpOnly: true,
                path:'/',
                maxAge: 0
            })
        }
    })
}
