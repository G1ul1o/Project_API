const fetch = require("node-fetch");

const apiGatewayMiddlewareUser = async (req, res, next) => {
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

const apiGatewayMiddlewareAnime = async (req, res, next) => {
  try {
    const animeMicroServiceUrl = "http://localhost:4001";
    console.log("Anime Gateway - req.path:", req.path);
    console.log("Anime Gateway - req.originalUrl:", req.originalUrl);

    const validPaths = ["/anime", "/DetailAnime","/comment"];
   
    const isValidPath = validPaths.some(p => req.path === p || req.path.startsWith(p + "/"));

    if (!isValidPath) {
      return res.status(404).json({ message: "Not found request path, not handled by the API Gateway" });
    }

    console.log(`Redirecting to Anime Microservice: ${req.path}`);

    const fetchOptions = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": req.headers.authorization || "",
      },
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(`${animeMicroServiceUrl}${req.path}`, fetchOptions);
    const data = await response.json();

    res.status(response.status).json(data);

  } catch (error) {
    console.error("Error in API Gateway Anime Middleware:", error);
    res.status(500).json({ message: "Server error in API Gateway Anime Middleware" });
  }
};

const apiGatewayMiddlewareCommentaires = async (req, res, next) => {
  try {
    const animeMicroServiceUrl = "http://localhost:4001";
    console.log("Anime Gateway - req.path:", req.path);
    console.log("Anime Gateway - req.originalUrl:", req.originalUrl);

    const validPaths = ["/comment","/comments","/anime/comment"];
   
    const isValidPath = validPaths.some(p => req.originalUrl === p || req.originalUrl.startsWith(p + "/"));

    if (!isValidPath) {
      return res.status(404).json({ message: "Not found request path for comment part, not handled by the API Gateway" });
    }

    console.log(`Redirecting to Anime Microservice: ${req.path}`);

    const fetchOptions = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": req.headers.authorization || "",
      },
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(`${animeMicroServiceUrl}${req.path}`, fetchOptions);
    const data = await response.json();

    res.status(response.status).json(data);

  } catch (error) {
    console.error("Error in API Gateway Anime Middleware:", error);
    res.status(500).json({ message: "Server error in API Gateway Anime Middleware" });
  }
};

module.exports = { apiGatewayMiddlewareUser, apiGatewayMiddlewareAnime,apiGatewayMiddlewareCommentaires };