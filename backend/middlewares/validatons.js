const { celebrate, Joi } = require('celebrate');

const regex = /^(https?:\/\/)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

exports.signUpValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    })
    .unknown(true),
});
exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});
exports.createMovieValidation = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.string().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(regex),
      trailerLink: Joi.string().required().pattern(regex),
      thumbnail: Joi.string().required().pattern(regex),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    })
    .unknown(true),
});
exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex(),
  }),
});
exports.getUserValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex(),
  }),
});

exports.updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});
exports.putLikeValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex(),
  }),
});
exports.deleteLikeValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex(),
  }),
});
