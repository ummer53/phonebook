/*
introducing mongodb and necessary components
*/
const mongoose = require("mongoose"); //import mongodb

if (process.argv.length < 3) {
  console.log("give password as argument"); //// making user to give password as third argument
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://mohdumar876:${password}@cluster0.amrins0.mongodb.net/phonebook?retryWrites=true&w=majority`; // connection url

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

if (process.argv.length === 3) {
  console.log("phonebook:"); //// making user to give password as third argument
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });

    mongoose.connection.close();
  });
  // process.exit(1)
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((result) => {
  console.log(`${person} saved`);
  mongoose.connection.close();
});
