const fetch = require("node-fetch");

const apiGatewayMiddleware = async (req, res, next) => {
  try {
    
    const userMicroServiceUrl = "http://localhost:4000";
    console.log(req.path)
    console.log("req.originalUrl:", req.originalUrl)
    
    const validPaths = ["/register", "/login", "/register/google", "/login/google"];

    if (!validPaths.some(p => req.path.endsWith(p))) {
      return res.status(404).json({ message: "Not found request path, not taken in charge by the API" });
    }
    console.log(`Redirection vers le User-MicroService : ${req.path}`);

    const response = await fetch(`${userMicroServiceUrl}${req.path}`, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Erreur dans l'API Gateway :", error);
    res.status(500).json({ message: "Erreur serveur au niveau de l'API Gateway" });
  }
};

module.exports = apiGatewayMiddleware;