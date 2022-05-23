/**
 * Hämta alla todos
 * URL: /api/todo
 * Method: GET
 * 
 * Lägga till en todo
 * URL: /api/todo
 * Method: POST
 * 
 * Ta bort en todo
 * URL: /api/todo/:id
 * Method: DELETE
 */

/**
 * /api/products - GET - Hämtar alla produkter
 * 
 * /api/cart - GET - Hämtar varukorgen
 * /api/cart - POST - Lägger till i varukorgen
 * /api/cart - DELETE - Ta bort från varukorgen
 * 
 * /api/order - POST - Lägger en order
 * 
 * /api/account/login
 * /api/account/signup
 * /api/account/info 
 */

const express = require('express');
const app = express();
const PORT = 8000;

const todoRouter = require('./routes/todo');

app.use(express.json());
// En middleware körs innan ett request går in i en matchande route
// next() triggar att gå vidare i koden till en matchande route
app.use((request, response, next) => {
    console.log(`I en middleware innan route ${request.url} och metod: ${request.method}`);
    next();
});
//Sätt en basurl till alla routes så alla startar med /api/todo
//Sen säg att det är de routes som ligger i todoRouter som kopplas till denna basurl
app.use('/api/todo', todoRouter);

app.use((request, response) => {
    const resObj = {
        message: 'No endpoint found'
    }

    response.status(404).json(resObj);
});

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});


// const todo = {
//   task: 'Brygg kaffe'
// }

// const response = await fetch('http://localhost:8000/api/todo', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(todo)
// })
// const data = await response.json();