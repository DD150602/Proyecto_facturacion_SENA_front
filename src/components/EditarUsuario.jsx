import { useState } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Selects from '../components/selectComponent'
import InputDate from '../components/dateComponent'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'

const defautlvalues = {
  primerNombreUsuario: '',
  segundoNombreUsuario: '',
  primerApellidoUsuario: '',
  segundoApellidoUsuario: '',
  numeroDocumentoUsuario: '',
  passwordUsuario: '',
  correoUsuario: '',
  idGenero: '',
  idTipoUsuario: 2,
  telefonoUsuario: '',
  direccionUsuario: '',
  fechaNacimientoUsuario: '',
  linkFoto: 'dahsasdjkhdka'
}

const items = [
  { id: 'M', value: 'Hombre' },
  { id: 'F', value: 'Mujer' }
]

export default function EditarEmpleados (props) {
  const { setActualizar, setInfo } = props
  const { values, handleInputChange, handleInputChangeDate, setValues } = useForm(defautlvalues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlvalues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)

  const editUser = async (e) => {
    e.preventDefault()
    setValuesError(defautlvalues)
    setMostrarAlerta(false)
    try {
      const response = await axios.post('http://localhost:4321/usuarios', values)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defautlvalues)
      setInfo(response.data.message)
    } catch (error) {
      let errorMessage = 'Error al generar el registro'
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
    <form className='overflow-y-scroll h-[400px] pt-2 pb-2' onSubmit={editUser}>
      <h1 className='text-3xl text-center mb-2'>Editar Empleado</h1>
      {mostrarAlerta && (
        <Alert severity='error' variant='outlined' sx={{ width: '100%', marginBottom: '1rem' }}>
          {mensajeError}
        </Alert>
      )}
      <Grid container spacing={2} columns={12} className='max-w-[500px]'>
        <Grid item xs={12} sm={6}>
          <Input
            id='primerNombreUsuario'
            label='Primer Nombre'
            name='primerNombreUsuario'
            value={values.primerNombreUsuario}
            onChange={handleInputChange}
            error={recognizeEmptyName('primerNombreUsuario')}
            helperText={valuesError.primerNombreUsuario}
            InputProps={{
              endAdornment: recognizeEmptyName('primerNombreUsuario') && (
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <ErrorOutlineIcon color='error' />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id='segundoNombreUsuario'
            label='Segundo Nombre'
            name='segundoNombreUsuario'
            value={values.segundoNombreUsuario}
            onChange={handleInputChange}
            error={recognizeEmptyName('segundoNombreUsuario')}
            helperText={valuesError.segundoNombreUsuario}
            InputProps={{
              endAdornment: recognizeEmptyName('segundoNombreUsuario') && (
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <ErrorOutlineIcon color='error' />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id='primerApellidoUsuario'
            label='Primer Apellido'
            name='primerApellidoUsuario'
            value={values.primerApellidoUsuario}
            onChange={handleInputChange}
            error={recognizeEmptyName('primerApellidoUsuario')}
            helperText={valuesError.primerApellidoUsuario}
            InputProps={{
              endAdornment: recognizeEmptyName('primerApellidoUsuario') && (
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <ErrorOutlineIcon color='error' />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id='segundoApellidoUsuario'
            label='Segundo Apellido'
            name='segundoApellidoUsuario'
            value={values.segundoApellidoUsuario}
            onChange={handleInputChange}
            error={recognizeEmptyName('segundoApellidoUsuario')}
            helperText={valuesError.segundoApellidoUsuario}
            InputProps={{
              endAdornment: recognizeEmptyName('segundoApellidoUsuario') && (
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
            id='correoUsuario'
            label='Correo'
            name='correoUsuario'
            value={values.correoUsuario}
            onChange={handleInputChange}
            error={recognizeEmptyName('correoUsuario')}
            helperText={valuesError.correoUsuario}
            InputProps={{
              endAdornment: recognizeEmptyName('correoUsuario') && (
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <ErrorOutlineIcon color='error' />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id='numeroDocumentoUsuario'
            label='Numero Documento'
            name='numeroDocumentoUsuario'
            value={values.numeroDocumentoUsuario}
            onChange={handleInputChange}
            error={recognizeEmptyName('numeroDocumentoUsuario')}
            helperText={valuesError.numeroDocumentoUsuario}
            InputProps={{
              endAdornment: recognizeEmptyName('numeroDocumentoUsuario') && (
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <ErrorOutlineIcon color='error' />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Selects
            id='idGenero'
            label='Genero'
            name='idGenero'
            value={values.idGenero}
            onChange={handleInputChange}
            items={items}
            disabled={false}
            error={recognizeEmptyName('idGenero')}
            helperText={valuesError.idGenero}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id='telefonoUsuario'
            label='Telefono'
            name='telefonoUsuario'
            value={values.telefonoUsuario}
            onChange={handleInputChange}
            error={recognizeEmptyName('telefonoUsuario')}
            helperText={valuesError.telefonoUsuario}
            InputProps={{
              endAdornment: recognizeEmptyName('telefonoUsuario') && (
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <ErrorOutlineIcon color='error' />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputDate
            id='fechaNacimientoUsuario'
            label='Fecha Nacimiento'
            name='fechaNacimientoUsuario'
            fecha={values.fechaNacimientoUsuario}
            onChange={handleInputChangeDate}
            required
            disabled={false}
            error={recognizeEmptyName('fechaNacimientoUsuario')}
            helperText={valuesError.fechaNacimientoUsuario}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Input
            id='direccionUsuario'
            label='Direccion'
            name='direccionUsuario'
            value={values.direccionUsuario}
            onChange={handleInputChange}
            error={recognizeEmptyName('direccionUsuario')}
            helperText={valuesError.direccionUsuario}
            InputProps={{
              endAdornment: recognizeEmptyName('direccionUsuario') && (
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
