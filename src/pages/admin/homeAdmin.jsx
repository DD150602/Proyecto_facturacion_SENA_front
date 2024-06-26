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
import { api } from '../../utils/conection'
import useSelectId from '../../hooks/useSelectId'
import AlertPrincipal from '../../components/alertSucces'
import EditarEmpleados from '../../components/EditarUsuario'
import EliminarEmpleados from '../../components/EliminarUsuario'

function HomeAdmin () {
  const [actualizar, setActualizar] = useState(false)
  const { selectId, saveSelectId } = useSelectId()
  const [info, setInfo] = useState('')
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const columns = [
    { field: 'nombre_usuario', headerName: 'Nombre', width: 200 },
    { field: 'numero_documento_usuario', headerName: 'Numero Documento', width: 210 },
    { field: 'correo_usuario', headerName: 'Correo', width: 210 },
    { field: 'telefono_usuario', headerName: 'Telefono', width: 200 },
    {
      field: 'estado_usuario',
      headerName: 'Estado',
      width: 200,
      valueGetter: (params) =>
          `${params.row.estado_usuario === 1 ? 'Activo' : 'Desactivado'}`
    }
  ]

  const [rows, setRows] = useState([])
  useEffect(() => {
    api.get('usuarios')
      .then((res) => setRows(res.data))
  }, [actualizar])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Sidebar />
      <StackCumston>
        <div>
          <Botonera
            title='Gestiona tus empleados'
            agregar={<CustomModal bgColor='primary' icon={<AddIcon className='w-6 h-6 mr-1' />} tooltip='Agregar' text='Agregar' top={screenWidth <= 1400 ? '0%' : '15%'} left={screenWidth <= 1400 ? '15%' : '25%'} padding={0}><AgregarEmpleados setActualizar={setActualizar} setInfo={setInfo} /></CustomModal>}
            editar={<CustomModal bgColor='secondary' icon={<CreateIcon className='w-6 h-6 mr-1' />} tooltip='Editar' text='Editar' disabled={!selectId} top={screenWidth <= 1400 ? '0%' : '15%'} left={screenWidth <= 1400 ? '15%' : '25%'} padding={0}><EditarEmpleados setActualizar={setActualizar} setInfo={setInfo} id={selectId} /></CustomModal>}
            eliminar={<CustomModal bgColor='error' icon={<ClearIcon className='w-6 h-6 mr-1' />} tooltip='Eliminar' text='Eliminar' disabled={!selectId} padding={0}><EliminarEmpleados setActualizar={setActualizar} setInfo={setInfo} id={selectId} /></CustomModal>}
          />
          <DataTable columns={columns} rows={rows} selectId={(id) => saveSelectId(id)} />
        </div>
      </StackCumston>
      <AlertPrincipal message={info} severity='success' />
    </>
  )
}

export default HomeAdmin
