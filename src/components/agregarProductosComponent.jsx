import { Alert, Grid, IconButton, InputAdornment, Fade } from '@mui/material'
import React, { useState } from 'react'
import Input from './InputComponent'
import useForm from '../hooks/UseForm'
import useFormErrors from '../hooks/UseErrorForm'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { api } from '../utils/conection'
import { goOverErrors } from '../utils/goOverErros'
import AvatarComponent from './cargaImagenes'
import AnimacionSvg from './animacionSVG'

const defaultValues = {
  nombreProducto: '',
  descripcionProducto: '',
  valorProducto: '',
  linkFotoProducto: ''
}
export default function AgregarProductosComponent (props) {
  const { setActualizar, success } = props
  const { values, setValues, handleInputChange } = useForm(defaultValues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defaultValues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const [buffer, setBuffer] = useState(null)
  const [controlAvatar, setControlAvatar] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValuesError(defaultValues)
    setMostrarAlerta(false)
    success('')
    if (!buffer) {
      setMostrarAlerta(true)
      setMensajeError('No ha cargado ninguna imagen')
      return
    }
    const formData = new FormData()
    for (const key in values) {
      formData.append(key, values[key])
    }
    formData.append('archivo', buffer)
    try {
      const response = await api.post('/products', formData)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defaultValues)
      success(response.data)
      setBuffer(null)
      setControlAvatar(!controlAvatar)
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
      <Grid container spacing={2} columns={12} className='max-w-[600px]'>
        <Grid item xs={12} sm={5}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <AvatarComponent setBuffer={setBuffer} control={controlAvatar} />
            </div>
            <AnimacionSvg />
          </div>
        </Grid>
        <Grid item xs={12} sm={7} className='pb-2'>
          <h1 className='text-3xl text-center mt-3 mb-1 pr-8 font-semibold text-gray-500'>Registra tu producto</h1>
          {mostrarAlerta &&
            <Fade in={mostrarAlerta} timeout={300} className='mb-4'>
              <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
                {mensajeError}
              </Alert>
            </Fade>}
          <Grid container spacing={2} columns={12} className='pl-2 pr-2 pb-1 pt-2 overflow-y-scroll h-[290px]'>
            <Grid item xs={12} sm={12}>
              <Input
                id='nombreProducto'
                label='Nombre del producto'
                name='nombreProducto'
                value={values.nombreProducto}
                onChange={handleInputChange}
                error={recognizeEmptyName('nombreProducto')}
                helperText={valuesError.nombreProducto}
                InputProps={{
                  endAdornment: recognizeEmptyName('nombreProducto') && (
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
              <Input
                id='descripcionProducto'
                label='Descripción del producto'
                name='descripcionProducto'
                multiline
                value={values.descripcionProducto}
                onChange={handleInputChange}
                error={recognizeEmptyName('descripcionProducto')}
                helperText={valuesError.descripcionProducto}
                InputProps={{
                  endAdornment: recognizeEmptyName('descripcionProducto') && (
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
              <Input
                id='valorProducto'
                label='Valor del producto'
                name='valorProducto'
                value={values.valorProducto}
                onChange={handleInputChange}
                error={recognizeEmptyName('valorProducto')}
                helperText={valuesError.valorProducto}
                type='number'
                InputProps={{
                  endAdornment: recognizeEmptyName('valorProducto') && (
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
                className='w-full inline-block px-6 py-3 bg-gray-800 text-white rounded-lg  hover:bg-gray-700 transition duration-300 ease-in-out font-semibold hover:-translate-y-px active:opacity-85 hover:shadow-md '
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
