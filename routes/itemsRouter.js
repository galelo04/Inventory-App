const { Router } = require('express');

const itemsController = require('../controllers/itemsController');
const itemsRouter = Router();

itemsRouter.get('/', itemsController.viewItems);
itemsRouter.get('/:id/get', itemsController.viewItemDetails);

itemsRouter.get('/new', itemsController.addItemGET);
itemsRouter.post('/new', itemsController.addItemPOST);

itemsRouter.get('/:id/update', itemsController.updateItemGET);
itemsRouter.post('/:id/update', itemsController.updateItemPOST);

itemsRouter.post('/:id/delete', itemsController.deleteItem);

module.exports = itemsRouter;
