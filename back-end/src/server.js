import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const JWT_SECRET = crypto.randomBytes(32).toString('hex');
var port = process.env.PORT || 8000;
import path from 'path';

// Mongodb Connection
const url = `mongodb+srv://zainabal2023:wbi8KgwsWT59P1ym@cluster0.vxpkth2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "../assets")));

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

// get all users
app.get('/api/users', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    const users = await db.collection('users').find({}).toArray();
    res.send(users);
});

// get user by id
app.post('/api/users', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    const { email, password } = req.body;
    try {
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: crypto.randomBytes(16).toString('hex'),
            email,
            //password: hashedPassword,
            password,
            cartItems: []
        };
        await db.collection('users').insertOne(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login route for users
app.post('/api/login', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    const { email, password } = req.body;
    try {
        const existingUser = await db.collection('users').findOne({ email });
        console.log(existingUser, !existingUser);
        if(!existingUser) {
            return res.status(404).json({ message: "Invalid email" });
        }
        //const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        const passwordCorrect = password === existingUser.password;
        console.log(passwordCorrect);
        if (!passwordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, JWT_SECRET);
        res.status(200).json({ 
            token, 
            user: {
                id: existingUser.id,
                email: existingUser.email
            },
            message: "Sign in successful"
        });
         
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get the cart items for the user
app.get('/api/users/:userId/cart', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    const user = await db.collection('users').findOne({ id: req.params.userId });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    let populatedCart = [];
    if (user.cartItems && user.cartItems.length > 0) {
        populatedCart = await populatedCartIds(user.cartItems);
    }
    res.send(populatedCart);
});

// Get the product by id
app.get('/api/products/:id', async (req, res) => {
    await client.connect();
    const db = client.db('fullstack-vue');
    const productId = req.params.id;
    const product = await db.collection('products').findOne({ id: productId });
    //products.find((product) => product.id === productId)
    res.json(product);
});

// Add the product to the cart
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

// Delete the product from the cart
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

app.listen(port, () => {
  console.log('Server is running on port 8000');
});