import { useState, useEffect } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Selects from '../components/selectComponent'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'
import { getDataById } from '../utils/getDataById'
import { api } from '../utils/conection'

const defautlvalues = {
  anotacion: '',
  idUserRemplazo: ''
}

export default function EliminarEmpleados (props) {
  const { setActualizar, setInfo, id } = props
  const { values, handleInputChange, setValues } = useForm(defautlvalues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlvalues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    const getData = async (id) => {
      const { todosDatos, validacion } = await getDataById({ id, endpoind: 'usuarios', defautlvalues })
      if (validacion) {
        if (todosDatos instanceof Error) {
          setMensajeError(todosDatos)
        } else {
          try {
            const result = await api.get(`/usuarios/zona/${id}`)
            setItems(result.data)
          } catch (error) {
            setItems([])
          }
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
      const response = await axios.patch(`http://localhost:4321/usuarios/desabilitar/${id}`, values)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defautlvalues)
      setInfo(response.data.message)
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
    <form className='overflow-y-scroll auto pt-2 pb-2 w-[300px]' onSubmit={editUser}>
      <h1 className='text-3xl text-center mb-2'>Desactivar Empleado</h1>
      {mostrarAlerta && (
        <Alert severity='error' variant='outlined' sx={{ width: '100%', marginBottom: '1rem' }}>
          {mensajeError}
        </Alert>
      )}
      <Grid container spacing={2} columns={12} className='max-w-[300px]'>
        <Grid item xs={12} sm={12}>
          <Selects
            id='idUserRemplazo'
            label='Usuario de reemplazo'
            name='idUserRemplazo'
            value={values.idUserRemplazo}
            onChange={handleInputChange}
            items={items}
            disabled={false}
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
            className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
          >
            Registrar
          </button>
        </Grid>
      </Grid>
    </form>
  )
}
