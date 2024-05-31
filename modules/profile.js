
import mongoose, { Schema } from 'mongoose';

const profile = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"sign"},
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('profile', profile );
