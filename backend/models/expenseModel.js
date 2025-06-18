import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
    name : { type: String, required : true},
    title : {
        type : String, required : true
    },
    category : {
        type : String, required : true,enum: [
      'Food',
      'Study',
      'Electricity',
      'Gym',
      'Transportation',
      'Healthcare',
      'Insurance',
      'Entertainment',
      'Rent',
      'Internet',
      'Others'
    ],

    },
    amount : {
        type: Number,
        required : true,
        min : 0
    },

    date:{
        type : Date,
        default : Date.now

    },
})

const expenseModel = mongoose.models.expenses || mongoose.model('expenses',expenseSchema)
export default expenseModel