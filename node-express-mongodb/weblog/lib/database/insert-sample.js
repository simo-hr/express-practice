const { CONNECTION_URL, DATABASE, OPTIONS } = require('../../config/mongdb.config')

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
  const db = client.db(DATABASE)
  Promise.all([insertPosts(db), insertUsers(db), insertPrivileges(db)])
    .catch((error) => {
      console.log(error)
    })
    .then(() => {
      client.close()
    })
})

const insertUsers = (db) => {
  return Promise.all([
    db.collection('users').insertMany([
      {
        email: 'oda@nob.com',
        name: 'oda nob',
        password: 'qwerty',
        role: 'owner',
      },
    ]),
    db.collection('users').createIndex({ email: 1 }, { unique: true, background: true }),
  ])
}
const insertPrivileges = (db) => {
  return Promise.all([
    db.collection('privileges').insertMany([
      { role: 'default', permissions: ['read'] },
      { role: 'owner', permissions: ['readWrite'] },
    ]),
    db.collection('privileges').createIndex({ role: 1 }, { unique: true, background: true }),
  ])
}
const insertPosts = (db) => {
  return Promise.all([
    db.collection('posts').insertMany([
      {
        url: '2021/01/nodejs-basic.html',
        published: new Date(2021, 1, 1),
        updated: new Date(2021, 1, 7),
        title: 'Node.jsの基本',
        content: 'ちょっと難しくなってきた。',
        keywords: ['Node.js'],
        authors: ['Oda Nob'],
      },
      {
        url: '2021/03/nodejs-advance.html',
        published: new Date(2020, 12, 12),
        updated: new Date(2021, 1, 3),
        title: 'Node.jsの応用',
        content: 'Node.jsでExcelファイルが触れるなんて！',
        keywords: ['Node.js'],
        authors: ['Oda Nob'],
      },
    ]),
    db.collection('posts').createIndex({ url: 1 }, { unique: true, background: true }),
  ])
}
