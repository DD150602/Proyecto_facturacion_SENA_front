import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/siderbarComponent';
import { useUser } from '../../utils/authContext';

function HomeAdmin() {
    const { user } = useUser();

    return (
        <>
            <Sidebar />
        </>
    );
}

export default HomeAdmin;
