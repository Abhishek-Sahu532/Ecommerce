const Order = require('../models/Order');



exports.getMonthlyIncome = async (req,res)=>{
    const date =new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1)) //THIS WILL GIVE THE LAST MONTH AS PER TODAY'S DATE
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))



}