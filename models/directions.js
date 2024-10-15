const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const DirectionsSchema = new Schema(
    {
        necessaryEquipment: { type: [String], required: true},
        steps: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = DirectionsSchema