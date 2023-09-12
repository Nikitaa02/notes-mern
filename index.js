require("dotenv").config();
const cors = require("cors")
const express = require("express");
const connectDB = require("./connectDB")
const Notes = require('./models/Notes')

const app = express();
const PORT =process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/api/notes", async(req,res)=>{
    try {
        const data = await Notes.find({});
        if(!data){
            throw new Error('An error occured while fetching the notes.')
        }
        res.status(201).json(data);
    }
    catch(error){
        res.status(500).json({error: 'An error occured while fetching the notes...'})
    }
})

app.get("/api/notes/:id", async(req,res)=>{
    try {
        const noteId = req.params.id;
        const data = await Notes.findById(noteId);
        if(!data){
            throw new Error('An error occured while fetching the notes by id.')
        }
        res.status(201).json(data);
    }
    catch(error){
        res.status(500).json({error: 'An error occured while fetching the notes by id...'})
    }
})

app.put("/api/notes/:id", async(req,res)=>{
    try {
        const noteId = req.params.id;
        const { title, description } = req.body;
        const data = await Notes.findByIdAndUpdate(noteId, { title, description});
        if(!data){
            throw new Error('An error occured while updating a note.')
        }
        res.status(201).json(data);
    }
    catch(error){
        res.status(500).json({error: 'An error occured while  updating a note...'})
    }
})

app.post("/api/notes", async(req,res)=>{
    try {
        const { title, description } = req.body;
        const data = await Notes.create({title, description});
        if(!data){
            throw new Error('An error occured while creating a notes.')
        }
        res.status(201).json(data);
    }
    catch(error){
        res.status(500).json({error: 'An error occured while creating a notes...'})
    }
})

app.delete("/api/notes/:id", async(req,res)=>{
    try {
        const noteId = req.params.id;
        const data = await Notes.findByIdAndDelete(noteId);
        if(!data){
            throw new Error('An error occured while deleting a note.')
        }
        res.status(201).json(data);
    }
    catch(error){
        res.status(500).json({error: 'An error occured while  deleting a note...'})
    }
})

app.get("/", (req, res)=>{
    res.json("hello mate");
});

app.get('*',(req,res)=>{
    res.sendStatus("404");
})

app.listen(PORT, ()=>{
    console.log("Server is running")
})

