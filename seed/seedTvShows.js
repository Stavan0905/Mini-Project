import mongoose from 'mongoose';
import TvShow from '../models/TvShow.js'; // adjust if model path differs

mongoose.connect('mongodb://127.0.0.1:27017/dripstream');

const tvShows = [
  { title: 'Breaking Bad', imageUrl: 'breakingbad.jpg' },
  { title: 'Stranger Things', imageUrl: 'strangerthings.jpg' },
  { title: 'The Boys', imageUrl: 'theboys.jpg' },
  { title: 'The Office', imageUrl: 'theoffice.jpg' },
  { title: 'Game of Thrones', imageUrl: 'got.jpg' },
  { title: 'Peaky Blinders', imageUrl: 'peakyblinders.jpg' },
  { title: 'The Mandalorian', imageUrl: 'mandalorian.jpg' },
];

TvShow.insertMany(tvShows)
  .then(() => {
    console.log('✅ TV Shows inserted successfully');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Seeding error:', err));
