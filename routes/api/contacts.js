const express = require('express')
const router = express.Router()
const validate = require('./validation')
const contactsController = require('../../controllers/contacts')

router
.get('/', contactsController.getAllContacts)
.post('/', contactsController.createContact)


router
.get('/:contactId', contactsController.getContactById)
.delete('/:contactId', contactsController.deleteContact)
.patch('/:contactId', validate.updateContact, contactsController.patchContact)

module.exports = router
