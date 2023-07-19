const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const { STATUS_CREATED } = require('../utils/errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Movie not found'));
        return;
      }
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Not enough rights to delete the movie'));
      }
      Movie.deleteOne(movie)
        .then(() => {
          res.send(movie);
          console.log(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Bad request'));
      } else {
        next(err);
      }
    });
};

/* const likeCard = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Not found'));
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const dislikeCard = (req, res, next) => Movie.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      next(new NotFoundError('Not found'));
      return;
    }
    res.send(card);
  })
  .catch((err) => {
    next(err);
  }); */

module.exports = {
  getMovies,
  deleteMovieById,
  createMovie,
  /* likeCard,
  dislikeCard, */
};
