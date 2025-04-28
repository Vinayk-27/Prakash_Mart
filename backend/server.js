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
    },
    {
        id: 7,
        name: 'Bananas',
        category: 'fruits',
        image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹30',
        description: 'Ripe bananas, a natural energy booster',
        stock: 80
    },
    {
        id: 8,
        name: 'Carrots',
        category: 'vegetables',
        image: 'https://images.unsplash.com/photo-1582515073490-dc0c7f3c279f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹40',
        description: 'Crunchy carrots, rich in Vitamin A',
        stock: 55
    },
    {
        id: 9,
        name: 'Cheese',
        category: 'dairy',
        image: 'https://images.unsplash.com/photo-1624418478647-97c2d6468d4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹150',
        description: 'Creamy and delicious cheese for cooking and snacking',
        stock: 20
    },
    {
        id: 10,
        name: 'Orange Juice',
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1570993495743-8699412c8b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹80',
        description: 'Refreshing orange juice, full of Vitamin C',
        stock: 45
    },
    {
        id: 11,
        name: 'Whole Wheat Flour',
        category: 'groceries',
        image: 'https://images.unsplash.com/photo-1606857521017-6b6e598bc384?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹200',
        description: 'Premium quality whole wheat flour, ideal for baking and cooking',
        stock: 70
    },
    {
        id: 12,
        name: 'Almonds',
        category: 'dry fruits',
        image: 'https://images.unsplash.com/photo-1611080626919-7cf285dc4b87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹550',
        description: 'Crunchy and healthy almonds packed with nutrients',
        stock: 40
    },
    {
        id: 13,
        name: 'Shampoo',
        category: 'personal care',
        image: 'https://images.unsplash.com/photo-1588579834945-7abafd995702?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹250',
        description: 'Gentle shampoo for smooth and silky hair',
        stock: 35
    },
    {
        id: 14,
        name: 'Toothpaste',
        category: 'personal care',
        image: 'https://images.unsplash.com/photo-1588776814546-0f68f0193f3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹90',
        description: 'Fluoride toothpaste for healthy gums and teeth',
        stock: 60
    },
    {
        id: 15,
        name: 'Green Tea',
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1573747169036-0062a2d3d489?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹150',
        description: 'Refreshing green tea loaded with antioxidants',
        stock: 50
    },
    {
        id: 16,
        name: 'Cooking Oil',
        category: 'groceries',
        image: 'https://images.unsplash.com/photo-1618085268951-6452ef221ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹180',
        description: 'Healthy vegetable oil for everyday cooking',
        stock: 100
    },
    {
        id: 17,
        name: 'Chocolate Bar',
        category: 'snacks',
        image: 'https://images.unsplash.com/photo-1616594039960-9a19758f2745?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹60',
        description: 'Delicious chocolate bar to satisfy your sweet cravings',
        stock: 90
    },
    {
        id: 18,
        name: 'Mangoes',
        category: 'fruits',
        image: 'https://images.unsplash.com/photo-1615486365887-f4e4fa6201d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹120',
        description: 'Juicy ripe mangoes perfect for summer',
        stock: 30
    },
    {
        id: 19,
        name: 'Onions',
        category: 'vegetables',
        image: 'https://images.unsplash.com/photo-1573142959087-4d7c122a7b03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹25',
        description: 'Fresh onions for everyday cooking needs',
        stock: 100
    },
    {
        id: 20,
        name: 'Butter',
        category: 'dairy',
        image: 'https://images.unsplash.com/photo-1599785209707-270847e454c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price: '₹90',
        description: 'Smooth and creamy butter, ideal for spreading and cooking',
        stock: 50
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