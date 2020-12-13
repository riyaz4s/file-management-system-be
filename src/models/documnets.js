const mongoose = require('mongoose');
const { FILE_TYPE } = require('../constants');

const DocumentsSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: FILE_TYPE },
  parent_id: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true },
}, {
  timestamps: true,
});

DocumentsSchema.index({ _id: 1, owner: 1 });
DocumentsSchema.index({ parent_id: 1, owner: 1 });
DocumentsSchema.index({ name: 1, parent_id: 1, owner: 1 });

const Documents = mongoose.model('admin', DocumentsSchema);

module.exports = Documents;
