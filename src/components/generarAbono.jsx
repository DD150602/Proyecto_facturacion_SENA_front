import { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Selects from '../components/selectComponent'
import InputDate from '../components/dateComponent'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'
import { getDataById } from '../utils/getDataById'

const defautlvalues = {
  entidadBancaria: '',
  idTipoTransaccion: '',
  cuotasFactura: '',
  numeroCuota: '',
  cuotaActualFactura: '',
  fechaProximoPago: ''
}

const items = [
  { id: '1', value: 'Efectivo' },
  { id: '2', value: 'Debito' },
  { id: '3', value: 'Credito' },
  { id: '4', value: 'PSE' }
]

export default function GenerarAbonos (props) {
  const { setActualizar, setInfo, id } = props
  const { values, handleInputChange, handleInputChangeDate, setValues } = useForm(defautlvalues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlvalues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)

  useEffect(() => {
    const getData = async (id) => {
      const { todosDatos, validacion } = await getDataById({ id, endpoind: 'usuarios', defautlvalues })
      if (validacion) {
        if (todosDatos instanceof Error) {
          setMensajeError(todosDatos)
        } else {
          setValues(todosDatos)
        }
      }
    }
    getData(id)
  }, [id])

  const editUser = async (e) => {
    e.preventDefault()
    setValuesError(defautlvalues)
    setMostrarAlerta(false)
    try {
      const response = await axios.patch(`http://localhost:4321/usuarios/${values.id}`, values)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defautlvalues)
      setInfo(response.data.message)
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
    <form className='h-auto pt-2 pb-2' onSubmit={editUser}>
      <h1 className='text-3xl text-center mb-2'>Generar Abono</h1>
      {mostrarAlerta && (
        <Alert severity='error' variant='outlined' sx={{ width: '100%', marginBottom: '1rem' }}>
          {mensajeError}
        </Alert>
      )}
      <Grid container spacing={2} columns={12} className='max-w-[400px]'>
        <Grid item xs={12} sm={12}>
          <Input
            id='entidadBancaria'
            label='Entidad Bancaria'
            name='entidadBancaria'
            value={values.entidadBancaria}
            onChange={handleInputChange}
            error={recognizeEmptyName('entidadBancaria')}
            helperText={valuesError.primerNombreUsuario}
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
            items={items}
            disabled={false}
            error={recognizeEmptyName('idTipoTransaccion')}
            helperText={valuesError.idTipoTransaccion}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Input
            id='numeroCuota'
            label='Cuota a Pagar'
            name='numeroCuota'
            value={values.numeroCuota}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Input
            id='valorCuota'
            label='Valor Cuota'
            name='valorCuota'
            value={values.valorNetoFactura / values.cuotasFactura}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <button
            type='submit'
            className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
          >
            Registrar
          </button>
        </Grid>
      </Grid>
    </form>
  )
}
