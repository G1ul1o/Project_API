const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

router.post('/anime', animeController.postanime);
router.get('/anime', animeController.getanimes);
router.get('/DetailAnime/:id', animeController.getanime);

module.exports = router;
