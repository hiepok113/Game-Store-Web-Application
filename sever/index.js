const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const EmployeeModel = require('./models/Employee');
const Game = require('./models/Game');
const Category = require('./models/Category');
const Cart = require('./models/Cart');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());


const uri = "mongodb://127.0.0.1:27017/game";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        await client.connect();
        await client.db("game").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB with Mongoose!');
}).catch(err => {
    console.error('Error connecting to MongoDB with Mongoose:', err);
});


app.get('/game', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'Error fetching games' });
    }
});


app.get('/game/:_id', async (req, res) => {
    try {
        const game = await Game.findById(req.params._id);
        if (!game) {
            return res.status(404).json("Game not found");
        }
        res.json(game);
    } catch (error) {
        console.error('Error fetching game by ID:', error);
        res.status(500).json({ error: 'Error fetching game by ID' });
    }
});

app.get('/category', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Error fetching categories' });
    }
});

app.get('/category/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json("Category not found");
        }
        res.json(category);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ error: 'Error fetching category by ID' });
    }
});

app.post('/addcategory', async (req, res) => {
    try {
        const newCate = await Category.create(req.body);
        res.json(newCate);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Error adding category' });
    }
});


app.post('/addgame', async (req, res) => {
    try {
        const newGame = await Game.create(req.body);
        res.json(newGame);
    } catch (error) {
        console.error('Error adding game:', error);
        res.status(500).json({ error: 'Error adding game' });
    }
});

app.get('/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const carts = await Cart.find({ userId: userId });
        res.json(carts);
    } catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).json({ error: 'Error fetching carts' });
    }
});

app.get('/find-cart/:userId/:gameId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const gameId = req.params.gameId;
        const carts = await Cart.findOne({ userId: userId, gameId: gameId });
        res.json(carts);
    } catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).json({ error: 'Error fetching carts' });
    }
});

app.post('/add-cart', async (req, res) => {
    try {
        const gameId = req.body.gameId;
        const cart = await Cart.findOne({ gameId: gameId });
        if (!cart) {
            const newCart = await Cart.create(req.body);
            res.json(newCart);
        } else {
            res.status(500).json({ error: 'Game exist in cart' });
        }

    } catch (error) {
        console.error('Error adding cart:', error);
        res.status(500).json({ error: 'Error adding cart' });
    }
});

app.delete('/delete-cart/:userId/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const userId = req.params.userId;
    try {
        const deletedCart = await Cart.findOneAndDelete({ userId: userId, gameId: gameId });
        if (!deletedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ error: 'Error deleting cart' });
    }
});

app.delete('/delete-all-cart/:userId/', async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedCart = await Cart.deleteMany({ userId: userId });
        if (!deletedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ error: 'Error deleting cart' });
    }
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    console.log(email)
    const password = req.body.password;
    try {
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.json("No record found");
        }
        if (user.password === password) {
            res.json({
                message: "Success",
                user
            });
        } else {
            res.json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

app.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const newEmployee = await EmployeeModel.create(req.body);
        res.json(newEmployee);
    } catch (error) {
        console.error('Error registering employee:', error);
        res.status(500).json({ error: 'Error registering employee' });
    }
});


app.get('/search', async (req, res) => {
    const { title } = req.query;
    try {
        const games = await Game.find({ title: { $regex: new RegExp(title, 'i') } });
        res.json(games);
    } catch (error) {
        console.error('Error searching games:', error);
        res.status(500).json({ error: 'Error searching games' });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
