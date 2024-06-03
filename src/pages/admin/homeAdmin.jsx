import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/siderbarComponent'
import CustomModal from '../../components/modalComponent'
import StackCumston from '../../components/stackComponent'
import AddIcon from '@mui/icons-material/Add'
import CreateIcon from '@mui/icons-material/Create'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import Botonera from '../../components/groupButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ClearIcon from '@mui/icons-material/Clear'
import DataTable from '../../components/dataTable'


import { useUser } from '../../utils/authContext'

function HomeAdmin() {
  const { user } = useUser()

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  const rows = [
    { id: 1, name: 'John Doe', age: 25, email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
    { id: 3, name: 'Sam Johnson', age: 22, email: 'sam.johnson@example.com' },
    { id: 4, name: 'Lisa Brown', age: 28, email: 'lisa.brown@example.com' },
  ];

  return (
    <>
      <Sidebar />
      <StackCumston>
        <div>
          <Botonera
            title='Gestiona tus empleados'
            agregar={<CustomModal bgColor='primary' icon={<AddIcon className='w-6 h-6 mr-1' />} tooltip='Agregar' text='Agregar' />}
            editar={<CustomModal bgColor='secondary' icon={<CreateIcon className='w-6 h-6 mr-1' />} tooltip='Editar' text='Editar' style={{ border: 'none' }} />}
            ver={<CustomModal bgColor='success' icon={<RemoveRedEyeIcon className='w-6 h-6 mr-1' />} tooltip='Visualizar' text='Visualizar' />}
            descarga={<CustomModal bgColor='primary' icon={<ArrowDownwardIcon className='w-6 h-6 mr-1' />} tooltip='Descargar' text='Descargar' />}
            eliminar={<CustomModal bgColor='error' icon={<ClearIcon className='w-6 h-6 mr-1' />} tooltip='Eliminar' text='Eliminar' />}
          />
          <DataTable columns={columns} rows={rows} selectId={(id) => console.log(id)} />
        </div>
      </StackCumston>
    </>
  )
}

export default HomeAdmin
