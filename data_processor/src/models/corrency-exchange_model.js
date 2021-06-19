const mongoose = require("mongoose");

const CurrencyExchangeSchema = new mongoose.Schema({
    country: {
        type: mongoose.Schema.Types.String,
        required: [true, "Country is required"],
        unique: [true, "Country must be unique"]
    },
    currency: {
        type: mongoose.Schema.Types.Number,
        required: [true, "Currency is required"]
    }
}, { timestamps: true });

module.exports = mongoose.model("CurrencyExchange", CurrencyExchangeSchema);