import { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert, Fade } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Selects from '../components/selectComponent'
import { api } from '../utils/conection'
import { goOverErrors } from '../utils/goOverErros'
import { getDataById } from '../utils/getDataById'
import { useUser } from '../utils/authContext'
import AnimacionSvg from './animacionSVG'
import useDataPreload from '../hooks/useDataReload'

const defautlValues = {
  valorNetoFactura: '',
  pagoRecibido: '',
  nombreCliente: '',
  correoCliente: '',
  entidadBancaria: '',
  idTipoTransaccion: '',
  valorPago: '',
  valorMaximo: ''
}

export default function GenerarAbonos (props) {
  const { setActualizar, setInfo, id } = props
  const { values, handleInputChange, setValues } = useForm(defautlValues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlValues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const { user } = useUser()
  const { data: typePayment } = useDataPreload('/abonos/data/typePayment')
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const getData = async (id) => {
      const { todosDatos, validacion } = await getDataById({ id, endpoind: 'abonos/abono', defautlValues })
      if (validacion) {
        if (todosDatos instanceof Error) {
          setMensajeError(todosDatos)
        } else {
          setDisabled(false)
          setValues({ ...defautlValues, ...todosDatos, valorMaximo: todosDatos.valorNetoFactura - todosDatos.pagoRecibido })
        }
      }
    }
    getData(id)
  }, [id])

  const generatePayment = async (e) => {
    e.preventDefault()
    setValuesError(defautlValues)
    setMostrarAlerta(false)
    if (values.valorPago > values.valorMaximo) {
      setMensajeError('EL valor del pago no puede superar el valor maximo de pago')
      setMostrarAlerta(true)
      return
    }
    try {
      const data = ({
        ...values,
        idFactura: id,
        idUsuario: user.id,
        sumaPago: (Number(values.valorPago) + Number(values.pagoRecibido)).toString()
      })
      const response = await api.post('abonos/', data)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setInfo(response.data)
      setDisabled(true)
    } catch (error) {
      let errorMessage = 'Error al editar el registro'
      if (error.response.data.objectError) goOverErrors(error.response.data.objectError, handleSettingError)
      else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      setMensajeError(errorMessage)
      setMostrarAlerta(true)
    }
  }

  return (
    <form className='rounded-lg'>
      <Grid container spacing={2} columns={12} className='max-w-[700px]'>
        <Grid item xs={12} sm={5}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <AnimacionSvg />
          </div>
        </Grid>
        <Grid item xs={12} sm={7} className='pb-2'>
          <h1 className='text-3xl text-center mt-3 mb-1 font-semibold text-gray-500'>Generar Abonos</h1>
          {mostrarAlerta &&
            <Fade in={mostrarAlerta} timeout={300} className='mb-4'>
              <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
                {mensajeError}
              </Alert>
            </Fade>}
          <Grid container spacing={2} columns={12} className='pl-2 pr-2 pb-1 pt-1 overflow-y-scroll h-[400px]'>
            <Grid item xs={12} sm={12}>
              <Input
                id='entidadBancaria'
                label='Entidad Bancaria'
                name='entidadBancaria'
                value={values.entidadBancaria}
                onChange={handleInputChange}
                error={recognizeEmptyName('entidadBancaria')}
                helperText={valuesError.entidadBancaria}
                disabled={disabled}
                InputProps={{
                  endAdornment: recognizeEmptyName('entidadBancaria') && (
                    <InputAdornment position='end'>
                      <IconButton edge='end'>
                        <ErrorOutlineIcon color='error' />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Selects
                id='idTipoTransaccion'
                label='Tipo de Transaccion'
                name='idTipoTransaccion'
                value={values.idTipoTransaccion}
                onChange={handleInputChange}
                items={typePayment}
                disabled={disabled}
                error={recognizeEmptyName('idTipoTransaccion')}
                helperText={valuesError.idTipoTransaccion}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                id='valorPago'
                label='Pago recibido'
                name='valorPago'
                value={values.valorPago}
                onChange={handleInputChange}
                error={recognizeEmptyName('valorPago')}
                helperText={valuesError.valorPago}
                disabled={disabled}
                InputProps={{
                  endAdornment: recognizeEmptyName('valorPago') && (
                    <InputAdornment position='end'>
                      <IconButton edge='end'>
                        <ErrorOutlineIcon color='error' />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                id='valorMaximo'
                label='Pago maximo'
                name='valorMaximo'
                value={values.valorMaximo}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <button
                type='button'
                onClick={generatePayment}
                className={`w-full inline-block px-6 py-3 bg-gray-800 text-white rounded-lg  hover:bg-gray-700 transition duration-300 ease-in-out font-semibold hover:-translate-y-px active:opacity-85 hover:shadow-md ${disabled ? 'opacity-50' : ''}`}
              >
                Registrar
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
