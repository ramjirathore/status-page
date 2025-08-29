const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@techcorp.com',
        name: 'Admin User',
      },
    }),
    prisma.user.create({
      data: {
        email: 'member@techcorp.com',
        name: 'Team Member',
      },
    }),
  ]);

  // Create a sample organization
  const organization = await prisma.organization.create({
    data: {
      name: 'TechCorp Inc.',
    },
  });

  // Add users to organization
  await Promise.all([
    prisma.organizationMember.create({
      data: {
        userId: users[0].id,
        organizationId: organization.id,
        role: 'admin',
      },
    }),
    prisma.organizationMember.create({
      data: {
        userId: users[1].id,
        organizationId: organization.id,
        role: 'member',
      },
    }),
  ]);

  // Create sample services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Website',
        status: 'OPERATIONAL',
        organizationId: organization.id,
      },
    }),
    prisma.service.create({
      data: {
        name: 'API',
        status: 'OPERATIONAL',
        organizationId: organization.id,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Database',
        status: 'OPERATIONAL',
        organizationId: organization.id,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Email Service',
        status: 'DEGRADED',
        organizationId: organization.id,
      },
    }),
  ]);

  // Create sample incidents with updates
  const incidents = await Promise.all([
    prisma.incident.create({
      data: {
        title: 'Email delivery delays',
        description: 'Some users are experiencing delays in email delivery. We are investigating the issue.',
        status: 'OPEN',
        serviceId: services[3].id, // Email Service
        organizationId: organization.id,
      },
    }),
    prisma.incident.create({
      data: {
        title: 'API rate limiting issues',
        description: 'We are experiencing higher than normal API usage. Rate limiting has been temporarily increased.',
        status: 'OPEN',
        serviceId: services[1].id, // API
        organizationId: organization.id,
      },
    }),
  ]);

  // Add sample incident updates
  await Promise.all([
    prisma.incidentUpdate.create({
      data: {
        incidentId: incidents[0].id,
        message: 'Initial investigation started. Email servers are under heavy load.',
        status: 'OPEN',
      },
    }),
    prisma.incidentUpdate.create({
      data: {
        incidentId: incidents[0].id,
        message: 'Identified the issue. Scaling up email servers.',
        status: 'OPEN',
      },
    }),
    prisma.incidentUpdate.create({
      data: {
        incidentId: incidents[1].id,
        message: 'Rate limiting has been increased. Monitoring API usage.',
        status: 'OPEN',
      },
    }),
  ]);

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
