import mongoose from 'mongoose'
const Schema = mongoose.Schema
const BookModel = new Schema({
  title: String, // タイトル
  author: String, // 著者
})
export default mongoose.model('Book', BookModel)
