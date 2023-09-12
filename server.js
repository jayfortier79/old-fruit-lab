require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Fruit = require('./models/fruit');
const mongoose = require('mongoose');
const Vegtable = require('./models/vegtable');

//// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
//////////////////////////

const jsxViewEngine = require('jsx-view-engine');

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// Middleware;
app.use((req, res, next) => {
  console.log('Middleware: I run for all routes, 1');
  next();
});
// By implementing the line below, we now have access to the req.body. Which is the parsed formData from the form request.
app.use(express.urlencoded({ extended: false }));

// const middleware = (req, res, next) => {
//   console.log('Middleware: I run for all routes, 1');
//   next();
// };

// Index
app.get('/fruits', async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    console.log(foundFruits);
    res.status(200).render('index', {
      fruits: foundFruits,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/vegtables', async (req, res) => {
    try {
      const foundVegtables = await Vegtable.find({});
      console.log(foundVegtables);
      res.status(200).render('vegIndex', {
        vegtables: foundVegtables,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });

// New
app.get('/fruits/new', (req, res) => {
  console.log('New controller');
  res.render('New');
});

app.get('/vegtables/new', (req, res) => {
    console.log('Newveg controller');
    res.render('Newveg');
  });

// Delete

// Update

/* Create
app.post('/fruits', async (req, res) => {
  try {
    // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
    //   req.body.readyToEat = true; //do some data correction
    // } else { //if not checked, req.body.readyToEat is undefined
    //   req.body.readyToEat = false; //do some data correction
    // }
    req.body.readyToEat = req.body.readyToEat === 'on';

    const createdFruit = await Fruit.create(req.body);

    res.status(201).redirect('/fruits');
  } catch (err) {
    res.status(400).send(err);
  }
});
*/

app.post('/fruits', async (req, res) => {
    try {
      // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
      //   req.body.readyToEat = true; //do some data correction
      // } else { //if not checked, req.body.readyToEat is undefined
      //   req.body.readyToEat = false; //do some data correction
      // }
      req.body.readyToEat = req.body.readyToEat === 'on';
  
      const createdFruit = await Fruit.create(req.body);
  
      res.status(201).redirect('/fruits');
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post('/vegtables', async (req, res) => {
    try {
      req.body.readyToEat = req.body.readyToEat === 'on';
  
      const createdFruit = await Vegtable.create(req.body);
  
      res.status(201).redirect('/vegtables');
    } catch (err) {
      res.status(400).send(err);
    }
  });

app.get('/vegtables', (req, res)=>{
    res.send('vegIndex');
});

// Edit

// Show
app.get('/fruits/:id', async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);

    //second param of the render method must be an object
    res.render('show', {
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/vegtables/:id', async (req, res) => {
    try {
      const foundVeg = await Vegtable.findById(req.params.id);
  
      //second param of the render method must be an object
      res.render('showveg', {
        //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
        vegtable: foundVeg,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });
  

app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('index', {
            fruits: allFruits
        });
    });
});

app.get('/vegtables', (req, res)=>{
    Vegtable.find({}, (error, allVegtables)=>{
        res.render('vegIndex', {
            vegtables: allVegtables
        });
    });
});


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});