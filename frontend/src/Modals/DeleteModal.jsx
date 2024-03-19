import React from "react";
import { alpha, styled } from '@mui/material/styles';
import { Backdrop, Box, Card,TextField, CardMedia, Fade, Grid, Modal, Typography,Autocomplete,Button } from "@mui/material";
import Axios from "../Services/Axios";
import Snackbar from "../Components/Snackbar"
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width:{md:"25%",xs:"90%"},

    transform: "translate(-50%, -50%)",
    
    bgcolor: "white",
    // border: '3px solid #357a38',
    borderRadius: 10,
    boxShadow: 24,
    p: 3,
  };
  
const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: '#E0E3E7',
      borderWidth: 1,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 4,
      padding: '4px !important',
    },
  });
  
const DeleteModal=(props)=>{
    
    const handleOpen = () => props.setOpenDT(true);
    const handleClose = () => props.setOpenDT(false);
    const[open,setOpen]=React.useState(false);
    const[alert,setalert]=React.useState("");
    const[message,setmessage]=React.useState("");
    const deleteTask=()=>{
      Axios.delete("delete/"+props.id)
      .then((res) => {
        if (res.status === 200) {
          props.setchange("delete");
          props.setOpen(true);
          props.setalert("success");
          props.setmessage("Task Deleted Successfully");
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 408) {
    
        }
      });
    }

return (
  <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={props.OpenDT}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={props.OpenDT}>
      <Box component={"div"} sx={style}>
        <Grid container>
            <Grid item xs={12} md={12}>
                <Typography variant="h6" align="center">
                    Are you sure you want to delete this task?
                </Typography>

            </Grid>
        </Grid>
            
        <Grid container sx={{mt:2}}>
            <Grid sx={{ display:"flex",justifyContent:"center"}} item xs={6} md={6}>
            <Button sx={{background:"grey",color:"white",":hover":{color:"black",background:"transparent"},borderRadius:"15px",height:"50px",width:"100px"}} onClick={handleClose}><b>No</b></Button>
            </Grid>
            <Grid sx={{ display:"flex",justifyContent:"center"}} item xs={6} md={6}>
            <Button sx={{background:"red",color:"white",":hover":{color:"black",background:"transparent"},borderRadius:"15px",height:"50px",width:"100px"}} onClick={deleteTask}><b>Yes</b></Button>
            </Grid>

        </Grid>
      </Box>
      </Fade>
      
      </Modal>
);
}
export default DeleteModal;