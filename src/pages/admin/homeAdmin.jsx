import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/siderbarComponent';
import CustomModal from '../../components/modalComponent';
import StackCumston from '../../components/stackComponent';
import { Button } from '@mui/material';
import { useUser } from '../../utils/authContext';

function HomeAdmin() {
    const [open, setOpen] = useState(false);
    const { user } = useUser();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Sidebar />
            <StackCumston>
                <div>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Open modal
                    </Button>
                    <CustomModal open={open} handleClose={handleClose}>
                    </CustomModal>
                </div>
            </StackCumston>
        </>
    );
}

export default HomeAdmin;
