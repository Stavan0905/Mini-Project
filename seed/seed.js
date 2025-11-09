const mongoose = require('mongoose');
const User = require('./models/User');
const Movie = require('./models/Movie');

mongoose.connect('mongodb://127.0.0.1:27017/dripstream', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');

  await User.create({ username: 'admin', password: '1234', role: 'admin' });
  console.log('Admin user created');

  await User.create({ username: 'customer', password: '1234', role: 'customer' });
  console.log('Customer user created');

  const movies = [
    { title: 'Challengers', imageUrl: 'challengers.jpg' },
    { title: 'Child\'s Play 3', imageUrl: 'childsplay3.jpg' },
    { title: 'Drunken Master', imageUrl: 'DrunkenMaster.jpg' },
    { title: 'F9', imageUrl: 'F9_film_poster.jpg' },
    { title: 'Kingsman: The Secret Service', imageUrl: 'kingsman the secret service.jpg' },
    { title: 'Kungfu Hustle', imageUrl: 'kungfu hustle.jpg' },
    { title: 'Moonlight', imageUrl: 'moonlight.jpg' },
    { title: 'Murder Mubarak', imageUrl: 'murder mubarak.jpg' },
    { title: 'Oppenheimer', imageUrl: 'Oppenheimer.jpg' },
    { title: 'Snake in the Eagle\'s Shadow', imageUrl: 'snake in the eagles shadow.jpg' },
    { title: 'Solaris', imageUrl: 'solaris.jpg' },
    { title: 'Spiderman: Homecoming', imageUrl: 'spiderman home-coming.jpg' },
    { title: 'Ninja Turtles', imageUrl: 'teenage mutant ninja turtles.jpg' },
    { title: 'The Wolf of Wall Street', imageUrl: 'the wolf of wall street.jpg' },
    { title: 'The Dictator', imageUrl: 'the-dictator.jpg' },
    { title: 'Us', imageUrl: 'us.jpg' }
  ];

  await Movie.insertMany(movies);
  console.log('Movies inserted');

  mongoose.disconnect();
})
.catch(err => {
  console.error('Seeding error:', err);
});
