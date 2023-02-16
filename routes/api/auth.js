const express = require('express');
const controllers = require('../../controllers/users');
const { ctrlWrapper, validateBody } = require('../../helpers');
const {schemas} = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(controllers.register));

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(controllers.login));

module.exports = router;
