const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

const numberValidator = (val) => {
  const numberFormat = /^\d{2,3}-\d{5,10}$/
  return numberFormat.test(val)
}

const numberValidatorWithError = [numberValidator, 'Phone number is not in a valid format']

console.log('connecting to MONGODB')
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MondoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    minLength: [8, 'Phone number must be at least 8 characters long'],
    validate: numberValidatorWithError,
    required: [true, 'Phone number is required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
