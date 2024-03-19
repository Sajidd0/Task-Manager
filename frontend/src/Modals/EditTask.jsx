import React from "react";
import { alpha, styled } from '@mui/material/styles';
import { Backdrop, Box, Card,TextField, CardMedia, Fade, Grid, Modal, Typography,Autocomplete,Button } from "@mui/material";
import Axios from "../Services/Axios";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width:{md:"50%",xs:"90%"},

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
  
const EditTask=(props)=>{
    
    const handleOpen = () => props.setOpenET(true);
    const handleClose = () => props.setOpenET(false);
    const persons=["Sajid Saleem","Uzair Saleem","Sherdil Shahbaz Lodhi","Faiq Malik","Abdul Rafay"]
    const [wholedata,setwholedata]=React.useState({shortdes:props.item.shortdes,longdes:props.item.longdes,assignedto:props.item.assignedto});
    const handleChange = (event) => {
      setwholedata({ ...wholedata, [event.target.id]: event.target.value });
    };
    const editTask=()=>{
      Axios.put("update",{shortdes:wholedata.shortdes,longdes:wholedata.longdes,assignedto:wholedata.assignedto,id:props.item.id})
      .then((res) => {
        if (res.status === 200) {
          props.setchange("update");
          props.setOpen(true);
          props.setalert("success");
          props.setmessage("Task Added Successfully");
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
    open={props.OpenET}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={props.OpenET}>
      <Box component={"div"} sx={style}>
        <Grid container>
            <Grid item xs={12} md={12}>
                <ValidationTextField
                 id="shortdes"
                 label="Short Description"
                 required
                 variant="outlined"
                 defaultValue={wholedata.shortdes}
                 placeholder="Enter Short Description"
                 onChange={handleChange}
                 sx={{width:"100%"}}
                />
            </Grid>
        </Grid>
        <Grid container sx={{mt:2}}>
            <Grid item xs={12} md={12}>
                <Autocomplete
				disableCloseOnSelect
				id="combo-box-demo"
				color={"success"}
				options={persons}
				sx={{ width: "50%" }}
				getOptionLabel={(option) => option}
				isOptionEqualToValue={(option, value) => {
					return option === value;
				}}
				noOptionsText={"Person Not Found."}
				value={wholedata.assignedto}
				onChange={(event, newValue) => {
          setwholedata({ ...wholedata, assignedto: newValue });
				}}
				renderInput={(params) => <TextField id="validation-outlined-input" {...params} label="Assign To" />}
				/>
            </Grid>
        </Grid>
        <Grid container sx={{mt:2}}>
            <Grid item xs={12} md={12}>
                <TextField
                  id="longdes"
                label="Long Description"
                defaultValue={wholedata.longdes}
                placeholder="Enter Long Description"
                multiline
                sx={{width:"100%"}}
                onChange={handleChange}
                rows={3}
                maxRows={4}
                />
            </Grid>
        </Grid>
        <Grid container sx={{mt:2}}>
            <Grid sx={{ display:"flex",justifyContent:"center"}} item xs={6} md={6}>
            <Button sx={{background:"grey",color:"white",":hover":{color:"black",background:"transparent"},borderRadius:"15px",height:"50px",width:"150px"}}><b>Cancel</b></Button>
            </Grid>
            <Grid sx={{ display:"flex",justifyContent:"center"}} item xs={6} md={6}>
            <Button sx={{background:"#FF725E",color:"white",":hover":{color:"black",background:"transparent"},borderRadius:"15px",height:"50px",width:"150px"}} onClick={editTask}><b>Update</b></Button>
            </Grid>

        </Grid>
      
      </Box>
      </Fade>
      </Modal>
);
}
export default EditTask;