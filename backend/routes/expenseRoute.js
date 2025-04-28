const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { addExpense, getAllExpense , downloadExpenseExcel, deleteExpense, editExpense } = require('../controllers/expenseController');
 const router = express.Router();

 router.post('/add',protect, addExpense);
 router.get('/get',protect,getAllExpense);
 router.get('/downloadExcel',protect,downloadExpenseExcel);
 router.delete('/:id',protect,deleteExpense)
 router.put('/:id', protect ,editExpense ); 

module.exports = router