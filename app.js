const express = require('express')
const app = express()
const router = express.Router();
const port = process.env.PORT || 3000

//routes
const userRouter = require('./routes/user');
const cateRouter = require('./routes/cate');
const subcateRouter = require('./routes/subcate');
const productRouter = require('./routes/product');

//use routes
app.use(userRouter);
app.use(cateRouter);
app.use(subcateRouter);
app.use(productRouter);
const bodyParser = require('body-parser');


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.send('Hello World from test route!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})