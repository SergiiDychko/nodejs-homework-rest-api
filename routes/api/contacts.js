const express = require('express');
const controllers = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(controllers.listContacts));

router.get(
  '/:contactId',
  authenticate,
  ctrlWrapper(controllers.getContactById)
);

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.addContact)
);

router.put(
  '/:contactId',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.updateContact)
);

router.delete(
  '/:contactId',
  authenticate,
  ctrlWrapper(controllers.removeContact)
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  validateBody(schemas.updFavoriteContactSchema),
  ctrlWrapper(controllers.updateStatusContact)
);

module.exports = router;
