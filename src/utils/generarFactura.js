import jsPDF from 'jspdf'
import imagen from '../assets/img/cabecera.png'
import imagen2 from '../assets/img/piePagina.png'
import imagen3 from '../assets/img/firma.jpg'
import dayjs from 'dayjs'

export const generarPdf = (datos) => {
  console.log(datos)
  // eslint-disable-next-line new-cap
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [215.9, 279.4]
  })

  const contadorPaginas = 1
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  let posiciony = generaCabecera(datos, doc, pageWidth)
  let posicionInicial = posiciony
  let datosIngresados = 1
  for (const productos of datos.productosFacturas) {
    if (datosIngresados === 13) {
      posicionInicial = posiciony
      datosIngresados = 1
      generarFinalDocumento(doc, pageWidth, pageHeight, contadorPaginas)
      doc.addPage()
      generaCabecera()
      posiciony = generaCabecera(datos, doc, pageWidth)
    }
    doc.setTextColor(0, 0, 0)
    doc.setFont(undefined, 'normal')
    doc.setFontSize(10)
    doc.text(`${productos.nombre}`, 10, posicionInicial)
    doc.text(`${productos.cantidad}`, calculoCentral(`${productos.cantidad}`, 30, doc) + 91, posicionInicial)
    doc.text(`${(productos.precio / productos.cantidad)}`, calculoCentral(`${(productos.precio / productos.cantidad)}`, 35, doc) + 122, posicionInicial)
    doc.text(`${productos.precio}`, calculoCentral(`${productos.precio}`, 50, doc) + 158, posicionInicial)
    doc.setDrawColor(0, 0, 0)
    posicionInicial += 3
    doc.line(10, posicionInicial, 205, posicionInicial)
    posicionInicial += 5
    datosIngresados++
  }
  posiciony = posicionInicial
  doc.setFontSize(11)
  doc.text('Subtotal', calculoCentral('Subtotal', 35, doc) + 122, posiciony)
  doc.text(`${datos.valorBrutoFactura}`, calculoCentral(`${datos.valorBrutoFactura}`, 50, doc) + 158, posiciony)
  posiciony += 5
  doc.text('IVA 19%', calculoCentral('IVA 19%', 35, doc) + 122, posiciony)
  doc.text(`${datos.valorBrutoFactura * 0.19}`, calculoCentral(`${datos.valorBrutoFactura * 0.19}`, 50, doc) + 158, posiciony)
  posiciony += 5
  doc.setFont(undefined, 'bold')
  doc.text('TOTAL', calculoCentral('TOTAL', 35, doc) + 122, posiciony)
  doc.text(`${datos.valorNetoFactura}`, calculoCentral(`${datos.valorNetoFactura}`, 50, doc) + 158, posiciony)
  generarFinalDocumento(doc, pageWidth, pageHeight, contadorPaginas)
  doc.setFont(undefined, 'bold')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.addImage(imagen3, 'jpg', 140, posiciony + 1, 50, 20)
  impresionTexto('Condiciones de pago: El pago se realizara en un plazo maximo de 1 mes', doc.internal.pageSize.getHeight() - 18, doc, pageWidth)
  return (doc.output('blob'))
}

const generaCabecera = (datos, doc, pageWidth) => {
  doc.setFontSize(17)
  doc.setFont(undefined, 'bold')
  doc.setTextColor(255, 255, 255)
  const imgWidth = 216.9
  const imgHeight = 49.117635270541086
  doc.addImage(imagen, 'png', -1, 0, imgWidth, imgHeight)
  doc.text('N° FACTURA', pageWidth - doc.getTextWidth('N° FACTURA') - 5, 15)
  doc.text(`${datos.idFactura}`, pageWidth - doc.getTextWidth('N° FACTURA') + 6, 20)
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(12)
  let positiony = imgHeight + 1
  doc.text('DATOS DEL CLIENTE', 10, positiony)
  doc.text('DATOS DE LA EMPRESA', pageWidth - 10 - doc.getTextWidth('DATOS DE LA EMPRESA'), positiony)
  positiony += 4
  doc.setFont(undefined, 'normal')
  doc.setFontSize(11)
  doc.text('Nombre:' + datos.nombreUsuario + ' ' + datos.apellidoUsuario, 10, positiony)
  doc.text(`Nombre: ${datos.vendedor}`, pageWidth - 10 - doc.getTextWidth(`Nombre: ${datos.vendedor}`), positiony)
  positiony += 4
  doc.text('Numero Documento: ' + datos.cedula.id, 10, positiony)
  doc.text('Direccion: Calle Cualquiera 123', pageWidth - 10 - doc.getTextWidth('Direccion: Calle Cualquiera 123'), positiony)
  positiony += 4
  doc.text('Direccion: ' + datos.direccionCliente, 10, positiony)
  doc.text('Correo: Hola@unsitiogenial.es', pageWidth - 10 - doc.getTextWidth('Correo: Hola@unsitiogenial.es'), positiony)
  positiony += 4
  doc.text('Correo: ' + datos.correoUsuario, 10, positiony)
  doc.text('Telefono: 911-234-5678', pageWidth - 10 - doc.getTextWidth('Telefono: 911-234-5678'), positiony)
  positiony += 4
  doc.text('Telefono: ' + datos.telefonoCliente, 10, positiony)
  positiony += 15
  doc.setFont(undefined, 'bold')
  doc.setFontSize(12)
  doc.text('Fecha: ' + dayjs().format('DD-MM-YYYY'), 10, positiony)
  positiony += 5

  const boxHeights = [7, 7, 7, 7]
  const boxWidths = [80, 30, 35, 50]
  const margin = 1
  const startX = 10
  const startY = positiony + 5

  const texts = ['Concepto', 'Cantidad', 'Precio', 'Total']

  let currentX = startX

  texts.forEach((text, index) => {
    const boxWidth = boxWidths[index]
    const boxHeight = boxHeights[index]
    const x = currentX
    const y = startY

    doc.setFillColor(8, 52, 84)
    doc.rect(x, y, boxWidth, boxHeight, 'F')
    doc.setTextColor(255, 255, 255)

    const textWidth = doc.getTextWidth(text)
    const textX = x + (boxWidth - textWidth) / 2
    const textY = y + (boxHeight / 2)

    doc.text(text, textX, textY, { baseline: 'middle' })

    currentX += boxWidth + margin
  })
  return (positiony += 20)
}

const calculoCentral = (texto, contenedor, doc) => {
  const textWidth = doc.getTextWidth(texto)
  return (contenedor - textWidth) / 2
}

const impresionTexto = (texto, posicionY, doc, pageWidth) => {
  const textLines = doc.splitTextToSize(texto, pageWidth - 20)
  const x = 10
  textLines.forEach(line => {
    doc.text(line, x, posicionY)
    posicionY += doc.getTextDimensions(line).h
  })
}

const generarFinalDocumento = (doc, pageWidth, pageHeight, contadorPaginas) => {
  doc.setFontSize(10)
  doc.setTextColor(211, 211, 211)
  const imgWidth = 216.9
  const imgHeight = 50.74532085561497
  const positionY = pageHeight - imgHeight
  doc.addImage(imagen2, 'png', -1, positionY, imgWidth, imgHeight)
  doc.text(`Pagina ${contadorPaginas}`, pageWidth - 4 - doc.getTextWidth(`Pagina ${contadorPaginas}`), pageHeight - 6)
  doc.setTextColor(0, 0, 0)
}
