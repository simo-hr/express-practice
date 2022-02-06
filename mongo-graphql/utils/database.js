import mongoose from 'mongoose'
const DB = {
  connect: () => {
    mongoose.connect(
      `MONGO_URL`,
      { useNewUrlParser: true }
    )
  },
}

console.log(DB);
export default DB
