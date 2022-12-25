const path = require("path");

module.exports = {
  resolve: {
    alias: {
      Common: path.resolve(__dirname, './src/common'),
    },
  },
};
