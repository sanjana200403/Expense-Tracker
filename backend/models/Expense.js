const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon: {
        type: String
    },
    category: {
        type: String,
        required: true // e.g., food, rent
    },
    amount: { // fixed spelling from 'anount' to 'amount'
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true // (optional) usually date should be required
    }
}, { timestamps: true }); // optional: adds createdAt and updatedAt fields
module.exports = mongoose.model("Expense", ExpenseSchema);