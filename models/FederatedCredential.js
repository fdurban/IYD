const { Schema, model } = require("mongoose")
const User = require("./User.model")

const federatedCrendential = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: User
        },
        provider: String,
        subject: String,
    }
);


const FederatedCredential = model("FederatedCredential", federatedCrendential)

module.exports = FederatedCredential
