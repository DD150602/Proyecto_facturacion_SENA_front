import { Alert, Fade, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useForm from '../hooks/UseForm'

import { getDataById } from '../utils/getDataById'
import DataTable from './dataTable'
import InputDate from './dateComponent'

const defaultValues = {
  nombre_usuario: '',
  correo_usuario: '',
  telefono_usuario: '',
  infoFacturas: []
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nombre_cliente', headerName: 'Nombre del Cliente', width: 230 },
  { field: 'correo_cliente', headerName: 'Correo del Cliente', width: 210 },
  { field: 'valor_neto_factura', headerName: 'Valor de la factura', width: 160 }
]
export default function VerInformeVentasComponent (porps) {
  const { id } = porps
  const { values, setValues } = useForm(defaultValues)
  const [fechaInforme, setFechaInforme] = useState('')
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)

  useEffect(() => {
    const bringData = async () => {
      const fecha = `${id}?month=${fechaInforme.split('-')[1]}&year=${fechaInforme.split('-')[0]}`
      const { todosDatos, validacion } = await getDataById({ id: fechaInforme === '' ? id : fecha, endpoind: 'reporteVentas', defaultValues })
      if (validacion) {
        if (todosDatos instanceof Error) {
          setMostrarAlerta(true)
          setMensajeError(todosDatos)
        } else {
          setValues(todosDatos)
        }
      }
    }
    bringData()
  }, [fechaInforme])
  return (
    <Grid container spacing={2}>
      {mostrarAlerta &&
        <Fade in={mostrarAlerta} timeout={300} className='mb-4'>
          <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
            {mensajeError}
          </Alert>
        </Fade>}
      <Grid item xs={12} sm={5}>
        <h1>Nombre Vendedor</h1>
        {values.nombre_usuario}
        <h1>Correo Usuario</h1>
        {values.correo_usuario}
        <h1>Telefono</h1>
        {values.telefono_usuario}
      </Grid>
      <Grid item xs={12} sm={7}>
        <InputDate
          id='fechaInforme'
          label='Fecha del reporte'
          name='fechaInforme'
          fecha={fechaInforme}
          onChange={(name, value) => {
            setFechaInforme(value)
          }}
          views={['month', 'year']}
          required
          disabled={false}
        />
        <DataTable rows={values.infoFacturas} columns={columns} />
      </Grid>
    </Grid>
  )
}
