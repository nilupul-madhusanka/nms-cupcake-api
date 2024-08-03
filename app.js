const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const  cupcakes = [];
const customers = [];
const orders = [];


app.get('/', (req, res) => {
    return res.send('Welcome to the ABC Cupcake Ordering API!');
});

/*   Cupcakes GET */

app.get('/cupcakes', (req, res) => {
    return res.send({
        "success":true,
        "statusCode": 200,
        "massage": "All cupcake items retrived successfully!",
        "data": cupcakes
    });
});
app.get('/cupcakes/:cupcakeId', (req, res) => {
    const cupcakeId = parseInt(req.params.cupcakeId);
    const cupcake = cupcakes.find((c) => c.id === cupcakeId);
    if (cupcake){
        return res.send({
            "success":true,
            "statusCode": 200,
            "massage": "Cupcake Item is found for ID " + cupcakeId ,
            "data": cupcake
        })
    } else{
        return res.send({
            "success":false,
            "statusCode": 404,
            "massage": "Cupcake Item is not found for ID " + cupcakeId,
        })
    }
});

/*   Cupcakes POST */
/* NextID for POST req */

const getNextId = (dataArray) => {
    if (dataArray.length === 0) return 1;
    return Math.max(...dataArray.map(item => item.id)) + 1;
};

app.post('/add_cupcakes', (req, res) => {
    const newCupcake =req.body;
    newCupcake.id = getNextId(cupcakes);
    cupcakes.push(newCupcake);
    res.status(200).json(newCupcake);
});

/*   Cupcakes PUT */

app.put('/update_cupcakes/:cupcakeId', (req, res) => {
    const cupcakeId = parseInt(req.params.cupcakeId);
    const cupcake = cupcakes.find(c => c.id === cupcakeId);
    if (!cupcake) {
        return res.status(404).json({ error: 'Cupcake item not found' });
    }

    Object.assign(cupcake, req.body);
    res.json(cupcake);
});

/*   Cupcakes DELETE */

app.delete('/delete_cupcakes/:cupcakeId', (req, res) => {
    const cupcakeId = parseInt(req.params.cupcakeId);

    const cupcake = cupcakes.find((s) => s.id === cupcakeId);

    if (!cupcake) {
        return res.status(404).send({
            "success": false,
            "statusCode": 404,
            "error": "Cupcake is not found for ID " + cupcakeId
        });
    }

    const index = cupcakes.indexOf(cupcake);

    cupcakes.splice(index, 1);

    return res.send({
        "success": true,
        "statusCode": 200,
        "message": "Cupcake ID " + cupcakeId + " is removed!"
    });
});

/*    Customers GET   */

app.get('/customers', (req, res) => {
    return res.send({
        "success":true,
        "statusCode": 200,
        "massage": "All customers retrived successfully!",
        "data": customers
    });
});
app.get('/customers/:customerId', (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const customer = customers.find((c) => c.id === customerId);
    if (customer){
        return res.send({
            "success":true,
            "statusCode": 200,
            "massage": "Customer is found for ID " + customerId ,
            "data": customer
        })
    } else{
        return res.send({
            "success":false,
            "statusCode": 404,
            "massage": "Customer is not found for ID " + customerId,
        })
    }
});

/*    Customers POST   */

app.post('/add_customer', (req, res) => {
    const newCustomer =req.body;
    newCustomer.id = getNextId(customers);
    customers.push(newCustomer);
    res.status(200).json(newCustomer);
});

/*   Orders GET   */

app.get('/orders', (req, res) => {
    return res.send({
        "success":true,
        "statusCode": 200,
        "massage": "All Orders retrived successfully!",
        "data": orders
    });
});
app.get('/orders/:orderId', (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const order = orders.find((c) => c.id === orderId);
    if (order){
        return res.send({
            "success":true,
            "statusCode": 200,
            "massage": "Order is found for ID " + orderId ,
            "data": order
        })
    } else{
        return res.send({
            "success":false,
            "statusCode": 404,
            "massage": "Order is not found for ID " + orderId,
        })
    }
});

/*   Orders POST   */

app.post('/add_order', (req, res) => {
    const newOrder =req.body;
    newOrder.id = getNextId(orders);
    orders.push(newOrder);
    res.status(200).json(newOrder);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});