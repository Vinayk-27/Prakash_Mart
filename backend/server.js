const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample product data
const products = [
    {
        id: 1,
        name: 'Fresh Tomatoes',
        category: 'vegetables',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹49',
        description: 'Fresh and juicy tomatoes, perfect for salads and cooking',
        stock: 50
    },
    {
        id: 2,
        name: 'Milk',
        category: 'dairy',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹60',
        description: 'Fresh cow milk, rich in calcium and protein',
        stock: 30
    },
    {
        id: 3,
        name: 'Potato Chips',
        category: 'snacks',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹20',
        description: 'Crunchy potato chips, perfect for snacking',
        stock: 100
    },
    {
        id: 4,
        name: 'Apples',
        category: 'fruits',
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹99',
        description: 'Fresh and sweet apples, great for health',
        stock: 40
    },
    {
        id: 5,
        name: 'Bread',
        category: 'bakery',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹35',
        description: 'Freshly baked bread, soft and delicious',
        stock: 25
    },
    {
        id: 6,
        name: 'Eggs',
        category: 'dairy',
        image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹75',
        description: 'Farm fresh eggs, rich in protein',
        stock: 60
    }
];

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.post('/api/orders', (req, res) => {
    const order = req.body;
    // In a real app, you would save the order to a database
    console.log('New order received:', order);
    res.json({
        message: 'Order received successfully',
        orderId: Date.now(),
        orderDetails: order
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 