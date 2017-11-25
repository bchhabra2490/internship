var mysql = require('mysql');
const express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');

const app = express();

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.multipart());
app.use(bodyparser.json());

app.use(function(req,res,next){
    res.locals.connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        port:3306,
        password:'root',
        database:'TEST_DB'
    });
    res.locals.connection.connect();
    next();
});

// app.use('/',index);


app.get('/api/products',function(req,res,next){
    res.locals.connection.query('Select * from product_prof',function(error,results,fields){
        if(error) {res.send(JSON.stringify({"status": 500, "error": error, "response": null}));}
        else{res.send(JSON.stringify({"status":200,"error":null,"response":results}));}
    });
});

app.get('/api/companies',function(req,res,next){
    res.locals.connection.query('Select * from company_prof',function(error,results,fields){
        if(error) {res.send(JSON.stringify({"status": 500, "error": error, "response": null}));}
        else{res.send(JSON.stringify({"status":200,"error":null,"response":results}));}
    });
});

app.get('/api/companies/:name',function(req,res,next){
    res.locals.connection.query('Select * from product_prof where company_name = "'+(req.params.name)+'"',function(error,results,fields){
        if(error) {res.send(JSON.stringify({"status": 500, "error": error, "response": null}));}
        else{res.send(JSON.stringify({"status":200,"error":null,"response":results}));}
    });
});

app.get('/api/products/:productid',function(req,res,next){
    res.locals.connection.query('Select * from product_prof where id='+(req.params.productid),function(error,results,fields){
        if(error) {res.send(JSON.stringify({"status": 500, "error": error, "response": null}));}
        else{res.send(JSON.stringify({"status":200,"error":null,"response":results}));}
    });
});

app.get('/api/reviews/:productid',function(req,res,next){
    res.locals.connection.query('Select * from review_prof where product_id='+(req.params.productid),function(error,results,fields){
        if(error) {res.send(JSON.stringify({"status": 500, "error": error, "response": null}));}
        else{res.send(JSON.stringify({"status":200,"error":null,"response":results}));}
    });
});

app.get('/api/reviews/:productid/:reviewid',function(req,res,next){
    res.locals.connection.query('Select * from review_prof where id='+(req.params.reviewid) + ' and product_id = '+(req.params.productid),function(error,results,fields){
        if(error) {res.send(JSON.stringify({"status": 500, "error": error, "response": null}));}
        else{res.send(JSON.stringify({"status":200,"error":null,"response":results}));}
    });
});

//post requests
app.post('/api/post/reviews',function(req,res,next){
    res.locals.connect.query('Insert into review_prof(product_id,review,rating) VALUES("'+(req.body.productid)+'","'+(req.body.desc)+'","'+(req.body.rating)+'")',function(error,results,fields){
        if(error) {res.send(JSON.stringify({"status": 500, "error": error, "response": null}));}
        else{res.send(JSON.stringify({"status":200,"error":null,"response":results}));}
    });
});

const server = app.listen(3000,()=>{
    const {address, port} = server.address();
    console.log(`Listening at http://${address}:${port}`);
})