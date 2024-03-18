import fastify from "fastify";
import { env } from "./env";
import { pizzaInfo } from "./routes/pizza/register-pizza";
import { userControl } from "./routes/user/create-user";
import cookie from "@fastify/cookie";
import cors from '@fastify/cors'


const server = fastify()

server.register(cors, {
    origin: /^http:\/\/localhost:\d{4}$/,
    credentials: true, // Habilita o envio de cookies,
    methods: 'GET,PUT,POST,PUT,DELETE,OPTIONS'
  });

server.register(cookie)

server.register(pizzaInfo,{
    prefix: "/pizza"
})

server.register(userControl,{
    prefix: "/user"
})

server.listen({
    port: env.PORT
}).then(() => console.log("Servidor Iniciado na porta", env.PORT))