const Datastore = require('nedb'),

todosDb = new Datastore({
     filename: '/app/db/todos.db',
     autoload: true
});

module.exports = todosDb;
