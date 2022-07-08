require('dotenv').config();

// 01.Install and Set Up Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// 02.Create a Model
let personSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    age: Number,
    favoriteFoods: [String],
});

let Person = mongoose.model('Person', personSchema)

// 03.Create and Save a Record of a Model
const createAndSavePerson = (done) => {
    let person = new Person({name: 'makz', age: 24, favoriteFoods: ['papas fritas', 'atun con pan']})
    person.save((error, data) => {
        if (error) {
            return console.error(error)
        }
        done(null, data)
    })
};

// 04.Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (error, data) => {
        if (error) { return console.error(error) }
        done(null, data)
    })
};

// 05.Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
    Person.find({name: personName}, (error, data) => {
        if (error) return console.error(error)
        done(null, data)
    })
};

const findOneByFood = (food, done) => {
    done(null /*, data*/);
};

const findPersonById = (personId, done) => {
    done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

    done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    done(null /*, data*/);
};

const removeById = (personId, done) => {
    done(null /*, data*/);
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    done(null /*, data*/);
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/);
};

/** **Well Done !!**
    /* You completed these challenges, let's go celebrate !
    */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
