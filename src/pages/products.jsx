import React, { useEffect, useState } from 'react'
import Logo1 from '../assets/img/FTM.png'
import { api } from '../utils/conection'
import Logo from '../assets/img/FTM.2.png'

function ViewProducts () {
  const [products, setProductos] = useState([])

  useEffect(() => {
    api.get('products')
      .then((res) => setProductos(res.data))
  }, [])

  return (
    <>
      <div className='w-full h-screen flex flex-col'>
        <div className='bg-gray-800 h-16 flex justify-center items-center px-4'>
          <img src={Logo} className='block h-8 w-auto' alt='Logo' />
          <img src={Logo1} className='block h-10 w-auto' alt='Logo1' />
        </div>
        <div className='bg-white w-full flex-1 overflow-y-auto'>
          <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Mira los productos que tenemos para ti</h2>

            <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
              {products.map((product) => (
                <div key={product.id} className='group relative'>
                  <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                    <img
                      src={product.link_foto_producto}
                      alt='foto_producto'
                      className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                    />
                  </div>
                  <div className='mt-4 flex justify-between'>
                    <div>
                      <h3 className='text-sm text-gray-700'>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.nombre_producto}
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>{product.descripcion_producto}</p>
                    </div>
                    <p className='text-sm font-medium text-gray-900'>${product.valor_producto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='bg-gray-800 h-16 flex justify-center items-center px-4'>
          <img src={Logo} className='block h-8 w-auto' alt='Logo' />
          <img src={Logo1} className='block h-10 w-auto' alt='Logo1' />
        </div>
      </div>
    </>
  )
}

export default ViewProducts
