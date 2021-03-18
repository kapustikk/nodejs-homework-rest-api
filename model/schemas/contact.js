const mongoose = require ('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

 
const { Schema, model, SchemaTypes } = mongoose
 
const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
        unique: true,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    }
},
{versionKey: false, timestamps: true},
)

contactSchema.virtual('id').get(function () {
    return this._id;
})

contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema)
 
module.exports = Contact