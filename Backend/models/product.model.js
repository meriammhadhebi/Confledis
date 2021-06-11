const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    nom: {
      type: String,
    //   required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    quantite: {
        type: Number,
        default: 0,
        // required: true,
    },
    prix: {
      type: Number,
      default: 0,
    //   required: true,
    },
    },
  {
    timestamps: true,
  }
);
const product = mongoose.model('product', productSchema);

module.exports = product;
