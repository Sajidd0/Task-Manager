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
  
const AddTask=(props)=>{
    
    const handleOpen = () => props.setOpenAT(true);
    const handleClose = () => props.setOpenAT(false);
    const persons=["Sajid Saleem","Uzair Saleem","Sherdil Shahbaz Lodhi","Faiq Malik","Abdul Rafay"]
    const [wholedata,setwholedata]=React.useState({shortdes:"",longdes:"",assignedto:persons[0]});
    const handleChange = (event) => {
      setwholedata({ ...wholedata, [event.target.id]: event.target.value });
    };
    const addTask=()=>{
      Axios.post("add",{shortdes:wholedata.shortdes,longdes:wholedata.longdes,assignedto:wholedata.assignedto,ip:props.ip})
      .then((res) => {
        if (res.status === 200) {
          props.setchange("add");
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
    open={props.OpenAT}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={props.OpenAT}>
      <Box component={"div"} sx={style}>
        <Grid container>
            <Grid item xs={12} md={12}>
                <ValidationTextField
                 id="shortdes"
                 label="Short Description"
                 required
                 variant="outlined"
                 placeholder="Enter Short Description"
                 sx={{width:"100%"}}
                 onChange={handleChange}
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
                placeholder="Enter Long Description"
                multiline
                sx={{width:"100%"}}
                rows={3}
                onChange={handleChange}
                maxRows={4}
                />
            </Grid>
        </Grid>
        <Grid container sx={{mt:2}}>
            <Grid sx={{ display:"flex",justifyContent:"center"}} item xs={12} md={12}>
            <Button sx={{background:"#FF725E",color:"white",":hover":{color:"black",background:"transparent"},borderRadius:"15px",height:"50px",width:"150px"}} onClick={addTask}><b>Add</b></Button>
            </Grid>

        </Grid>
      </Box>
      </Fade>
      
      </Modal>
);
}
export default AddTask;