require('dotenv').config();

// 01.Install and Set Up Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// 02.Create a Model
let personSchema = new mongoose.Schema({
    name: {type: String, required: true},
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

// 06.Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (error, data) => {
        if (error) return console.error(error)
        done(null, data);
    })
};

// 07.Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
    Person.findById(personId, (error, data) => {
        if (error) return console.log(error)
        done(null, data)
    })
};

// 08.Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

    findPersonById(personId, (_, data) => {
        data.favoriteFoods.push(foodToAdd)
        data.save((error, data) => {
            if (error) return console.error(error)
            done(null, data)
        })
    })
};

// 09.Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, data) => {
        if (error) return console.error(error)
        done(null, data)
    })
};

// 10.Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (error, data) => {
        if (error) return console.error(error)
        done(null, data)
    })
};

// 11.Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    Person.remove({name: nameToRemove}, (error, data) => {
        if (error) return console.error(error)
        done(null, data)
    })
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
