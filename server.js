var express=require('express');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var ejs=require('ejs');

mongoose.connect('mongodb+srv://dbUser:root@cluster0-gvb6v.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });
mongoose.Promise=global.Promise;

var app=express();

app.use(bodyparser.json());

// app.set('views', __dirname + '/views');
app.set("view engine","ejs");

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
var schema=mongoose.Schema;

var contact=new schema({
    email:String,
    name:String,
    phonenumber:Number
});
  
var details=new schema({
    name:String,
    pno:Number,
    email:String,
    pass:String
});

var detailsmodel=mongoose.model('detailsmodel',details);
var contactmodel=mongoose.model('contactmodel',contact);
var eee;
var contacts=[];

app.get("/",function(req,res){
    res.sendFile('/WEB/Phone directory/login.html');
});

app.get("/loginpage",function(req,res){
    res.sendFile('/WEB/Phone directory/login.html');
});

app.get("/register",function(req,res){
    res.sendFile('/WEB/Phone directory/register.html');
});

app.get("/registerpage",function(req,res){
    res.sendFile('/WEB/Phone directory/register.html');
});

app.get("/contact",function(req,res){
    if(eee!=null)
    {
       res.sendFile('/WEB/Phone directory/phonedirectory.html');
    }
    else
    {
        res.send('Invalid Details Please Login Again or Register if you are a new user');
    }
});

app.get("/showcontacts",function(req,res){
    var c=[];
    contactmodel.find({email:eee},function(err,docs){
        c=docs;
        console.log(c);
    }).then(function(){
        res.render('contacts',{con:c,email:eee});
        console.log('rendered');
    });
   
});

app.post("/register",function(req,res){
    console.log(req.body);
    var name=req.body.name;
    var pno=req.body.pno;
    var email=req.body.email;
    var pass=req.body.pass;
    console.log(email);
    var d1=new detailsmodel({"name":name,"pno":pno,"email":email,"pass":pass});
    d1.save();
    console.log('saved');
   
});

app.post("/login",function(req,res){
   
        var email=req.body.email;
        var pass=req.body.pass;
        console.log(email);
        detailsmodel.find({"email":email,"pass":pass},function(err,docs){
            console.log(docs[0]);
            if(docs[0]==null)
            {
                eee=null;
            }
            else
            {
                eee=docs[0].email;
            }
        });
       
});

app.post("/addcontact",function(req,res){
    var cname=req.body.cname;
    var cno=req.body.cno;
    console.log(cname);
    var c1=new contactmodel({"email":eee,"name":cname,"phonenumber":cno});
    c1.save();
    console.log("contact saved");
});



app.listen('8000',function(){
    console.log("listening to port 8000");
});