const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// models/User.js
// import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  classList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


// export default mongoose.model('User', userSchema);


// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });
//
// userSchema.methods.comparePassword = function(candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };
//
module.exports = mongoose.model('User', userSchema);
