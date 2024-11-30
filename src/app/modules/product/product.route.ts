import express, { NextFunction, Request, Response } from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

// Route to create a new product
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  productControllers.createProduct(req, res).catch(next);
});

// Route to get all products
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  productControllers.getAllProduct(req, res).catch(next);
});

// Route to get a product by its ID
router.get('/:productId', (req: Request, res: Response, next: NextFunction) => {
  productControllers.getProductByID(req, res).catch(next);
});

// Route to update a product by its ID
router.put('/:productId', (req: Request, res: Response, next: NextFunction) => {
  productControllers.updateProductByID(req, res).catch(next);
});

// Route to delete a product by its ID
router.delete(
  '/:productId',
  (req: Request, res: Response, next: NextFunction) => {
    productControllers.deleteProductByID(req, res).catch(next);
  },
);

export const productRoutes = router;
