import React, { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import { FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Shop from '../assets/img/order.png'
import { api } from '../utils/conection'
import dayjs from 'dayjs'
import LogoDeuda from '../assets/img/deuda.png'
import Pago from '../assets/img/payment.png'
import Validado from '../assets/img/checked2.png'
import Danger from '../assets/img/danger.png'
import InfoIcon from '@mui/icons-material/Info'

const optionsMes = [
  { id: 1, value: 'Enero' },
  { id: 2, value: 'Febrero' },
  { id: 3, value: 'Marzo' },
  { id: 4, value: 'Abril' },
  { id: 5, value: 'Mayo' },
  { id: 6, value: 'Junio' },
  { id: 7, value: 'Julio' },
  { id: 8, value: 'Agosto' },
  { id: 9, value: 'Septiembre' },
  { id: 10, value: 'Octubre' },
  { id: 11, value: 'Noviembre' },
  { id: 12, value: 'Diciembre' }
]

function HistorialCompras ({ id }) {
  const [rows, setRows] = useState([])
  const [mes, setMes] = useState(dayjs().month() + 1)
  const [year, setYear] = useState(dayjs().year())
  const [totalDebt, setTotalDebt] = useState(0)
  const [paymentCount, setPaymentCount] = useState(0)
  const [purchaseCount, setPurchaseCount] = useState(0)

  const fetchData = async (mes, year) => {
    try {
      const response = await api.get(`gestion_cliente/${id}?mes=${mes}&anio=${year}`)
      console.log(response.data)
      setRows(response.data)
    } catch (error) {
      console.error('Error al obtener los datos', error)
    }
  }

  const calculateTotals = () => {
    let totalDebt = 0
    let paymentCount = 0
    let purchaseCount = 0
    rows.forEach(row => {
      const valorNeto = parseFloat(row.valor_neto_factura)
      const pagoRecibido = parseFloat(row.pago_recibido)
      if (!isNaN(valorNeto) && !isNaN(pagoRecibido)) {
        totalDebt += valorNeto - pagoRecibido
        paymentCount += pagoRecibido > 0 ? 1 : 0
        purchaseCount += 1
      }
    })
    setTotalDebt(totalDebt)
    setPaymentCount(paymentCount)
    setPurchaseCount(purchaseCount)
  }
  function formatCop (value) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(value)
  }

  useEffect(() => {
    fetchData(mes, year)
    calculateTotals()
  }, [mes, year])

  useEffect(() => {
    calculateTotals()
  }, [rows])

  return (
    <form className='rounded-lg'>
      <div className='max-w-6xl mx-auto p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='bg-red-200 shadow-lg rounded-lg p-6 flex items-center'>
            <img src={LogoDeuda} alt='Logo Deuda' className='w-16 h-16 mr-4' />
            <div>
              <h2 className='text-xl font-semibold text-gray-700'>Deuda mensual</h2>
              <div className='flex items-center'>

                <span className='text-2xl text-red-500 font-bold'>{formatCop(totalDebt.toFixed(2))}</span>
              </div>
            </div>
          </div>
          <div className='bg-green-200 shadow-lg rounded-lg p-6 flex items-center'>
            <img src={Pago} alt='Pago' className='w-16 h-16 mr-4' />
            <div>
              <h2 className='text-xl font-semibold text-gray-700'>Pagos Realizados</h2>
              <div className='flex items-center'>
                <AttachMoneyIcon className='text-green-500 mr-1' />
                <span className='text-2xl text-green-500 font-bold'>{paymentCount}</span>
              </div>
            </div>
          </div>
          <div className='bg-blue-200 shadow-lg rounded-lg p-6 flex items-center'>
            <img src={Shop} alt='Compras' className='w-16 h-16 mr-4' />
            <div>
              <h2 className='text-xl font-semibold text-gray-700'>Compras del mes</h2>
              <div className='flex items-center'>
                <ShoppingCartIcon className='text-blue-500 mr-1' />
                <span className='text-2xl text-blue-500 font-bold'>{purchaseCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <p className='bg-blue-100 text-blue-400 p-4 rounded-lg flex items-center mb-5'>
            <InfoIcon className='mr-2' />
            <span>Hay dos validaciones a considerar: si hay un icono de check es porque el cliente pago de lo contrario, se mostrará un icono de alerta.</span>
          </p>
          <p className='text-sm text-gray-500 mb-5'>Filtra las facturas por mes y año</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='mes-label'>Seleccionar mes</InputLabel>
                <Select
                  labelId='mes-label'
                  id='mes'
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  label='Seleccionar mes'
                  sx={{ borderRadius: '10px', textAlign: 'left' }}
                >
                  <MenuItem value=''>
                    <em>Seleccionar mes</em>
                  </MenuItem>
                  {optionsMes.map(option => (
                    <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input type='text' label='Año' value={year} onChange={(e) => setYear(e.target.value)} />
            </Grid>
          </Grid>
        </div>
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {rows.map(row => (
            <div key={row.id} className='bg-white shadow-lg rounded-lg p-4 relative'>
              {parseFloat(row.pago_recibido) > 0
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
              <p className='text-gray-700'><strong>Fecha:</strong> {dayjs(row.fecha_factura).format('MM-DD-YYYY')}</p>
              <p className='text-gray-700'><strong>Precio de la factura:</strong> {row.valor_neto_factura}</p>
              <p className='text-gray-700'><strong>Pago recibido:</strong> {row.pago_recibido}</p>
              <div className='mt-2'>
                <strong>Productos:</strong>
                <ul className='list-disc list-inside'>
                  {row.productos.map(producto => (
                    <li key={producto.id_producto}>{producto.nombre_producto}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}

export default HistorialCompras
