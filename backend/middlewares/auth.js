const jsonWebToken = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  /* console.log(`authorization: ${JSON.stringify(authorization)}`); */
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Authorization required'));
    return;
  }
  // извлечём токен
  const jwt = authorization.replace('Bearer ', '');
  /* console.log(`jwt: ${JSON.stringify(jwt)}`); */
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jsonWebToken.verify(jwt, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    /*  console.log(`payload: ${JSON.stringify(payload)}`); */
    // отправим ошибку, если не получилось
    next(new AuthError('Authorization required'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
