import { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert, Snackbar } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'



const defautlvalues = {
    primer_nombre_cliente: '',
    segundo_nombre_cliente: '',
    primer_apellido_cliente: '',
    segundo_apellido_cliente: '',
    numero_documento_cliente: '',
    correo_cliente: '',
    telefono_cliente: '',
    direccion_cliente: '',
}

export default function EditarCliente({ id }) {
    const { values, handleInputChange, setValues } = useForm(defautlvalues)
    const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlvalues)
    const [mostrarAlerta, setMostrarAlerta] = useState(false)
    const [mensajeError, setMensajeError] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const dataCliente = async () => {
            try {
                const response = await axios.get(`http://localhost:4321/gestion_cliente/get_cliente/${id}`)

                setValues({
                    primer_nombre_cliente: response.data[0].primer_nombre_cliente,
                    segundo_nombre_cliente: response.data[0].segundo_nombre_cliente,
                    primer_apellido_cliente: response.data[0].primer_apellido_cliente,
                    segundo_apellido_cliente: response.data[0].segundo_apellido_cliente,
                    numero_documento_cliente: response.data[0].numero_documento_cliente,
                    correo_cliente: response.data[0].correo_cliente,
                    telefono_cliente: response.data[0].telefono_cliente,
                    direccion_cliente: response.data[0].direccion_cliente
                })
            } catch (error) {
                console.error('Error al obtener datos:', error)
            }
        }

        dataCliente()
    }, [id, setValues])
    const showSnackbar = (message) => {
        setMensajeError(message);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const UpdateUser = async (e) => {
        e.preventDefault()
        setValuesError(defautlvalues)
        setMostrarAlerta(false)
        try {
            const response = await axios.patch(`http://localhost:4321/gestion_cliente/update_cliente/${id}`, values)
            setValues(defautlvalues)
            if (response.data.message === 'Actualizacion con exito') {
                showSnackbar(response.data.message);
            }
        } catch (error) {
            let errorMessage = 'Error de Actualizacion'
            if (error.response.data.objectError) goOverErrors(error.response.data.objectError, handleSettingError)
            else if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message
            } else if (error.message) {
                errorMessage = error.message
            }
            setMensajeError(errorMessage)
            setMostrarAlerta(true)
        }
    }

    return (
        <>
            <form className=' pt-2 pb-2' onSubmit={UpdateUser}>
                <h1 className='text-3xl text-center mb-5 font-semibold text-gray-500'>Editar Informacion del Cliente</h1>


                {mostrarAlerta && (
                    <Alert severity='error' variant='outlined' sx={{ width: '100%', marginBottom: '1rem' }}>
                        {mensajeError}
                    </Alert>
                )}
                <Grid container spacing={2} columns={12} className='max-w-[500px]'>
                    <Grid item xs={12} sm={6}>
                        <Input
                            id='primer_nombre_cliente'
                            label='Primer Nombre'
                            name='primer_nombre_cliente'
                            value={values.primer_nombre_cliente}
                            onChange={handleInputChange}
                            error={recognizeEmptyName('primer_nombre_cliente')}
                            helperText={valuesError.primer_nombre_cliente}
                            InputProps={{
                                endAdornment: recognizeEmptyName('primer_nombre_cliente') && (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end'>
                                            <ErrorOutlineIcon color='error' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            id='segundo_nombre_cliente'
                            label='Segundo Nombre'
                            name='segundo_nombre_cliente'
                            value={values.segundo_nombre_cliente}
                            onChange={handleInputChange}
                            error={recognizeEmptyName('segundo_nombre_cliente')}
                            helperText={valuesError.segundo_nombre_cliente}
                            InputProps={{
                                endAdornment: recognizeEmptyName('segundo_nombre_cliente') && (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end'>
                                            <ErrorOutlineIcon color='error' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            id='primer_apellido_cliente'
                            label='Primer Apellido'
                            name='primer_apellido_cliente'
                            value={values.primer_apellido_cliente}
                            onChange={handleInputChange}
                            error={recognizeEmptyName('primer_apellido_cliente')}
                            helperText={valuesError.primer_apellido_cliente}
                            InputProps={{
                                endAdornment: recognizeEmptyName('primer_apellido_cliente') && (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end'>
                                            <ErrorOutlineIcon color='error' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            id='segundo_apellido_cliente'
                            label='Segundo Apellido'
                            name='segundo_apellido_cliente'
                            value={values.segundo_apellido_cliente}
                            onChange={handleInputChange}
                            error={recognizeEmptyName('segundo_apellido_cliente')}
                            helperText={valuesError.segundo_apellido_cliente}
                            InputProps={{
                                endAdornment: recognizeEmptyName('segundo_apellido_cliente') && (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end'>
                                            <ErrorOutlineIcon color='error' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            id='numero_documento_cliente'
                            label='Numero Documento'
                            name='numero_documento_cliente'
                            value={values.numero_documento_cliente}
                            onChange={handleInputChange}
                            error={recognizeEmptyName('numero_documento_cliente')}
                            helperText={valuesError.numero_documento_cliente}
                            InputProps={{
                                endAdornment: recognizeEmptyName('numero_documento_cliente') && (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end'>
                                            <ErrorOutlineIcon color='error' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            id='correo_cliente'
                            label='Correo'
                            name='correo_cliente'
                            value={values.correo_cliente}
                            onChange={handleInputChange}
                            error={recognizeEmptyName('correo_cliente')}
                            helperText={valuesError.correo_cliente}
                            InputProps={{
                                endAdornment: recognizeEmptyName('correo_cliente') && (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end'>
                                            <ErrorOutlineIcon color='error' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            id='telefono_cliente'
                            label='Telefono'
                            name='telefono_cliente'
                            value={values.telefono_cliente}
                            onChange={handleInputChange}
                            error={recognizeEmptyName('telefono_cliente')}
                            helperText={valuesError.telefono_cliente}
                            InputProps={{
                                endAdornment: recognizeEmptyName('telefono_cliente') && (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end'>
                                            <ErrorOutlineIcon color='error' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input
                            id='direccion_cliente'
                            label='Direccion'
                            name='direccion_cliente'
                            value={values.direccion_cliente}
                            onChange={handleInputChange}
                            error={recognizeEmptyName('direccion_cliente')}
                            helperText={valuesError.direccion_cliente}
                            InputProps={{
                                endAdornment: recognizeEmptyName('direccion_cliente') && (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end'>
                                            <ErrorOutlineIcon color='error' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <button
                            type='submit'
                            className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
                        >
                            Actualizar
                        </button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
                    {mensajeError}
                </Alert>
            </Snackbar>

        </>


    )
}