const mysql = require('mysql'),
    express = require('express'),
    path = require('path'),
    parser = require('body-parser'),
    router = express.Router();

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0440",
    database: "kfc"
})

conn.connect(function(err){
    if(err) throw err;
    console.log("Database connected")
})

app = express();
app.use(parser());
app.use(express.static(__dirname + 'public'));

app.listen(8080);

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/login.html');
})

app.get('/dashboard', function(req, res){
    res.render('pages/dashboard.ejs')
})

app.get('/register', function(req, res){
    res.render('pages/register.ejs')
})

app.post('/dashboard', function(req, res){
    conn.query("select id from login where id = ? and pwd = ?", [req.body.login, req.body.pwd], function(err, result, fields){
        console.log(result);
        if(result.length > 0){
            res.redirect('/dashboard');
           "Credentials verified"
        }else{
            res.send(500,'Check your credentials or register yourself')
            console.log("Credentials incorrect");
            //res.redirect('/login')
        }
    })
})

app.post('/login', function(req, res){
    conn.query("insert into login (id, pwd, name, branch, hostel, roll) values (?, ?, ?, ?, ?, ?)",[req.body.id, req.body.pwd, req.body.name, req.body.branch, req.body.hstl, req.body.rno], function(err, result, fields){
        console.log(result);
        if(err) throw err;

        console.log(req.body.hstl)
        res.redirect('/login');
    });
})

app.post('/bill', function (req, res) {
    console.log(req.body);
    console.log("Hello");

});

app.post
