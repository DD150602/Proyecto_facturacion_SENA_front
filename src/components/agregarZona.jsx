import React, { useState } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import { Grid, TextField, InputAdornment, IconButton, Snackbar, Alert, Fade } from '@mui/material'
import useForm from '../hooks/UseForm'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { goOverErrors } from '../utils/goOverErros'
import AnimacionSvg from './animacionSVG'
import { api } from '../utils/conection'

const defaultValues = {
  nombreZona: '',
  descripcionZona: ''
}

export default function AgregarZona (props) {
  const { setActualizar } = props
  const { values, handleInputChange, setValues } = useForm(defaultValues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defaultValues)
  const [generalError, setGeneralError] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const createZona = async (e) => {
    e.preventDefault()
    setValuesError(defaultValues)
    setGeneralError('')
    try {
      const response = await api.post('zona/crear_zona', values)
      setSnackbarMessage(response.data.message || 'Zona agregada con éxito')
      setOpenSnackbar(true)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defaultValues)
    } catch (error) {
      let errorMessage = 'Error de autenticación'
      if (error.response.data.objectError) goOverErrors(error.response.data.objectError, handleSettingError)
      else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      setGeneralError(errorMessage)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <form className='rounded-lg'>
      <Grid container spacing={2} columns={12} className='max-w-[600px]'>
        <Grid item xs={12} sm={5}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <AnimacionSvg />
          </div>
        </Grid>
        <Grid item xs={12} sm={7} className='pb-2'>
          <h1 className='text-3xl text-center mt-3 mb-1 pr-8 font-semibold text-gray-500'>Registrar zona</h1>
          {generalError &&
            <Fade in={generalError} timeout={300} className='mb-4'>
              <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
                {generalError}
              </Alert>
            </Fade>}
          <Grid container spacing={2} columns={12} className='pl-2 pr-2 pb-1 pt-2 overflow-y-scroll h-[290px]'>
            <Grid item xs={12}>
              <Input
                id='nombreZona'
                label='Nombre zona'
                name='nombreZona'
                value={values.nombreZona}
                onChange={handleInputChange}
                error={recognizeEmptyName('nombreZona')}
                helperText={valuesError.nombreZona}
                InputProps={{
                  endAdornment: recognizeEmptyName('nombreZona') && (
                    <InputAdornment position='end'>
                      <IconButton edge='end'>
                        <ErrorOutlineIcon color='error' />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='descripcionZona'
                label='Descripción zona'
                name='descripcionZona'
                value={values.descripcionZona}
                onChange={handleInputChange}
                multiline
                rows={4}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                fullWidth
                variant='outlined'
                error={recognizeEmptyName('descripcionZona')}
                helperText={valuesError.descripcionZona}
              />
            </Grid>
            <Grid item xs={12} className='flex justify-center'>
              <button
                type='submit'
                className='w-full inline-block px-6 py-3 bg-gray-800 text-white rounded-lg  hover:bg-gray-700 transition duration-300 ease-in-out font-semibold hover:-translate-y-px active:opacity-85 hover:shadow-md '
                onClick={createZona}
              >
                Agregar
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </form>
  )
}
