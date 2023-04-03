import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import getRandomCoordinates from '@/utils/test/getRandomCoordinates'

describe('Check-in Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the total count of check-ins', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const centerLatitude = -15.5266329
    const centerLongitude = -47.6609711
    const maxOffset = 0.001

    const { latitude, longitude } = getRandomCoordinates(
      centerLatitude,
      centerLongitude,
      maxOffset
    )

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude,
        longitude,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.body.checkInsCount).toEqual(2)
  })
})
