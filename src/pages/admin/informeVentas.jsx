import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/siderbarComponent'
import StackCumston from '../../components/stackComponent'
import Botonera from '../../components/groupButton'
import DataTable from '../../components/dataTable'
import CustomModal from '../../components/modalComponent'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VerInformeCobrosComponent from '../../components/VerInformeCobros'

import { api } from '../../utils/conection'
import useSelectId from '../../hooks/useSelectId'
import VerInformeVentasComponent from '../../components/verInformeVentasComponent'

export default function InformeVentas () {
  const [rows, setRows] = useState([])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const { selectId, saveSelectId } = useSelectId()

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'numero_documento_usuario', headerName: 'Documento', width: 150 },
    { field: 'correo_usuario', headerName: 'Correo', width: 210 },
    { field: 'descripcion_zona', headerName: 'Zona', width: 140 },
    {
      field: 'total_ventas',
      headerName: 'Total Ventas',
      width: 120,
      renderCell: (params) => (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'green',
          color: 'white',
          borderRadius: '5px',
          padding: '5px'
        }}
        >
          {params.value}
        </div>
      )
    },
    {
      field: 'total_cobros',
      headerName: 'Total Cobros',
      width: 120,
      renderCell: (params) => (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'blue',
          color: 'white',
          borderRadius: '5px',
          padding: '5px'
        }}
        >
          {params.value}
        </div>
      )
    }
  ]

  useEffect(() => {
    api.get('reporteVentas')
      .then((res) => setRows(res.data))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Sidebar />
      <StackCumston>
        <Botonera
          title='Informes de vendedor'
          ver={
            <CustomModal
              bgColor='success'
              icon={<RemoveRedEyeIcon className='w-6 h-6 mr-1' />}
              tooltip='Visualizar Ventas'
              text='Visualizar Ventas'
              disabled={!selectId}
              padding={0}
              top={screenWidth <= 1400 ? '0%' : '15%'}
              left={screenWidth <= 1400 ? '15%' : '25%'}
            >
              <VerInformeVentasComponent id={selectId} />
            </CustomModal>
        }
          eliminar={
            <CustomModal
              bgColor='success'
              icon={<RemoveRedEyeIcon className='w-6 h-6 mr-1' />}
              tooltip='Visualizar Cobros'
              text='Visualizar Cobros'
              disabled={!selectId}
              padding={0}
              top={screenWidth <= 1400 ? '0%' : '15%'}
              left={screenWidth <= 1400 ? '15%' : '25%'}
            >
              <VerInformeCobrosComponent id={selectId} />
            </CustomModal>
      }
        />
        <DataTable rows={rows} columns={columns} selectId={(id) => saveSelectId(id)} />
      </StackCumston>
    </>
  )
}
