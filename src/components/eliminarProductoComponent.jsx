import { Alert, Grid, IconButton, InputAdornment, Fade } from '@mui/material'
import React, { useState } from 'react'
import Input from './InputComponent'
import useForm from '../hooks/UseForm'
import useFormErrors from '../hooks/UseErrorForm'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { api } from '../utils/conection'
import { goOverErrors } from '../utils/goOverErros'
import AnimacionSvg from './animacionSVG'

const defaultValues = {
  anotacion: ''
}
export default function EliminarProductosComponent (props) {
  const { setActualizar, success, id } = props
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const { values, setValues, handleInputChange } = useForm(defaultValues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defaultValues)
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValuesError(defaultValues)
    setMostrarAlerta(false)
    setMensajeError('')
    try {
      const response = await api.patch(`/products/desable/${id}`, values)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defaultValues)
      success(response.data)
      setDisabled(true)
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
    <form className='rounded-lg' onSubmit={handleSubmit}>
      <Grid container spacing={2} columns={12} className='max-w-[600px] '>
        <Grid item xs={12} sm={5}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <AnimacionSvg />
          </div>
        </Grid>
        <Grid item xs={12} sm={7} className='pb-1'>
          <h1 className='text-4xl text-center mt-3 mb-1 text-blue-fond font-bold'>Desactiva tu producto</h1>
          {mostrarAlerta &&
            <Fade in={mostrarAlerta} timeout={300} className='mb-4'>
              <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
                {mensajeError}
              </Alert>
            </Fade>}
          <Grid container spacing={2} columns={12} className='pl-2 pr-6 pb-1'>
            <Grid item xs={12}>
              <Input
                id='anotacion'
                label='Anotacion'
                name='anotacion'
                value={values.anotacion}
                onChange={handleInputChange}
                error={recognizeEmptyName('anotacion')}
                helperText={valuesError.anotacion}
                multiline
                disabled={disabled}
                InputProps={{
                  endAdornment: recognizeEmptyName('anotacion') && (
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
                className={`w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-sky-600 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md ${disabled ? 'opacity-50' : ''}`}
                disabled={disabled}
              >
                Registrar
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
