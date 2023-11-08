require('dotenv').config()

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

/** 3) Create and Save a Person */
var Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function (done) {
  var janeFonda = new Person({ name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"] });

  janeFonda.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];

var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, foodFound) => {
    if (err) return console.log(err);
    done(null, foodFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, idFound) => {
    if (err) return console.log(err);
    done(null, idFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, personRemoved) => {
    if (err) return console.log(err);
    done(null, personRemoved);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, res) => {
    if (err) console.log(err);
    done(null, res);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }, (err, result) => {
    if (err) return console.log(err);
    done(null, result);
  }).sort({name: 1}).limit(2).select({age: 0}).exec();
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
