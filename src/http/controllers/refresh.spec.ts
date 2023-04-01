import request from 'supertest'
import { app } from '../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { generateRandomDigits } from '@/utils/test/generators'

describe('Refresh Token (e2e)', () => {
  let randomDigits = '1234'

  beforeAll(async () => {
    await app.ready()
    randomDigits = await generateRandomDigits(request)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: `${randomDigits}@example.com`,
        password: '123456',
      })

    const authResponse = await request(app.server)
      .post('/session')
      .send({
        email: `${randomDigits}@example.com`,
        password: '123456',
      })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
