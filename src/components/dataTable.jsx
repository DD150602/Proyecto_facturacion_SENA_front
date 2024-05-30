import { DataGrid, esES } from '@mui/x-data-grid'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { Alert, Snackbar, Slide, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'

const theme = createTheme({
    palette: {
        primary: { main: '#4B5563' },
        background: {
            default: '#ffffff'
        },
        text: {
            primary: '#333',
            secondary: '#555'
        }
    },
    typography: {
        fontFamily: 'Lato, "Helvetica Neue", Arial, sans-serif'
    }
}, esES)

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 'bold',
        borderBottom: 'none',
    },
    '& .MuiDataGrid-cell': {
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiDataGrid-row:hover': {
        backgroundColor: '#fff',
    },
    '& .MuiDataGrid-footerContainer': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderTop: 'none',
    },
    '& .MuiTablePagination-root': {
        color: '#fff',
    },
}))

function SlideTransition(props) {
    return <Slide {...props} direction="down" />
}

export default function DataTable(props) {
    const { columns, rows, selectId } = props
    const [loading, setLoading] = useState(true)
    const [selectedRow, setSelectedRow] = useState(null)
    const [alertOpen, setAlertOpen] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    const handleRowSelection = (selection) => {
        const selectedId = selection.length > 0 ? selection[selection.length - 1] : null
        if (selectedId !== selectedRow) {
            setSelectedRow(selectedId)
            selectId(selectedId)
            setAlertOpen(true)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className="mt-3 pl-10 pr-10">
                <StyledDataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 }
                        }
                    }}
                    pageSizeOptions={[5, 10]}
                    loading={loading}
                    disableSelectionOnClick
                    onRowSelectionModelChange={(selection) => handleRowSelection(selection)}
                    selectionModel={selectedRow ? [selectedRow] : []}
                />
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={1000}
                    onClose={() => setAlertOpen(false)}
                    TransitionComponent={SlideTransition}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%', top: '80%' }}>
                        Has seleccionado una fila: {selectedRow}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    )
}
