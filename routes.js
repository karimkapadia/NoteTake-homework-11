const fs  = require('fs');
const express =  require('express');
const { Console } = require('console');
const app = express();
const router =require ('express').Router();

let list =[]

router.get('/notes',function(req, res) {
    //   console.log("get request is running");
        const result = fs.readFileSync('./app/db.json','UTF-8')
        list= JSON.parse(result)
        //  console.log(result);
        res.send(list);   
})

router.post('/notes', function(req, res) {
    console.log(req.body);
    newNote={id:Math.round(Math.random() * 1000), title:req.body.title, text:req.body.text};
    console.log(newNote);

    const result = fs.readFileSync('./app/db.json','UTF-8')
    list= JSON.parse(result)

    list.push(newNote);
     fs.writeFileSync('./app/db.json',JSON.stringify(list));    
     res.send(newNote)
 });

 router.delete('/notes/:id', function(req, res) {
    console.log(req.params.id);
    
    const result = fs.readFileSync('./app/db.json','UTF-8')
    list= JSON.parse(result)
    
    list.map((item)=>{
        
       if(item.id == req.params.id)
       {
           let index = list.indexOf(item)
           console.log(item.id)
            console.log(index);
             list.splice(index,1);
            
       }
     
    })
    console.log(list);
   const finalArray= fs.writeFileSync('./app/db.json',JSON.stringify(list));    
    res.send(list);
    
 });



module.exports = router;
