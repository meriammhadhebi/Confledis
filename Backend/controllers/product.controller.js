const mongoose = require('mongoose');
const ProductModel = require('../models/product.model');
// const Bad = require('bad-words');

const getProducts = async (req, res, next) => {
  try {
    const doc = await ProductModel.find();

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
const getProduct = async (req, res, next) => {
  try {
    const doc = await ProductModel.findById(req.params.id);

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
const createProduct = async (req, res, next) => {
  const Product = req.body;
  // const filter = new Bad();
  const newProduct = new ProductModel(Product);
  // const x = filter.clean(newProduct.description);
  // newProduct.description = x;
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const DeleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Product Found with id : ${id} ');
  await ProductModel.findByIdAndRemove(id);
  res.json({ message: 'deleted successfully.' });
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {  nom, description, image , quantite, prix } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Product Found ! ');

  const updatedProduct = { nom, description, image , quantite, prix, _id: id };

  await ProductModel.findByIdAndUpdate(id, updatedProduct, { new: true });
  res.json(updatedProduct);
};
const Search = async (req, res) => {
  try {
    const { search } = req.params;
    const doc = await ProductModel.find({
      $or: [{ nom: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }],
    });
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  DeleteProduct,
  updateProduct,
  Search,
};
