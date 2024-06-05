import { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert, Snackbar, Fade } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'
import AnimacionSvg from './animacionSVG'

const defautlvalues = {
  primer_nombre_cliente: '',
  segundo_nombre_cliente: '',
  primer_apellido_cliente: '',
  segundo_apellido_cliente: '',
  numero_documento_cliente: '',
  correo_cliente: '',
  telefono_cliente: '',
  direccion_cliente: ''
}

export default function EditarCliente ({ id }) {
  const { values, handleInputChange, setValues } = useForm(defautlvalues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlvalues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    const dataCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:4321/gestion_cliente/get_cliente/${id}`)
        setDisabled(false)
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
    setMensajeError(message)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const UpdateUser = async (e) => {
    e.preventDefault()
    setValuesError(defautlvalues)
    setMostrarAlerta(false)
    try {
      const response = await axios.patch(`http://localhost:4321/gestion_cliente/update_cliente/${id}`, values)
      if (response.data.message === 'Actualizacion con exito') {
        showSnackbar(response.data.message)
      }
      setDisabled(true)
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
      setMostrarAlerta(true)
    }
  }

  return (
    <>
      <form className='rounded-lg' onSubmit={UpdateUser}>
        <Grid container spacing={2} columns={12} className='max-w-[900px] '>
          <Grid item xs={12} sm={4}>
            <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
              <AnimacionSvg />
            </div>
          </Grid>
          <Grid item xs={12} sm={8} className='pb-2'>
            <h1 className='text-3xl text-center mt-3 mb-1 font-semibold text-gray-500'>Editar Informacion del Cliente</h1>
            {mostrarAlerta &&
              <Fade in={mostrarAlerta} timeout={300} className='mb-4'>
                <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
                  {mensajeError}
                </Alert>
              </Fade>}
            <Grid container spacing={2} columns={12} className='pl-2 pr-2 pb-1 pt-1 overflow-y-scroll h-[450px]'>
              <Grid item xs={12} sm={6}>
                <Input
                  id='primer_nombre_cliente'
                  label='Primer Nombre'
                  name='primer_nombre_cliente'
                  value={values.primer_nombre_cliente}
                  onChange={handleInputChange}
                  error={recognizeEmptyName('primer_nombre_cliente')}
                  helperText={valuesError.primer_nombre_cliente}
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  className={`w-full inline-block px-6 py-3 bg-gray-800 text-white rounded-lg  hover:bg-gray-700 transition duration-300 ease-in-out font-semibold hover:-translate-y-px active:opacity-85 hover:shadow-md ${disabled ? 'opacity-50' : ''}`}
                  disabled={disabled}
                >
                  Actualizar
                </button>
              </Grid>
            </Grid>
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
