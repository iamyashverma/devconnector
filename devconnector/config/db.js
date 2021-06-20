const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database is connected...');
  } catch (err) {
    console.log(err);
    console.error('Error connecting DB...');
  }
};

module.exports = connectDB;
