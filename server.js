const express = require('express')
const PORT = process.env.PORT || 3001
const db = require('./db')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const mainController = require('./controllers/mainController')
const crudController = require('./controllers/crudController')

app.use(express.json())
app.use(logger('dev'))
app.use(bodyParser.json())

// index
app.get('/', async (req, res) => {
    res.send('welcome to my cookbook!!')
})

// index routes
app.get('/capacity', mainController.getAllCapacities)
app.get('/recipe', mainController.getAllRecipes)

app.get('/recipe/halal', mainController.getHalalRecipes)
app.get('/recipe/kosher', mainController.getKosherRecipes)
app.get('/recipe/vegan', mainController.getVeganRecipes)
app.get('/recipe/vegetarian', mainController.getVegetarianRecipes)
app.get('/recipe/glutenfree', mainController.getGlutenFreeRecipes)

// show routes
app.get('/recipe/:id', mainController.getRecipeById)
app.get('/capacity/:id', mainController.getCapacityById)
app.get('/recipe/rank/:rank', mainController.getRecipesByRank)

// crud routes
app.post('/recipe', crudController.createRecipe)
app.put('/recipe/:id', crudController.updateRecipe)
app.delete('/recipe/:id', crudController.deleteRecipe)


app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
  })