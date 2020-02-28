var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'user1',
	password : 'user1',
	database : 'nodelogin'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});

app.post('/auth', function(request, response) 
{
       var users={
	"username":request.body.username,
	"password":request.body.password
        }
         connection.query('INSERT INTO accounts SET?',users, function(error, results, fields) {
	    if (error) {
				
        response.send({
            status:false,
            message:'there are some error with query'
        })
			} 
     else {
				response.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
          
        })
        //response.redirect('/home');
		}			
	//		response.end();
		});
	
});

//app.get('/home', function(request, response) {
//	if (request.session.loggedin) {
//		response.send('Welcome back, ' + request.session.username + '!');
//	} else {
//		response.send('Please login to view this page!');
//	}
//	response.end();
//});

app.listen(3008);
