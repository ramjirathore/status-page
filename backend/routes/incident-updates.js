const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all updates for an incident
router.get('/incident/:incidentId', async (req, res) => {
  try {
    const { incidentId } = req.params;
    const updates = await prisma.incidentUpdate.findMany({
      where: {
        incidentId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add update to incident
router.post('/', async (req, res) => {
  try {
    const { incidentId, message, status } = req.body;
    
    // Create the update
    const update = await prisma.incidentUpdate.create({
      data: {
        incidentId,
        message,
        status
      }
    });
    
    // Update the incident status
    await prisma.incident.update({
      where: { id: incidentId },
      data: { status }
    });
    
    // Get the full incident with service info for real-time update
    const incident = await prisma.incident.findUnique({
      where: { id: incidentId },
      include: {
        service: true,
        organization: true,
        updates: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    
    // Emit real-time update
    const { io } = require('../server');
    if (io) {
      io.emit('incident_updated', incident);
    }
    
    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an incident update
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { message, status } = req.body;
    
    const update = await prisma.incidentUpdate.update({
      where: { id },
      data: { message, status }
    });
    
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an incident update
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.incidentUpdate.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
