import { useState } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert, Fade } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Selects from '../components/selectComponent'
import InputDate from '../components/dateComponent'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'
import AvatarComponent from './cargaImagenes'
import AnimacionSvg from './animacionSVG'

const defautlvalues = {
  primerNombreUsuario: '',
  segundoNombreUsuario: '',
  primerApellidoUsuario: '',
  segundoApellidoUsuario: '',
  numeroDocumentoUsuario: '',
  passwordUsuario: '',
  correoUsuario: '',
  idGenero: '',
  telefonoUsuario: '',
  direccionUsuario: '',
  fechaNacimientoUsuario: ''
}

const items = [
  { id: 'M', value: 'Hombre' },
  { id: 'F', value: 'Mujer' }
]

export default function AgregarEmpleados (props) {
  const { setActualizar, setInfo } = props
  const { values, handleInputChange, handleInputChangeDate, setValues } = useForm(defautlvalues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlvalues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const [buffer, setBuffer] = useState(null)

  const createUser = async (e) => {
    e.preventDefault()
    setValuesError(defautlvalues)
    setMostrarAlerta(false)
    const formData = new FormData()
    for (const key in values) {
      formData.append(key, values[key])
    }
    if (buffer) formData.append('archivo', buffer)
    try {
      const response = await axios.post('http://localhost:4321/usuarios', formData)
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
    <form className='rounded-lg' onSubmit={createUser}>
      <Grid container spacing={2} columns={12} className='max-w-[1000px] '>
        <Grid item xs={12} sm={5}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <AvatarComponent setBuffer={setBuffer} />
            </div>
            <AnimacionSvg />
          </div>
        </Grid>

        <Grid item xs={12} sm={7} className='pb-2'>
          <h1 className='text-4xl text-center mt-3 mb-1 text-blue-fond font-bold'>Registra tu empleado</h1>
          {mostrarAlerta &&
            <Fade in={mostrarAlerta} timeout={300} className='mb-4'>
              <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
                {mensajeError}
              </Alert>
            </Fade>}
          <Grid container spacing={2} columns={12} className='pl-2 pr-2 pb-1 overflow-y-scroll h-[550px]'>
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
                id='passwordUsuario'
                label='Contraseña'
                name='passwordUsuario'
                value={values.passwordUsuario}
                onChange={handleInputChange}
                error={recognizeEmptyName('passwordUsuario')}
                helperText={valuesError.passwordUsuario}
                InputProps={{
                  endAdornment: recognizeEmptyName('passwordUsuario') && (
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
