const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  console.log('🔗 Testing MongoDB Atlas connection...');
  console.log('Connection string:', process.env.MONGODB_URI.replace(/:[^:@]*@/, ':****@'));
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB Atlas connected successfully!');
    
    // Check if we can perform operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections found:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('Authentication failed')) {
      console.log('💡 Authentication issue:');
      console.log('1. Check username/password');
      console.log('2. Verify user has read/write permissions');
    } else if (error.message.includes('getaddrinfo')) {
      console.log('💡 Network issue:');
      console.log('1. Check internet connection');
      console.log('2. Verify cluster is running in MongoDB Atlas');
    } else if (error.message.includes('timed out')) {
      console.log('💡 Timeout issue:');
      console.log('1. Check network access in MongoDB Atlas');
      console.log('2. Add IP address 0.0.0.0/0 for development');
    }
    
    process.exit(1);
  }
}

testConnection();