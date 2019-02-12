// var data = [{item: "a"}, {item: "b"}];
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://test:test123@ds133275.mlab.com:33275/todonew");
var todoSchema = new mongoose.Schema({
  item: String
});
var TODO = mongoose.model("TODO", todoSchema);
// var item = TODO({item: "aaaaaa"}).save(function(err){
//   if(err) throw err;
//   console.log("item saved");
// });
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app) {
app.get("/todo", function(req, res){
  TODO.find({}, function(err, data){
    if(err) {
      throw err;
    }
    res.render("todo", {todos: data});
  });
});
app.post("/todo", urlencodedParser, function(req, res){
  var newTODO = TODO(req.body).save(function(err, data){
    if(err) {
      throw err;
    }
    res.json(data);
  });
});
app.delete("/todo/:item", function(req, res){
  TODO.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if(err) {
      throw err;
    }
    res.json(data);
  });
  // data = data.filter(function(todo){
  //   return todo.item.replace(/ /g, "-") !== req.params.item;
  // });
  // res.json({todos: data});
});
};
