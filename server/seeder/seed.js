const usertModel = require("../models/user");
const mongoose = require("mongoose");
const dev = require("../config/dev"); //get your mongoose string
//create your array. i inserted only 1 object here
const users = [   
  new usertModel({
    username: "test",
    email: "test@gmail.com",
    password: "test1234",
    pattern: "pattern",
    sequence: "true",
    
  }),]
//connect mongoose
mongoose
  .connect(String(dev.db), { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
users.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === users.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});