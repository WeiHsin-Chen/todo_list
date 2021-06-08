// setting mongoose
const db = require('../../config/mongoose')  // 載入 mongoose
const Todo = require('../todo') // 載入 todo model

db.once('open', () => {               // 連線成功
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})
