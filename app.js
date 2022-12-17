const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US",options);
    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item); 
        res.redirect("/");
    }
  
    // console.log(item);
   
});

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req,res){

    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.listen(PORT, function(){
    console.log("Server is running on port 3000");
});
