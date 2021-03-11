const Contact = require('./schemas/contact')

//for mongoost

const listContacts = async () => {
  const results = await Contact.find({})
  return results
}

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId })
  console.log(result.id)
  console.log(result._id)
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body) => {

  const result = await Contact.findByIdAndUpdate(
    { _id: contactId }, 
    { ...body },
    { new: true}
    )
  return result
} 

const removeContact = async (contactId) => {
 const result = await Contact.findByIdAndRemove({_id: contactId})
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}


// for mongodb:

// const db = require('./db')
// const {ObjectID, ObjectId} = require('mongodb')

// const getCollection = async (db, name) => {
//   const client = await db
//   const collection = await client.db().collection('name')
//   return collection
// }

// const listContacts = async () => {
//   const collection = await getCollection(db, 'contacts')
//   const results = await collection.find({}).toArray()
//   // return await db.value()
//   return results
// }

// const getContactById = async (contactId) => {
//   const collection = await getCollection(db, 'contacts')
//   const objectId = new ObjectId(contactId)
//   console.log(objectId.getTimestamp())
//   const [result] = await collection.find({ _id: objectId }).toArray()
//   return result
// }

// const addContact = async (body) => {
//   const record = {
//     ...body,
//   }
//   const collection = await getCollection(db, 'contacts')
//   const {ops: [result]} = await collection.insertOne(record)
//   return result
// }

// const updateContact = async (contactId, body) => {
//   const collection = await getCollection(db, 'contacts')
//   const objectId = new ObjectId(contactId)
//   const {value: result} = await collection.findOneAndUpdate(
//     { _id: objectId }, 
//     { $set: body },
//     { returnOriginal: false}
//     )
//   return result
// } 

// const removeContact = async (contactId) => {
//   const collection = await getCollection(db, 'contacts')
//   const objectId = new ObjectId(contactId)
//   const {value: result} = await collection.findOneAndDelete(
//     { _id: objectId },
//   )
//   return result
// }
