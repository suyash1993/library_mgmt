const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express()
const mongodb = require('./db')
const port = 9000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/web/index.html'));
})

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/static', express.static(path.join(__dirname, '/web')))

const client = new mongodb(app);

async function setup() {
  await client.connect();
  await client.initMigration();
  
  const entity = ['book', 'book_transaction_log'];
  for (const ent of entity){
    let routes = require(`./app/${ent}/route`);
    app.use(routes);
  }
  
  return true;
}

setup()
  .then(() => {
    app.listen(port, () => {
      console.log(`Library app listening at http://localhost:${port}`);
    })
  })
  .catch((err) => {
    console.error('Error while setup', err);
  });

module.exports = app;