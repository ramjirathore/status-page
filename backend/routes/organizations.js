const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all organizations
router.get('/', async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: {
        services: true,
        incidents: {
          where: {
            status: 'OPEN'
          }
        }
      }
    });
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get organization by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        services: true,
        incidents: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        members: {
          include: {
            user: true
          }
        }
      }
    });
    
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new organization
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    const organization = await prisma.organization.create({
      data: {
        name
      }
    });
    
    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update organization
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const organization = await prisma.organization.update({
      where: { id },
      data: { name }
    });
    
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete organization
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.organization.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
