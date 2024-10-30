const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const cupcakes = [
    { "id": 1, "cupcake_id": 1, "type": "Strawberry", "price": 100 }
];

const customers = [
    { "id": 1, "customer_id": 1, "name": "Kamal", "location": "Galle", "email": "kamal.abc@gmail.com" }
];

const orders = [
    { "id": 1, "customer_id": 1, "cupcake_id": 1, "amount": 1, "total_price": 100 }
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

// Validation schema for cupcake data
const cupcakeSchema = Joi.object({
    cupcake_id: Joi.number().integer().required(),
    type: Joi.string().min(3).required(),
    price: Joi.number().positive().required()
});

// Helper function to get next ID
const getNextId = (dataArray) => {
    return dataArray.length > 0 ? Math.max(...dataArray.map(item => item.id)) + 1 : 1;
};

// POST route to add a new cupcake
app.post('/api/add_cupcake', (req, res) => {
    const { error } = cupcakeSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newCupcake = { id: getNextId(cupcakes), ...req.body };
    cupcakes.push(newCupcake);
    res.status(201).json({ success: true, message: "Cupcake added successfully", data: newCupcake });
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
