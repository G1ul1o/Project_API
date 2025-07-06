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

module.exports = mongoose.model('Anime', animeSchema);
module.exports = mongoose.model('Comment', commentSchema);