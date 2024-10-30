const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const cupcakes = [
    { "id": 1, "cupcake_id": 1, "type": "Strawberry", "price": 100 },
    { "id": 2, "cupcake_id": 2, "type": "Chocolate", "price": 100 },
    { "id": 3, "cupcake_id": 3, "type": "Nutella", "price": 100 },
    { "id": 4, "cupcake_id": 4, "type": "Salted Caramel", "price": 100 },
    { "id": 5, "cupcake_id": 5, "type": "Lemon", "price": 100 },
    { "id": 6, "cupcake_id": 6, "type": "Coconut", "price": 100 }
];

const customers = [
    { "id": 1, "customer_id": 1, "name": "Kamal", "location": "Galle", "email": "kamal.abc@gmail.com" },
    { "id": 2, "customer_id": 2, "name": "Nimal", "location": "Kurunegala", "email": "nimal.abc@gmail.com" },
    { "id": 3, "customer_id": 3, "name": "Sunil", "location": "Anuradhapura", "email": "sunil.abc@gmail.com" },
    { "id": 4, "customer_id": 4, "name": "Kasun", "location": "Jaffna", "email": "kasun.abc@gmail.com" },
    { "id": 5, "customer_id": 5, "name": "Gayan", "location": "Trinco", "email": "gayan.abc@gmail.com" },
    { "id": 6, "customer_id": 6, "name": "Arun", "location": "Colombo", "email": "arun.abc@gmail.com" }
];

const orders = [
    { "id": 1, "customer_id": 1, "cupcake_id": 1, "amount": 1, "total_price": 100 },
    { "id": 2, "customer_id": 1, "cupcake_id": 2, "amount": 2, "total_price": 200 },
    { "id": 3, "customer_id": 1, "cupcake_id": 3, "amount": 3, "total_price": 300 },
    { "id": 4, "customer_id": 1, "cupcake_id": 4, "amount": 4, "total_price": 400 },
    { "id": 5, "customer_id": 2, "cupcake_id": 5, "amount": 5, "total_price": 500 },
    { "id": 6, "customer_id": 2, "cupcake_id": 2, "amount": 6, "total_price": 600 }
];

// Define schema validations
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Cupcake routes
app.get('/api/cupcakes', (req, res) => res.json({ success: true, data: cupcakes }));

app.get('/api/cupcakes/:cupcakeId', (req, res) => {
    const cupcake = cupcakes.find(c => c.id === parseInt(req.params.cupcakeId));
    return cupcake
        ? res.json({ success: true, data: cupcake })
        : res.status(404).json({ success: false, message: 'Cupcake not found' });
});

// Customer routes
app.get('/api/customers', (req, res) => res.json({ success: true, data: customers }));

app.get('/api/customers/:customerId', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.customerId));
    return customer
        ? res.json({ success: true, data: customer })
        : res.status(404).json({ success: false, message: 'Customer not found' });
});

// Order routes
app.get('/api/orders', (req, res) => res.json({ success: true, data: orders }));

app.get('/api/orders/:customerId', (req, res) => {
    const customerOrders = orders.filter(o => o.customer_id === parseInt(req.params.customerId));
    return customerOrders.length
        ? res.json({ success: true, data: customerOrders })
        : res.status(404).json({ success: false, message: 'No orders found for this customer' });
});

module.exports = app;
