const Contact = require('./schemas/contact')

//for mongoost

const listContacts = async (userId, { sortBy, sortByDesc, filter, limit = '5', page = '0' },) => {
  const results = await Contact.paginate(
    { owner: userId},
    { limit,
      page,
      sort: { 
        ...(sortBy ? { [`#{sortBy}`]: 1 } : {}), 
      ...(sortByDesc ? { [`#{sortByDesc}`]: -1 } : {}) 
    },
      selector: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'email subscription -_id'
      }
     },
    )
    const { docs: contacts, totalDocs: total } = results
  return { total: total.toString(), limit, page, contacts }
}

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id'
  })
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body, userId) => {

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId }, 
    { ...body },
    { new: true}
    )
  return result
} 

const removeContact = async (contactId, userId) => {
 const result = await Contact.findOneAndRemove({_id: contactId, owner: userId})
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
