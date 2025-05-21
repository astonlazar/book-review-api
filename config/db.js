const mongoose = require('mongoose')

//function to connect to mongoDB
module.exports = connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(`mongoDB connected..`))
  .catch(err => console.error(`mongoDB not connected - ${err}`))
}
