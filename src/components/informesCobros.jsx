import React, { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import DataTable from '../components/dataTable'
import { FormControl, InputLabel, MenuItem, Select, Snackbar, Alert } from '@mui/material'
import { useUser } from '../utils/authContext'
import { api } from '../utils/conection'
import dayjs from 'dayjs'

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

const columns = [
  {
    field: 'nombre_cliente',
    headerName: 'Nombre Cliente',
    width: 150,
    valueGetter: (params) => `${params.row.nombre_cliente} ${params.row.apellido_cliente}`
  },
  { field: 'id_factura', headerName: 'Numero Factura', width: 150 },
  { field: 'valor_pago', headerName: 'valor del pago', width: 150 },
  { field: 'banco_pago', headerName: 'Banco', width: 150 },
  {
    field: 'fecha_transaccion',
    headerName: 'Fecha Pago',
    width: 130,
    valueGetter: (params) => `${dayjs(params.row.fecha_transaccion).format('MM-DD-YYYY')}`
  },
  {
    field: 'estado_pago',
    headerName: 'Estado',
    width: 100,
    renderCell: (params) => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: params.value === 1 ? 'green' : 'red',
        color: 'white',
        borderRadius: '5px',
        padding: '5px'
      }}
      >
        {params.value === 1 ? 'Pagado' : 'Pendiente'}
      </div>
    )

  }

]

function InformesCobros () {
  const { user } = useUser()
  const [rows, setRows] = useState([])
  const [mes, setMes] = useState(dayjs().month() + 1)
  const [year, setYear] = useState(dayjs().year())
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')

  const fetchData = async (mes, year) => {
    try {
      const response = await api.get(`informesCobros/${user.id}?mes=${mes}&anio=${year}`)
      console.log(response.data)
      setRows(response.data)
      setSnackbarMessage(response.data ? 'Datos Encontrados' : 'No se han encontrado datos para cargar')
      setSeverity(response.data ? 'success' : 'error')
      setOpenSnackbar(true)
    } catch (error) {
      setSnackbarMessage('No se han encontrado datos para cargar.')
      setSeverity('error')
      setOpenSnackbar(true)
    }
  }

  useEffect(() => {
    fetchData(mes, year)
    return () => {
      setRows([])
    }
  }, [mes, year])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    fetchData(mes, year)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <div className='container mx-auto overflow-x-hidden'>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <p className='text-xm text-left mb-4 font-semibold text-gray-500'>Aqui puedes filtrar los cobros realizados por mes y año</p>
      <form className='mb-4' onSubmit={handleFormSubmit}>
        <div className='flex ml-20 flex-wrap -mx-20'>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4'>
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
          </div>
          <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4'>
            <Input type='text' label='Año' value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
        </div>

      </form>
      <DataTable columns={columns} rows={rows} />
    </div>
  )
};

export default InformesCobros
