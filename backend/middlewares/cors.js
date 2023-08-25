const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCorsDomain = [
  'https://starts.movies.nomoredomains.xyz;',
  'http://starts.movies.nomoredomains.xyz;',
  'https://api.starts.movies.nomoredomains.xyz;',
  'http://api.starts.movies.nomoredomains.xyz;',
  'localhost:3000',
  'localhost:3001',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCorsDomain.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
