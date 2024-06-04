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
import dayjs from 'dayjs'

const columns = [
  { field: 'nombre_cliente', headerName: 'Cliente', width: 170 },
  { field: 'direccion_cliente', headerName: 'Direccion', width: 200 },
  { field: 'telefono_cliente', headerName: 'Telefono', width: 110 },
  { field: 'cuota_actual_factura', headerName: 'Cuota Actual', width: 120 },
  {
    field: 'valor_pago',
    headerName: 'Total a pagar',
    width: 120,
    valueGetter: (params) => {
      const valorNeto = parseFloat(params.row.valor_neto_factura)
      const cantidadCuotas = parseFloat(params.row.cantidad_cuotas_factura)
      return (valorNeto / cantidadCuotas).toFixed(2)
    }
  },
  {
    field: 'fecha_proximo_pago',
    headerName: 'Fecha Pago',
    width: 150,
    renderCell: (params) => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: params.value === dayjs().format('YYYY-MM-DD') ? 'green' : 'red',
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
