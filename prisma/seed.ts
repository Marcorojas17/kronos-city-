cat > prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Usuario Super Admin
  const adminEmail = 'admin@kronos.city';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash('AdminCity2026!', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashed,
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
      },
    });
  }

  // Usuario Auditor
  const auditorEmail = 'auditor@demo.com';
  const existingAuditor = await prisma.user.findUnique({ where: { email: auditorEmail } });
  if (!existingAuditor) {
    const hashed = await bcrypt.hash('Auditor2026!', 10);
    await prisma.user.create({
      data: {
        email: auditorEmail,
        password: hashed,
        name: 'Auditor Demo',
        role: 'AUDITOR',
      },
    });
  }

  // Usuario Admin (para pruebas)
  const adminUserEmail = 'admin@demo.com';
  const existingAdminUser = await prisma.user.findUnique({ where: { email: adminUserEmail } });
  if (!existingAdminUser) {
    const hashed = await bcrypt.hash('Admin2026!', 10);
    await prisma.user.create({
      data: {
        email: adminUserEmail,
        password: hashed,
        name: 'Admin Demo',
        role: 'ADMIN',
      },
    });
  }

  // Normas de ejemplo (ISO y NOM)
  await prisma.norma.upsert({
    where: { codigo: 'ISO9001' },
    update: {},
    create: {
      codigo: 'ISO9001',
      titulo: 'Sistemas de Gestión de Calidad',
      tipo: 'ISO',
      version: '2015',
      requisitos: {
        create: [
          { numero: '4.1', descripcion: 'Contexto de la organización', peso: 2 },
          { numero: '5.1', descripcion: 'Liderazgo y compromiso', peso: 3 },
          { numero: '6.1', descripcion: 'Planificación', peso: 2 },
        ],
      },
    },
  });

  await prisma.norma.upsert({
    where: { codigo: 'NOM-001' },
    update: {},
    create: {
      codigo: 'NOM-001',
      titulo: 'Seguridad en instalaciones eléctricas',
      tipo: 'NOM',
      version: '2022',
      requisitos: {
        create: [
          { numero: '1.1', descripcion: 'Protección contra contactos directos', peso: 3 },
          { numero: '2.2', descripcion: 'Puesta a tierra', peso: 2 },
          { numero: '3.3', descripcion: 'Equipos de protección', peso: 1 },
        ],
      },
    },
  });

  console.log('🌱 Seed completado exitosamente');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
EOF
