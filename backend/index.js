const express = require('express');
const app = express();
const booksRoutes = require('./routes/books')
const authRoutes = require('./routes/auth')
const helmet = require('helmet')
const morgan = require('./config/morgan')
const db = require('./lib/firebase');


app.use(express.json());
app.use(helmet())
app.use(morgan)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

const vuePath = __dirname + '/../frontend/dist';
app.use(express.static(vuePath));

app.use(booksRoutes)
app.use(authRoutes)
app.get('/', function(req, res) {
  res.sendFile(vuePath + 'index.html');
});

const router = express.Router();
router.get('/test', async function(req, res, next) {
  console.log('FMM');
  const doc = await db.dbCon.collection('test').add({ gigel: 'dorel'})
  console.log(doc.id, doc, doc.gigel)

  return {}
})
app.use(router)



app.listen(2020)