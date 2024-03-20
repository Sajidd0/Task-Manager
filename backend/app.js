import express from "express"
import cors from "cors"
import mysql from "mysql"
import 'dotenv/config'
const app = express();
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:process.env.DB_HOST ,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})
app.post("/alltasks/:ip",(req,res)=>{
    const q="SELECT * FROM tasks WHERE ip=?";
    const values=[req.params.ip]
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.json(err);
        }
        else
        {
            return res.json(data);
        }
    })
})
app.post("/add",(req,res)=>{
    const q="INSERT INTO tasks (`shortdes`, `date`, `longdes`, `assignedto`,`ip`) VALUES(?)";
    const obj=new Date();
    const date=obj.getDate()+"/"+obj.getMonth()+"/"+obj.getFullYear();
    const values=[
        req.body.shortdes,
        date,
        req.body.longdes,
        req.body.assignedto,
        req.body.ip,
    ]
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.json(err);
        }
        else
        {
            return res.json(data);
        }
    })
})
app.delete("/delete/:id",(req,res)=>{
    const q="DELETE FROM tasks WHERE id = ?";
    const values=[req.params.id]
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.json(err);
        }
        else
        {
            return res.json(data);
        }
    })
})
app.put("/update",(req,res)=>{
    const obj=new Date();
    const date=obj.getDate()+"/"+obj.getMonth()+"/"+obj.getFullYear();
    const q=`UPDATE tasks SET shortdes = '${req.body.shortdes}' , longdes = '${req.body.longdes}' , date = '${date}' , assignedto = '${req.body.assignedto}' ,modified = 1 WHERE id = ${req.body.id}`;
   
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        else
        {
            return res.json(data);
        }
    })
})
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Connected to backend")
})