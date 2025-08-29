const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all members of an organization
router.get('/organization/:orgId', async (req, res) => {
  try {
    const { orgId } = req.params;
    const members = await prisma.organizationMember.findMany({
      where: {
        organizationId: orgId
      },
      include: {
        user: true,
        organization: true
      }
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add member to organization
router.post('/', async (req, res) => {
  try {
    const { userId, organizationId, role = 'member' } = req.body;
    
    const member = await prisma.organizationMember.create({
      data: {
        userId,
        organizationId,
        role
      },
      include: {
        user: true,
        organization: true
      }
    });
    
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update member role
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    const member = await prisma.organizationMember.update({
      where: { id },
      data: { role },
      include: {
        user: true,
        organization: true
      }
    });
    
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove member from organization
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.organizationMember.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's organizations
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const memberships = await prisma.organizationMember.findMany({
      where: {
        userId
      },
      include: {
        organization: true
      }
    });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
