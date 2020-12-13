const { documentsManager } = require('../mangers');
const { error } = require('../utils/logger');

const scope = 'documents-service';

const create = async (fileDetails, userId) => {
  const method = 'create';
  try {
    const result = await documentsManager.create(fileDetails, userId);
    return result;
  } catch (e) {
    error(scope, method, e, { fileDetails, userId });
    throw e;
  }
};

const fetchDirectory = async ({ id }, userId) => {
  const method = 'fetchDirectory';
  try {
    const result = await documentsManager.fetchDirectory(id, userId);
    return result;
  } catch (e) {
    error(scope, method, e, { id, userId });
    throw e;
  }
};

const fetchFile = async ({ id }, userId) => {
  const method = 'fetchFile';
  try {
    const result = await documentsManager.fetchFile(id, userId);
    return result;
  } catch (e) {
    error(scope, method, e, { id, userId });
    throw e;
  }
};

const move = async (details, userId) => {
  const method = 'move';
  try {
    const result = await documentsManager.move(details, userId);
    return result;
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
