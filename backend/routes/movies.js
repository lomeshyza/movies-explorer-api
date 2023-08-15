const router = require('express').Router();
const {
  getMovies,
  deleteMovieById,
  createMovie,
/*   likeCard,
  dislikeCard, */
} = require('../controllers/movies');
const {
  deleteMovieValidation, createMovieValidation,
} = require('../middlewares/validatons');

router.get('/', getMovies);

router.delete('/:id', deleteMovieValidation, deleteMovieById);

router.post('/', createMovieValidation, createMovie);

/* router.put('/:id/likes', putLikeValidation, likeCard);

router.delete('/:id/likes', deleteLikeValidation, dislikeCard); */

module.exports = router;
