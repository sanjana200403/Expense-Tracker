 const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { addIncome, getAllIncome, downloadIncomeExcel, deleteIncome } = require('../controllers/incomeControlle');
 const router = express.Router();

 router.post('/add',protect, addIncome);
 router.get('/get',protect,getAllIncome);
 router.get('/downloadExcel',protect,downloadIncomeExcel);
 router.delete('/:id',protect,deleteIncome)

module.exports = router