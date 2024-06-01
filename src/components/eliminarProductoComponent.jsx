import { Alert, Grid, IconButton, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import Input from './InputComponent'
import useForm from '../hooks/UseForm'
import useFormErrors from '../hooks/UseErrorForm'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { api } from '../utils/conection'
import { goOverErrors } from '../utils/goOverErros'

const defaultValues = {
  anotacion: ''
}
export default function EliminarProductosComponent (props) {
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)

  const { setActualizar, success, id } = props
  const { values, setValues, handleInputChange } = useForm(defaultValues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defaultValues)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValuesError(defaultValues)
    setMostrarAlerta(false)
    try {
      const response = await api.patch(`/products/desable/${id}`, values)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defaultValues)
      success(response.data)
      console.log(response.data)
    } catch (error) {
      let errorMessage = 'Error de envio'
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
    <form className='overflow-y-scroll h-auto py-2' onSubmit={handleSubmit}>
      <h2 className='text-3xl text-center mb-2'>Eliminar Productos</h2>
      {mostrarAlerta && (
        <Alert severity='error' variant='outlined' sx={{ width: '100%', marginBottom: '1rem' }}>
          {mensajeError}
        </Alert>
      )}
      <Grid container spacing={2} columns={12} className='max-w-[500px]'>
        <Grid item xs={12}>
          <Input
            id='anotacion'
            label='anotacion'
            variant='outlined'
            name='anotacion'
            value={values.anotacion}
            onChange={handleInputChange}
            error={recognizeEmptyName('anotacion')}
            helperText={valuesError.anotacion}
            InputProps={{
              endAdornment: recognizeEmptyName('anotacion') && (
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <ErrorOutlineIcon color='error' />
                  </IconButton>
                </InputAdornment>
              )
            }}
            className='mb-2'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <button
            type='submit'
            className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
          >
            Registrar
          </button>
        </Grid>
      </Grid>
    </form>
  )
}
