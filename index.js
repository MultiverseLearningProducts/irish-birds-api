const express = require('express');
const cors = require('cors');
const app = express();
const {Bird} = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// GET /birds
app.get('/birds', async (req, res, next) => {
  try {
    const birds = await Bird.findAll();
    res.send(birds);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

app.post('/birds', async (req, res, next) => {
  try {
    const {name, breed, color, description} = req.body;
    const bird = await Bird.create({name, breed, color, description});
    res.send(bird);
  } catch (error) {
    next(error);
  }
});

app.delete('/birds/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const existingBird = await Bird.findByPk(id);
    if(!existingBird) {
      res.status(404).send(`Bird with id ${id} not found`);
      return;
    }
    await Bird.destroy({where: {id}});
    res.send(`deleted bird with id ${id}`);
  } catch (error) {
    next(error);
  }
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message});
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
