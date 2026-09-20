const mongoose = require('mongoose')
const dns = require('dns')
const { type } = require('os')
dns.setServers(["1.1.1.1"])

if (process.argv.length < 2) {
  console.log('give password as argument')
  process.exit(1)
}

const name = process.argv[3]
const number = process.argv[4]

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.ebjv8cc.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Must be at least 3, got {VALUE}'],
    required: true,
  },
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number,
})

if (process.argv.length === 3) {
    Person
        .find({})
        .then((persons) => {
            console.log("phonebook:")
            persons.forEach((person) => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
} else {
    person.save().then(() => {
        mongoose.connection.close()
        console.log(`added ${person.name} number ${person.number} to phonebook`)
    })
}