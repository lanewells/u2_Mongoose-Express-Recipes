const Recipe = require('../models/recipe')
const Capacity = require('../models/capacity')

// create a recipe
const createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe(req.body)
        await recipe.save()
        return res.status(201).json({
            recipe
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// update a recipe
const updateRecipe = async (req, res) => {
    try {
        let { id } = req.params
        let recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true })
        if (recipe) {
            return res.status(200).json(recipe)
        }
        throw new Error("recipe not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

// delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Recipe.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("recipe deleted")
        }
        throw new Error("recipe not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createRecipe,
    updateRecipe,
    deleteRecipe
}