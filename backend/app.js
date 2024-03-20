import express from "express"
import cors from "cors"
import mysql from "mysql"
import 'dotenv/config'
const app = express();
app.use(cors());
app.use(express.json());
const url='mysql://root:LrDtnRiwkULYttHRdLDmgbsjVIVIdRnE@monorail.proxy.rlwy.net:3306/railway';
async function connectToDatabase() {
    try {
      const connection = await mysql.createConnection(url);
      return connection;
    } catch (err) {
      console.error('error connecting:', err);
      throw err;
    }
  }
app.post("/alltasks/:ip",async (req,res)=>{
    const q="SELECT * FROM tasks WHERE ip=?";
    const db = await connectToDatabase();
    console.log("Connection made");
    try
    {
        const values=[req.params.ip]
        db.query(q,[values],(err,data)=>{
            if (err) {
                return res.status(401).json({ success: false, error: err.message });
            }
            else
            {
                return res.json(data);
            }
        })
    }
    catch(err)
    {
        console.log("Error in Connection ")
    }
    finally{
        db.end();
    }
   
})
app.post("/add",async (req,res)=>{
    const q="INSERT INTO tasks (`shortdes`, `date`, `longdes`, `assignedto`,`ip`) VALUES(?)";
    const db = await connectToDatabase();
    try
    {
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
            if (err) {
                return res.status(401).json({ success: false, error: err.message });
            }
            else
            {
                return res.json(data);
            }
        })
    }
    catch(err)
    {
        console.log("Error in Connection ")
    }
    finally{
         db.end();
    }
})
app.delete("/delete/:id",async(req,res)=>{
    const q="DELETE FROM tasks WHERE id = ?";
    const db = await connectToDatabase();
    try
    {
        const values=[req.params.id]
        db.query(q,[values],(err,data)=>{
            if (err) {
                return res.status(401).json({ success: false, error: err.message });
            }
            else
            {
                return res.json(data);
            }
        })
    }
    catch(err)
    {
        console.log("Error in Connection ")
    }
    finally{
         db.end();
    }
})
app.put("/update",async(req,res)=>{
    const obj=new Date();
    const date=obj.getDate()+"/"+obj.getMonth()+"/"+obj.getFullYear();
    const q=`UPDATE tasks SET shortdes = '${req.body.shortdes}' , longdes = '${req.body.longdes}' , date = '${date}' , assignedto = '${req.body.assignedto}' ,modified = 1 WHERE id = ${req.body.id}`;
    const db = await connectToDatabase();
    try
    {
        db.query(q,(err,data)=>{
            if (err) {
                return res.status(401).json({ success: false, error: err.message });
            }
            else
            {
                return res.json(data);
            }
        })
    }
    catch(err)
    {
        console.log("Error in Connection ")
    }
    finally{
         db.end();
    }
})
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Connected to backend")
})