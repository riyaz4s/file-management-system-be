const mongoose = require('mongoose');
const { FILE_TYPE } = require('../constants');

const DocumentsSchema = new mongoose.Schema({
  name: { type: String, required: true, auto: true },
  type: { type: String, required: true, enum: FILE_TYPE },
  parent_id: { type: String },
  owner: { type: mongoose.Types.ObjectId, required: true },
}, {
  timestamps: true,
});

DocumentsSchema.index({ _id: 1, owner: 1 });
DocumentsSchema.index({ parent_id: 1, owner: 1 });
DocumentsSchema.index({
  name: 1, parent_id: 1, owner: 1, type: 1,
});

const Documents = mongoose.model('documents', DocumentsSchema);

module.exports = Documents;
