const { Schema, model } = require("mongoose");

const artistSchema = new Schema({});
const albumSchema = new Schema({});
const trackSchema = new Schema({});
const videoSchema = new Schema({});
const genreSchema = new Schema({});

const Artist = model("artist", artistSchema);
const Album = model("album", albumSchema);
const Track = model("track", trackSchema);
const Video = model("video", videoSchema);
const Genre = model("genre", genreSchema);

module.exports = {
  Artist,
  Album,
  Track,
  Video,
  Genre,
};
