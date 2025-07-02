const axios = require('axios');

const apiGatewayMiddleware = async (req, res, next) => {
  try {
    const userMicroServiceUrl = 'http://localhost:4000'; // URL User Microservice

    const url = userMicroServiceUrl + req.originalUrl;

    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: { Authorization: req.headers.authorization || '' },
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      res.status(500).json({ message: 'Gateway error' });
    }
  }
};

module.exports = apiGatewayMiddleware;
