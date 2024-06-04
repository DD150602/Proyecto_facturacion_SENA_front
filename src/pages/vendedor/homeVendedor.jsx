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

function multiplicacion (a, b) {
  return parseInt(a, 10) * parseInt(b, 10)
}

function calcularFechaProximoPago (idTipoCuota, today) {
  const futureDate = new Date(today)
  if (idTipoCuota === 1) {
    futureDate.setDate(today.getDate() + 15)
  } else if (idTipoCuota === 2) {
    futureDate.setDate(today.getDate() + 30)
  }
  return dayjs(futureDate).format('YYYY-MM-DD')
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
    idCliente: '',
    correoUsuario: '',
    nombreUsuario: '',
    apellidoUsuario: ''
  })

  const { data: productsData, error: productsError } = useDataPreload('/facturas/ver-products')
  const { data: cuotasData, error: cuotasError } = useDataPreload('/facturas/ver-tipo-cuota')

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
      [name]: name === 'idTipoCuota' || name === 'cantidadCuotasFactura' ? parseInt(value, 10) : value
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
        id: selectedProduct.id,
        nombre: selectedProduct.value,
        cantidad,
        precio
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

  useEffect(() => {
    const totalCalculado = prices.reduce((acc, curr) => acc + curr, 0)
    const ivaCalculado = totalCalculado * 0.19 // IVA del 19%
    setTotal(totalCalculado + ivaCalculado)
    setIva(ivaCalculado)

    setFormData((prevFormData) => ({
      ...prevFormData,
      valorBrutoFactura: totalCalculado,
      valorNetoFactura: totalCalculado + ivaCalculado
    }))
  }, [prices])

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fechaProximoPago: calcularFechaProximoPago(formData.idTipoCuota, today)
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
      console.log(clientResponse)
      const clientId = clientResponse.data.id
      const primerNombre = clientResponse.data.primer_nombre_cliente
      const primerApellido = clientResponse.data.primer_apellido_cliente
      const correo = clientResponse.data.correo_cliente
      const updatedFormData = {
        ...formData,
        idCliente: clientId,
        correoUsuario: correo,
        nombreUsuario: primerNombre,
        apellidoUsuario: primerApellido,
        fechaProximoPago: calcularFechaProximoPago(formData.idTipoCuota, today)
      }

      const facturaResponse = await api.post('/facturas/create', updatedFormData)
      console.log('Respuesta de la creación de factura:', facturaResponse)
      if (facturaResponse.status === 200) {
        console.log('Factura creada exitosamente!')
      } else {
        console.error('Error al crear factura. Detalles:', facturaResponse.data)
      }

      const facturaResponseSend = await api.post('/facturas/send-factura', updatedFormData)
      console.log('Respuesta de la creación de factura:', facturaResponseSend)
      if (facturaResponseSend.status === 200) {
        console.log('Factura creada exitosamente!')
      } else {
        console.error('Error al crear factura. Detalles:', facturaResponseSend.data)
      }

      // eslint-disable-next-line no-undef
      alert('Enviado')
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
                    id='selectProduct'
                    label='Seleccione los productos'
                    name='selectProduct'
                    onChange={handleChange}
                    value={formData.selectProduct}
                    items={
                      productsData
                        ? productsData.map((product) => ({
                          id: product.id,
                          value: product.value,
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
                  <Button onClick={handleAgregar} text='Agregar' />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    id='cedula'
                    label='Cedula'
                    name='cedula'
                    type='text'
                    onChange={handleChange}
                    value={formData.cedula}
                    required
                  />
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
    </div>
  )
}

export default HomeVendedor
