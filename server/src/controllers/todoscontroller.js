const todosModel = require('../models/todosModel.js');

exports.index = function(req, res) {
      res.send('NOT IMPLEMENTED: Site Home Page');
};
// Display list of all todo list items.
exports.todos_list = function(req, res) {
    todosModel.find({}, function(err, allTodos) {
         if (err) {
             res.send(err);
             return;
         }
         res.json({todos: allTodos});
     });
};
// Handle todo create on POST
exports.todos_create_on_post = function(req, res) {
    const postData = req.body;
    const validationError = { type: 'Validation Error', message: '' };
    if (!postData.todo) {
        validationError.message = 'Todo list item is required';
    }
    if (validationError.message) {
        res.json(validationError);
        return;
    }
    todosModel.findOne({ todo: postData.todo }, function(err, todo) {
        if (err) {
            // error finding todo
            res.status(500).send(err);
            return;
        }
        if (todo) {
            res.status(409).json({ type: 'error',
                       message: 'Todo list item already exists with "todo" of "'
                       + postData.todo + '".' });
            return;
        }
        if (todo === null) {
            todosModel.insert(postData, function(err, todo) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.status(201).json(todo);
            });
        }
    });
};


// Handle todo update on PUT.
exports.todo_update_on_put = function(req, res) {
    todosModel.findOne({ _id: req.params.id }, function(err, todo) {
          let prop;
          if (err) {
              res.send(err);
              return;
          }
          if (todo === null) {
              res.json({ type: 'error',
                         message: 'Did not find a todo list item with "id" of "'
                         + req.params.id + '".' });
              return;
          }
          for (prop in req.body) {
              if (prop !== '_id') {
                todo[prop] = req.body[prop];
              }
          }
          // TODO: check ewhat os num replaced
          todosModel.update({ _id: todo._id }, todo, {}, function(err, numReplaced) {
              if (err) {
                  res.send(err);
                  return;
              }
              res.json({id: req.params.id, status: todo.status});
            //   res.json({ type: 'success', message: 'Replaced ' + numReplaced + ' todo(s).' });
          });
     });
};

// Handle todo delete on DELETE.
exports.todos_remove_on_delete = function(req, res) {
    todosModel.remove({ _id: req.params.id }, function(err, todo) {
         if (err) {
             res.send(err);
         }
         res.json({id: req.params.id});
     });
};
