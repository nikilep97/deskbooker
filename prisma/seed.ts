// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Tyhjennä vanha data, jotta ei tule duplikaatteja
  await prisma.booking.deleteMany()
  await prisma.user.deleteMany()
  await prisma.resource.deleteMany()

  console.log('Old data deleted.')

  // Luo Admin-käyttäjä ja normaali käyttäjä
  const admin = await prisma.user.create({
    data: {
      email: 'admin@firm.com',
      name: 'Admin Antti',
      role: 'ADMIN',
    },
  })

  const user = await prisma.user.create({
    data: {
      email: 'teppo@testi.com',
      name: 'Teppo Testaaja',
      role: 'USER',
    },
  })

  console.log('Users created.')

  // Luo resursseja (Neukkareita / Työpisteitä)
  const roomA = await prisma.resource.create({
    data: {
      name: 'Neuvotteluhuone Mars',
      description: 'Iso huone videoyhteydellä, max 10 hlö',
      capacity: 10,
      pricePerHour: 5000, // 50.00€
    },
  })

  const desk1 = await prisma.resource.create({
    data: {
      name: 'Hot Desk 1',
      description: 'Hiljainen työpiste ikkunan vieressä',
      capacity: 1,
      pricePerHour: 1000, // 10.00€
    },
  })

  console.log('Resources created.')

  // Luodaan varaus huomiselle klo 10-12
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10, 0, 0, 0)
  
  const tomorrowEnd = new Date(tomorrow)
  tomorrowEnd.setHours(12, 0, 0, 0)

  await prisma.booking.create({
    data: {
      userId: user.id,
      resourceId: roomA.id,
      startTime: tomorrow,
      endTime: tomorrowEnd,
      notes: 'Tiimipalaveri',
    },
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })