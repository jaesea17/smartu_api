const express = require('express');
const verify = require('../../verifyToken');
const router = express.Router();
const pool = require('../config/db');

//create new entry for expenses
router.post('/expenses',verify,async(req,res)=>{
 let{expenseType, date, amount}= req.body;
     //getting the customer id and email from req.user contained in the "verify" function
      let customerId = req.user.id; 
     try{
        await pool.query(
            `INSERT INTO smartu_expenses(expense_type, amount, date, customer_id) 
            VALUES($1, $2, $3, $4) RETURNING *`,
            [expenseType, date, amount, customerId],(err,result)=>{
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
       FROM smartu_expenses
       WHERE customer_id  = $1`,
        [customerId],(err,result)=>{
           if(err) throw err
            res.send(result.rows);
       })

   }catch(err){
      if(err) return console.log(err);
   }
});

//update expenses
router.patch('/expenses/:expenseid',verify,async(req,res)=>{
    let{expenseType, amount, date, expenseId}= req.body;
    try{
        await pool.query(
            `UPDATE 
            SET  expense_type=$1, amount=$2,
            date=$3,
            WHERE e_id = $4 RETURNING *`,
            [expenseType, amount, date, expenseId],(err,result)=>{
                    if(err) throw err;
                    res.send(result.rows);
                })

    }catch(err){
       if(err) return console.log (err);
    }
});

//delete expenses
router.delete('/expenses',verify,async(req,res)=>{
    let {expenseId} = req.body;
    try{
         pool.query(`DELETE FROM expenses
         WHERE e_id = $1 RETURNING *`, [expenseId],(err,result)=>{
            if(err) throw err
            console.log("deleted successfully");
            res.send(result.rows);
        })

    }catch(err){
       if(err) return console.log(err);
    }
});




//create new entry for income
router.post('/income',verify,async(req,res)=>{
    let{ date, amount}= req.body;
        //getting the customer id and from req.user contained in the "verify" function
         let customerId = req.user.id; 
        try{
           await pool.query(
               `INSERT INTO smartu_income(amount, date, customer_id) 
               VALUES($1, $2, $3) RETURNING *`,
               [date, amount, customerId],(err,result)=>{
                       if(err) throw err
                       res.send(result.rows);
                   })           
       }catch(err){
               if(err) return console.log(err);
           };
    });
    
    
    //get all income of particular user
    router.get('/income',verify,async(req,res)=>{
       let customerId = req.user.id;
       try{
           pool.query(`SELECT * 
          FROM smartu_income
          WHERE customer_id  = $1`,
           [customerId],(err,result)=>{
              if(err) throw err
               res.send(result.rows);
          })
   
      }catch(err){
         if(err) return console.log(err);
      }
   });
   
   
   
   //update income
   router.patch('/income/:incomeid',verify,async(req,res)=>{
       let{expenseType, amount, date, expenseId}= req.body;
       try{
           await pool.query(
               `UPDATE 
               SET  amount=$1,
               date=$2,
               WHERE in_id = $3 RETURNING *`,
               [amount, date, expenseId],(err,result)=>{
                       if(err) throw err;
                       res.send(result.rows);
                   })
   
       }catch(err){
          if(err) return console.log (err);
       }
   });
   
   
   //delete income
   router.delete('/income',verify,async(req,res)=>{
       let {expenseId} = req.body;
       try{
            pool.query(`DELETE FROM expenses
            WHERE in_id = $1 RETURNING *`, [expenseId],(err,result)=>{
               if(err) throw err
               console.log("deleted successfully");
               res.send(result.rows);
           })
   
       }catch(err){
          if(err) return console.log(err);
       }
   });
   
 module.exports = router;