const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "You need at least one summary or postit"],
            trim: true
        },
        subject: {
            type: String,
            enum: ["ANATOMY", "BIOLOGY", "CHEMISTRY", "GEOGRAPHY", "HISTORY", "LAW", "MATH", "MUSIC", "PROGRAMING", "PHYSICS", "OTHER"],
            required: true
        },
        main_content: {
            type: String,
            maxlength: [3000, 'La descripción debe tener max. 3000 caracteres']
        },
        resume1: {
            type: String,
            maxlength: [1500, 'La descripción debe tener max. 1500 caracteres']
        },
        resume2: {
            type: String,
            maxlength: [750, 'La descripción debe tener max. 750 caracteres']
        },
        resume3: {
            type: String,
            maxlength: [325, 'La descripción debe tener max. 325 caracteres']
        },
        resume4: {
            type: String,
            maxlength: [100, 'La descripción debe tener max.100 caracteres']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            trim: true,
        },
        likes: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)
const Card = model("Card", cardSchema);

module.exports = Card;