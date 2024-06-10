import React, { useState, useEffect } from 'react'
import StackCumston from '../../components/stackComponent'
import Sidebar from '../../components/siderbarComponent'
import CustomModal from '../../components/modalComponent'
import Botonera from '../../components/groupButton'
import AddIcon from '@mui/icons-material/Add'
import CreateIcon from '@mui/icons-material/Create'
import AgregarZona from '../../components/agregarZona'
import Input from '../../components/InputComponent'
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor'
import { Stack, InputAdornment, IconButton, Snackbar, Alert, Grid, Box, Tooltip } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import LogoUser from '../../assets/img/circle.png'
import LogoCheck from '../../assets/img/check(1).png'
import LogoZonas from '../../assets/img/store.png'
import UpdateZona from '../../components/updateZona'
import Swal from 'sweetalert2'
import AlertPrincipal from '../../components/alertSucces'
import { api } from '../../utils/conection'

const defaultValues = {
  numeroDocumento: ''
}

export default function ZonasAdmin () {
  const [values, setValues] = useState(defaultValues)
  const [valuesError, setValuesError] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [vendedor, setVendedor] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [selectedZonas, setSelectedZonas] = useState('')
  const [zonas, setZonas] = useState([])
  const [error, setError] = useState('')
  const [actualizar, setActualizar] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const recognizeEmptyName = (name) => {
    return submitted && values[name] === ''
  }

  const handleSettingError = (name, error) => {
    setValuesError({ ...valuesError, [name]: error })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    setError('')
    if (values.numeroDocumento === '') {
      handleSettingError('numeroDocumento', 'El número de documento es requerido.')
      return
    }

    try {
      const response = await api.get(`zona/getUser/${values.numeroDocumento}`)
      setVendedor(response.data[0])
      setOpenSnackbar(true)
    } catch (error) {
      setVendedor(null)
      setError(error.response?.data?.message)
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleZonafromUser = async (e) => {
    e.preventDefault()
    setError('')
    if (!vendedor?.id) {
      setError('No hay ningun vendedor seleccionado')
      return
    }
    if (selectedZonas === '') {
      setError('No ha seleccionado ninguna zona')
      return
    }
    try {
      const response = await api.patch(`zona/add_user/${vendedor.id}`, {
        idZona: selectedZonas
      })
      console.log('Zona vinculada correctamente:', response.data)
      const primerNombre = vendedor.primer_nombre_usuario
      const primerApellido = vendedor.primer_apellido_usuario
      if (primerNombre && primerApellido) {
        Swal.fire({
          icon: 'success',
          title: 'Vinculación exitosa',
          text: `Zona vinculada correctamente al empleado ${primerNombre} ${primerApellido}`
        })
      }
      setValues(defaultValues)
      setValuesError({})
      setSubmitted(false)
      setVendedor(null)
      setSelectedZonas([])
    } catch (error) {
      console.error('Error al vincular la zona:', error)
    }
  }

  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const response = await api.get('zona')
        setZonas(response.data)
      } catch (error) {
        console.error('Erro al traer la zonas:', error)
      }
    }

    fetchZonas()
  }, [actualizar])

  return (
    <>
      <Sidebar />
      <StackCumston>
        <Botonera
          title='Gestiona tus zonas'
          agregar={<CustomModal bgColor='primary' icon={<AddIcon className='w-6 h-6 mr-1' />} tooltip='Agregar Zona' text='Agregar' padding={0}><AgregarZona setActualizar={setActualizar} /></CustomModal>}
          editar={<CustomModal bgColor='secondary' icon={<CreateIcon className='w-6 h-6 mr-1' />} tooltip='Editar Zona' text='Editar' disabled={!selectedZonas} padding={0}><UpdateZona id={selectedZonas} setActualizar={setActualizar} /></CustomModal>}
        />
        <div className='flex flex-col md:flex-row items-start'>
          <div className='w-full md:w-1/2 px-4'>
            <p className='text-xm text-gray-500 mb-5'>Filtra a tu vendedor por numero de documento para vincular la zona</p>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Input
                    className='w-full md:w-1/2'
                    id='numeroDocumento'
                    label='Número de documento'
                    name='numeroDocumento'
                    value={values.numeroDocumento}
                    onChange={handleInputChange}
                    error={recognizeEmptyName('numeroDocumento')}
                    helperText={recognizeEmptyName('numeroDocumento') && valuesError.numeroDocumento}
                    InputProps={{
                      endAdornment: recognizeEmptyName('numeroDocumento') && (
                        <InputAdornment position='end'>
                          <IconButton edge='end'>
                            <ErrorOutlineIcon color='error' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <button
                    type='submit'
                    className='w-full md:w-1/2 bg-gray-800 text-white rounded-lg py-3 px-6 hover:bg-gray-700 transition duration-300 ease-in-out font-semibold'
                  >
                    Buscar <YoutubeSearchedForIcon />
                  </button>
                </Stack>
              </Stack>
            </form>
            {vendedor && (
              <>
                <div className='mt-8 p-4 bg-gray-100 rounded-lg shadow-lg flex'>
                  <div className='flex-1'>
                    <h2 className='text-lg font-bold'>Nombre completo: {vendedor.primer_nombre_usuario} {vendedor.primer_apellido_usuario}</h2>
                    <p className='text-gray-600'>Correo: {vendedor.correo_usuario}</p>
                    <p className='text-gray-600'>Número de documento: {vendedor.numero_documento_usuario}</p>
                    <p className='text-gray-600'>Teléfono: {vendedor.telefono_usuario}</p>
                    <p className='text-gray-600'>Dirección: {vendedor.direccion_usuario}</p>
                    <p className='text-gray-600'>Zona: {vendedor.nombre_zona ? vendedor.nombre_zona : 'No hay zona asignada'}</p>
                  </div>
                  <div className='flex items-center ml-4'>
                    <img src={LogoUser} alt='User Logo' className='w-16 h-16 mr-10' />
                  </div>
                </div>
                <div className='mt-4 p-4 bg-gray-800 text-white rounded-lg flex items-center'>
                  <img src={LogoCheck} alt='Verified Logo' className='w-8 h-8 mr-4' />
                  <h3 className='text-lg font-semibold'>Verificado</h3>
                </div>
              </>
            )}
          </div>
          <div className='w-full md:w-1/2 mt-12'>
            <div className='overflow-y-scroll max-h-[350px]'>
              {zonas.length > 0
                ? (
                  <Grid container spacing={2}>
                    {zonas.map((zona) => (
                      <Grid item xs={12} sm={6} key={zona.id}>
                        <Box display='flex' flexDirection='column' padding={2} border={1} borderColor='grey.300' borderRadius={2}>
                          <Box display='flex' alignItems='center'>
                            <img src={LogoZonas} alt='Zona Logo' className='w-10 h-10 mr-4' />
                            <input
                              name='zonas'
                              type='radio'
                              className='form-checkbox mr-2 h-5 w-5 text-gray-600 rounded focus:ring-indigo-500 border-gray-300'
                              onChange={() => setSelectedZonas(zona.id)}
                            />

                            <span>{zona.nombre_zona}</span>
                          </Box>
                          <Box mt={1}>
                            <p className='text-gray-600'>{zona.descripcion_zona}</p>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  )
                : (
                  <p>No hay zonas registradas.</p>
                  )}

            </div>
            <div className='flex justify-center mt-3'>
              <Tooltip title='Vincular zona'>
                <button
                  className='bg-gray-800 text-white rounded-lg py-3 px-6 hover:bg-gray-700 transition duration-300 ease-in-out font-semibold'
                  onClick={handleZonafromUser}
                >
                  Vincular <YoutubeSearchedForIcon />
                </button>

              </Tooltip>
            </div>
          </div>

        </div>
      </StackCumston>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          Datos encontrados
        </Alert>
      </Snackbar>
      <AlertPrincipal message={error} severity='error' />
    </>
  )
}
