import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  readTime: {
    type: String,
  },
  role: {
    type: String,
  },
  feature: {
    type: Boolean,
   default: false,
  },
});

const News = mongoose.models.News || mongoose.model('News', NewsSchema);

export default News;
