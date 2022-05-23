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
const express = require('express');
const app = express();
const PORT = 8000;
let todos = [
    { todo: 'Köp kaffe', id: 0, done: false },
    { todo: 'Köp kaka', id: 1, done: false },
    { todo: 'Brygg kaffe', id: 2, done: false },
    { todo: 'Drick kaffe', id: 3, done: false }
];

app.use(express.json());
// En middleware körs innan ett request går in i en matchande route
// next() triggar att gå vidare i koden till en matchande route
app.use((request, response, next) => {
    console.log(`I en middleware innan route ${request.url} och metod: ${request.method}`);
    next();
});

app.get('/api/todo', (request, response) => {
    console.log('I get todos');
    const resObj = {
        todos: todos
    }

    response.json(resObj);
});

app.post('/api/todo', (request, response) => {
    const todo = request.body;
    if(todo.hasOwnProperty('todo') && todo.hasOwnProperty('id')
        && todo.hasOwnProperty('done')) {
        console.log(todo);
        todos.push(todo);

        const resObj = {
            success: true,
            todos: todos
        }

        response.json(resObj);
    } else {
        const resObj = {
            success: false,
            message: 'Invalid body'
        }

        response.status(400).json(resObj);
    }
});

app.delete('/api/todo/:id', (request, response) => {
    const id = request.params.id;
    console.log('ID:', typeof id);

    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo;
        }
    });

    const resObj = {
        success: true,
        todos: todos
    }

    response.json(resObj);
});

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