import { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert, Fade } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { api } from '../utils/conection'
import { goOverErrors } from '../utils/goOverErros'
import AnimacionSvg from './animacionSVG'
import AutocompleteComponent from './autocompletComponent'
import useDataPreload from '../hooks/useDataReload'

const defautlvalues = {
  anotacion: '',
  idUserRemplazo: ''
}

export default function EliminarEmpleados (props) {
  const { setActualizar, setInfo, id } = props
  const { data: userData, refetchData } = useDataPreload(`/usuarios/zona/${id}`)
  const { values, handleInputChange, handleAutocompleteChange, setValues } = useForm(defautlvalues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlvalues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    refetchData()
    setDisabled(false)
  }, [id])

  const deleteUser = async (e) => {
    e.preventDefault()
    setValuesError(defautlvalues)
    setMostrarAlerta(false)
    setInfo('')
    try {
      const dataToSend = {
        ...values,
        idUserRemplazo: values.idUserRemplazo?.id
      }
      const response = await api.patch(`usuarios/desabilitar/${id}`, dataToSend)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defautlvalues)
      setInfo(response.data.message)
      setDisabled(true)
    } catch (error) {
      let errorMessage = 'Error al eliminar el registro'
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
    <form className='rounded-lg' onSubmit={deleteUser}>
      <Grid container spacing={2} columns={12} className='max-w-[600px]'>
        <Grid item xs={12} sm={5}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <AnimacionSvg />
          </div>
        </Grid>
        <Grid item xs={12} sm={7} className='pb-1'>
          <h1 className='text-3xl text-center mt-3 mb-1 pr-9 font-semibold text-gray-500'>Desactivar empleado</h1>
          {mostrarAlerta &&
            <Fade in={mostrarAlerta} timeout={300} className='mb-4'>
              <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
                {mensajeError}
              </Alert>
            </Fade>}
          <Grid container spacing={2} columns={12} className='pl-2 pr-6 pb-1'>
            <Grid item xs={12} sm={12}>
              <AutocompleteComponent
                options={userData}
                id='idUserRemplazo'
                label='Usuario de reemplazo'
                name='idUserRemplazo'
                value={values.idUserRemplazo}
                onChange={handleAutocompleteChange}
                disabled={disabled}
                error={recognizeEmptyName('idUserRemplazo')}
                helperText={valuesError.idUserRemplazo}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                id='anotacion'
                label='Anotacion'
                name='anotacion'
                value={values.anotacion}
                onChange={handleInputChange}
                error={recognizeEmptyName('anotacion')}
                helperText={valuesError.anotacion}
                multiline
                disabled={disabled}
                InputProps={{
                  endAdornment: recognizeEmptyName('anotacion') && (
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
              <button
                type='submit'
                className={`w-full inline-block px-6 py-3 bg-gray-800 text-white rounded-lg  hover:bg-gray-700 transition duration-300 ease-in-out font-semibold hover:-translate-y-px active:opacity-85 hover:shadow-md ${disabled ? 'opacity-50' : ''}`}
                disabled={disabled}
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
