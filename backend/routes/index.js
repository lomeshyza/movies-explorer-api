const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { signUpValidation, signInValidation } = require('../middlewares/validatons');

router.post('/signup', signUpValidation, createUser);

router.post('/signin', signInValidation, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});

module.exports = router;
