const { config } = require('dotenv')
const express = require('express')
const app = express()
const port = process.env.APP_PORT || 5000
const cors = require('cors')
const { api } = require('./routers/api')
const { web } = require('./routers/web')
const { db_test } = require('./models/init.db')
const cookieParser = require('cookie-parser')

config();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', web);
app.use('/api', api);


app.listen(port, () => {
  db_test()
  console.log(`Example app listening on port ${port}`)
  console.log(`URL : http://localhost:${port}`)
})