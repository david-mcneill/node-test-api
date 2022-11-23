import { Router } from 'express';
import { body } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update';
import { handleInputErrors } from './modules/middleware';
const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
  '/update/:id',
  [body('title').optional, body('body').optional, body('productId').optional],
  handleInputErrors,
  updateUpdate
);
router.post(
  '/update',
  [
    body('title').isString(),
    body('body').isString(),
    body('productId').isString(),
  ],
  handleInputErrors,
  createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update Point
 */
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put(
  '/updatepoint/:id',
  [
    body('name').isString(),
    body('description').isString(),
    body('updateId').isString(),
  ],
  handleInputErrors,
  (req, res) => {
    res.sendStatus(200);
  }
);
router.post(
  '/updatepoint',
  [
    body('name').isString(),
    body('description').isString(),
    body('updateId').isString(),
  ],
  handleInputErrors,
  (req, res) => {
    res.sendStatus(200);
  }
);
router.delete('/updatepoint/:id', () => {});

export default router;
