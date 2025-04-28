const Income = require("../models/Income"); // Update the path based on your project structure
const ExcelJS = require("exceljs");
const xlsx = require('xlsx');
exports.addIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        const { icon, source, amount, date } = req.body;
           if(!source || !amount ){
             return res.status(400).json({
                message:"All fields are required"
             })
           }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date
        });

        await newIncome.save();

        res.status(201).json({ success: true, message: "Income added successfully", data: newIncome });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getAllIncome = async (req, res) => {
    try {
        const userId = req.user.id;

        const incomes = await Income.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, newIncome: incomes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;

        const income = await Income.findById(incomeId);

        if (!income) {
            return res.status(404).json({ success: false, message: "Income not found" });
        }

        await Income.findByIdAndDelete(incomeId);

        res.status(200).json({ success: true, message: "Income deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    try {
        const userId = req.user.id;

        const incomes = await Income.find({ userId }).sort({ createdAt: -1 });

        const data = incomes.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0] // (Optional) cleaner date format
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, 'Income Report');

        const filePath = 'Income_details.xlsx'; 

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

