import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando seeding...`);
  
  // Limpiar la base de datos existente
  await prisma.movement.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('Base de datos limpiada');
  
  // Crear usuarios
  const adminUser = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@example.com',
      phone: '+123456789',
      role: Role.ADMIN,
    },
  });
  
  const regularUser1 = await prisma.user.create({
    data: {
      name: 'Usuario Normal',
      email: 'usuario@example.com',
      phone: '+987654321',
      role: Role.USER,
    },
  });
  
  const regularUser2 = await prisma.user.create({
    data: {
      name: 'María Rodríguez',
      email: 'maria@example.com',
      phone: '+555555555',
      role: Role.USER,
    },
  });
  
  console.log(`Creados ${await prisma.user.count()} usuarios`);
  
  // Crear movimientos para el administrador
  const adminMovements = await prisma.movement.createMany({
    data: [
      {
        concept: 'Venta de servicios',
        amount: 1500.00,
        date: new Date('2025-03-15'),
        userId: adminUser.id,
      },
      {
        concept: 'Compra de equipos',
        amount: -750.50,
        date: new Date('2025-03-10'),
        userId: adminUser.id,
      },
      {
        concept: 'Pago de impuestos',
        amount: -320.75,
        date: new Date('2025-03-05'),
        userId: adminUser.id,
      },
      {
        concept: 'Venta de producto',
        amount: 950.25,
        date: new Date('2025-03-01'),
        userId: adminUser.id,
      },
    ],
  });
  
  // Crear movimientos para el usuario regular 1
  const user1Movements = await prisma.movement.createMany({
    data: [
      {
        concept: 'Pago de cliente',
        amount: 800.00,
        date: new Date('2025-03-18'),
        userId: regularUser1.id,
      },
      {
        concept: 'Compra de materiales',
        amount: -350.00,
        date: new Date('2025-03-12'),
        userId: regularUser1.id,
      },
      {
        concept: 'Servicios contratados',
        amount: -150.25,
        date: new Date('2025-03-08'),
        userId: regularUser1.id,
      },
    ],
  });
  
  // Crear movimientos para el usuario regular 2
  const user2Movements = await prisma.movement.createMany({
    data: [
      {
        concept: 'Donación recibida',
        amount: 1200.00,
        date: new Date('2025-03-20'),
        userId: regularUser2.id,
      },
      {
        concept: 'Gastos de transporte',
        amount: -85.50,
        date: new Date('2025-03-17'),
        userId: regularUser2.id,
      },
      {
        concept: 'Pago de servicios',
        amount: -120.00,
        date: new Date('2025-03-14'),
        userId: regularUser2.id,
      },
      {
        concept: 'Venta de activos',
        amount: 650.75,
        date: new Date('2025-03-02'),
        userId: regularUser2.id,
      },
    ],
  });
  
  console.log(`Creados ${await prisma.movement.count()} movimientos`);
  
  console.log(`Seeding completado.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });