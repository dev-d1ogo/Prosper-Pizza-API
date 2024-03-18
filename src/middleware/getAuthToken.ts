import { FastifyReply, FastifyRequest } from "fastify"
import jwt from "jsonwebtoken";

export async function getAuthToken(request: FastifyRequest, response: FastifyReply) {
  const authToken = request.cookies.authToken

  const tokenKey = 'prosper-key'

  const verifyToken = (token: string) => {
      const decodedToken = jwt.verify(token, tokenKey)
      return decodedToken
  }

  const userLogged = verifyToken(authToken!)
  // Verificando se há o cookie

  if (!authToken && userLogged) {
      return response.status(401).send({
          error: 'Unauthorized for this action',
      })
  }
}