const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [1, 'Product name must be at least 1 character'],
    maxlength: [50, 'Product name must be less than 50 characters']
  },
  picture: {
    type: String,
    required: [true, 'Product picture URL is required']
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not supported'
    },
    required: [true, 'Product gender is required']
  },
  category: {
    type: String,
    enum: {
      values: ['makeup', 'skincare', 'haircare'],
      message: '{VALUE} is not a valid category'
    },
    required: [true, 'Product category is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Product price must be a positive number']
  },
}, {
  timestamps: true // This enables the automatic creation of createdAt and updatedAt fields
});

// Example of a static method you might add to your product schema
productSchema.statics.findByCategory = function (category, callback) {
  return this.find({ category: category }, callback);
};;

module.exports = mongoose.model('Product', productSchema);
