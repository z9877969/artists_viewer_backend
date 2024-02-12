const trackKeysOut = {
  artist: true,
  album: true,
  video: true,
  idTrack: true,
  idAlbum: true,
  idArtist: true,
  idLyric: true,
  idIMVDB: true,
};

const filterDataObject = (object) => {
  const filteredEl = {};
  for (const key in object) {
    if (!object.hasOwnProperty(key) || keysOut[el]) {
      continue;
    }
    filteredEl[key] = object[key];
  }
  return filteredEl;
};

module.exports = {
  filterDataObject,
  trackKeysOut,
};
