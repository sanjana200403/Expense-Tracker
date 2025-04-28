const { Types } = require("mongoose");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income for the user
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    // Fetch total expenses for the user
    const totalExpenses = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalExpenses: { $sum: "$amount" } } },
    ]);

    // Get income transactions in the last 60 days
    const last60DaysIncomeTransaction = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(new Date() - 60 * 24 * 60 * 60 * 1000) }, // last 60 days
    }).sort({ date: -1 });

    // Calculate total income for the last 60 days
    const last60DaysTotalIncome = last60DaysIncomeTransaction.reduce((total, transaction) => total + transaction.amount, 0);

    // Get expense transactions in the last 30 days
    const last30DaysExpenseTransaction = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }, // last 30 days
    }).sort({ date: -1 });

    // Calculate total expense for the last 30 days
    const last30DaysTotalExpense = last30DaysExpenseTransaction.reduce((total, transaction) => total + transaction.amount, 0);

    // Fetch the last 5 transactions (both income and expense)
    const lastIncomeTransactions = await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5);
    const lastExpenseTransactions = await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5);

    // Combine both income and expense transactions
    const lastTransactions = [
      ...lastIncomeTransactions.map((transaction) => ({
        ...transaction.toObject(),
        type: "Income",
      })),
      ...lastExpenseTransactions.map((transaction) => ({
        ...transaction.toObject(),
        type: "Expense",
      })),
    ];

    // Sort the transactions by date to ensure they're in the right order
    const sortedLastTransactions = lastTransactions.sort((a, b) => b.date - a.date);

    // Send response with total income, total expenses, and income/expense for the last 60/30 days
    res.status(200).json({
      totalIncome: totalIncome[0] ? totalIncome[0].totalIncome : 0,
      totalExpenses: totalExpenses[0] ? totalExpenses[0].totalExpenses : 0,
      last60DaysTotalIncome: {
        total: last60DaysTotalIncome,
        transactions: last60DaysIncomeTransaction, 
      },
      last30DaysTotalExpenses: {
        total: last30DaysTotalExpense,
        transactions: last30DaysExpenseTransaction, 
      },
      lastTransactions: sortedLastTransactions,
      totalBalance: (totalIncome[0] ? totalIncome[0].totalIncome : 0) - (totalExpenses[0] ? totalExpenses[0].totalExpenses : 0),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching dashboard data." });
  }
};
