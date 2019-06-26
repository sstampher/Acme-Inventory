const express = require('express');
const port = 3000;
const app = express();
const path = require('path');
const { syncAndSeed, Product } = require('./db');

app.use(express.json())

syncAndSeed();

app.get('/api/products', async (req, res, next)=>{
    try{
        res.send( await Product.findAll())
    }
    catch(err){
        next(err);
    }
})

app.put('/api/products/:id', async (req, res, next)=>{
   
    try{
        
        const result = await Product.update( {status: req.body.changedStatus}, {where: {id:+req.params.id}, returning: true})
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>', result)
        res.send(result)
    }
    catch(err){
        next(err);
    }
})

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.listen(port, ()=>console.log(`listening on port ${port}`))