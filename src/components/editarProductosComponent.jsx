import { Alert, Grid, IconButton, InputAdornment, Fade } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Input from './InputComponent'
import useForm from '../hooks/UseForm'
import useFormErrors from '../hooks/UseErrorForm'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { api } from '../utils/conection'
import { goOverErrors } from '../utils/goOverErros'
import { getDataById } from '../utils/getDataById'
import AvatarComponent from './cargaImagenes'
import AnimacionSvg from './animacionSVG'

const defaultValues = {
  nombreProducto: '',
  descripcionProducto: '',
  valorProducto: '',
  linkFotoProducto: ''
}
export default function EditarProductosComponent (props) {
  const { setActualizar, success, id } = props
  const { values, setValues, handleInputChange } = useForm(defaultValues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defaultValues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const [buffer, setBuffer] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const bringData = async () => {
      const { todosDatos, validacion } = await getDataById({ id, endpoind: 'products', defaultValues })
      if (validacion) {
        if (todosDatos instanceof Error) {
          setMensajeError(todosDatos)
        } else {
          setValues(todosDatos)
          setAvatar(todosDatos.linkFotoProducto)
          setDisabled(false)
        }
      }
    }
    bringData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValuesError(defaultValues)
    setMostrarAlerta(false)
    setMensajeError('')
    const formData = new FormData()
    for (const key in values) {
      formData.append(key, values[key])
    }
    if (buffer) formData.append('archivo', buffer)

    try {
      const response = await api.patch(`/products/${id}`, formData)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
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
      <Grid container spacing={2} columns={12} className='max-w-[600px]'>
        <Grid item xs={12} sm={5}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <AvatarComponent setBuffer={setBuffer} avatarCarga={avatar} />
            </div>
            <AnimacionSvg />
          </div>
        </Grid>
        <Grid item xs={12} sm={7} className='pb-2'>
          <h1 className='text-3xl text-center mt-3 mb-1 font-semibold text-gray-500'>Editar tu producto</h1>
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
                disabled={disabled}
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
                value={values.descripcionProducto}
                onChange={handleInputChange}
                disabled={disabled}
                multiline
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
                disabled={disabled}
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
  )
}
