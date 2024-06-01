import { Alert, Grid, IconButton, InputAdornment } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Input from './InputComponent'
import useForm from '../hooks/UseForm'
import useFormErrors from '../hooks/UseErrorForm'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { getDataById } from '../utils/getDataById'

const defaultValues = {
  nombreProducto: '',
  descripcionProducto: '',
  valorProducto: '',
  linkFotoProducto: ''
}
export default function VerProductosComponent (props) {
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)

  const { id } = props
  const { values, setValues, handleInputChange } = useForm(defaultValues)
  const { valuesError, recognizeEmptyName } = useFormErrors(defaultValues)

  useEffect(() => {
    const bringData = async () => {
      const { todosDatos, validacion } = await getDataById({ id, endpoind: 'products', defaultValues })
      if (validacion) {
        if (todosDatos instanceof Error) {
          setMensajeError(todosDatos)
          setMostrarAlerta(true)
        } else {
          setValues(todosDatos)
        }
      }
    }
    bringData()
  }, [id])
  return (
    <form className='overflow-y-scroll h-auto py-2'>
      <h2 className='text-3xl text-center mb-2'>Visializar Producto</h2>
      {mostrarAlerta && (
        <Alert severity='error' variant='outlined' sx={{ width: '100%', marginBottom: '1rem' }}>
          {mensajeError}
        </Alert>
      )}
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
            disabled
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
            disabled
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
            disabled
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
            disabled
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
      </Grid>
    </form>
  )
}
