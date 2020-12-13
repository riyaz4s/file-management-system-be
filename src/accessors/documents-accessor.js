const Documents = require('../models/documnets');
const { log, error } = require('../utils/logger');

const scope = 'documents-accessor';

const getDocumentById = async (docId, userId) => {
  const method = 'getDocumentById';
  try {
    log(scope, method, 'Getting document by id', { docId });
    const document = await Documents.find({ _id: docId, owner: userId });
    return document;
  } catch (e) {
    error(scope, method, e, { docId });
    throw e;
  }
};

const getDocumentsByName = async (name, parentId, owner) => {
  const method = 'getDocumentByHash';
  try {
    log(scope, method, 'Getting documents by name parent', { name, parentId, owner });
    const documents = await Documents.findOne({ name, parent_id: parentId, owner });
    return documents;
  } catch (e) {
    error(scope, method, e, { name, parentId, owner });
    throw e;
  }
};

const getDocumentsByParentId = async (id) => {
  const method = 'getDocumentByHash';
  try {
    log(scope, method, 'Getting document by parent id', { id });
    const document = await Documents.find({ parent_id: id, owner: userId }, 'name hash');
    return document;
  } catch (e) {
    error(scope, method, e, { id });
    throw e;
  }
};

const createDocument = async (doc) => {
  const method = 'createDocument';
  try {
    log(scope, method, 'Creating a document', { doc });
    const document = await Documents.create(doc);
    return document;
  } catch (e) {
    error(scope, method, e, { doc });
    throw e;
  }
};

const updateDocument = async (docId, set) => {
  const method = 'updateDocument';
  try {
    log(scope, method, 'Creating a document', { docId, set });
    const document = await Documents.create(
      { _id: docId },
      { $set: set },
    );
    return document;
  } catch (e) {
    error(scope, method, e, { docId, set });
    throw e;
  }
};

module.exports = {
  getDocumentById,
  getDocumentsByName,
  getDocumentsByParentId,
  createDocument,
  updateDocument,
};
