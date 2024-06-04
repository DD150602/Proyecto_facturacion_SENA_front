import { Alert, Fade, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useForm from '../hooks/UseForm'

import { getDataById } from '../utils/getDataById'
import DataTable from './dataTable'
import InputDate from './dateComponent'
import AnimacionSvg from './animacionSVG'
import circle from '../assets/img/circle.png'

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
    <Grid container spacing={2} columns={12} className='max-w-[1250px] '>
      <Grid item xs={12} sm={4}>
        <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
            <div className='relative w-[240px] h-[270px] bg-white rounded-lg overflow-hidden'>
              <div className='relative h-32 w-full'>
                <div className='absolute w-[240px] h-[240px] rounded-full bg-nerve-light bottom-0' />
                <div className='absolute w-36 h-36 bg-white p-1 rounded-full bottom-[-15%] left-1/2 transform -translate-x-1/2'>
                  <img
                    src={values.link_foto_usuario || circle}
                    alt=''
                    className='w-full h-full rounded-full object-cover'
                  />
                </div>
              </div>
              <div className='h-52 px-5 pt-10 text-center'>
                <h3 className='text-nerve-dark'>{values.nombre_usuario}</h3>
                <h4 className='text-nerve-dark'>{values.correo_usuario}</h4>
                <p className='mt-5 text-sm'>{values.telefono_usuario}</p>
              </div>
            </div>

          </div>
          <AnimacionSvg />
        </div>
      </Grid>
      <Grid item xs={12} sm={8} className='pb-2'>
        <h1 className='text-4xl text-center mt-3 mb-1 text-blue-fond font-bold'>Informe de vendedor</h1>
        {mostrarAlerta &&
          <Fade in={mostrarAlerta} timeout={300} className='mb-4'>
            <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
              {mensajeError}
            </Alert>
          </Fade>}
        <Grid container spacing={2} columns={12} className='pl-2 pr-2 pb-1 pt-1 overflow-y-scroll h-[550px]'>
          <Grid item xs={12} sm={12}>
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
          </Grid>
          <Grid item xs={12} sm={12}>
            <DataTable rows={values.infoFacturas} columns={columns} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
