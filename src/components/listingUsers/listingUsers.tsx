import React from "react";

import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FormSteps } from "../formSteps/FormSteps";
import Table from "../table/Table";
import { Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export function ListingUsers() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Table />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Cadastrar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <FormSteps handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
