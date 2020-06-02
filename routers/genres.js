const express = require("express");
const router = express.Router();

const Joi = require('joi');
var genres = [
    { id: 1 ,name: "Horror"},
    { id: 2 ,name: "Romance"},
    { id: 3 ,name: "Comedy"}
];

const schema = {
    "name" : Joi.string().required().min(3)
}


router.get("/", (req,res) =>{
    var word = "The names of genre are: ";
    for(var i = 0; i < genres.length; i++) word = word + "<br>" + genres[i].name;  
    res.send(word);
});

router.post("/add", (req,res) => {
    if(req.body)
    {
        var result = Joi.validate(JSON.stringify(req.body), schema);
        if(!(result.error === null)) res.send(result.error.details[0].message);
        else{ 
            var n = { id: genres.length+1 , name: req.body.name}
            genres.push(n)
            res.send("New Genre added Successfully  "+JSON.stringify(genres))
        }   
    }
});

router.get("/:id", (req,res) => {
    var f = 0;
    for(var i=0; i<genres.length; i++){
        if(parseInt(req.params.id) === genres[i].id){
            f = 1;
            break;
        } 
    }
    if(f==1)    res.send(genres[i])
    else res.status(404).send("Course not found");
});

router.put("/:id", (req,res) => {
    var f = 0;
    for(var i=0; i<genres.length; i++){
        if(parseInt(req.params.id) === genres[i].id){
            f = 1;
            break;
        } 
    }
    if(f==1){ 
        genres[i].name = req.body.name
        res.send(genres[i])
    }
    else res.status(404).send("Genres not found");

});

router.delete("/:id", (req,res) => {
    var f = 0;
    for(var i=0; i<genres.length; i++){
        if(parseInt(req.params.id) === genres[i].id){
            f = 1;
            break;
        } 
    }
    if(f==1){ 
        var d = genres.splice(i,1);
        res.send(genres);
    }
    else res.status(404).send("Genres not found");
});

module.exports = router; 