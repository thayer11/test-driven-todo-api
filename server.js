// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos})/* This endpoint responds with all of the todos
   */
});

app.post('/api/todos', function create(req, res) {
  var newToDo = req.body;
  var nextId = todos.length + 1;
  newToDo._id = nextId;
  
  todos.push(newToDo);
  res.json(newToDo);
   /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
});

app.get('/api/todos/:id', function show(req, res) {
  var idWeWant = req.params.id;
  var todoWeWant = todos.filter(function(todo) {
    return (parseInt(idWeWant) === todo["_id"]);
  })[0];
  res.json(todoWeWant);
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
});

app.put('/api/todos/:id', function update(req, res) {
  var putThisID = parseInt(req.params.id);
  var putThis = req.body;
  for (var index_in_for_loop=0; index_in_for_loop<todos.length; index_in_for_loop++) {
    if(todos[index_in_for_loop]._id === putThisID) {
      putThis._id = putThisID;
      todos[index_in_for_loop] = putThis;
      res.json(putThis);
    }
  }
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var deleteThis = parseInt(req.params.id);
  for (var index_in_for_loop= 0; index_in_for_loop < todos.length; index_in_for_loop++){
    if (todos[index_in_for_loop]._id === deleteThis){
      res.json(todos[index_in_for_loop]);
      todos.splice(index_in_for_loop,1);
  }
 
  }
});
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
