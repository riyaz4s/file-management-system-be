const mongoose = require('mongoose');

const FILE_TYPE = { file: 'file', folder: 'folder' };
const ROOT = '/root';
const ROOT_DETAILS = {
  _id: mongoose.Types.ObjectId(ROOT),
};

module.exports = {
  FILE_TYPE,
  ROOT,
  ROOT_DETAILS,
};
