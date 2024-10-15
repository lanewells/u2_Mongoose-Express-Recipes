const Recipe = require('../models/recipe')
const Capacity = require('../models/capacity')

// get all recipes
const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find()
  res.json(recipes)
}

// get a recipe by id
const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  res.json(recipe)
}

// get all capacities
const getAllCapacities = async (req, res) => {
  const capacities = await Capacity.find()
  res.json(capacities)
}

// get a capacity by id
const getCapacityById = async (req, res) => {
    const capacity = await Capacity.findById(req.params.id)
    res.json(capacity)
  }

// get recipes by capacity rank
const getRecipesByRank = async (req, res) => {
    try {
    const { rank } = req.params
    const capacity = await Capacity.findOne({ rank: rank })
    if (!capacity) {
        return res.status(404).json({message: 'capacity not found'})
    }
    const recipes = await Recipe.find({ capacity: capacity._id })
    res.json(recipes)
    }   catch(error) {
        res.status(500).json({ message: error.message })
    }
}

// get all halal recipes
const getHalalRecipes = async (req, res) => {
    try {
    const recipes = await Recipe.find({ halal: true })
    if (!recipes) {
        return res.status(404).json({message: 'recipes not found'})
    }
    res.json(recipes)
    }   catch(error) {
        res.status(500).json({message: error.message})
    }
}

// get all vegan recipes
const getVeganRecipes = async (req, res) => {
    try {
    const recipes = await Recipe.find({ vegan: true })
    if (!recipes) {
        return res.status(404).json({message: 'recipes not found'})
    }
    res.json(recipes)
    }   catch(error) {
        res.status(500).json({message: error.message})
    }
}

// get all vegetarian recipes
const getVegetarianRecipes = async (req, res) => {
    try {
    const recipes = await Recipe.find({ vegan: true })
    if (!recipes) {
        return res.status(404).json({message: 'recipes not found'})
    }
    res.json(recipes)
    }   catch(error) {
        res.status(500).json({message: error.message})
    }
}

// get all glutenFree recipes
const getGlutenFreeRecipes = async (req, res) => {
    try {
    const recipes = await Recipe.find({ glutenFree: true })
    if (!recipes) {
        return res.status(404).json({message: 'recipes not found'})
    }
    res.json(recipes)
    }   catch(error) {
        res.status(500).json({message: error.message})
    }
}

// get all kosher recipes
const getKosherRecipes = async (req, res) => {
    try {
    const recipes = await Recipe.find({ kosher: true })
    if (!recipes) {
        return res.status(404).json({message: 'recipes not found'})
    }
    res.json(recipes)
    }   catch(error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  getCapacityById,
  getAllCapacities,
  getRecipesByRank,
  getHalalRecipes,
  getVegetarianRecipes,
  getVeganRecipes,
  getGlutenFreeRecipes,
  getKosherRecipes
}
