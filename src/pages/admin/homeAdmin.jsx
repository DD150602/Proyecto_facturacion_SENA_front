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

import { useUser } from '../../utils/authContext'

function HomeAdmin () {
  const { user } = useUser()

  return (
    <>
      <Sidebar />
      <StackCumston>
        <div>
          <Botonera
            title='Gestiona tus empleados'
            agregar={<CustomModal bgColor='primary' icon={<AddIcon className='w-6 h-6 mr-1' />} tooltip='Agregar' text='Agregar' />}
            editar={<CustomModal bgColor='secondary' icon={<CreateIcon className='w-6 h-6 mr-1' />} tooltip='Editar' text='Editar' />}
            ver={<CustomModal bgColor='success' icon={<RemoveRedEyeIcon className='w-6 h-6 mr-1' />} tooltip='Visualizar' text='Visualizar' />}
            descarga={<CustomModal bgColor='primary' icon={<ArrowDownwardIcon className='w-6 h-6 mr-1' />} tooltip='Descargar' text='Descargar' />}
            eliminar={<CustomModal bgColor='error' icon={<ClearIcon className='w-6 h-6 mr-1' />} tooltip='Eliminar' text='Eliminar' />}
          />
        </div>
      </StackCumston>
    </>
  )
}

export default HomeAdmin
