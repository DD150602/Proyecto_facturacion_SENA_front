import { useEffect, useState } from 'react'
import CustomModal from './modalComponent'
import DataTable from './dataTable'
import Botonera from './groupButton'
import AddIcon from '@mui/icons-material/Add'
import { api } from '../utils/conection'
import { useUser } from '../utils/authContext'
import useSelectId from '../hooks/useSelectId'
import GenerarAbonos from './generarAbono'
import AlertPrincipal from './alertSucces'

const columns = [
  { field: 'nombre_cliente', headerName: 'Cliente', width: 170 },
  { field: 'numero_documento_cliente', headerName: 'Numero Documento', width: 170 },
  { field: 'id', headerName: 'Factura', width: 110 },
  { field: 'direccion_cliente', headerName: 'Direccion', width: 200 },
  { field: 'telefono_cliente', headerName: 'Telefono', width: 110 },
  { field: 'valor_neto_factura', headerName: 'Valor total factura', width: 160 },
  {
    field: 'pago_recibido',
    headerName: 'Valor pagado',
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
    field: 'deuda',
    headerName: 'Saldo pendiente',
    width: 160,
    valueGetter: (params) => {
      const valorNeto = parseFloat(params.row.valor_neto_factura)
      const valorPagado = parseFloat(params.row.pago_recibido)
      return (valorNeto - valorPagado).toFixed(2)
    },
    renderCell: (params) => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'red',
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

function PaymentComponent () {
  const { user } = useUser()
  const [rows, setRows] = useState([])
  const [actualizar, setActualizar] = useState(false)
  const { selectId, saveSelectId } = useSelectId()
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`abonos/${user.id}`)
      .then((res) => setRows(res.data))
      .catch((error) => {
        setError(error.response.data)
        setRows([])
      })
  }, [actualizar])

  return (
    <>
      <Botonera
        agregar={<CustomModal bgColor='primary' icon={<AddIcon className='w-6 h-6 mr-1' />} tooltip='Agregar' text='Agregar' disabled={!selectId} padding={0}><GenerarAbonos setActualizar={setActualizar} setInfo={setInfo} id={selectId} /></CustomModal>}
      />
      <DataTable columns={columns} rows={rows} selectId={(id) => saveSelectId(id)} />
      <AlertPrincipal message={info} severity='success' />
      <AlertPrincipal message={error} severity='error' />
    </>
  )
}

export default PaymentComponent
