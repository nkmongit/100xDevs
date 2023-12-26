const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');

// User Routes
router.post('/signup', async (req, res) => {
  // Implement user signup logic
  const username = req.headers.username;
  const password = req.headers.password;

  const findUser = await User.findOne({ username: username });

  if (findUser) {
    return res.status(400).json({
      error: `${username} already exists`,
    });
  }

  const createUser = new User({
    username: username,
    password: password,
  });

  createUser.save().then(() => console.log('User Signed Up'));
  return res.status(200).json({
    message: 'User Successfully Created',
  });
});

router.get('/courses', async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  if (courses.length === 0) {
    res.status(404).json({
      err: 'No courses found',
    });
  }
  res.status(200).json(courses);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.headers.username;
  const courseId = req.params.courseId;

  try {
    const user = await User.findOne({ username }).populate('courses');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const courseIds = user.courses.map((course) => course._id.toString());

    if (courseIds.includes(courseId)) {
      return res
        .status(400)
        .json({ message: 'Course already purchased by the user' });
    }

    const findCourse = await Course.findOne({ _id: courseId });
    if (!findCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await User.findOneAndUpdate(
      { username: username },
      {
        $push: { courses: findCourse._id },
      },
      { new: true }
    );
    res.status(200).json({
      message: 'Course purchased and added successfully',
    });
  } catch (e) {
    res.status(500).json({ message: 'Error purchasing course', error: e });
  }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const username = req.headers.username;
    const getUser = await User.findOne({ username }).populate('courses');

    if (!getUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const purchasedCourses = getUser.courses;

    res.status(200).json({ purchasedCourses });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching purchased courses', error });
  }
});

module.exports = router;
