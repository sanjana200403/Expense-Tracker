const Expense = require("../models/Expense"); // Update the path based on your project structure
const ExcelJS = require("exceljs");
const xlsx = require('xlsx');

exports.addExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const { icon, category, amount, description, date } = req.body;

        if (!category || !amount ) {
            return res.status(400).json({
                message: "Category, amount, and date are required"
            });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            description,
            date : Date.now()
        });

        await newExpense.save();

        res.status(201).json({ success: true, message: "Expense added successfully", data: newExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getAllExpense = async (req, res) => {
    try {
        const userId = req.user.id;

        const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, expenses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }

        await Expense.findByIdAndDelete(expenseId);

        res.status(200).json({ success: true, message: "Expense deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.editExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { icon, category, amount, description, date } = req.body;

        // Validate required fields
        if (!category || !amount || !date) {
            return res.status(400).json({
                message: "Category, amount, and date are required"
            });
        }

        // Find the expense by ID
        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }

        // Update the expense with the new values
        expense.icon = icon || expense.icon;
        expense.category = category || expense.category;
        expense.amount = amount || expense.amount;
        expense.description = description || expense.description;
        expense.date = date || expense.date;

        // Save the updated expense
        await expense.save();

        res.status(200).json({ success: true, message: "Expense updated successfully", data: expense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    try {
        const userId = req.user.id;

        const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });

        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Description: item.description || "", // If description is optional
            Date: item.date ? item.date.toISOString().split('T')[0] : ""
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, 'Expense Report');

        const filePath = 'Expense_details.xlsx'; 

        xlsx.writeFile(wb, filePath);

        res.download(filePath, (err) => {
            if (err) {
                console.error("Error during download", err);
                res.status(500).json({ success: false, message: "Server error" });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
