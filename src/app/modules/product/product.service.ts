import { TProduct } from './product.interface';
import { Product } from './product.model';

// Create Product
const createProductIntoDB = async (product: TProduct) => {
  return await Product.create(product);
};

// Get All Products
const getAllProductFromDB = async (searchParams: Record<string, unknown>) => {
  const { searchTerm } = searchParams;

  if (!searchTerm) {
    return await Product.find();
  }

  return await Product.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { author: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ],
  });
};

// Get Product by ID
const getProductByIDFromDB = async (id: string) => {
  return await Product.findById(id);
};

// Update Product by ID
const updateProductByIDFromDB = async (
  id: string,
  updateData: Partial<TProduct>,
) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete Product by ID
const deleteProductByIDFromDB = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const productService = {
  createProductIntoDB,
  getAllProductFromDB,
  getProductByIDFromDB,
  updateProductByIDFromDB,
  deleteProductByIDFromDB,
};
