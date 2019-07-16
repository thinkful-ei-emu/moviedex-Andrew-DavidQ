require('dotenv').config();

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || '8080';

const movies = require('./movies.json');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/movies', (req, res) => {
  console.log(req.query);

  const genre = req.query.genre || null;
  const country = req.query.country || null;
  const avg_vote = req.query.avg_vote || null;

  let results = [...movies];

  console.log(genre, country, avg_vote);

  if (genre) results = movies.filter(movie => movie.genre.includes(genre));
  if (country) results = movies.filter(movie => movie.country.includes(country));
  if (avg_vote) results = movies.filter(movie => movie.avg_vote >= avg_vote);

  res.status(200).json(
    results
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});