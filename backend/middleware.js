const express = require("express");
const fetch = require("node-fetch"); 
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cors());

const SECRET = 'jojo_better_than_snk'

function Middleware(req, res, next) {
  console.log("User middleware executed");
  next();
}

/*const { checkPrivilege } = require('../Authentification/Authentification.js');


function Grant_Access(privilege) {
  return (req, res, next) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      const user = checkPrivilege(token, privilege);
      req.user = user;
      next();
    } catch (err) {
      const status =
        err.message === "No token provided" ? 403 :
        err.message === "Unauthorized" ? 401 :
        err.message.startsWith("Forbidden") ? 403 : 500;

      res.status(status).json({ error: err.message });
    }
  };
}*/

const userRouter = express.Router();


userRouter.use(Middleware);


userRouter.post("/register", async (req, res) => {
  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Erreur de communication avec l'API:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'enregistrement." });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Erreur de communication avec l'API:", error);
    res.status(500).json({ message: "Erreur serveur lors de l'enregistrement." });
  }
});

userRouter.get("/anime", async (req, res) => {
  try {
    const response = await fetch("http://localhost:4001/anime", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Erreur de communication avec l'API:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des animes." });
  }
  });

userRouter.get("/anime/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`http://localhost:4001/anime/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Erreur de communication avec l'API:", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération de l'anime." });
  }
});

app.use("/user", userRouter);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
