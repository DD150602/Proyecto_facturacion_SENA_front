import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const CustomModal = ({ open, handleClose, children }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ style: { backgroundColor: "transparent" } }}
        >
            <Slide direction="down" in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "30%",
                        left: "40%",
                        transform: "translate(-50%, -50%)",
                        minWidth: 300,
                        bgcolor: "background.paper",
                        borderRadius: "10px",
                        boxShadow: 5,
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "grey",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {children}
                </Box>
            </Slide>
        </Modal>
    );
};

export default CustomModal;