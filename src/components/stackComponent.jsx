import React from 'react'
import Stack from '@mui/material/Stack';
function StackCumston({ children }) {
    return (
        <Stack
            sx={{
                position: 'fixed',
                top: 110,
                right: 15,
                bottom: 40,
                left: 'calc(16rem + 4px)',
                p: [3, 3, 4],
                width: '82%',
                minHeight: 300,
                display: 'flex',
                overflow: 'auto'
            }}
        >
            {children}
        </Stack>

    )
}

export default StackCumston;
