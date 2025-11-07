import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  badge: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.models.News || mongoose.model('News', NewsSchema);

export default News;
