const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all incidents (public)
router.get('/', async (req, res) => {
  try {
    const incidents = await prisma.incident.findMany({
      where: {
        status: 'OPEN'
      },
      include: {
        service: true,
        organization: true,
        updates: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get incidents by organization
router.get('/organization/:orgId', async (req, res) => {
  try {
    const { orgId } = req.params;
    const incidents = await prisma.incident.findMany({
      where: {
        organizationId: orgId
      },
      include: {
        service: true,
        updates: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new incident
router.post('/', async (req, res) => {
  try {
    const { title, description, serviceId, organizationId, status = 'OPEN' } = req.body;
    
    const incident = await prisma.incident.create({
      data: {
        title,
        description,
        serviceId,
        organizationId,
        status
      },
      include: {
        service: true,
        organization: true
      }
    });
    
    // Emit real-time update
    const { io } = require('../server');
    if (io) {
      io.emit('incident_created', incident);
    }
    
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update incident status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const incident = await prisma.incident.update({
      where: { id },
      data: { status },
      include: {
        service: true,
        organization: true
      }
    });
    
    // Emit real-time update
    const { io } = require('../server');
    if (io) {
      io.emit('incident_updated', incident);
    }
    
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update incident
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    
    const incident = await prisma.incident.update({
      where: { id },
      data: { title, description, status },
      include: {
        service: true,
        organization: true
      }
    });
    
    // Emit real-time update
    const { io } = require('../server');
    if (io) {
      io.emit('incident_updated', incident);
    }
    
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete incident
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.incident.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
