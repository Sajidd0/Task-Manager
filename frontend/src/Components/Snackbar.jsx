import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";


const Alert = React.forwardRef(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function DirectionSnackbar(props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={props.open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={7500}
        sx={{ marginTop: "1.5rem" }}
      >
        <Alert severity={props.alert}>{props.message}</Alert>
      </Snackbar>
    </div>
  );
}
