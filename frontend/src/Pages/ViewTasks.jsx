import React from "react";
import { Box, Button, Divider, Grid,Typography } from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Tasks from "../Components/Tasks"
import AddTask from "../Modals/AddTask.jsx"
import Axios from "../Services/Axios.jsx";
import Snackbar from "../Components/Snackbar.jsx"
const ViewTasks=(props)=>{
    const [OpenAT,setOpenAT]=React.useState(false);
    const [data,setdata]=React.useState([]);
    const[open,setOpen]=React.useState(false);
    const[alert,setalert]=React.useState("");
    const[message,setmessage]=React.useState("");
    const [change,setchange]=React.useState("");
    const [ipAddress, setIPAddress] = React.useState('');
    React.useEffect(()=>{
        fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {Axios.post("alltasks/"+data.ip)
        .then((res) => {
          if (res.status === 200) {
              setchange("");
              setdata(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 401) {
  
          }})
        .catch(error => console.log(error))
     }) },[change])
    return (
        <Box sx={{height:"100vh",mt:20}}>
        <Grid sx={{display:"flex",justifyContent:{xs:"center",md:"start"}}}  container>
            <Grid sx={{display:"flex",justifyContent:"center"}} item xs={12} md={12}>
                <Typography align="center" sx={{fontSize:{md:"60px",xs:"32px"}}} fontWeight={"bold"}>
                    View All Tasks Here
                </Typography>
            </Grid>
            <Grid sx={{display:"flex",justifyContent:"center"}} item xs={10} md={12}>
                <Typography align="center" variant="subtitle2" mt={1} fontWeight={"bold"}>
                    You can view each task in more detail by clicking on it and can also edit , delete each task.
                </Typography>
            </Grid>
            <Grid sx={{display:"flex",justifyContent:"end",mt:5}} item xs={5} md={10}>
                <Button sx={{background:"#FF725E",color:"white",":hover":{background:"transparent",color:"#FF725E"},borderRadius:"10px",width:"150px"}} startIcon={<ControlPointIcon />} onClick={()=>{setOpenAT(true)}}> Add Task</Button>
            </Grid>
            <Grid sx={{display:"flex",justifyContent:"end",mt:2}} item container xs={12} md={10}>
                
                    <Grid sx={{width:"80%",height:"100%",display:"flex",justifyContent:{md:"end",xs:"center"}}} item container xs={12} md={10}>
                       {data.map((option)=>(
                        <>
                            <Tasks item={option} setchange={setchange} setOpen={setOpen} setalert={setalert} setmessage={setmessage}/>
            
                        </> 
                      
                        
                    ))} 
                    </Grid>
             
                
            </Grid>
         </Grid>
         <AddTask
          OpenAT={OpenAT}
          setOpenAT={setOpenAT}
          setchange={setchange}
          setOpen={setOpen}
          setalert={setalert}
          setmessage={setmessage}
          ip={ipAddress}
          />
            <Snackbar
          open={open}
          setOpen={setOpen}
          alert={alert}
          message={message}
        />
        </Box>
    );
}
export default ViewTasks;