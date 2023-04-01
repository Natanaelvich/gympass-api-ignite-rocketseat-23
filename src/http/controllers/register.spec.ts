import { generateRandomDigits } from '@/utils/test/generators'
import { app } from '../../app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  let randomDigits = '1234'

  beforeAll(async () => {
    await app.ready()
    randomDigits = await generateRandomDigits(request)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: `${randomDigits}@example.com`,
        password: '123456',
      })

    expect(response.statusCode).toBe(201)
  })
})
