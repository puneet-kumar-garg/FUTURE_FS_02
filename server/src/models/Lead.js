import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  source: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Converted'], default: 'New' },
  notes: [noteSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Lead', leadSchema);
