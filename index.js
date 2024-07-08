const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");



app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id :uuidv4(),
        username : "shivam",
        content : "Coding is life"
    },
    {
        id : uuidv4(),
        username : "Ayushi",
        content : "Hard wotk is important"
    },
    {
        id : uuidv4(),
        username : "Kaushik",
        content : "learning  is the key of sucess"
    },
    {
        id : uuidv4(),
        username : "Anmol",
        content : "Bharose wale ko, boshdi wale banne me time nhi lga"
    },
    {
        id : uuidv4(),
        username : "Manshi",
        content : "Nhi , ham kaha Gussa hai"
    }
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
})

app.post("/posts",(req,res) => {
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res) =>{
        let {id} = req.params;
        let post = posts.find((post) => post.id === id);
        res.render("show.ejs",{post});
        console.log("req working");
})

app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newContent  = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
    
})

app.get("/posts/:id/edit", (req,res) =>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    
    res.redirect("/posts");
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});