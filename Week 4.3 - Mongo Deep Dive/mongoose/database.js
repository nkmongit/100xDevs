const mongoose = require('mongoose');

// Defining a schema using mongoose
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  price: 599,
});

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
  User,
  Course,
};
