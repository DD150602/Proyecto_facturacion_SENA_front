import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/siderbarComponent'
import StackCumston from '../../components/stackComponent'
import Botonera from '../../components/groupButton'
import DataTable from '../../components/dataTable'
import { api } from '../../utils/conection'
import AlertPrincipal from '../../components/alertSucces'
import { useUser } from '../../utils/authContext'

export default function ClientesZona () {
  const { user } = useUser()
  const [rows, setRows] = useState([])
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const columns = [
    { field: 'label', headerName: 'Nombre', width: 150 },
    { field: 'numero_documento_cliente', headerName: 'Numero Documento', width: 200 },
    { field: 'telefono_cliente', headerName: 'Telefono', width: 200 },
    { field: 'correo_cliente', headerName: 'Correo', width: 200 },
    { field: 'direccion_cliente', headerName: 'Direccion', width: 200 }
  ]

  useEffect(() => {
    api.get(`/cliente/contacto/${user.id_zona}`)
      .then((res) => {
        setRows(res.data)
        setSuccess('Datos correctamente cargados')
      })
      .catch((error) => {
        setError(error.response.data.message)
        setRows([])
      })
  }, [])

  return (
    <>
      <Sidebar />
      <StackCumston>
        <Botonera title='Clientes en tu zona' />
        <DataTable columns={columns} rows={rows} />
        <AlertPrincipal message={success} severity='success' />
        <AlertPrincipal message={error} severity='error' />
      </StackCumston>
    </>
  )
}
