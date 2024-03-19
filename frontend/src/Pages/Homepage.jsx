import React from "react";
import { Box, Button, Divider, Grid,Typography } from "@mui/material";
import picture from "../Assets/background1.jpg"
import Lottie from 'lottie-react';
import animationData from '../Assets/Animation.json';
import { useNavigate } from "react-router-dom";
import '../App.css'
const Homepage=(props)=>{
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
      let navigate=useNavigate();
    return (
        <Box sx={{height:"100vh"}}>
            <Grid alignItems="center" sx={{minHeight: '100vh'}} container>
            <Grid  sx={{ display:"flex",justifyContent:"center"}} item container xs={12} md={6}>
                <Grid sx={{ display:"flex",justifyContent:"center"}} item xs={11} md={8}>
                     <Typography align="center" sx={{fontSize:{md:"60px",xs:"45px"},fontWeight:"bold"}} >
                         Manage your tasks with the our new and latest Task Manager
                     </Typography>
                </Grid>
                <Grid sx={{ display:"flex",justifyContent:"center",mt:5}} item container xs={12} md={8}>
                    <Grid sx={{ display:"flex",justifyContent:"end"}} item xs={3.5} md={3.5}>
                        <Button sx={{backgroundColor:"#FF725E",color:"white",borderRadius:"30px",width:150,height:50,":hover":{color:"black"}}} onClick={()=>{navigate("/viewtasks")}}> View Tasks</Button>
                    </Grid>
                  
                     
                </Grid>
            </Grid>
            <Grid sx={{ display:"flex",justifyContent:"center"}} item container xs={12} md={6}>
                <Lottie
	                loop={true}
                    autoplay= {true}
                    animationData= {animationData}
                    width={100}
                    height={100}
                />
            </Grid>

        </Grid>
        </Box>
        
        
    );
}
export default Homepage;