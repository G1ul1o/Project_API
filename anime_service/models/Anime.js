const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  animeName: String,
  animeDescription: String,
  avgRating: Number
}); 

const commentSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  commentText: String,
  grade: Number
});

const Anime = mongoose.model('Anime', animeSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Anime, Comment };