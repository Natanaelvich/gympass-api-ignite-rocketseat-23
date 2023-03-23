import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { UsersRepository } from '@/repositories/users-repository'

describe('Register Use Case', () => {
  it('should hash the password before saving it to the database', async () => {
    const usersRepository: UsersRepository = {
      async findByEmail() {
        return null
      },

      async create(data) {
        return {
          id: '1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    }

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
