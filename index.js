const express=require("express");
const database=require("./config/database");
const routes=require("./routes/signUpRoute")
const cors=require("cors")
require("dotenv").config();
const app=express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.urlencoded({ extended: true }));
database();
app.listen(process.env.PORT,()=>{
console.log(`Server is running on port ${process.env.PORT}`);
})

app.get("/",(req,res)=>{
    res.send("hello world")

})
app.use("/api/v1",routes)