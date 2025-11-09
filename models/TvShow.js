
import mongoose from 'mongoose';

const tvShowSchema = new mongoose.Schema({
  title: String,
  imageUrl: String
});

export default mongoose.model('TvShow', tvShowSchema);
