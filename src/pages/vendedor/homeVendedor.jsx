import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/siderbarComponent'
import StackCustom from '../../components/stackComponent'
import Input from '../../components/InputComponent'
import { Grid, Box } from '@mui/material'
import Select from '../../components/selectComponent'
import Button from '../../components/buttonComponent'
import DataTable from '../../components/dataTable'
import useDataPreload from '../../hooks/useDataReload'
import { useUser } from '../../utils/authContext'
import { api } from '../../utils/conection'
import dayjs from 'dayjs'
import AgregarCliente from '../../components/CrearCliente'
import CustomModal from '../../components/modalComponent'
import AutocompleteComponent from '../../components/autocompletComponent'
import AlertPrincipal from '../../components/alertSucces'

function multiplicacion (a, b) {
  return parseInt(a, 10) * parseInt(b, 10)
}

function HomeVendedor () {
  const { user } = useUser()
  const today = new Date()
  const [total, setTotal] = useState(0)
  const [prices, setPrices] = useState([])
  const [products, setProducts] = useState([])
  const [iva, setIva] = useState(0)
  const [formData, setFormData] = useState({
    selectProduct: '',
    cedula: '',
    cantidad: '',
    cantidadCuotasFactura: '', // Se manejará como string pero se convertirá a entero
    idTipoCuota: '', // Lo guardamos como string, pero lo convertimos a entero al usarlo
    productosFacturas: [],
    valorBrutoFactura: '',
    valorNetoFactura: '',
    fechaProximoPago: '',
    idUsuario: user.id,
    idCliente: ''
  })
  const [info, setInfo] = useState('')
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [actualizar, setActualizar] = useState(false)
  const { data: productsData, error: productsError } = useDataPreload('/products/')
  const { data: cuotasData, error: cuotasError } = useDataPreload('/facturas/ver-tipo-cuota')
  const { data: clientData, refetchData } = useDataPreload('cliente/todos/clientes')

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (productsError) {
      console.error('Error fetching products:', productsError.message)
    }
    if (cuotasError) {
      console.error('Error fetching tipo de cuota:', cuotasError.message)
    }
  }, [productsError, cuotasError])

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'cantidadCuotasFactura') {
      const parsedValue = parseInt(value, 10)
      if (isNaN(parsedValue) || parsedValue < 1) {
        console.error('El número de cuotas debe ser un entero mayor que 0')
        return
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleAutocompleteChange = (name, newValue) => {
    console.log()
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: newValue
    }))
  }

  const handleAgregar = (event) => {
    event.preventDefault()

    const selectedProduct = productsData?.find(
      (product) => product.id === parseInt(formData.selectProduct, 10)
    )

    if (selectedProduct) {
      const cantidad = parseInt(formData.cantidad, 10)
      if (isNaN(cantidad) || cantidad <= 0) {
        console.error('Cantidad inválida')
        return
      }

      const precio = multiplicacion(selectedProduct.valor_producto, cantidad)

      setPrices((prevPrices) => [...prevPrices, precio])

      const newProduct = {
        idProducto: selectedProduct.id,
        nombre: selectedProduct.value,
        cantidad,
        valorProducto: precio
      }

      setProducts((prevProducts) => [...prevProducts, newProduct])

      setFormData((prevFormData) => ({
        ...prevFormData,
        productosFacturas: [...prevFormData.productosFacturas, newProduct]
      }))
    } else {
      console.error('Producto no encontrado')
    }
  }

  const calcularTotal = () => {
    const totalCalculado = prices.reduce((acc, curr) => acc + curr, 0)
    const ivaCalculado = totalCalculado * 0.19 // IVA del 19%
    setTotal(totalCalculado + ivaCalculado)
    setIva(ivaCalculado)

    setFormData((prevFormData) => ({
      ...prevFormData,
      valorBrutoFactura: totalCalculado,
      valorNetoFactura: totalCalculado + ivaCalculado
    }))
  }

  useEffect(() => {
    calcularTotal()
  }, [prices])

  useEffect(() => {
    refetchData()
  }, [actualizar])

  useEffect(() => {
    const futureDate = new Date(today)
    if (formData.idTipoCuota === '1') {
      futureDate.setDate(today.getDate() + 15)
    } else if (formData.idTipoCuota === '2') {
      futureDate.setDate(today.getDate() + 30)
    }
    const futureFormattedDate = dayjs(futureDate).format('YYYY-MM-DD')
    setFormData((prevFormData) => ({
      ...prevFormData,
      fechaProximoPago: futureFormattedDate
    }))
  }, [formData.idTipoCuota, today])

  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'nombre', headerName: 'Productos', width: 150 },
    { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    { field: 'precio', headerName: 'Precio', width: 150 }
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const clientResponse = await api.get(`/cliente/${formData.cedula}`)
      const clientId = clientResponse.data.id
      const updatedFormData = {
        ...formData,
        idCliente: clientId,
        fechaProximoPago:
          formData.idTipoCuota === '1'
            ? dayjs().add(15, 'day').format('YYYY-MM-DD')
            : dayjs().add(30, 'day').format('YYYY-MM-DD')
      }

      const facturaResponse = await api.post('/facturas/create', updatedFormData)
      console.log('Respuesta de la creación de factura:', facturaResponse)
      if (facturaResponse.status === 200) {
        console.log('Factura creada exitosamente!')
      } else {
        console.error('Error al crear factura. Detalles:', facturaResponse.data)
      }
    } catch (error) {
      console.error('Error creando factura:', error.message)
    }
  }

  const handleSelectId = (id) => {
    console.log('Selected row ID:', id)
  }

  return (
    <div className='flex'>
      <Sidebar />
      <StackCustom>
        <h2 className='flex justify-center text-6xl font-bold text-blue-fond p-2 rounded-lg'>
          Crear factura
        </h2>
        <Box display='flex' mt={2} mx={3}>
          <Box flex={1} mr={2}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select
                    id='select-product'
                    label='Seleccione los productos'
                    name='selectProduct'
                    onChange={handleChange}
                    value={formData.selectProduct}
                    items={
                      productsData
                        ? productsData.map((product) => ({
                          id: product.id_producto,
                          value: product.nombre_producto,
                          precio: product.valor_producto
                        }))
                        : []
                    }
                    required
                    disabled={false}
                    error={false}
                    helperText='Seleccione una opción'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    id='cantidad'
                    label='Cantidad'
                    name='cantidad'
                    type='number'
                    onChange={handleChange}
                    value={formData.cantidad}
                    required
                  />
                </Grid>
                <Grid item xs={12} container justifyContent='center'>
                  <Button onClick={handleAgregar} text='Agregar producto' />
                </Grid>
                <Grid item xs={12}>
                  <AutocompleteComponent
                    options={clientData}
                    id='cedula'
                    label='Cedula'
                    name='cedula'
                    value={formData.cedula}
                    onChange={handleAutocompleteChange}
                  />
                </Grid>
                <Grid item xs={12} container justifyContent='end'>
                  <CustomModal bgColor='primary' tooltip='Agregar' text='Agregar Cliente' top={screenWidth <= 1400 ? '0%' : '15%'} left={screenWidth <= 1400 ? '15%' : '25%'} padding={0}>
                    <AgregarCliente setInfo={setInfo} setActualizar={setActualizar} className='justify-end' />
                  </CustomModal>
                </Grid>
                <Grid item xs={12}>
                  <h1 className='text-center text-sky-800'>PAGOS</h1>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    id='cantidadCuotasFactura'
                    label='Numero de cuotas'
                    name='cantidadCuotasFactura'
                    type='number'
                    onChange={handleChange}
                    value={formData.cantidadCuotasFactura}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    id='idTipoCuota'
                    label='Tipo de cobro'
                    name='idTipoCuota'
                    onChange={handleChange}
                    value={formData.idTipoCuota}
                    items={cuotasData || []}
                    required
                    disabled={false}
                    error={false}
                    helperText='Seleccione una opción'
                  />
                </Grid>
                <Grid item xs={12} container justifyContent='center'>
                  <button
                    type='submit'
                    className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-sky-600 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
                  >
                    Enviar
                  </button>
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box flex={1}>
            <DataTable columns={columns} rows={products} selectId={handleSelectId} />
            <div className='flex flex-col items-center mt-10'>
              <h1 className='text-1xl font-bold text-center bg-gray-200 rounded-md p-4 mb-4'>
                IVA: {iva.toFixed(2)}
              </h1>
              <h1 className='text-1xl font-semibold text-center bg-blue-500 text-white rounded-md p-4'>
                TOTAL: {total.toFixed(2)}
              </h1>
            </div>
          </Box>
        </Box>
      </StackCustom>
      <AlertPrincipal message={info} severity='success' />
    </div>
  )
}

export default HomeVendedor
