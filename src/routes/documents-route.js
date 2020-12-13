const router = require('express').Router();
const validator = require('../middleware/validator');
const { isAuthUser } = require('../middleware/auth');
const { explorerSchema } = require('../joi-schemas');
const { documentsService } = require('../service');
const { getUserIdFromRequest } = require('../utils/helpers');
const errorHandler = require('../utils/error-handler');

router.get('/folder/:id?', isAuthUser, validator(explorerSchema.id, 'params'), async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const result = await documentsService.fetchDirectory(req.params, userId);
    return res.send(result);
  } catch (e) {
    const error = errorHandler(e);
    return res.status(error.statusCode).json(error);
  }
});

router.get('/file/:id', isAuthUser, validator(explorerSchema.fileId, 'params'), async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const result = await documentsService.fetchFile(req.params, userId);
    return res.send(result);
  } catch (e) {
    const error = errorHandler(e);
    return res.status(error.statusCode).json(error);
  }
});

router.post('/', isAuthUser, validator(explorerSchema.create, 'body'), async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const result = await documentsService.create(req.body, userId);
    return res.send(result);
  } catch (e) {
    const error = errorHandler(e);
    return res.status(error.statusCode).json(error);
  }
});
router.post('/move/:id:/:to', isAuthUser, validator(explorerSchema.move, 'params'), async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    const result = await documentsService.move(req.params, userId);
    return res.send(result);
  } catch (e) {
    const error = errorHandler(e);
    return res.status(error.statusCode).json(error);
  }
});
module.exports = router;
