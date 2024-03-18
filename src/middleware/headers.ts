import { FastifyReply, FastifyRequest } from "fastify"

export async function getAuthToken(request: FastifyRequest, response: FastifyReply) {
    response.header('Access-Control-Allow-Origin', 'localhost');
    response.header('Access-Control-Allow-Methods', 'GET,OPTIONS, POST');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}