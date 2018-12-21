import express from "express";
import bodyParser from 'body-parser';
import morgan from 'morgan';

import models from './server/models/index';

const router = express.Router();

const app = express();

const port = process.env.port || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Welcome to my sequelize ORM class'
    });
});

// Add a new user
router.post('/users', (req, res) => {
    console.log(req.body)
    models.User.create({ email: req.body.email }).then((user) => 
    { 
        res.json(user);
    });
});

// add new todo
router.post('/todos', function(req, res) {
    models.Todo.create({
        title: req.body.title,
        UserId: req.body.user_id
    }).then(function(todo) {
        res.json(todo);
    });
});
// Get all users
router.get('/users', (req, res) => {
    models.User.findAll({}).then((users) => {
        res.json(users);
    })
})

// Get all Todo
router.get('/todos', (req, res) => {
    models.Todo.findAll({}).then((todos) => {
        res.json(todos);
    });
});

// get single todo
router.get('/todo/:id', function(req, res) {
    models.Todo.find({
      where: {
        id: req.params.id
      }
    }).then(function(todo) {
      res.json(todo);
    });
  });

  // update single todo
router.put('/todo/:id', function(req, res) {
    models.Todo.find({
      where: {
        id: req.params.id
      }
    }).then(function(todo) {
      if(todo){
        todo.updateAttributes({
          title: req.body.title,
          complete: req.body.complete
        }).then(function(todo) {
          res.send(todo);
        });
      }
    });
  });

  // delete a single todo
router.delete('/todo/:id', function(req, res) {
    models.Todo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(todo) {
      res.json(todo);
    });
  });

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

