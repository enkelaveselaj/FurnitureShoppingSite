const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

async function debugProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const products = await Product.find({});
    console.log('Products in database:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Image: ${product.image}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Price: $${product.price}`);
      console.log('---');
    });
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

debugProducts();
