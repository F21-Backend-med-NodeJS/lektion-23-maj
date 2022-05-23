const { Router } = require('express');
const router = Router();
let todos = [
    { todo: 'Köp kaffe', id: 0, done: false },
    { todo: 'Köp kaka', id: 1, done: false },
    { todo: 'Brygg kaffe', id: 2, done: false },
    { todo: 'Drick kaffe', id: 3, done: false }
];

router.get('/', (request, response) => {
    console.log('I get todos');
    const resObj = {
        todos: todos
    }

    response.json(resObj);
});

router.post('/', (request, response) => {
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

router.delete('/:id', (request, response) => {
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

module.exports = router;