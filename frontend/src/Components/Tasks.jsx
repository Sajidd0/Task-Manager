import React from "react";
import { Box, Button, Divider, Grid,Typography,IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from "../Modals/DeleteModal";
import EditTask from "../Modals/EditTask";
const Tasks=(props)=>{
    const [OpenDT,setOpenDT]=React.useState(false);
    
    const [OpenET,setOpenET]=React.useState(false);
    return (
        <Box sx={{backgroundColor:"#ffe8e6",borderRadius:"20px",width:"95%",height:{md:"70px",xs:"135px"},mt:2}}>
            <Grid item container xs={12} md={12}>
                <Grid sx={{display:"flex",justifyContent:"start",pl:2,pt:1.5}} item container xs={12} md={8}>
                    <Grid item xs={12} md={12}>
                        <Typography align="start" variant="subtitle2" fontWeight={"bold"}>
                            {props.item.shortdes}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography align="start"  variant="subtitle2">
                            {props.item.modified == 1 ? <>Modified:</>:<>Date:</>} {props.item.date}
                        </Typography>
                    </Grid>

                </Grid>
                <Grid sx={{display:"flex",justifyContent:{md:"end",xs:"start"}}} item container xs={12} md={2}>
                    <Grid item xs={3} md={12}>
                        <Typography sx={{textAlign:{md:"end",xs:"start"},pl:{xs:2,md:0}}} variant="subtitle2" fontWeight={"bold"}>
                            <b>Assigned to </b>
                        </Typography>
                    </Grid>
                    <Grid item xs={9} md={12}>
                        <Typography sx={{textAlign:{md:"end",xs:"start"}}} variant="subtitle2">
                            {props.item.assignedto}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{display:"flex",justifyContent:{md:"end",xs:"start"}}} item container xs={1} md={1.5}>
                    <IconButton aria-label="edit" onClick={()=>{setOpenET(true)}}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Grid>
                <Grid sx={{display:"flex",justifyContent:{md:"end",xs:"start"}}} item container xs={11} md={0.5}>
                    <IconButton aria-label="delete" onClick={()=>{setOpenDT(true)}}>
                        <DeleteIcon sx={{color:"red"}} />
                    </IconButton>
                </Grid>
                <hr
                    style={{
                      background: "black",
                      color: "white",
                      height: "3px",
                      marginTop:"10px",
                      borderRadius:"50px",
                      width: "80%",
                    }} />
            </Grid>
            <EditTask
             OpenET={OpenET}
             setOpenET={setOpenET}
             item={props.item}
             setchange={props.setchange}
             setOpen={props.setOpen}
             setalert={props.setalert}
             setmessage={props.setmessage}
            />
            <DeleteModal
             OpenDT={OpenDT}
             setOpenDT={setOpenDT}
             id={props.item.id}
             setchange={props.setchange}
             setOpen={props.setOpen}
             setalert={props.setalert}
             setmessage={props.setmessage}
            />
        </Box>
    );
}
export default Tasks;