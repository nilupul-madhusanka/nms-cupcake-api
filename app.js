const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const  cupcakes = [
    {
        "id":1,
        "type":"Strawberry",
        "price":250,
    },
    {
        "id":2,
        "type":"Chocolate",
        "price":150,
    },
    {
        "id":3,
        "type":"Nutella",
        "price":300,
    },
    {
        "id":4,
        "type":"Salted Caramel",
        "price":400,
    },
    {
        "id":5,
        "type":"Lemon",
        "price":100,
    },
    {
        "id":6,
        "type":"Coconut",
        "price":300,
    }
];

const customers = [
    {
        "id":1,
	    "customer_id":1,
        "name":"Kamal",
        "location":"Galle",
        "email":"kamal.abc@gmail.com"
    },
    {
        "id":2,
	    "customer_id":2,
        "name":"Nimal",
        "location":"Kurunegala",
        "email":"nimal.abc@gmail.com"
    },
    {
        "id":3,
	    "customer_id":3,
        "name":"Sunil",
        "location":"Anuradhapura",
        "email":"sunil.abc@gmail.com"
    },
    {
        "id":4,
	    "customer_id":4,
        "name":"Kasun",
        "location":"Jaffna",
        "email":"kasun.abc@gmail.com"
    },
    {
        "id":5,
	    "customer_id":5,
        "name":"Gayan",
        "location":"Trinco",
        "email":"gayan.abc@gmail.com"
    },
    {
        "id":6,
	    "customer_id":6,
        "name":"Arun",
        "location":"Colombo",
        "email":"arun.abc@gmail.com"
    }
];
const orders = [
    {
        "id":1,
        "customer_id":1,
        "items":"Strawberry Cupcakes",
        "amount":10
    },
    {
        "id":2,
        "customer_id":1,
        "name":"Chocolate Cupcakes",
        "amount":20
    },
    {
        "id":3,
        "customer_id":1,
        "items":"Nutella Cupcakes",
        "amount":90
    },
    {
        "id":4,
        "customer_id":1,
        "name":"Salted Caramel Cupcakes",
        "amount":44
    },
    {
        "id":5,
        "customer_id":3,
        "items":"Lemon Cupcakes",
        "amount":55
    },
    {
        "id":6,
        "customer_id":3,
        "name":"Coconut Cupcakes",
        "amount":50
    },
    {
        "id":7,
        "customer_id":2,
        "items":"Strawberry Cupcakes",
        "amount":100
    },
    {
        "id":8,
        "customer_id":2,
        "name":"Chocolate Cupcakes",
        "amount":80
    },
    {
        "id":9,
        "customer_id":2,
        "items":"Coconut Cupcakes",
        "amount":40
    },
    {
        "id":10,
        "customer_id":5,
        "name":"Lemon Cupcakes",
        "amount":80
    },
    {
        "id":11,
        "customer_id":6,
        "items":"Salted Caramel Cupcakes",
        "amount":50
    },
    {
        "id":12,
        "customer_id":4,
        "name":"Nutella Cupcakes",
        "amount":70
    }
];

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
    return res.send({
        "success":true,
        "statusCode": 200,
        "massage": "Customer added Successfully!",
        "data": newCustomer
    })
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

app.get('/orders/:customerId', (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const customer = customers.find(c => c.id === customerId);

    if (!customer) {
        return res.send({
            "success":false,
            "statusCode": 404,
            "massage": "Order is not found for customer_id " + customerId,
        })
    }

    const customerOrders = orders.filter(o => o.customer_id === customerId);
    
    if (customerOrders){
        return res.send({
            "success":true,
            "statusCode": 200,
            "massage": "Order is found for customer_id " + customerId ,
            "data": customerOrders
        })
    }
});

app.get('/orders/filter/quantity/:quantity', (req, res) => {
    const quantity = parseInt(req.params.quantity);
    const filteredOrders = orders.filter(o => o.amount < quantity);
    res.json(filteredOrders);
});


/*   Orders POST   */

app.post('/add_order', (req, res) => {
    const newOrder =req.body;
    const customer = customers.find(c => c.id === newOrder.customer_id);
    if (!customer) {
        return res.send({
            "success":false,
            "statusCode": 404,
            "massage": "Customer is not found for the Customer ID ",
        })
    }

    newOrder.id = getNextId(orders);
    orders.push(newOrder);
    return res.send({
        "success":true,
        "statusCode": 200,
        "massage": "Order added Successfully!",
        "data": newOrder
    })
});


app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});
