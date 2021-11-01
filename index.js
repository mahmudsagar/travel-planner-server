const express = require("express");
const app = express();
const cors = require('cors')
const port = 5000;
const { MongoClient, ObjectId } = require('mongodb');

const url = `mongodb+srv://mahmud:mahmud@cluster0.bxr3c.mongodb.net/travel_plan?retryWrites=true&w=majority`

const client = new MongoClient(url);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Name
const dbName = 'travel_plan';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const packages = db.collection('packages');
  const orders = db.collection('orders');

  // the following code examples can be pasted here...
  app.get('/packages', async(req, res)=>{
    const cursor = req.query.limit ? packages.find({}).limit(parseInt(req.query.limit)) : packages.find({})
    const packs = await cursor.toArray()
    res.send(packs)
  })

  app.get('/packages/:id', async(req, res)=>{
    const cursor = await packages.findOne({_id: new ObjectId(req.params.id)})
    res.send(cursor)
  })

  app.post('/orders', async(req, res)=>{
    const order = req.body
    const result = await orders.insertOne(order)
    res.send(result)
  })

  
}
main()
  .then(console.log)
  .catch(console.error)
  
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
