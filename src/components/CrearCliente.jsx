import { useState } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert, Fade } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Selects from '../components/selectComponent'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'
import { useUser } from '../utils/authContext'
import AvatarComponent from './cargaImagenes'
import AnimacionSvg from './animacionSVG'
import useDataPreload from '../hooks/useDataReload'

const defautlvalues = {
  primerNombreClient: '',
  segundoNombreClient: '',
  primerApellidoClient: '',
  segundoApellidoClient: '',
  numeroDocumentoClient: '',
  correoClient: '',
  idGenero: '',
  telefonoClient: '',
  direccionClient: '',
  linkFoto: ''
}

export default function AgregarCliente (props) {
  const { user } = useUser()
  const { setActualizar, setInfo } = props

  const { values, handleInputChange, setValues } = useForm(defautlvalues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlvalues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const [buffer, setBuffer] = useState(null)
  const [controlAvatar, setControlAvatar] = useState(false)
  const { data: genereData } = useDataPreload('/usuarios/datageneral/generos')

  const createClient = async (e) => {
    e.preventDefault()
    setValuesError(defautlvalues)
    setMostrarAlerta(false)
    setInfo('')
    const formData = new FormData()
    for (const key in values) {
      formData.append(key, values[key])
    }
    formData.append('idZona', user.id_zona)
    if (buffer) formData.append('archivo', buffer)
    try {
      const response = await axios.post('http://localhost:4321/cliente', formData)
      setActualizar(prevValuesError => (
        !prevValuesError
      ))
      setValues(defautlvalues)
      setInfo(response.data.message)
      setBuffer(null)
      setControlAvatar(!controlAvatar)
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
    <form className='rounded-lg'>
      <Grid container spacing={2} columns={12} className='max-w-[1000px]'>
        <Grid item xs={12} sm={5}>
          <div className='w-full h-full rounded-tl-lg rounded-bl-lg' style={{ position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <AvatarComponent setBuffer={setBuffer} control={controlAvatar} />
            </div>
            <AnimacionSvg />
          </div>
        </Grid>
        <Grid item xs={12} sm={7} className='pb-2'>
          <h1 className='text-4xl text-center mt-3 mb-1 text-blue-fond font-bold'>Registra tu cliente</h1>
          {mostrarAlerta &&
            <Fade in={mostrarAlerta} timeout={300} className='mb-4'>
              <Alert severity='error' variant='outlined' sx={{ width: '98%' }}>
                {mensajeError}
              </Alert>
            </Fade>}
          <Grid container spacing={2} columns={12} className='pl-2 pr-2 pb-1 overflow-y-scroll h-[550px]'>
            <Grid item xs={12} sm={6}>
              <Input
                id='primerNombreClient'
                label='Primer Nombre'
                name='primerNombreClient'
                value={values.primerNombreClient}
                onChange={handleInputChange}
                error={recognizeEmptyName('primerNombreClient')}
                helperText={valuesError.primerNombreClient}
                InputProps={{
                  endAdornment: recognizeEmptyName('primerNombreClient') && (
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
                id='segundoNombreClient'
                label='Segundo Nombre'
                name='segundoNombreClient'
                value={values.segundoNombreClient}
                onChange={handleInputChange}
                error={recognizeEmptyName('segundoNombreClient')}
                helperText={valuesError.segundoNombreClient}
                InputProps={{
                  endAdornment: recognizeEmptyName('segundoNombreClient') && (
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
                id='primerApellidoClient'
                label='Primer Apellido'
                name='primerApellidoClient'
                value={values.primerApellidoClient}
                onChange={handleInputChange}
                error={recognizeEmptyName('primerApellidoClient')}
                helperText={valuesError.primerApellidoClient}
                InputProps={{
                  endAdornment: recognizeEmptyName('primerApellidoClient') && (
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
                id='segundoApellidoClient'
                label='Segundo Apellido'
                name='segundoApellidoClient'
                value={values.segundoApellidoClient}
                onChange={handleInputChange}
                error={recognizeEmptyName('segundoApellidoClient')}
                helperText={valuesError.segundoApellidoClient}
                InputProps={{
                  endAdornment: recognizeEmptyName('segundoApellidoClient') && (
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
                id='numeroDocumentoClient'
                label='Numero Documento'
                name='numeroDocumentoClient'
                value={values.numeroDocumentoClient}
                onChange={handleInputChange}
                error={recognizeEmptyName('numeroDocumentoClient')}
                helperText={valuesError.numeroDocumentoClient}
                InputProps={{
                  endAdornment: recognizeEmptyName('numeroDocumentoClient') && (
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
                id='correoClient'
                label='Correo'
                name='correoClient'
                value={values.correoClient}
                onChange={handleInputChange}
                error={recognizeEmptyName('correoClient')}
                helperText={valuesError.correoClient}
                InputProps={{
                  endAdornment: recognizeEmptyName('correoClient') && (
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
                items={genereData}
                disabled={false}
                error={recognizeEmptyName('idGenero')}
                helperText={valuesError.idGenero}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                id='telefonoClient'
                label='Telefono'
                name='telefonoClient'
                value={values.telefonoClient}
                onChange={handleInputChange}
                error={recognizeEmptyName('telefonoClient')}
                helperText={valuesError.telefonoClient}
                InputProps={{
                  endAdornment: recognizeEmptyName('telefonoClient') && (
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
                id='direccionClient'
                label='Direccion'
                name='direccionClient'
                value={values.direccionClient}
                onChange={handleInputChange}
                error={recognizeEmptyName('direccionClient')}
                helperText={valuesError.direccionClient}
                InputProps={{
                  endAdornment: recognizeEmptyName('direccionClient') && (
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
                type='button'
                onClick={createClient}
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
