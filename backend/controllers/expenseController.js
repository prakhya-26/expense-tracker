// add expenses, total expenses

//ADD EXPENSES
import expenseModel from '../models/expenseModel.js'

const addExpense = async (req,res)=>{
    try{
        const { name,title,category,amount,date } = req.body
        
        const expenseData = {
            name,
            title,
            category,
            amount: Number(amount),
            date
        }
        console.log(expenseData)
        const expense = new expenseModel(expenseData)

        await expense.save()
        res.json({success:true,message : "expense updated"})
    }

    catch(error){
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

const getExpense = async (req,res)=>{
    try{

        const {name,start,end,category} = req.body

        // filter data of the user who sent the request, so first extract the user's name
        const userName = {name}
        
        // build query filter
        let query = {...userName}

        //date filter
        if(start && end){
            query.date = {$gte: new Date(start),$lte : new Date(end)}
        }
        else if(start){
            query.date = {$gte:new Date(start)}
        }
        else if(end){
            query.date = {$lte : new Date(end)}
        }

        //category filter
        if(category){
            query.category= category
        }

        const expenses = await expenseModel.find(query).sort({date:-1})

        res.send(expenses)

    }
    catch(error){
        console.log(error)
        res.json({success:false, message : "error in fetching"})
    }
}

const removeExpense = async (req,res)=>{
    try{
        const {id} = req.body
        await expenseModel.findByIdAndDelete(id)
        res.json({success:true,message:"Product Removed"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addExpense,removeExpense,getExpense}