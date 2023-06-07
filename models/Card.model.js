const { Schema, model } = require("mongoose")

const cardSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "You need at least one summary or postit"],
            default: "Campo no completado, entra en la carta para editar el título",
            unique: true
        },
        subject: {
            type: String,
            enum: ["ANATOMY", "BIOLOGY", "CHEMISTRY", "GEOGRAPHY", "HISTORY", "LAW", "MATH", "MUSIC", "PROGRAMING", "PHYSICS", "OTHER"],
            default: "OTHER",
        },
        main_content: {
            type: String,
            maxlength: [3000, 'La descripción debe tener max. 3000 caracteres'],
            default: "Write here your main content"
        },
        resume1: {
            type: String,
            maxlength: [1500, 'La descripción debe tener max. 1500 caracteres'],
            default: "Write here your first resume"
        },
        resume2: {
            type: String,
            maxlength: [750, 'La descripción debe tener max. 750 caracteres'],
            default: "Write here your second resume"
        },
        resume3: {
            type: String,
            maxlength: [325, 'La descripción debe tener max. 325 caracteres'],
            default: "Write here your third resume"
        },
        resume4: {
            type: String,
            maxlength: [100, 'La descripción debe tener max.100 caracteres'],
            default: "Write here your fourth resume"
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'

        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)
const Card = model("Card", cardSchema)

module.exports = Card