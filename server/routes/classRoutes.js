const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Class = require('../models/Class');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify user roles (if not already handled by your auth middleware)
const requireRole = (role) => (req, res, next) => {
  // console.log(req.body)
  if (req.body.data.user.role !== role) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  next();
};

// 1. Get All Classes (with filters)
router.get('/', async (req, res) => {
  try {
    const { subject, status, creator } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (status) filter.status = status;
    if (creator) filter.creator = creator;

    const classes = await Class.find(filter)
      .populate('creator', 'name email')
      .select('-userList');

    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

// 2. Create Class (Teacher/Admin only)
router.post(
  '/',
  [
    body('name').trim().isLength({ min: 3 }),
    body('description').optional().trim(),
    body('enrollmentCode').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const creator = await User.findById(req.body.user._id);
      if (!creator || !['teacher', 'admin'].includes(creator.role)) {
        return res.status(403).json({ error: 'Only teachers/admins can create classes' });
      }
      const newClass = new Class({
        ...req.body,
        creator: creator._id
      });

      const savedClass = await newClass.save();
      // Add class to creator's classList
      creator.classList.push(savedClass._id);
      await creator.save();

      res.status(201).json(savedClass);
    } catch (error) {
      res.status(500).json({ error: 'Class creation failed', details: error.message });
    }
  }
);

// 3. Update Class Details (name, description, schedule, etc.)
router.patch('/:classId', async (req, res) => {
  try {
    const targetClass = await Class.findById(req.params.classId);

    if (!targetClass) return res.status(404).json({ error: 'Class not found' });
    if (!targetClass.creator.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Only update allowed fields
    const allowed = ['name', 'description', 'subject', 'schedule', 'endDate'];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) targetClass[field] = req.body[field];
    });

    await targetClass.save();
    res.json({ success: true, class: targetClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update class' });
  }
});

// 4. Update Class Status (Creator/Admin only)
router.patch('/:classId/status',
  [
    body('status')
      .isIn(['active', 'archived', 'completed'])
      .withMessage('Invalid status value')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const targetClass = await Class.findOne({classId:req.params.classId});

      if (!targetClass) return res.status(404).json({ error: 'Class not found' });
      if (!targetClass.creator.equals(req.body.user._id) && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Only class creator or admin can modify status' });
      }

      targetClass.status = req.body.status;
      const updatedClass = await targetClass.save();

      res.json({ success: true, newStatus: updatedClass.status, classId: updatedClass.classId });
    } catch (error) {
      res.status(500).json({ error: 'Status update failed', details: error.message });
    }
  }
);

// 5. Join Class (Student only)
router.post(
  '/:classId/join',
  requireRole('student'),
  async (req, res) => {
    try {
      console.log("hvjhv")
      const student = await User.findById(req.body.data.user._id);
      const targetClass = await Class.findOne({ classId: req.params.classId });
      console.log("hvjhv")
      if (!targetClass) return res.status(404).json({ error: 'Class not found' });
      console.log("hvjhv")
      if (targetClass.userList.includes(student._id)) {
        return res.status(400).json({ error: 'Already enrolled' });
      }

      // Update class
      targetClass.userList.push(student._id);
      await targetClass.save();

      // Update student
      student.classList.push(targetClass._id);
      await student.save();

      res.json({ success: true, class: targetClass });
    } catch (error) {
      res.status(500).json({ error: 'Enrollment failed', details: error.message });
    }
  }
);

// 6. Remove a Student from a Class
router.delete('/:classId/students/:studentId', async (req, res) => {
  try {
    const targetClass = await Class.findById(req.params.classId);
    const student = await User.findById(req.params.studentId);

    if (!targetClass || !student) return res.status(404).json({ error: 'Class or student not found' });

    // Only creator/admin or the student themselves can remove
    if (
      !targetClass.creator.equals(req.user._id) &&
      req.user.role !== 'admin' &&
      !student._id.equals(req.user._id)
    ) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    targetClass.userList = targetClass.userList.filter(
      uid => !uid.equals(student._id)
    );
    student.classList = student.classList.filter(
      cid => !cid.equals(targetClass._id)
    );

    await targetClass.save();
    await student.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove student from class' });
  }
});

// 7. Student Leaves a Class
router.post('/:classId/leave', async (req, res) => {
  try {
    const student = await User.findById(req.body.user._id);
    const targetClass = await Class.findOne({ classId: req.params.classId });

    if (!student || !targetClass) return res.status(404).json({ error: 'Class or student not found' });

    targetClass.userList = targetClass.userList.filter(
      uid => !uid.equals(student._id)
    );
    student.classList = student.classList.filter(
      cid => !cid.equals(targetClass._id)
    );

    await targetClass.save();
    await student.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to leave class' });
  }
});

// 8. Get All Students in a Class
router.get('/:classId/students', async (req, res) => {
  try {
    const targetClass = await Class.findById(req.params.classId)
      .populate('userList', 'name email role');

    if (!targetClass) return res.status(404).json({ error: 'Class not found' });

    res.json(targetClass.userList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// 9. Delete Class (Admin/Creator Only)
router.delete('/:classId', async (req, res) => {
  try {
    const targetClass = await Class.findById(req.params.classId);

    if (!targetClass) return res.status(404).json({ error: 'Class not found' });
    if (!targetClass.creator.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Remove class from all users' classList
    await User.updateMany(
      { classList: targetClass._id },
      { $pull: { classList: targetClass._id } }
    );

    await targetClass.deleteOne();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete class' });
  }
});

// 10. Search Classes by Name/Description
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const regex = new RegExp(q, 'i');
    const classes = await Class.find({
      $or: [{ name: regex }, { description: regex }]
    }).select('name description subject status');

    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// 11. List All Classes a Student is Enrolled In
router.get('/my', async (req, res) => {
  try {
    const userId = req.query.user; // Get user ID from query parameters
    const user = await User.findById(userId).populate('classList');
    res.json({ classes: user.classList });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your classes' });
  }
});


// 12. List All Classes Created by a Teacher
router.get('/created', async (req, res) => {
  try {
    const classes = await Class.find({ creator: req.user._id });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch created classes' });
  }
});

// 13. Get Class Details (optional, if not using GET /classes/:classId as above)
router.get('/:classId', async (req, res) => {
  try {
    const foundClass = await Class.findById(req.params.classId)
      .populate('creator', 'name email')
      .populate('userList', 'name email role');

    if (!foundClass) return res.status(404).json({ error: 'Class not found' });

    res.json(foundClass);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch class' });
  }
});

// Express route
router.get('/join/:enrollmentCode', async (req, res) => {
  try {
    const { enrollmentCode } = req.params;
    const foundClass = await Class.findOne({ enrollmentCode })
      .select('classId name description subject creator status');
    if (!foundClass) return res.status(404).json({ error: 'Class not found' });
    res.json(foundClass);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch class' });
  }
});

// Express route (user must be authenticated)
router.post('/join/:enrollmentCode', async (req, res) => {
  try {
    const { enrollmentCode } = req.params;
    const student = await User.findById(req.user._id);
    const foundClass = await Class.findOne({ enrollmentCode });

    if (!foundClass) return res.status(404).json({ error: 'Class not found' });
    if (foundClass.userList.includes(student._id)) {
      return res.status(400).json({ error: 'Already enrolled' });
    }

    foundClass.userList.push(student._id);
    student.classList.push(foundClass._id);

    await foundClass.save();
    await student.save();

    res.json({ success: true, class: foundClass });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join class' });
  }
});


module.exports = router;
