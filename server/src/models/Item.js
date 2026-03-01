const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, enum: ['Electronics','ID Cards','Keys','Clothing','Bags','Documents','Others'], required: true },
  status: { type: String, enum: ['Lost','Found','Claimed','Resolved'], default: 'Lost' },
  zone: { type: String, default: '' },
  sensitivity: { type: String, enum: ['Low','Medium','High'], default: 'Low' },
  postedByEmail: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
