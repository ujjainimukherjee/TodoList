const express = require('express');
const router = express.Router();
const todos_controller = require('../controllers/todoscontroller');

// GET a list of todos
router.get('/', todos_controller.todos_list);

// POST request to create todo item
router.post('/', todos_controller.todos_create_on_post);

// PUT request for updating the topdolist
router.put('/:id', todos_controller.todo_update_on_put);

// DELETE request to delete todo.
router.delete('/:id', todos_controller.todos_remove_on_delete);

module.exports = router
