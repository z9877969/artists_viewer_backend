const { createError } = require("../helpers");
const { Artist, Album, Track, Video } = require("../models/");

const getGenres = ({ strMood, strStyle, strGenre }) => {
  const genres = [];
  if (strMood) {
    genres.push(strMood);
  }
  if (strStyle) {
    genres.push(strStyle);
  }
  if (strGenre) {
    genres.push(strGenre);
  }
  return genres;
};

const getArtists = async (req, res, next) => {
  try {
    // middleware to validate page
    // middleware to validate limit
    const { page = 1, limit = 10, name = "", genre = "", sortName } = req.query;
    const options = {
      strArtist: { $regex: new RegExp(name, "i") },
      strStyle: { $regex: new RegExp(genre, "i") },
      strGenre: { $regex: new RegExp(genre, "i") },
    };
    const totalArtists = await Artist.countDocuments(options);

    const sortOptions = {};
    if (sortName) {
      if (sortName === "asc") {
        sortOptions.strArtist = 1;
      }
      if (sortName === "desc") {
        sortOptions.strArtist = -1;
      }
    }

    const skip = (page - 1) * limit;
    const artistsList = await Artist.find(
      options,
      "_id strArtist strBiographyEN strArtistThumb strStyle strGenre strMood",
      {
        skip,
        limit,
      }
    ).sort(sortOptions);

    const artists = artistsList.map(
      ({ _doc: { strStyle, strGenre, strMood, ...rest } }) => {
        const newEl = { ...rest };
        newEl.genres = getGenres({ strStyle, strGenre, strMood });
        return newEl;
      }
    );
    res.json({ artists, totalArtists, page, limit });
  } catch (error) {
    next(error);
  }
};

const getArtistById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);
    if (!artist) {
      throw createError(404, "Artist not found");
    }
    console.log({ ...artist._doc });
    const {
      _id,
      strArtistThumb,
      strArtist,
      strLabel,
      intFormedYear,
      strGender,
      intMembers,
      strCountry,
      strBiographyEN,
      ...rest
    } = artist._doc;
    const newArtist = {
      _id,
      strArtistThumb,
      strArtist,
      strLabel,
      intFormedYear,
      strGender,
      intMembers,
      strCountry,
      strBiographyEN,
    };
    const albums = await Album.find({ artist: artist._id });
    const tracks = await Track.find({ artist: artist._id });
    const video = await Video.find({ artist: artist._id });

    const tracksMap = tracks.reduce((acc, track) => {
      const albumId = String(track._doc.album);
      if (!acc[albumId]) {
        acc[albumId] = [];
      }
      acc[albumId].push(track._doc);
      return acc;
    }, {});
    const videoMap = video.reduce((acc, video) => {
      const videoId = String(video._doc._id);
      acc[videoId] = video._doc;
      return acc;
    }, {});
    const tracksList = albums.reduce((acc, { _doc: data }) => {
      const albumId = String(data._id);

      acc.push(
        ...tracksMap[albumId].map(
          ({ _id, strTrack, strAlbum, strArtist, intDuration, ...track }) => {
            const newTrack = {
              _id,
              strTrack,
              strAlbum,
              strArtist,
              intDuration,
              movie: videoMap[String(track.video)]?.strMusicVid ?? null,
            };
            return newTrack;
          }
        )
      );

      return acc;
    }, []);
    res.json({ ...newArtist, tracksList });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArtists,
  getArtistById,
};

/* 
        =====Track
        _id: new ObjectId("65ada44daf9f6d155db47569"),
        strTrack: 'Smells Like Teen Spirit',
        strAlbum: 'Nevermind',
        strArtist: 'Nirvana',
        strArtistAlternate: null,
        intCD: null,
        intDuration: '301000',
        strGenre: 'Alternative Rock',
        strMood: 'Sad',
        strStyle: 'Rock/Pop',
        strTheme: '...',
        intTrackNumber: '1',
        intLoved: '5',
        intScore: '9.9',
        intScoreVotes: '10',
        intTotalListeners: '2127491',
        intTotalPlays: '16752430',
        artist: new ObjectId("65ada43faf9f6d155db4753d"),
        album: new ObjectId("65ada449af9f6d155db4753e"),
        video: new ObjectId("65ada449af9f6d155db4755e")
        idTrack: '32736467',
        idAlbum: '2110839',
        idArtist: '111319',
        idLyric: '363845',
        idIMVDB: null,

    */
