import { useState } from 'react'
import Input from '../components/InputComponent'
import useFormErrors from '../hooks/UseErrorForm'
import useForm from '../hooks/UseForm'
import { IconButton, InputAdornment, Grid, Alert } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Selects from '../components/selectComponent'
import axios from 'axios'
import { goOverErrors } from '../utils/goOverErros'
import { useUser } from '../utils/authContext'
import CustomModal from './modalComponent'
import AddIcon from '@mui/icons-material/Add'

const items = [
  { id: 'M', value: 'Hombre' },
  { id: 'F', value: 'Mujer' }
]

export default function AgregarCliente () {
  const { user } = useUser()

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
    linkFoto: 'dahsasdjkhdka',
    idZona: user.id
  }
  const { values, handleInputChange, setValues } = useForm(defautlvalues)
  const { valuesError, setValuesError, handleSettingError, recognizeEmptyName } = useFormErrors(defautlvalues)
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)

  const createUser = async (e) => {
    e.preventDefault()
    setValuesError(defautlvalues)
    setMostrarAlerta(false)
    try {
      const response = await axios.post('http://localhost:4321/cliente', values)
      setValues(defautlvalues)
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
    <CustomModal bgColor='primary' icon={<AddIcon className='w-6 h-6 mr-1' />} tooltip='Agregar' text='Agregar'>
      <form className='overflow-y-scroll h-[400px] pt-2 pb-2' onSubmit={createUser}>
        <h1 className='text-3xl text-center mb-2'>Agregar Cliente</h1>
        {mostrarAlerta && (
          <Alert severity='error' variant='outlined' sx={{ width: '100%', marginBottom: '1rem' }}>
            {mensajeError}
          </Alert>
        )}
        <Grid container spacing={2} columns={12} className='max-w-[500px]'>
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
              items={items}
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
              type='submit'
              className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
            >
              Registrar
            </button>
          </Grid>
        </Grid>
      </form>
    </CustomModal>
  )
}
