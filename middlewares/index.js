const { authenticate } = require("./authenticate");
const { validateAuth } = require("./validate/validateAuth");
const { validateFeedback } = require("./validate/validateFeedback");
const {
  validateArtistSearching,
} = require("./validate/validateArtistSearching");

module.exports = {
  authenticate,
  validateAuth,
  validateFeedback,
  validateArtistSearching,
};
