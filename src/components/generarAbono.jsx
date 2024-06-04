import { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert, Fade } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Selects from '../components/selectComponent'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'
import { getDataById } from '../utils/getDataById'
import { useUser } from '../utils/authContext'
import AnimacionSvg from './animacionSVG'
import useDataPreload from '../hooks/useDataReload'
import dayjs from 'dayjs'

const defautlValues = {
  entidadBancaria: '',
  idTipoTransaccion: '',
  cuotasFactura: '',
  numeroCuota: '',
  cuotaActualFactura: '',
  fechaProximoPago: '',
  pagoFactura: '',
  valorCuota: ''
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
          setValues({ ...defautlValues, ...todosDatos, valorCuota: todosDatos.valorNetoFactura / todosDatos.cuotasFactura })
        }
      }
    }
    getData(id)
  }, [id])

  const generatePayment = async (e) => {
    e.preventDefault()
    setValuesError(defautlValues)
    setMostrarAlerta(false)
    try {
      const data = ({
        ...values,
        idFactura: id,
        idUsuario: user.id,
        fechaProximoPago: values.idTipoCuota === '1'
          ? dayjs().add(15, 'day').format('YYYY-MM-DD')
          : dayjs().add(1, 'month').format('YYYY-MM-DD')
      })
      const response = await axios.post('http://localhost:4321/abonos/', data)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setInfo(response.data.message)
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
          <h1 className='text-4xl text-center mt-3 mb-1 text-blue-fond font-bold'>Generar Abonos</h1>
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
                id='cuotaActualFactura'
                label='Cuota a Pagar'
                name='cuotaActualFactura'
                value={values.cuotaActualFactura}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                id='valorCuota'
                label='Valor Cuota'
                name='valorCuota'
                value={values.valorCuota}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <button
                type='button'
                onClick={generatePayment}
                className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-sky-600 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
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
