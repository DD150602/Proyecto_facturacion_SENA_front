import { Grid, Avatar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Input from './InputComponent'
import useForm from '../hooks/UseForm'
import { getDataById } from '../utils/getDataById'
import AnimacionSvg from './animacionSVG'

const defaultValues = {
  nombreProducto: '',
  descripcionProducto: '',
  valorProducto: '',
  linkFotoProducto: ''
}
export default function VerProductosComponent (props) {
  const { id } = props
  const { values, setValues } = useForm(defaultValues)
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    const bringData = async () => {
      const { todosDatos, validacion } = await getDataById({ id, endpoind: 'products', defaultValues })
      if (validacion) {
        setValues(todosDatos)
        setAvatar(todosDatos.linkFotoProducto)
      }
    }
    bringData()
  }, [id])
  return (
    <form className='rounded-lg'>
      <Grid container spacing={2} columns={12} className='max-w-[600px]'>
        <Grid item xs={12} sm={5}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <Avatar alt='Avatar' src={avatar} sx={{ width: 150, height: 150 }} />
            </div>
            <AnimacionSvg />
          </div>
        </Grid>
        <Grid item xs={12} sm={7} className='pb-2'>
          <h1 className='text-4xl text-center mt-3 mb-1 mr-8 text-blue-fond font-bold'>Informacion de tu producto</h1>
          <Grid container spacing={2} columns={12} className='pl-2 pr-5 pb-1 pt-2'>
            <Grid item xs={12} sm={12}>
              <Input
                id='nombreProducto'
                label='Nombre del producto'
                name='nombreProducto'
                value={values.nombreProducto}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                id='descripcionProducto'
                label='Descripción del producto'
                name='descripcionProducto'
                multiline
                value={values.descripcionProducto}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                id='valorProducto'
                label='Valor del producto'
                name='valorProducto'
                value={values.valorProducto}
                type='number'
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
