import { Request, Response } from 'express';
import { productSchemaZodValidation } from './product.validation';
import { productService } from './product.service';
import { ZodError } from 'zod';

// Create Product
const createProduct = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const productData = req.body;
    const validatedData = productSchemaZodValidation.parse(productData);
    const result = await productService.createProductIntoDB(validatedData);

    return res.status(201).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    return res.status(500).json({
      message: 'An error occurred while creating the product',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get All Products
const getAllProduct = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const result = await productService.getAllProductFromDB(req.query);
    return res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while fetching books',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get Product by ID
const getProductByID = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { productId } = req.params;
    const result = await productService.getProductByIDFromDB(productId);

    if (!result) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while fetching the product',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update Product by ID
const updateProductByID = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const result = await productService.updateProductByIDFromDB(
      productId,
      updateData,
    );

    if (!result) {
      return res.status(404).json({
        message: 'Product not found or could not be updated',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while updating the product',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete Product by ID
const deleteProductByID = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteProductByIDFromDB(productId);

    if (!result) {
      return res.status(404).json({
        message: 'Product not found or could not be deleted',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while deleting the product',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProduct,
  getProductByID,
  updateProductByID,
  deleteProductByID,
};
