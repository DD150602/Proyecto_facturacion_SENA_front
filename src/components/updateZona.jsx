import React, { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import { Grid, TextField, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material'
import useForm from '../hooks/UseForm'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'

const defaultValues = {
  nombreZona: '',
  descripcionZona: ''
}

export default function UpdateZona ({ id }) {
  const { values, setValues, handleInputChange } = useForm(defaultValues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defaultValues)
  const [generalError, setGeneralError] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    const fetchZoneData = async () => {
      try {
        const response = await axios.get(`http://localhost:4321/zona/${id}`)
        setValues({
          nombreZona: response.data[0].nombre_zona,
          descripcionZona: response.data[0].descripcion_zona
        })
      } catch (error) {
        console.error('Error al obtener los datos de la zona:', error)
      }
    }

    fetchZoneData()
  }, [id, setValues])

  const updateZona = async (e) => {
    e.preventDefault()
    setValuesError(defaultValues)
    setGeneralError('')
    try {
      const response = await axios.patch(`http://localhost:4321/zona/update_zona/${id}`, values)
      setSnackbarMessage(response.data.message || 'Zona actualizada con éxito')
      setOpenSnackbar(true)
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
    <Grid container spacing={2} className='max-w-[500px] m-auto p-4'>
      <h2 className='flex justify-center text-xl font-bold text-blue-fond p-2 rounded-lg'>Editar Zona</h2>
      {generalError && (
        <Grid item xs={12}>
          <div className='text-red-500 text-center'>{generalError}</div>
        </Grid>
      )}
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
          className='w-full bg-gray-800 text-white rounded-lg py-3 px-6 hover:bg-gray-700 transition duration-300 ease-in-out font-semibold'
          onClick={updateZona}
        >
          Actualizar
        </button>
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
  )
}
