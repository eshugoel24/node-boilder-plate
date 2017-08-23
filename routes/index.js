'use strict';

import express from 'express';

import routeLogic from './logic';

const router = new express.Router();

router.post('/register', routeLogic.registerUser);

export default router;