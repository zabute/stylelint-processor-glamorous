const path = require('path');

module.exports = {
  processors: [path.join(__dirname, './lib/index.js')],
  extends: ['stylelint-config-standard'],
};
