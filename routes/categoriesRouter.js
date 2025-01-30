const { Router } = require('express');

const categoriesRouter = Router();

const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesController.viewCategories);
categoriesRouter.get('/:id/get', categoriesController.viewCategoryDetails);

categoriesRouter.get('/new', categoriesController.addCategoryGET);
categoriesRouter.post('/new', categoriesController.addCategoryPOST);

categoriesRouter.get('/:id/update', categoriesController.updateCategoryGET);
categoriesRouter.post('/:id/update', categoriesController.updateCategoryPOST);

categoriesRouter.post('/:id/delete', categoriesController.deleteCategory);
module.exports = categoriesRouter;
