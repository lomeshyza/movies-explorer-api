const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  // updateAvatar,
  updateProfile,
} = require('../controllers/users');
const { getUserValidation, updateProfileValidation } = require('../middlewares/validatons');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:id', getUserValidation, getUserById);

router.post('/', createUser);

/* router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().required().pattern(regex),
      }),
  }),
  updateAvatar,
); */

router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
