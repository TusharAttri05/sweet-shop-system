const mongoose = require('mongoose');
require('dotenv').config();
const Sweet = require('./src/models/Sweet');
const User = require('./src/models/User');

const sampleSweets = [
  {
    name: 'Chocolate Truffle',
    category: 'Chocolate',
    price: 2.99,
    quantity: 50
  },
  {
    name: 'Gummy Bears',
    category: 'Gummies',
    price: 1.99,
    quantity: 100
  },
  {
    name: 'Lollipop',
    category: 'Candy',
    price: 0.99,
    quantity: 200
  },
  {
    name: 'Caramel Square',
    category: 'Caramel',
    price: 1.49,
    quantity: 75
  },
  {
    name: 'Marshmallow',
    category: 'Soft',
    price: 0.79,
    quantity: 150
  }
];

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing data
    await Sweet.deleteMany({});
    await User.deleteMany({});
    console.log('🧹 Cleared existing data');
    
    // Insert sample sweets
    await Sweet.insertMany(sampleSweets);
    console.log(`🍬 Added ${sampleSweets.length} sample sweets`);
    
    // Create a test user
    const testUser = new User({
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    await testUser.save();
    console.log('👤 Created test user: test@example.com / password123');
    
    // Create an admin user
    const adminUser = new User({
      email: 'admin@sweetshop.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('👑 Created admin user: admin@sweetshop.com / admin123');
    
    // Display all sweets
    const sweets = await Sweet.find();
    console.log('\n📋 Current sweets in database:');
    sweets.forEach(sweet => {
      console.log(`  ${sweet.name} - $${sweet.price} (${sweet.quantity} in stock)`);
    });
    
    await mongoose.connection.close();
    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();