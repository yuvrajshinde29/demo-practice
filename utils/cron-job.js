const cron = require('node-cron');

cron.schedule('* * * * * 3',()=>{
    console.log("task running every sec on wednesday" ,new Date().toLocaleString())
})

/*
5 * * * * *  At 5 seconds of every minute               
* 1 * * * *  Every second during minute 1 of each hour  
* * 1 * * *  Every second during hour 1 AM every day    
* * * 1 * *  Every second on the 1st day of every month 
* * * * 1 *  Every second in the month of February      
* * * * * 1  Every second on Monday                     
 */