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
        "amount":1
    },
    {
        "id":2,
        "customer_id":1,
        "name":"Chocolate Cupcakes",
        "amount":2
    },
    {
        "id":3,
        "customer_id":1,
        "items":"Nutella Cupcakes",
        "amount":3
    },
    {
        "id":4,
        "customer_id":3,
        "name":"Salted Caramel Cupcakes",
        "amount":4
    },
    {
        "id":5,
        "customer_id":3,
        "items":"Lemon Cupcakes",
        "amount":5
    },
    {
        "id":6,
        "customer_id":3,
        "name":"Coconut Cupcakes",
        "amount":6
    },
    {
        "id":7,
        "customer_id":3,
        "items":"Strawberry Cupcakes",
        "amount":7
    },
    {
        "id":8,
        "customer_id":4,
        "name":"Chocolate Cupcakes",
        "amount":8
    },
    {
        "id":9,
        "customer_id":4,
        "items":"Coconut Cupcakes",
        "amount":9
    },
    {
        "id":10,
        "customer_id":4,
        "name":"Lemon Cupcakes",
        "amount":10
    },
    {
        "id":11,
        "customer_id":6,
        "items":"Salted Caramel Cupcakes",
        "amount":11
    },
    {
        "id":12,
        "customer_id":4,
        "name":"Nutella Cupcakes",
        "amount":12
    }
];

// Welcome to API
app.get('/', (req, res) => {
    return res.send('Welcome to the ABC Cupcake Ordering API!');
});

//  Show all Cupcakes
app.get('/api/cupcakes', (req, res) => {
    return res.send({
        "success":true,
        "statusCode": 200,
        "massage": "All cupcake items retrived successfully!",
        "data": cupcakes
    });
});
//  Show all Cupcakes by id
app.get('/api/cupcakes/:cupcakeId', (req, res) => {
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

// NextID for POST req
const getNextId = (dataArray) => {
    if (dataArray.length === 0) return 1;
    return Math.max(...dataArray.map(item => item.id)) + 1;
};

//  Add Cupcakes
app.post('/api/add_cupcakes', (req, res) => {
    const newCupcake =req.body;
    newCupcake.id = getNextId(cupcakes);
    cupcakes.push(newCupcake);
    res.status(200).json(newCupcake);
});

//  Update Cupcakes
app.put('/api/update_cupcakes/:cupcakeId', (req, res) => {
    const cupcakeId = parseInt(req.params.cupcakeId);
    const cupcake = cupcakes.find(c => c.id === cupcakeId);
    if (!cupcake) {
        return res.status(404).json({ error: 'Cupcake item not found' });
    }

    Object.assign(cupcake, req.body);
    res.json(cupcake);
});

//  Delete Cupcakes
app.delete('/api/delete_cupcakes/:cupcakeId', (req, res) => {
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

//    Show all Customers
app.get('/api/customers', (req, res) => {
    return res.send({
        "success":true,
        "statusCode": 200,
        "massage": "All customers retrived successfully!",
        "data": customers
    });
});

//    Show all Customers by id
app.get('/api/customers/:customerId', (req, res) => {
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

//   Add Customers
app.post('/api/add_customer', (req, res) => {
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

//    Show all Orders
app.get('/api/orders', (req, res) => {
    return res.send({
        "success":true,
        "statusCode": 200,
        "massage": "All Orders retrived successfully!",
        "data": orders
    });
});

// Show all Orders by customer id
app.get('/api/orders/:customerId', (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const customer = orders.find(c => c.customer_id === customerId);

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

//   Add Orders

app.post('/api/add_order', (req, res) => {
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

// Filter all orders which has more than any quantity in an order
app.get('/api/orders/filter/quantity/:quantity', (req, res) => {
    const quantity = parseInt(req.params.quantity);
    const filteredOrders = orders.filter(o => o.amount > quantity);
    res.json(filteredOrders);
});

// Filter Top 2 customers which have higher sales
app.get('/api/top_customers', (req, res) => {
    const customerSales = customers.map(customer => {
        const customerOrders = orders.filter(order => order.customer_id === customer.id);
        const totalSales = customerOrders.reduce((sum, order) => sum + order.amount, 0);
        return { customer, totalSales };
    });

    const topCustomers = customerSales.sort((a, b) => b.totalSales - a.totalSales).slice(0, 2);
    res.json(topCustomers.map(item => item.customer));
});

// Find the top order (highest value order) of a selected customer
app.get('/api/orders/customer/:customerId', (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const customer = customers.find(c => c.customer_id === customerId);

    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    const customerOrders = orders.filter(o => o.customer_id === customerId);

    if (customerOrders.length === 0) {
        return res.status(404).json({ error: 'No orders found for this customer' });
    }

    const topOrder = customerOrders.reduce((maxOrder, order) => order.amount > maxOrder.amount ? order : maxOrder, customerOrders[0]);
    res.json(topOrder);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});
