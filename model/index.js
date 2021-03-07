// const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const db = require('./db')
const { v4: uuid } = require('uuid')

const listContacts = async () => {
  return await db.value()
}

const getContactById = async (contactId) => {
  return await db.find((contact) => String(contact.id) === contactId).value()
}

const removeContact = async (contactId) => {
  const [record] = await db.remove((contact) => String(contact.id) === contactId).write()
  // const [record] = await db.remove({ contactId }).write()
  return record
}

const addContact = async (body) => {
  const id = uuid()
  const record = {
    id,
    ...body,
  }
  db.push(record).write()
  return record
}

const updateContact = async (contactId, body) => {
  const record = await db.find((contact) => String(contact.id) === contactId).assign(body).value()
  db.write()
  return record.id ? record : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
