const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const CapacitySchema = new Schema(
    {
        rank: {type: Number, required: true, min: 1, max: 4},
        level: {type: String, required: true},
        description: {type: String, required: true},
        icon: {type: String, required: false},
        recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
        timeRangeMins: {type: String, required: true},
        costRangeUSD: {type: String, required: true},
        difficultyRange: {type: String, required: true},
    },
    { timestamps: true}
)

const Capacity = mongoose.model('Capacity', CapacitySchema)
module.exports = Capacity