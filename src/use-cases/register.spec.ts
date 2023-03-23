import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/inMemoryUsersRepository'

describe('Register Use Case', () => {
  it('should hash the password before saving it to the database', async () => {
    const usersRepository = new InMemoryUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
