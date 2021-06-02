// setting mongoose
const mongoose = require('mongoose') // 載入 mongoose
const Todo = require('../todo') // 載入 todo model

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection // 取得資料庫連線狀態

db.on('error', () => {                // 連線異常
  console.log('mongodb error!')
})
db.once('open', () => {               // 連線成功
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})
