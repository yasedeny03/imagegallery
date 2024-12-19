import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  allowedAlbums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  this.lastModified = Date.now();
  next();
});

export default mongoose.model('User', userSchema);