const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect('mongodb+srv://restoadmin:restoadmin123@beepmaker.vjgat.mongodb.net/beepmaker?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  
  console.log(`MongoDB Connected: ${connection.connection.host}`);
  
};

module.exports = connectDB