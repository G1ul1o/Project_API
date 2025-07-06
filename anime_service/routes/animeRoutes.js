const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');

router.post('/anime', animeController.postanime);
router.get('/anime', animeController.getanimes);
router.get('/DetailAnime/:id', animeController.getanime);

router.post('/comment', animeController.postcomment);
router.get('/comments/:animeId', animeController.getcomments);
router.get('/comments_user/:userId', animeController.getcommentsByUser);

module.exports = router;
