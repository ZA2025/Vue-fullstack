import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
var port = process.env.PORT || 8000;
import path from 'path';

// Mongodb Connection
const url = `mongodb+srv://zainabal2023:wbi8KgwsWT59P1ym@cluster0.vxpkth2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "../assets")));

app.use(express.static(
    path.resolve(__dirname, '../dist'),
    { maxAge: '1y', etag: false }
))

app.get('/api/products', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    const products = await db.collection('products').find({}).toArray();
    res.send(products);
});
// Helper Function
async function populatedCartIds(ids) {
    await client.connect();
    const db = client.db('fullstack-vue');
    return Promise.all(ids.map(id => db.collection('products').findOne({ id })));
}
// New
app.get('/api/users/:userId/cart', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems);
    res.send(populatedCart);
});
app.get('/api/products/:id', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    const productId = req.params.id;
    const product = await db.collection('products').findOne({ id: productId });
    //products.find((product) => product.id === productId)
    res.json(product);
});
app.post('/api/users/:userId/cart', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    const productId = req.body.id;
    await db.collection('users').updateOne(
        { id: req.params.userId },
        { $addToSet: { cartItems: productId } }
    );
    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems);
    res.json(populatedCart);
});

app.delete('/api/users/:userId/cart/:id', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    await db.collection('users').updateOne(
        { id: req.params.userId },
        { $pull: { cartItems: req.params.id } }
    );
    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.cartItems);
    res.json(populatedCart);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log('Server is running on port' + port);
});