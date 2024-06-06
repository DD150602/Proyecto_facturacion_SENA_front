import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useForm from '../hooks/UseForm'

import { getDataById } from '../utils/getDataById'
import InputDate from './dateComponent'

import LogoDeuda from '../assets/img/deuda.png'
import Pago from '../assets/img/payment.png'
import Validado from '../assets/img/checked2.png'
import Danger from '../assets/img/danger.png'
import InfoIcon from '@mui/icons-material/Info'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Shop from '../assets/img/order.png'

const defaultValues = {
  nombre_usuario: '',
  correo_usuario: '',
  telefono_usuario: '',
  infoFacturas: []
}

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
  function formatCop (value) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(value)
  }
  return (
    <>
      <form className='rounded-lg'>
        <div className='max-w-6xl mx-auto p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='bg-red-200 shadow-lg rounded-lg p-6 flex items-center'>
              <img src={LogoDeuda} alt='Logo Deuda' className='w-16 h-16 mr-4' />
              <div>
                <h2 className='text-xl font-semibold text-gray-700'>Saldo Pendiente</h2>
                <div className='flex items-center'>

                  <span className='text-2xl text-red-500 font-bold'>{`${formatCop(Number(values.totalVentas) - Number(values.totalCobros))}`}</span>
                </div>
              </div>
            </div>
            <div className='bg-green-200 shadow-lg rounded-lg p-6 flex items-center'>
              <img src={Pago} alt='Pago' className='w-16 h-16 mr-4' />
              <div>
                <h2 className='text-xl font-semibold text-gray-700'>Ventas Realizadas</h2>
                <div className='flex items-center'>
                  <AttachMoneyIcon className='text-green-500 mr-1' />
                  <span className='text-2xl text-green-500 font-bold'>{formatCop(values.totalVentas)}</span>
                </div>
              </div>
            </div>
            <div className='bg-blue-200 shadow-lg rounded-lg p-6 flex items-center'>
              <img src={Shop} alt='Compras' className='w-16 h-16 mr-4' />
              <div>
                <h2 className='text-xl font-semibold text-gray-700'>Cantidad Ventas</h2>
                <div className='flex items-center'>
                  <ShoppingCartIcon className='text-blue-500 mr-1' />
                  <span className='text-2xl text-blue-500 font-bold'>{values.infoFacturas.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <p className='bg-blue-100 text-blue-400 p-4 rounded-lg flex items-center mb-5'>
              <InfoIcon className='mr-2' />
              <span>Si hay un ícono de check, el pago está completo; de lo contrario, se muestra un ícono de alerta.</span>
            </p>
            <p className='text-sm text-gray-500 mb-5'>Filtra las ventas por mes y año</p>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
            </Grid>
          </div>
          <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll h-[400px] pb-3'>
            {values.infoFacturas && values.infoFacturas.map(row => (
              <div key={row.id} className='bg-white shadow-lg rounded-lg p-4 relative'>
                {(Number(row.valor_neto_factura) === Number(row.pago_recibido))
                  ? (
                    <>
                      <img src={Validado} alt='Pagado' className='w-20 h-20 absolute tpx-4  bottom-4 right-4 opacity-40' />
                    </>
                    )
                  : (
                    <>
                      <img src={Danger} alt='Pagado' className='w-20 h-20 absolute tpx-4  bottom-4 right-4 opacity-40' />
                    </>
                    )}
                <h3 className='text-lg font-semibold mb-2'>Factura ID: {row.id}</h3>
                <p className='text-gray-700'><strong>Precio de la factura:</strong> {row.valor_neto_factura}</p>
                <p className='text-gray-700'><strong>Pago recibido:</strong> {row.pago_recibido}</p>
              </div>
            ))}
          </div>
        </div>
      </form>
    </>
  )
}
