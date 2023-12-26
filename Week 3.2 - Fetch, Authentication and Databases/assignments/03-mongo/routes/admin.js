const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const router = Router();
const { Admin, Course } = require('../db/index.js');
// const z = require('zod');

// Admin Routes
router.post('/signup', async (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  //   // Implemented zod validation
  //   const usernameSchema = z.string().email();
  //   const passwordSchema = z.string().min(8);

  //   const validateUsername = usernameSchema.safeParse(username);
  //   const validatePassword = passwordSchema.safeParse(password);

  //   if (
  //     validatePassword['success'] == false ||
  //     validateUsername['success'] == false
  //   ) {
  //     return res.status(400).json({
  //       error: 'Please enter a valid username or password',
  //     });
  //   }
  const hasAdmin = await Admin.findOne({ username: username });

  if (hasAdmin) {
    return res.status(400).json({
      error: `${username} already exists`,
    });
  }

  const createAdmin = new Admin({
    username: username,
    password: password,
  });

  createAdmin.save().then(() => console.log('Admin Signed Up'));
  return res.status(200).json({
    message: 'Admin Successfully Created',
  });
});

router.post('/courses', adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const createCourse = new Course({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });

  createCourse.save().then(() => console.log('Course Added Successfully'));
  const courseId = await Course.findOne({ title: title });

  res.status(200).json({
    message: 'Course successfully created',
    courseId: courseId._id.toString(),
  });
});

router.get('/courses', adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  if (courses.length === 0) {
    res.status(404).json({
      err: 'No courses found',
    });
  }
  res.status(200).json(courses);
});

module.exports = router;
