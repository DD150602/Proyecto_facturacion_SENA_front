import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/siderbarComponent'
import CustomModal from '../../components/modalComponent'
import StackCumston from '../../components/stackComponent'
import AddIcon from '@mui/icons-material/Add'
import CreateIcon from '@mui/icons-material/Create'
import Botonera from '../../components/groupButton'
import ClearIcon from '@mui/icons-material/Clear'
import DataTable from '../../components/dataTable'
import AgregarEmpleados from '../../components/AgregarUsuario'

function HomeAdmin () {
  const columns = [
    { field: 'nombre_usuario', headerName: 'Nombre', width: 200 },
    { field: 'numero_documento_usuario', headerName: 'Numero Documento', width: 210 },
    { field: 'correo_usuario', headerName: 'Correo', width: 210 },
    { field: 'telefono_usuario', headerName: 'Telefono', width: 200 },
    { field: 'estado_usuario', headerName: 'Estado', width: 200 }
  ]

  const rows = []

  return (
    <>
      <Sidebar />
      <StackCumston>
        <div>
          <Botonera
            title='Gestiona tus empleados'
            agregar={<CustomModal bgColor='primary' icon={<AddIcon className='w-6 h-6 mr-1' />} tooltip='Agregar' text='Agregar'><AgregarEmpleados /></CustomModal>}
            editar={<CustomModal bgColor='secondary' icon={<CreateIcon className='w-6 h-6 mr-1' />} tooltip='Editar' text='Editar' />}
            eliminar={<CustomModal bgColor='error' icon={<ClearIcon className='w-6 h-6 mr-1' />} tooltip='Eliminar' text='Eliminar' />}
          />
          <DataTable columns={columns} rows={rows} selectId={(id) => console.log(id)} />
        </div>
      </StackCumston>
    </>
  )
}

export default HomeAdmin
