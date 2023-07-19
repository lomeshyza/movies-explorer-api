const router = require('express').Router();
const {
  getMovies,
  deleteMovieById,
  createMovie,
  /* likeCard,
  dislikeCard, */
} = require('../controllers/movies');
const { deleteMovieValidation, createMovieValidation } = require('../middlewares/validatons');

router.get('/', getMovies);

router.delete('/:id', deleteMovieValidation, deleteMovieById);

router.post('/', createMovieValidation, createMovie);

/* router.put(
  '/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  likeCard,
);

router.delete(
  '/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  dislikeCard,
); */

module.exports = router;
