import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/siderbarComponent'
import StackCumston from '../../components/stackComponent'
import Botonera from '../../components/groupButton'
import CustomModal from '../../components/modalComponent'
import AddIcon from '@mui/icons-material/Add'
import CreateIcon from '@mui/icons-material/Create'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import ClearIcon from '@mui/icons-material/Clear'
import DataTable from '../../components/dataTable'
import { api } from '../../utils/conection'
import AgregarProductosComponent from '../../components/agregarProductosComponent'
import useSelectId from '../../hooks/useSelectId'
import AlertPrincipal from '../../components/alertSucces'
import EditarProductosComponent from '../../components/editarProductosComponent'
import VerProductosComponent from '../../components/verProductoComponent'
import EliminarProductosComponent from '../../components/eliminarProductoComponent'
import Avatar from '@mui/material/Avatar'

export default function Productos () {
  const [rows, setRows] = useState([])
  const [actualizar, setActualizar] = useState(false)
  const [success, setSuccess] = useState('')

  const { selectId, saveSelectId } = useSelectId()
  const columns = [
    {
      field: 'link_foto_producto',
      headerName: 'Imagen',
      width: 70,
      renderCell: (params) => (
        <Avatar src={params.row.link_foto_producto} alt='Avatar' />
      )
    },
    { field: 'nombre_producto', headerName: 'Nombre', width: 150 },
    { field: 'descripcion_producto', headerName: 'Descripción', width: 200 },
    {
      field: 'valor_producto',
      headerName: 'Valor',
      width: 150,
      valueGetter: (params) => `$ ${params.row.valor_producto}`
    }
  ]

  useEffect(() => {
    api.get('products')
      .then((res) => setRows(res.data))
  }, [actualizar])

  return (
    <>
      <Sidebar />
      <StackCumston>
        <Botonera
          title='Gestion de productos'
          agregar={
            <CustomModal
              bgColor='primary'
              icon={<AddIcon className='w-6 h-6 mr-1' />}
              tooltip='Agregar' text='Agregar'
              padding={0}
            >
              <AgregarProductosComponent setActualizar={setActualizar} success={setSuccess} />
            </CustomModal>
          }
          editar={
            <CustomModal
              bgColor='secondary'
              icon={<CreateIcon className='w-6 h-6 mr-1' />}
              tooltip='Editar'
              text='Editar'
              disabled={!selectId}
              padding={0}
            >
              <EditarProductosComponent id={selectId} setActualizar={setActualizar} success={setSuccess} />
            </CustomModal>
          }
          ver={
            <CustomModal
              bgColor='success'
              icon={<RemoveRedEyeIcon className='w-6 h-6 mr-1' />}
              tooltip='Visualizar'
              text='Visualizar'
              disabled={!selectId}
              padding={0}
            >
              <VerProductosComponent id={selectId} />
            </CustomModal>
          }
          eliminar={
            <CustomModal
              bgColor='error'
              icon={<ClearIcon className='w-6 h-6 mr-1' />}
              tooltip='Eliminar'
              text='Eliminar'
              disabled={!selectId}
              padding={0}
            >
              <EliminarProductosComponent id={selectId} setActualizar={setActualizar} success={setSuccess} />
            </CustomModal>
          }
        />
        <DataTable columns={columns} rows={rows} selectId={(id) => saveSelectId(id)} />

        <AlertPrincipal message={success} severity='success' />
      </StackCumston>
    </>
  )
}
