import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { refresh } from './controllers/refresh'
import { register } from './controllers/register'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
