import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
imageSchema.index({ albumId: 1, uploadDate: -1 });

export default mongoose.model('Image', imageSchema);