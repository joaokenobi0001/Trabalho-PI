const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/projetopi');
    console.log(' MongoDB conectado com sucesso!');
  } catch (error) {
    console.error(' Erro ao conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;