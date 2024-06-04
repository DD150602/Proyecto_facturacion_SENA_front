import React, { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import DataTable from '../components/dataTable'
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor'
import { FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import axios from 'axios'
import dayjs from 'dayjs'
import AvatarComponent from './cargaImagenes'
import AnimacionSvg from './animacionSVG'
import useDataPreload from '../hooks/useDataReload'

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
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'productos',
    headerName: 'Productos',
    width: 150,
    renderCell: (params) => (
      <div>
        {params.value.map(producto => (
          <div key={producto.id_producto}>
            {producto.nombre_producto}
          </div>
        ))}
      </div>
    )
  },
  {
    field: 'valor_neto_factura',
    headerName: 'Precio de la factura',
    width: 210,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AttachMoneyIcon style={{ marginRight: '5px' }} />
        {params.value}
      </div>
    )
  },
  {
    field: 'fecha_factura',
    headerName: 'Fecha de facturación',
    width: 160,
    valueGetter: (params) => `${dayjs(params.row.fecha_factura).format('MM-DD-YYYY')}`
  }
]

function HistorialCompras ({ id }) {
  const [rows, setRows] = useState([])
  const [mes, setMes] = useState('')
  const [year, setYear] = useState('')

  const fetchData = async (mes, year) => {
    try {
      const response = await axios.get(`http://localhost:4321/gestion_cliente/${id}?mes=${mes}&anio=${year}`)
      console.log(response.data)
      setRows(response.data)
    } catch (error) {
      console.error('Error al obtener los datos', error)
    }
  }

  useEffect(() => {
    fetchData(mes, year)
  }, [mes, year])

  return (
    <form className='rounded-lg'>
      <Grid container spacing={2} columns={12} className='max-w-[1150px]'>
        <Grid item xs={12} sm={4}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <AnimacionSvg />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} className='pb-2'>
          <h1 className='text-3xl text-center mt-3 mb-1 font-semibold text-gray-500'>Historial de compra</h1>
          <Grid container spacing={2} columns={12} className='pl-2 pr-2 pb-1 overflow-y-scroll h-[500px]'>
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
            <Grid item xs={12} sm={12}>
              <DataTable columns={columns} rows={rows} id={id} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
};

export default HistorialCompras
