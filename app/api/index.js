const { Router } = require('express');
const bodyParser = require('body-parser');

const controller = require('./controller');

const router = Router();

router.use(bodyParser.json());

router.param('id', controller.findOne);

router.use(controller.getCollection);

router.get('/', controller.getList);

router.post('/create', controller.create);

router.get('/:id/get', controller.get);

router.post('/:id/update', controller.update);

router.post('/:id/delete', controller.delete);

module.exports = router;

