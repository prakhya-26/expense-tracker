import express from 'express'
import {addExpense,removeExpense,getExpense} from '../controllers/expenseController.js'

const expenseRouter = express.Router()

expenseRouter.post('/add',addExpense)
expenseRouter.post('/list',getExpense)
expenseRouter.post('/delete',removeExpense)

export default expenseRouter