import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
