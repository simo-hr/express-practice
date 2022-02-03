import mongoose from 'mongoose'
const DB = {
  connect: () => {
    mongoose.connect(
      `mongodb+srv://admin:Passw0rd@cluster0.omnts.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    )
  },
}

console.log(DB);
export default DB
