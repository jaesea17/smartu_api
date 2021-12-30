const express = require('express');
const verify = require('../../verifyToken');
const router = express.Router();
const pool = require('../config/db');

//create new entry for expenses
router.post('/expenses',verify,async(req,res)=>{
    let{expenseType, date, amount}= req.body;
        //getting the customer id and email from req.user contained in the "verify" function
        let customerId = req.user.id;
            let isEntered = false;
        //preventing duplicate entries before inserting into table
    try{
        let enteredExpenseType  = await pool.query(
            `SELECT expense_type
            FROM expenses
            where date= $1`,[date]);
            console.log("***enteredRx", enteredExpenseType.rows);
            enteredExpenseType.rows.map((entered) => {
                    if(entered.expense_type.trim() == expenseType.trim()){
                        isEntered = true;
                    }
            })
    }catch(err){
        if(err) return console.log(err);
        };
        
    if(isEntered) return res.send("entry already exists");
    try{
        await pool.query(
            `INSERT INTO expenses(expense_type, amount, date, user_id) 
            VALUES($1, $2, $3, $4) RETURNING *`,
            [expenseType, amount, date, customerId],(err,result)=>{
                    if(err) throw err
                    res.send(result.rows);
                })           
    }catch(err){
            if(err) return console.log(err);
        };
});
    
//get all expenses of particular user
router.get('/expenses',verify,async(req,res)=>{
        let customerId = req.user.id;
        try{
            pool.query(`SELECT * 
            FROM expenses
            WHERE user_id  = $1
            ORDER BY e_id ASC`,
                [customerId],(err,result)=>{
                if(err) throw err
                res.send(result.rows);
        })

        }catch(err){
            if(err) return console.log(err);
        }
});

//update expenses
router.patch('/expenses/:expenseId',verify,async(req,res)=>{
    let{expenseType, amount, date}= req.body;
    let{expenseId} = req.params;
    try{
        await pool.query(
            `UPDATE expenses
            SET  expense_type=$1, amount=$2,
            date=$3
            WHERE e_id = $4 RETURNING *`,
            [expenseType, amount, date, expenseId],(err,result)=>{
                    if(err) throw err;
                    res.send(result.rows);
                })

    }catch(err){
       if(err) return console.log (err);
    }
});

//delete multiple and single expenses
router.delete('/expenses',verify,async(req,res)=>{
    let {keyId} = req.body;
    let array1 = [];
    keyId.map((id) => {
        try{
             pool.query(`DELETE FROM expenses
             WHERE e_id IN($1) RETURNING*`, [id],(err,result)=>{
                array1.push(id);
                if(err) throw err
                if(array1.length === keyId.length){
                    res.send("delete successful");
                }
            })
    
        }catch(err){
           if(err) return console.log(err);
        }
    })
});

 //delete all expenses
 router.delete('/expenses/all',verify,async(req,res)=>{
    let userId = req.user.id;
    
    try{
         pool.query(`DELETE FROM expenses
         WHERE user_id  = $1`,
          [userId],(err,result)=>{
            if(err) throw err
            console.log("deleted successfully");
            res.send(result.rows);
        })

    }catch(err){
       if(err) return console.log(err);
    }
});

   
 module.exports = router;
