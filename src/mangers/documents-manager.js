/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const { documentsAccessor } = require('../accessors');
const { log, error } = require('../utils/logger');
const {
  ERRORS, ENUM,
} = require('../constants');
const Errors = require('../constants/errors');

const scope = 'socuments-manager';

const constructDocument = (fileDetails, parent, owner) => ({
  name: _.get(fileDetails, 'name'),
  type: _.get(fileDetails, 'type'),
  parent_id: _.get(parent, '_id'),
  owner,
});

const validateandGetDirectory = async (id, userId) => {
  const method = 'validateParentDirectory';
  try {
    const parent = await documentsAccessor.getDocumentById(id, userId);
    if (_.isEmpty(parent)) {
      throw Errors.FileOrDirectoryNotFound;
    }
    if (_.get(parent, 'type') !== ENUM.FILE_TYPE.folder) {
      throw ERRORS.IsNotADirectory;
    }
    return parent;
  } catch (e) {
    error(scope, method, e, { id, userId });
    throw e;
  }
};

const create = async (fileDetails, userId) => {
  const method = 'create';
  try {
    log(scope, method, 'Creating a document', { fileDetails, userId });
    const parentId = _.get(fileDetails, 'parent');
    let parent;

    if (!_.isEmpty(parentId)) {
      log(scope, method, 'Parent not a root directory', { parentId });
      parent = await validateandGetDirectory(parentId, userId);
    } else {
      parent = ENUM.ROOT_DETAILS;
    }
    const newDocument = constructDocument(fileDetails, parent, userId);
    const documents = await documentsAccessor.getDocumentsByName(newDocument.name, newDocument.parent_id, userId);
    if (!_.isEmpty(documents)) {
      log(scope, method, 'Name already exists', { document, newDocument });
      throw Errors.NameAlreayExists;
    }
    await documentsAccessor.createDocument(newDocument);
    return newDocument;
  } catch (e) {
    error(scope, method, e, { fileDetails, userId });
    throw e;
  }
};

const fetchDirectory = async (id, userId) => {
  const method = 'fetchDirectory';
  try {
    log(scope, method, 'Fetching directory', { id, userId });
    let parentId;
    if (_.isEmpty(id)) {
      log(scope, method, 'Fetching root directory', { id, userId });
      parentId = ENUM.ROOT_DETAILS._id;
    } else {
      await validateandGetDirectory(id, userId);
      parentId = id;
    }
    const documents = await documentsAccessor.getDocumentsByParentId(parentId, userId);
    return {
      documents,
    };
  } catch (e) {
    error(scope, method, e, { id, userId });
    throw e;
  }
};

const fetchFile = async (hash, userId) => {
  const method = 'fetchFile';
  try {
    log(scope, method, 'Fetching file', { hash, userId });
    if (_.isEmpty(hash)) {
      throw ERRORS.FileOrDirectoryNotFound;
    } else {
      const file = await documentsAccessor.getDocumentById(hash, userId);
      if (_.isEmpty(file)) {
        log(scope, method, 'file not found', { hash, userId });
        throw ERRORS.FileOrDirectoryNotFound;
      }
      return {
        file: file.content,
      };
    }
  } catch (e) {
    error(scope, method, e, { hash, userId });
    throw e;
  }
};

const move = async (details, userId) => {
  const method = 'move';
  try {
    log(scope, method, 'Moving file', { details, userId });
    const to = _.get(details, 'to');
    const id = _.get(details, 'id');
    const document = await documentsAccessor.getDocumentById(id, userId);
    const directory = await documentsAccessor.getDocumentById(to, userId);

    if (_.isEmpty(document) || _.isEmpty(directory)) {
      throw ERRORS.FileOrDirectoryNotFound;
    } else if (_.get(directory, 'type') !== ENUM.FILE_TYPE.folder) {
      throw ERRORS.IsNotADirectory;
    } else {
      const set = {
        parent_id: to,
      };
      await documentsAccessor.updateDocument(id, set);
    }
  } catch (e) {
    error(scope, method, e, { details, userId });
    throw e;
  }
};

module.exports = {
  create,
  fetchDirectory,
  fetchFile,
  move,
};
