require('dotenv').config();

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const movies = require('./movies.json');

const app = express();


const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || '8080';

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

/**
 * validate auth token
 */
app.use((req, res, next) => {
  const authToken = req.get('Authorization');
  if (!authToken || authToken.split(' ')[1] !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
});

/**
 * GET /movies
 */
app.get('/movies', (req, res) => {
  const genre = req.query.genre || null;
  const country = req.query.country || null;
  const avg_vote = req.query.avg_vote || null;

  let results = movies;

  if (genre) results = results.filter(result => result.genre.includes(genre));
  if (country) results = results.filter(result => result.country.includes(country));
  if (avg_vote) results = results.filter(result => result.avg_vote >= avg_vote);

  res.status(200).json(
    results
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});