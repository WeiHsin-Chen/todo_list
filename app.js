// include packages and define server related variables
const express = require('express')
const session = require('express-session')  //載入session功能
const exphbs = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const Todo = require('./models/todo') // 載入 Todo model
const methodOverride = require('method-override')  // 載入 method-override
const routes = require('./routes')    // 引用路由器
const usePassport = require('./config/passport')  // 載入設定檔，要寫在 express-session 以後

const PORT = process.env.PORT || 3000

// connect mongoose with ./config/mongoose
require('./config/mongoose')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// 將 request 導入路由器
app.use(routes)

// 導入express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// starts the express server and listening for connections.
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}.`)
})