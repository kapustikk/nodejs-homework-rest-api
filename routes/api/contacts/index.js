const express = require('express');
const router = express.Router();
const contactsController = require('../../../controllers/contacts');
const validate = require('./validation');
const guard = require('../../../helpers/guard');



router
.get('/', guard, contactsController.getAllContacts)
.post('/', guard, contactsController.createContact);


router
.get('/:contactId', guard, contactsController.getContactById)
.delete('/:contactId', guard, contactsController.deleteContact)
.patch('/:contactId', guard, validate.updateContact, contactsController.patchContact);

module.exports = router;
