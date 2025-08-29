const express = require('express');
const router = express.Router();

// Import route modules
const servicesRouter = require('./services');
const incidentsRouter = require('./incidents');
const organizationsRouter = require('./organizations');
const usersRouter = require('./users');
const membersRouter = require('./members');
const incidentUpdatesRouter = require('./incident-updates');

// Use route modules
router.use('/services', servicesRouter);
router.use('/incidents', incidentsRouter);
router.use('/organizations', organizationsRouter);
router.use('/users', usersRouter);
router.use('/members', membersRouter);
router.use('/incident-updates', incidentUpdatesRouter);

module.exports = router;
