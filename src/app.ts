import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import fastifyRateLimiter from 'fastify-rate-limiter'
import { ZodError } from 'zod'
import { env } from './env'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { usersRoutes } from './http/controllers/users/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: env.SENTRY_KEY,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
})

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(fastifyRateLimiter, {
  max: 100,
  timeWindow: 1000 * 60,
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    Sentry.captureException(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply
    .status(500)
    .send({ message: 'Internal Server Error', statusCode: 500 })
})
