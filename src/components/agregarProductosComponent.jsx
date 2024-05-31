import { Grid, IconButton, InputAdornment } from '@mui/material'
import React from 'react'
import Input from './InputComponent'
import useForm from '../hooks/UseForm'
import useFormErrors from '../hooks/UseErrorForm'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { api } from '../utils/conection'
import { goOverErrors } from '../utils/goOverErros'

const defaultValues = {
  nombreProducto: '',
  descripcionProducto: '',
  valorProducto: '',
  linkFotoProducto: ''
}
export default function AgregarProductosComponent (props) {
  const { setActualizar } = props
  const { values, setValues, handleInputChange } = useForm(defaultValues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defaultValues)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValuesError(defaultValues)
    try {
      const response = await api.post('/products', values)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defaultValues)
    } catch (error) {
      let errorMessage = 'Error de envio'
      if (error.response.data.objectError) goOverErrors(error.response.data.objectError, handleSettingError)
      else if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error
      } else if (error.message) {
        errorMessage = error.message
        console.log(errorMessage)
      }
    }
  }
  return (
    <form className='overflow-y-scroll h-auto py-2' onSubmit={handleSubmit}>
      <h2 className='text-3xl text-center mb-2'>Agregar Productos</h2>
      <Grid container spacing={2} columns={12} className='max-w-[500px]'>
        <Grid item xs={12} sm={6}>
          <Input
            id='nombreProducto'
            label='Nombre del producto'
            variant='outlined'
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
            className='mb-2'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id='descripcionProducto'
            label='Descripción del producto'
            variant='outlined'
            name='descripcionProducto'
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
            className='mb-2'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id='valorProducto'
            label='Valor del producto'
            variant='outlined'
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
            className='mb-2'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id='linkFotoProducto'
            label='link de la imagen del producto'
            variant='outlined'
            name='linkFotoProducto'
            value={values.linkFotoProducto}
            onChange={handleInputChange}
            error={recognizeEmptyName('linkFotoProducto')}
            helperText={valuesError.linkFotoProducto}
            InputProps={{
              endAdornment: recognizeEmptyName('linkFotoProducto') && (
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
