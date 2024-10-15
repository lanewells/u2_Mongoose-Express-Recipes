const mongoose = require('mongoose')
const  { Schema } = require('mongoose')
const DirectionsSchema = require('./directions')

const RecipeSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: false },
        capacity: { type: Schema.Types.ObjectId, ref: 'Capacity' },
        capacityLevel: {type: String, required: true},
        servingSize: { type: Number, required: true},
        ingredients: { type: String, required: true },
        directions: [DirectionsSchema],
        spice: { type: Number, required: true, min: 0, max: 3 },
        halal: { type: Boolean, required: true },
        kosher: { type: Boolean, required: true },
        glutenFree: { type: Boolean, required: true },
        vegan: { type: Boolean, required: true },
        vegetarian: { type: Boolean, required: true }
    },
    { timestamps: true },
)

const Recipe = mongoose.model('Recipe', RecipeSchema)
module.exports = Recipe