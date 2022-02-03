import { schemaComposer } from 'graphql-compose'
import BookModel from '../models/book.js'
import { composeWithMongoose } from 'graphql-compose-mongoose'
const customizationOptions = {}
const Book = composeWithMongoose(BookModel, customizationOptions)
schemaComposer.Query.addFields({
  bookById: Book.getResolver('findById'), // IDでの1件取得
  bookByIds: Book.getResolver('findByIds'), // 複数IDでの検索
  bookOne: Book.getResolver('findOne'), // データ1件取得
  bookMany: Book.getResolver('findMany'), // データ複数件取得
  bookCount: Book.getResolver('count'), // データ件数取得
  bookConnection: Book.getResolver('connection'), // ?
  bookPagination: Book.getResolver('pagination'), // データのページ送り
})
schemaComposer.Mutation.addFields({
  bookCreate: Book.getResolver('createOne'), // データ作成1件
  bookCreateMany: Book.getResolver('createMany'), // データ作成複数件
  bookUpdateById: Book.getResolver('updateById'), // IDでのデータ更新
  bookUpdateOne: Book.getResolver('updateOne'), // データ更新1件
  bookUpdateMany: Book.getResolver('updateMany'), // データ更新複数件
  bookRemoveById: Book.getResolver('removeById'), // IDでのデータ削除
  bookRemoveOne: Book.getResolver('removeOne'), // データ削除1件
  bookRemoveMany: Book.getResolver('removeMany'), // データ削除複数件
})
export default schemaComposer.buildSchema()
