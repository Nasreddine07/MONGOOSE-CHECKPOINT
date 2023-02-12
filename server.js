const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//Create a person with this prototype:
let Schema = mongoose.Schema;

let personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

//Create and Save a Record of a Model:

  let Frank = new Person({
    name: "Frank",
    age: 25,
    favoriteFoods: ["Sushi", "Gluten free pasta"],
  });
  Frank.save((err,data)=>{if(err){console.log(err)}else console.log(data)})


//Create Many Records with model.create()

let arrayOfPeople = [
  { name: "Victor", age: 24, favoriteFoods: ["Pizza", "Cheese"] },
  { name: "Celine", age: 22, favoriteFoods: ["Coke", "Garlic Bread"] },
];

const addpeople = Person.create(arrayOfPeople,(err,data)=>{
    if (err){console.log(err)}else console.log(data)
})

/* //Use model.find() to Search Your Database

const findperson =Person.find({name:'Victor'},(err,data)=>{
  if (err){console.log(err)}else {console.log(data)}
})

//Use model.findOne() to Return a Single Matching Document from Your Database

Person.findOne({favoriteFoods:'Pizza'},(err,data)=>{
    if (err){console.log(err)}else {console.log(data)}
}) 

//Use model.findById() to Search Your Database By _id

Person.findById('63e54004cfb641a0087763a1',(err,data)=>{
  if (err){console.log(err)}else {console.log(data)}
})

//Perform Classic Updates by Running Find, Edit, then Save

Person.findById('63e54004cfb641a0087763a1',(err,data)=>{
  if (err){console.log(err)}else 
  {data.favoriteFoods.push('hamburger')
   data.save((err,result)=>{
      if (err){console.log(err)}else{
          console.log(result)
      }
   })
}
}) */

//Perform New Updates on a Document Using model.findOneAndUpdate()


Person.findOneAndUpdate({name: 'Victor'}, {age: 20}, {new: true}, (err, data) => {
  if (err){console.log(err)}else{console.log(data)}
})
  

//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove('63e5346183b7c5e6f725624c',(err,data)=>{
  if (err){console.log(err)}else{console.log('person has been deleted')}})

//MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.remove({name:'Frank'},(err,data)=>{
  if (err){console.log(err)}else{console.log('PEOPLE has been deleted')}})


  Person.find({favoriteFoods : {$all: ['Pizza']}})
  .sort({name: 'asc'})
  .limit(2)
  .select('-age')
  .exec((err,data) => {
    if (err){console.log(err)}else{console.log(data)}}) 





mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI, (err) =>
  err ? console.log(err) : console.log("DB is connected...")
);

const Port = process.env.Port || 7000;
app.listen(Port, (err) =>
  err ? console.log(err) : console.log(`server is running on ${Port}`)
);