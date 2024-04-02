require('dotenv').config();
const mongoose =require('mongoose');

const mongoURL=`mongodb+srv://blackman:${process.env.MONGODB_PASS_KEY}@cluster0.mgiqamy.mongodb.net/flightbooking`

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongoURL, options)
  .then(() => console.log('Database connection established'))
  .catch(err => console.log('Database connection error: ' + err));


  module.exports = mongoose;