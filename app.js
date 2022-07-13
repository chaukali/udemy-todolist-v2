const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

let todoList = [];

app.get("/", function(req, res) {
  let date = new Date();
  let options = {
     weekday: 'long',
     month: 'long',
     day: 'numeric'
  };

  let today = date.toLocaleDateString('en-US', options);

  res.sendFile(__dirname + "/list.ejs");
  res.render("todo",{kindOfDate: today, listItem: todoList});
})

app.post("/", function(req, res) {
  let newItem = req.body.newItem;
  if(newItem != "") {
    todoList.push(newItem);
  }
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
