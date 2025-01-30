const { Router } = require('express');

const categoriesRouter = Router();

const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesController.viewCategories);

categoriesRouter.get('/new', categoriesController.addCategoryGET);
categoriesRouter.post('/new', categoriesController.addCategoryPOST);

categoriesRouter.get('/:id/update', categoriesController.updateCategoryGET);
categoriesRouter.post('/:id/update', categoriesController.updateCategoryPOST);
module.exports = categoriesRouter;
