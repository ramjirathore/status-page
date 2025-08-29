const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        organization: true,
        incidents: {
          where: {
            status: 'OPEN'
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get services by organization
router.get('/organization/:orgId', async (req, res) => {
  try {
    const { orgId } = req.params;
    const services = await prisma.service.findMany({
      where: {
        organizationId: orgId
      },
      include: {
        incidents: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new service
router.post('/', async (req, res) => {
  try {
    const { name, organizationId, status = 'OPERATIONAL' } = req.body;
    
    const service = await prisma.service.create({
      data: {
        name,
        status,
        organizationId
      },
      include: {
        organization: true
      }
    });
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update service status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const service = await prisma.service.update({
      where: { id },
      data: { status },
      include: {
        organization: true,
        incidents: {
          where: {
            status: 'OPEN'
          }
        }
      }
    });
    
    // Emit real-time update
    const { io } = require('../server');
    if (io) {
      io.emit('service_status_updated', service);
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    
    const service = await prisma.service.update({
      where: { id },
      data: { name, status },
      include: {
        organization: true
      }
    });
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.service.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
