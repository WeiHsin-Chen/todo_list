// include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const Todo = require('./models/todo') // 載入 Todo model

// setting mongoose
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => {                // 連線異常
  console.log('mongodb error!')
})
db.once('open', () => {               // 連線成功
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting routes
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos: todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})