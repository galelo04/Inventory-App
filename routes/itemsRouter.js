const { Router } = require('express');

const itemsController = require('../controllers/itemsController');
const itemsRouter = Router();

itemsRouter.get('/', itemsController.viewItems);
itemsRouter.get('/:id/get', itemsController.viewItemDetails);

itemsRouter.get('/new', itemsController.addItemGET);
itemsRouter.post('/new', itemsController.addItemPOST);

module.exports = itemsRouter;
