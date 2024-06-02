import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/siderbarComponent'
import StackCumston from '../../components/stackComponent'
import Botonera from '../../components/groupButton'
import DataTable from '../../components/dataTable'
import CustomModal from '../../components/modalComponent'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

import { api } from '../../utils/conection'

export default function InformeVentas () {
  const [rows, setRows] = useState([])

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'correo_usuario', headerName: 'Email', width: 200 }
  ]

  useEffect(() => {
    api.get('reporteVentas')
      .then((res) => setRows(res.data))
  }, [])

  return (
    <>
      <Sidebar />
      <StackCumston>
        <Botonera
          title='Informes de ventas'
          ver={<CustomModal bgColor='success' icon={<RemoveRedEyeIcon className='w-6 h-6 mr-1' />} tooltip='Visualizar' text='Visualizar' />}

        />
        <DataTable rows={rows} columns={columns} />
      </StackCumston>
    </>
  )
}
