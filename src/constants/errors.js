const Errors = {
  UnexpectedErrorOccured: {
    statusCode: 500,
    type: 'UnexpectedErrorOccured',
    message: 'Unexpected error occoured',
  },
  FileOrDirectoryNotFound: {
    statusCode: 404,
    type: 'FileOrDirectoryNotFound',
    message: 'File or directory not found',
  },
  ParentDirectoryNotFound: {
    statusCode: 404,
    type: 'ParentDirectoryNotFound',
    message: 'Parent directory not found',
  },
  IsNotADirectory: {
    statusCode: 400,
    type: 'IsNotADirectory',
    message: 'Given id is not a directory',
  },
  IsNotAFile: {
    statusCode: 400,
    type: 'IsNotAFile',
    message: 'Given id is not a file',
  },
  NameAlreayExists: {
    statusCode: 400,
    type: 'FileAlreadyExists',
    message: 'Given name already exists in the path',
  },
};

module.exports = Errors;
