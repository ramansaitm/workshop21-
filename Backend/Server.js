const express = require("express");
const notes = require("./Data/notes");
const UseRoutes = require("./routes/UserRoutes");
const cors=require("cors")
const mongoose = require("mongoose");
const dotenv=require('dotenv');
const { errorHandler,notFound } = require("./midleware/errormiddleware");
dotenv.config();
const app = express()

app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello world we are here from nodejs express");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.use(cors())
app.use("/api/user", UseRoutes);

//middleware
app.use(notFound,errorHandler);
//Mongodb connect
mongoose.connect("mongodb+srv://ramansaitm:raman1234@cluster0.lwlui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true})
.then(() => {
    console.log("mongo connected")
})
mongoose.connection.on('error', err => {
    console.log(`db connection error ,${eror}`)
})


const port = process.env.PORT || 3001;
app.listen(port, (req, res) => {
  console.log(`Hi we are creating a new server ${port}`);
});
