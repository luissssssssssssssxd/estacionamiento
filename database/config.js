const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CNN
    );
    console.log('DB funcionando');
  } catch (error) {
    console.log(error);
    throw new Error("Error en la BD , revisar LOGS");
  }
};
module.exports = {
  dbConnection
};
