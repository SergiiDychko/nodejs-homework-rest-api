const express = require('express');
const controllers = require('../../controllers/users');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
const {schemas} = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(controllers.register));

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(controllers.login));

router.get('/logout', authenticate, ctrlWrapper(controllers.logout));

router.get('/current', authenticate, ctrlWrapper(controllers.current));

module.exports = router;
