var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    title: String,
    content: String,
    dateExp: Date,
    read: Boolean,
    sender: String,
});

var taskSchema = new mongoose.Schema({
    name: String,
    category: String,
    owner: String,
    dateInsert: Date,
    dateDue: Date,
    dateCloture: Date,
});

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    status: ["customer", "admin"],
    gender: ["female", "male"],
    dateInsert: Date,
    messages: [messageSchema],
    tasks: [taskSchema],
});
  
const UserModel = mongoose.model("users", userSchema);
  
module.exports = UserModel;