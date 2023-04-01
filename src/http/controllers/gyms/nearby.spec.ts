import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import getRandomCoordinates from '@/utils/test/getRandomCoordinates'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const centerLatitude = -15.5266329
    const centerLongitude = -47.6609711
    const maxOffset = 0.001

    const randomCoordinates = getRandomCoordinates(
      centerLatitude,
      centerLongitude,
      maxOffset
    )
    const { latitude, longitude } = randomCoordinates

    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude,
        longitude,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -15.5266329,
        longitude: -47.6609711,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude,
        longitude,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
