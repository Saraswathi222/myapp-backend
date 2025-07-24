const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB seed connection error:', err));

const sampleProducts = [
  {
    name: "Apple iPhone 14",
    description: "Latest Apple smartphone with A15 chip",
    price: 79999,
    image: "https://images.unsplash.com/photo-1602810316593-b34df4cd8a5d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Samsung Galaxy S23",
    description: "Samsung flagship phone with AMOLED display",
    price: 69999,
    image: "https://images.unsplash.com/photo-1747996714434-64de72199155?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  },
  {
    name: "Apple iPhone 148",
    description: "Latest Apple smartphone with A18 chip",
    price: 79900,
    image: "https://images.unsplash.com/photo-1747996714434-64de72199155?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Apple iPhone 140",
    description: "Latest Apple smartphone with A15 140 chip",
    price: 79999,
    image: "https://images.unsplash.com/photo-1747996714434-64de72199155?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

async function seedDB() {
  try {
    await Product.deleteMany(); // Optional: Clear existing products
    await Product.insertMany(sampleProducts);
    console.log('Sample products seeded!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Seeding error:', err.message);
  }
}

seedDB();
